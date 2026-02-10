/**
 * Regenera TODO el contenido de las landing pages de abogados con OpenAI
 * Adapta el texto a ABOGADOS EN GENERAL (familia, civil, laboral, extranjería, penal, herencias...)
 * NO solo abogados de extranjería.
 *
 * Uso:
 *   npm run regenerate-abogados-landings
 *
 * Requiere .env.local: OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// Campos de texto que se regeneran
const TEXT_FIELDS = [
  'meta_title', 'meta_description', 'meta_keywords',
  'hero_title', 'hero_subtitle', 'hero_bullets',
  'problem_title', 'problems', 'solution_title', 'solution_text',
  'services_title', 'services', 'why_city_title', 'why_city_text', 'why_city_stats',
  'faqs', 'cta_title', 'cta_subtitle'
] as const;

function buildRegeneratePrompt(landing: Record<string, unknown>): string {
  const ciudad = landing.ciudad_nombre || 'la ciudad';
  const provincia = landing.provincia || '';

  return `Eres un copywriter SEO experto. REESCRIBE el contenido de esta landing page de abogados.

CONTEXTO:
- Ciudad: ${ciudad} (${provincia})
- El servicio es ABOGADOS EN GENERAL: familia, civil, laboral, extranjería, penal, herencias, divorcios, contratos, etc.
- NO es solo "abogados de extranjería". Es un despacho/plataforma que conecta con abogados de TODAS las especialidades.
- Público: extranjeros que viven o quieren vivir en España y necesitan asesoría legal.

TAREA:
Reescribe TODO el contenido para reflejar abogados generales. Incluye variedad de servicios:
- Derecho de familia (divorcios, custodia)
- Civil (contratos, reclamaciones)
- Laboral (despidos, contratos)
- Extranjería (NIE, visados, residencia)
- Penal
- Herencias y sucesiones

Responde SOLO con un JSON válido con esta estructura exacta (sin markdown):

{
  "meta_title": "Máx 60 caracteres, incluir Abogados y ${ciudad}",
  "meta_description": "Máx 155 caracteres",
  "meta_keywords": "abogados, ${ciudad}, familia, civil, laboral, extranjería, herencias, separados por comas",
  "hero_title": "Pregunta o afirmación sobre Abogados en ${ciudad} (NO decir 'extranjería')",
  "hero_subtitle": "2-3 frases sobre asesoría legal amplia",
  "hero_bullets": ["4 bullets: asesoría personalizada, múltiples especialidades, etc."],
  "problem_title": "¿Te suena esto?",
  "problems": ["5 problemas legales comunes (variados: familia, trabajo, documentos, etc.)"],
  "solution_title": "Nuestra solución",
  "solution_text": "Párrafo sobre cómo conectamos con abogados de todas las especialidades en ${ciudad}",
  "services_title": "Nuestros servicios legales",
  "services": [
    {"icon": "emoji", "title": "Derecho de Familia", "description": "Divorcios, custodia, modificación medidas"},
    {"icon": "emoji", "title": "Extranjería", "description": "NIE, visados, residencia, nacionalidad"},
    {"icon": "emoji", "title": "Laboral", "description": "Despidos, reclamaciones, contratos"},
    {"icon": "emoji", "title": "Civil y Contratos", "description": "Reclamaciones, indemnizaciones"},
    {"icon": "emoji", "title": "Herencias", "description": "Sucesiones, testamentos"},
    {"icon": "emoji", "title": "Consultas Iniciales", "description": "Evaluación gratuita de tu caso"}
  ],
  "why_city_title": "¿Por qué Abogados en ${ciudad}?",
  "why_city_text": "Párrafo sobre la relevancia de tener abogados en ${ciudad}",
  "why_city_stats": [
    {"value": "dato", "label": "Habitantes"},
    {"value": "dato", "label": "Población extranjera"},
    {"value": "dato", "label": "Aeropuerto más cercano"},
    {"value": "dato", "label": "Oficinas de Extranjería en la región"}
  ],
  "faqs": [
    {"question": "Pregunta 1 sobre abogados en ${ciudad}", "answer": "Respuesta"},
    {"question": "Pregunta 2", "answer": "Respuesta"},
    {"question": "Pregunta 3", "answer": "Respuesta"},
    {"question": "Pregunta 4", "answer": "Respuesta"}
  ],
  "cta_title": "¿Necesitas un abogado en ${ciudad}?",
  "cta_subtitle": "Te conectamos con profesionales verificados en menos de 24 horas"
}`;
}

async function regenerateLanding(landing: Record<string, unknown>): Promise<Record<string, unknown> | null> {
  const slug = landing.slug as string;

  try {
    const prompt = buildRegeneratePrompt(landing);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Eres un copywriter SEO. Responde SOLO con JSON válido, sin markdown.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    const text = completion.choices[0].message.content || '';
    const cleanJson = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const generated = JSON.parse(cleanJson);

    return {
      ...landing,
      servicio_nombre: 'Abogado',
      meta_title: generated.meta_title,
      meta_description: generated.meta_description,
      meta_keywords: generated.meta_keywords,
      hero_title: generated.hero_title,
      hero_subtitle: generated.hero_subtitle,
      hero_bullets: generated.hero_bullets || [],
      problem_title: generated.problem_title,
      problems: generated.problems || [],
      solution_title: generated.solution_title,
      solution_text: generated.solution_text,
      services_title: generated.services_title,
      services: generated.services || [],
      why_city_title: generated.why_city_title,
      why_city_text: generated.why_city_text,
      why_city_stats: generated.why_city_stats || [],
      faqs: generated.faqs || [],
      cta_title: generated.cta_title,
      cta_subtitle: generated.cta_subtitle,
    };
  } catch (err: unknown) {
    console.error(`  ❌ ${slug}:`, err instanceof Error ? err.message : err);
    return null;
  }
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Falta OPENAI_API_KEY en .env.local');
    process.exit(1);
  }

  console.log('🔄 Regenerando landing pages de abogados con OpenAI...\n');
  console.log('   Servicio: ABOGADOS EN GENERAL (familia, civil, laboral, extranjería, penal, herencias...)\n');

  const slugFilter = process.argv.find((a) => a.startsWith('--slug='));
  const onlySlug = slugFilter ? slugFilter.split('=')[1] : null;

  let query = supabase.from('landing_pages').select('*').eq('servicio_slug', 'abogados');
  if (onlySlug) {
    query = query.eq('slug', onlySlug);
    console.log(`   Solo: ${onlySlug}\n`);
  }

  const { data: landings, error: fetchError } = await query;

  if (fetchError) {
    console.error('❌ Error:', fetchError.message);
    process.exit(1);
  }

  if (!landings || landings.length === 0) {
    console.log('No hay landings de abogados.');
    return;
  }

  console.log(`Encontradas ${landings.length} landings. Regenerando...\n`);

  let ok = 0;
  let fail = 0;

  for (const landing of landings) {
    process.stdout.write(`  ${landing.slug}... `);

    const updated = await regenerateLanding(landing);

    if (!updated) {
      fail++;
      continue;
    }

    const { error: updateError } = await supabase
      .from('landing_pages')
      .update({
        servicio_nombre: updated.servicio_nombre,
        meta_title: updated.meta_title,
        meta_description: updated.meta_description,
        meta_keywords: updated.meta_keywords,
        hero_title: updated.hero_title,
        hero_subtitle: updated.hero_subtitle,
        hero_bullets: updated.hero_bullets,
        problem_title: updated.problem_title,
        problems: updated.problems,
        solution_title: updated.solution_title,
        solution_text: updated.solution_text,
        services_title: updated.services_title,
        services: updated.services,
        why_city_title: updated.why_city_title,
        why_city_text: updated.why_city_text,
        why_city_stats: updated.why_city_stats,
        faqs: updated.faqs,
        cta_title: updated.cta_title,
        cta_subtitle: updated.cta_subtitle,
        generado_por_ia: true,
        fecha_generacion: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', landing.id);

    if (updateError) {
      console.log(`❌ ${updateError.message}`);
      fail++;
    } else {
      console.log('✅');
      ok++;
    }

    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\n✅ ${ok} landings regeneradas`);
  if (fail > 0) console.log(`❌ ${fail} errores`);
}

main().catch(console.error);
