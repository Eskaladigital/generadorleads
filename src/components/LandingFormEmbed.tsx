'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LandingFormEmbedProps {
  servicioSlug: string;
  ciudadSlug: string;
  servicioNombre: string;
  ciudadNombre: string;
}

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  pais_origen: string;
  presupuesto: string;
  urgencia: string;
  mensaje: string;
}

const PAISES = [
  'Alemania', 'Argelia', 'Argentina', 'Bélgica', 'Bolivia', 'Canadá', 'Chile',
  'Colombia', 'Dinamarca', 'Ecuador', 'Estados Unidos', 'Finlandia', 'Francia',
  'Irlanda', 'Italia', 'Marruecos', 'Noruega', 'Países Bajos', 'Portugal',
  'Reino Unido', 'Rusia', 'Suecia', 'Suiza', 'Ucrania', 'Uruguay', 'Venezuela',
  'Otro'
];

const PRESUPUESTOS = [
  { id: 'menos-5000', label: 'Menos de 5.000€' },
  { id: '5000-15000', label: '5.000€ - 15.000€' },
  { id: '15000-30000', label: '15.000€ - 30.000€' },
  { id: 'mas-30000', label: 'Más de 30.000€' },
  { id: 'no-seguro', label: 'No estoy seguro' },
];

const URGENCIAS = [
  { id: 'esta-semana', label: 'Esta semana' },
  { id: 'este-mes', label: 'Este mes' },
  { id: 'proximo-trimestre', label: 'Próximo trimestre' },
  { id: 'solo-informacion', label: 'Solo busco información' },
];

export default function LandingFormEmbed({ 
  servicioSlug, 
  ciudadSlug,
  servicioNombre,
  ciudadNombre 
}: LandingFormEmbedProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1); // Paso 1: datos personales, Paso 2: presupuesto/urgencia
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    pais_origen: '',
    presupuesto: '',
    urgencia: '',
    mensaje: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
      if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email no válido';
      }
      if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio';
      if (!formData.pais_origen) newErrors.pais_origen = 'Selecciona tu país de origen';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const payload = {
        servicio: servicioSlug,
        ciudad_interes: ciudadSlug,
        ...formData,
        landing_page: typeof window !== 'undefined' ? window.location.href : '',
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Redirigir a página de gracias después de un breve delay
        setTimeout(() => {
          router.push('/es/solicitar?success=true');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-white border-t-3 border-accent p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-50 rounded-full mb-4">
          <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">¡Solicitud enviada!</h3>
        <p className="text-gray-600">Te contactaremos en menos de 24 horas</p>
      </div>
    );
  }

  return (
    <div className="bg-white border-t-3 border-accent p-6 md:p-8">
      {/* Header con contexto */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl md:text-2xl font-bold">Solicita información</h3>
          <a 
            href={`/es/solicitar?servicio=${servicioSlug}&ciudad=${ciudadSlug}`}
            className="text-xs text-gray-500 hover:text-accent transition-colors"
          >
            Cambiar
          </a>
        </div>
        <div className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md">
          <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium text-gray-700">
            {servicioNombre} en {ciudadNombre}
          </span>
        </div>
      </div>

      <form onSubmit={currentStep === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNextStep(); }}>
        {/* Paso 1: Datos personales */}
        {currentStep === 1 && (
          <div className="space-y-3">
            <div>
              <label className="form-label-minimal">Nombre completo *</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => updateFormData('nombre', e.target.value)}
                placeholder="Tu nombre"
                className={`form-input-minimal ${errors.nombre ? 'border-accent' : ''}`}
              />
              {errors.nombre && <p className="text-accent text-sm mt-1">{errors.nombre}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="form-label-minimal">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="tu@email.com"
                  className={`form-input-minimal ${errors.email ? 'border-accent' : ''}`}
                />
                {errors.email && <p className="text-accent text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="form-label-minimal">Teléfono *</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => updateFormData('telefono', e.target.value)}
                  placeholder="+34 600 000 000"
                  className={`form-input-minimal ${errors.telefono ? 'border-accent' : ''}`}
                />
                {errors.telefono && <p className="text-accent text-sm mt-1">{errors.telefono}</p>}
              </div>
            </div>

            <div>
              <label className="form-label-minimal">País de origen *</label>
              <select
                value={formData.pais_origen}
                onChange={(e) => updateFormData('pais_origen', e.target.value)}
                className={`form-input-minimal ${errors.pais_origen ? 'border-accent' : ''}`}
              >
                <option value="">Selecciona tu país</option>
                {PAISES.map((pais) => (
                  <option key={pais} value={pais}>
                    {pais}
                  </option>
                ))}
              </select>
              {errors.pais_origen && <p className="text-accent text-sm mt-1">{errors.pais_origen}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-[#293f92] text-white font-bold hover:bg-[#1e2d6b] transition-colors rounded-sm"
            >
              Continuar →
            </button>
          </div>
        )}

        {/* Paso 2: Presupuesto y urgencia */}
        {currentStep === 2 && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="text-sm text-gray-600 hover:text-accent mb-2 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Atrás
            </button>

            <div>
              <label className="form-label-minimal mb-2">¿Cuál es tu presupuesto aproximado?</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-2 mt-2">
                {PRESUPUESTOS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => updateFormData('presupuesto', option.id)}
                    className={`p-2 md:p-2.5 border rounded text-left transition-all ${
                      formData.presupuesto === option.id
                        ? 'border-black bg-gray-50 font-semibold'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-xs md:text-sm block">{option.label}</span>
                    {formData.presupuesto === option.id && (
                      <svg className="w-4 h-4 text-accent shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label-minimal mb-2">¿Cuándo lo necesitas?</label>
              <div className="grid grid-cols-2 gap-1.5 md:gap-2 mt-2">
                {URGENCIAS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => updateFormData('urgencia', option.id)}
                    className={`p-2 md:p-2.5 border rounded text-left transition-all ${
                      formData.urgencia === option.id
                        ? 'border-black bg-gray-50 font-semibold'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-xs md:text-sm block">{option.label}</span>
                    {formData.urgencia === option.id && (
                      <svg className="w-4 h-4 text-accent shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label-minimal">
                ¿Algo más que debamos saber? <span className="text-gray-400">(opcional)</span>
              </label>
              <textarea
                value={formData.mensaje}
                onChange={(e) => updateFormData('mensaje', e.target.value)}
                placeholder="Cuéntanos más sobre tu situación..."
                className="form-input-minimal min-h-[80px] mt-1.5"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-[#293f92] text-white font-bold hover:bg-[#1e2d6b] transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
            </button>

            {submitStatus === 'error' && (
              <p className="text-accent text-sm text-center">
                Error al enviar. Inténtalo de nuevo.
              </p>
            )}
          </div>
        )}

        {/* Trust badges */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap justify-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Sin compromiso
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Respuesta en 24h
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Datos protegidos
          </span>
        </div>
      </form>
    </div>
  );
}
