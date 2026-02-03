'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Tipos
interface FormData {
  // Paso 1: Servicio
  servicio: string;
  
  // Paso 2: Destino/Ubicación
  ciudad_interes: string;
  
  // Paso 3: Datos personales
  nombre: string;
  email: string;
  telefono: string;
  pais_origen: string;
  ciudad_origen: string;
  
  // Paso 4: Detalles
  presupuesto: string;
  urgencia: string;
  mensaje: string;
  
  // Hidden fields
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  landing_page: string;
}

interface StepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  errors: Partial<Record<keyof FormData, string>>;
}

// Datos de opciones
const PAISES = [
  'Reino Unido', 'Alemania', 'Francia', 'Países Bajos', 'Bélgica', 
  'Suecia', 'Noruega', 'Dinamarca', 'Finlandia', 'Irlanda',
  'Estados Unidos', 'Canadá', 'Rusia', 'Ucrania',
  'Italia', 'Portugal', 'Suiza',
  'Argelia', 'Marruecos',
  'Colombia', 'Ecuador', 'Bolivia', 'Argentina', 'Venezuela', 'Uruguay', 'Chile',
  'Otro'
];

const SERVICIOS = [
  { id: 'seguros', label: 'Seguros de Salud', icon: '🏥' },
  { id: 'abogados', label: 'Abogados de Extranjería', icon: '⚖️' },
  { id: 'inmobiliarias', label: 'Inmobiliarias', icon: '🏠' },
  { id: 'dentistas', label: 'Clínicas Dentales', icon: '🦷' },
  { id: 'gestorias', label: 'Gestorías', icon: '📋' },
  { id: 'clinicas', label: 'Clínicas Médicas', icon: '🩺' },
];

const CIUDADES = [
  { id: 'madrid', label: 'Madrid' },
  { id: 'barcelona', label: 'Barcelona' },
  { id: 'valencia', label: 'Valencia' },
  { id: 'alicante', label: 'Alicante' },
  { id: 'malaga', label: 'Málaga' },
  { id: 'marbella', label: 'Marbella' },
  { id: 'torrevieja', label: 'Torrevieja' },
  { id: 'benidorm', label: 'Benidorm' },
  { id: 'murcia', label: 'Murcia' },
  { id: 'sevilla', label: 'Sevilla' },
  { id: 'palma', label: 'Palma de Mallorca' },
  { id: 'tenerife', label: 'Tenerife' },
  { id: 'las-palmas', label: 'Las Palmas' },
  { id: 'ibiza', label: 'Ibiza' },
  { id: 'otra', label: 'Otra ciudad' },
];

const PRESUPUESTOS = [
  { id: 'menos-5000', label: 'Menos de 5.000€', score: 10 },
  { id: '5000-15000', label: '5.000€ - 15.000€', score: 20 },
  { id: '15000-30000', label: '15.000€ - 30.000€', score: 35 },
  { id: 'mas-30000', label: 'Más de 30.000€', score: 50 },
  { id: 'no-seguro', label: 'No estoy seguro', score: 15 },
];

const URGENCIAS = [
  { id: 'esta-semana', label: 'Esta semana', score: 30 },
  { id: 'este-mes', label: 'Este mes', score: 20 },
  { id: 'proximo-trimestre', label: 'Próximo trimestre', score: 10 },
  { id: 'solo-informacion', label: 'Solo busco información', score: 5 },
];

// Componente de paso 1: Selección de servicio
function Step1({ formData, updateFormData, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">
          ¿Qué servicio necesitas?
        </h2>
        <p className="text-gray-600">
          Selecciona el tipo de profesional que buscas
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {SERVICIOS.map((servicio) => (
          <button
            key={servicio.id}
            type="button"
            onClick={() => updateFormData('servicio', servicio.id)}
            className={`p-4 rounded-xl border-2 transition-all text-center ${
              formData.servicio === servicio.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            <span className="text-3xl mb-2 block">{servicio.icon}</span>
            <span className={`font-medium ${
              formData.servicio === servicio.id ? 'text-primary' : 'text-gray-700'
            }`}>
              {servicio.label}
            </span>
          </button>
        ))}
      </div>
      {errors.servicio && <p className="form-error text-center">{errors.servicio}</p>}
    </div>
  );
}

// Componente de paso 2: Selección de ciudad/destino
function Step2({ formData, updateFormData, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">
          ¿Dónde en España?
        </h2>
        <p className="text-gray-600">
          Selecciona la ciudad donde necesitas el servicio
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {CIUDADES.map((ciudad) => (
          <button
            key={ciudad.id}
            type="button"
            onClick={() => updateFormData('ciudad_interes', ciudad.id)}
            className={`p-3 rounded-xl border-2 transition-all text-center ${
              formData.ciudad_interes === ciudad.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            <span className={`font-medium text-sm ${
              formData.ciudad_interes === ciudad.id ? 'text-primary' : 'text-gray-700'
            }`}>
              {ciudad.label}
            </span>
          </button>
        ))}
      </div>
      {errors.ciudad_interes && <p className="form-error text-center">{errors.ciudad_interes}</p>}
    </div>
  );
}

// Componente de paso 3: Datos personales
function Step3({ formData, updateFormData, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">
          Cuéntanos sobre ti
        </h2>
        <p className="text-gray-600">
          Necesitamos algunos datos para poder ayudarte mejor
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="form-label">Nombre completo *</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => updateFormData('nombre', e.target.value)}
            className={`form-input ${errors.nombre ? 'border-error ring-error/20' : ''}`}
            placeholder="Tu nombre"
          />
          {errors.nombre && <p className="form-error">{errors.nombre}</p>}
        </div>

        <div>
          <label className="form-label">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className={`form-input ${errors.email ? 'border-error ring-error/20' : ''}`}
            placeholder="tu@email.com"
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        <div>
          <label className="form-label">Teléfono *</label>
          <input
            type="tel"
            value={formData.telefono}
            onChange={(e) => updateFormData('telefono', e.target.value)}
            className={`form-input ${errors.telefono ? 'border-error ring-error/20' : ''}`}
            placeholder="+34 600 000 000"
          />
          {errors.telefono && <p className="form-error">{errors.telefono}</p>}
        </div>

        <div>
          <label className="form-label">País de origen *</label>
          <select
            value={formData.pais_origen}
            onChange={(e) => updateFormData('pais_origen', e.target.value)}
            className={`form-input ${errors.pais_origen ? 'border-error ring-error/20' : ''}`}
          >
            <option value="">Selecciona tu país</option>
            {PAISES.map((pais) => (
              <option key={pais} value={pais}>{pais}</option>
            ))}
          </select>
          {errors.pais_origen && <p className="form-error">{errors.pais_origen}</p>}
        </div>

        <div>
          <label className="form-label">Ciudad de origen</label>
          <input
            type="text"
            value={formData.ciudad_origen}
            onChange={(e) => updateFormData('ciudad_origen', e.target.value)}
            className="form-input"
            placeholder="Tu ciudad actual"
          />
        </div>
      </div>
    </div>
  );
}


// Componente de paso 4: Detalles finales
function Step4({ formData, updateFormData, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">
          Últimos detalles
        </h2>
        <p className="text-gray-600">
          Esto nos ayudará a encontrar el profesional ideal para ti
        </p>
      </div>

      <div className="space-y-6">
        {/* Presupuesto */}
        <div>
          <label className="form-label">¿Cuál es tu presupuesto aproximado? *</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
            {PRESUPUESTOS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => updateFormData('presupuesto', option.id)}
                className={`p-3 rounded-xl border-2 transition-all text-center ${
                  formData.presupuesto === option.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <span className={`font-medium text-sm ${
                  formData.presupuesto === option.id ? 'text-primary' : 'text-gray-700'
                }`}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
          {errors.presupuesto && <p className="form-error">{errors.presupuesto}</p>}
        </div>

        {/* Urgencia */}
        <div>
          <label className="form-label">¿Cuándo lo necesitas? *</label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {URGENCIAS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => updateFormData('urgencia', option.id)}
                className={`p-3 rounded-xl border-2 transition-all text-center ${
                  formData.urgencia === option.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <span className={`font-medium text-sm ${
                  formData.urgencia === option.id ? 'text-primary' : 'text-gray-700'
                }`}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
          {errors.urgencia && <p className="form-error">{errors.urgencia}</p>}
        </div>

        {/* Mensaje opcional */}
        <div>
          <label className="form-label">
            ¿Algo más que debamos saber? <span className="text-gray-400">(opcional)</span>
          </label>
          <textarea
            value={formData.mensaje}
            onChange={(e) => updateFormData('mensaje', e.target.value)}
            className="form-input min-h-[100px]"
            placeholder="Cuéntanos más sobre tu situación..."
          />
        </div>
      </div>
    </div>
  );
}

// Componente principal del formulario
function ContactPageContent() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    pais_origen: '',
    ciudad_origen: '',
    servicio: '',
    ciudad_interes: '',
    presupuesto: '',
    urgencia: '',
    mensaje: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    landing_page: '',
  });

  // Capturar parámetros de URL (hidden fields)
  useEffect(() => {
    const servicio = searchParams.get('servicio') || '';
    const ciudad = searchParams.get('ciudad') || '';
    const utm_source = searchParams.get('utm_source') || '';
    const utm_medium = searchParams.get('utm_medium') || '';
    const utm_campaign = searchParams.get('utm_campaign') || '';
    
    setFormData(prev => ({
      ...prev,
      servicio: servicio || prev.servicio,
      ciudad_interes: ciudad || prev.ciudad_interes,
      utm_source,
      utm_medium,
      utm_campaign,
      landing_page: typeof window !== 'undefined' ? window.location.href : '',
    }));

    // Si viene con servicio preseleccionado, saltar al paso 2 (ubicación)
    // Luego seguirá al paso 3 (datos personales) y finalmente paso 4 (detalles)
    if (servicio && ciudad) {
      setCurrentStep(2); // Si tiene servicio y ciudad, va al paso 2 (ubicación ya seleccionada, pero puede cambiarla)
    } else if (servicio) {
      setCurrentStep(2); // Si solo tiene servicio, va al paso 2 (ubicación)
    } else if (ciudad) {
      setCurrentStep(2); // Si solo tiene ciudad, va al paso 2 (ubicación ya seleccionada)
    }
  }, [searchParams]);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      // Paso 1: Servicio
      if (!formData.servicio) newErrors.servicio = 'Selecciona un servicio';
    }

    if (step === 2) {
      // Paso 2: Ubicación/Destino
      if (!formData.ciudad_interes) newErrors.ciudad_interes = 'Selecciona una ciudad';
    }

    if (step === 3) {
      // Paso 3: Datos personales
      if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
      if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email no válido';
      }
      if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio';
      if (!formData.pais_origen) newErrors.pais_origen = 'Selecciona tu país';
    }

    if (step === 4) {
      // Paso 4: Detalles
      if (!formData.presupuesto) newErrors.presupuesto = 'Selecciona tu presupuesto';
      if (!formData.urgencia) newErrors.urgencia = 'Selecciona cuándo lo necesitas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Calcular score del lead
  const calculateScore = (): number => {
    let score = 50; // Base

    // Presupuesto
    const presupuestoOption = PRESUPUESTOS.find(p => p.id === formData.presupuesto);
    if (presupuestoOption) score += presupuestoOption.score;

    // Urgencia
    const urgenciaOption = URGENCIAS.find(u => u.id === formData.urgencia);
    if (urgenciaOption) score += urgenciaOption.score;

    // Servicio de alto valor
    if (['seguros', 'abogados', 'inmobiliarias'].includes(formData.servicio)) {
      score += 10;
    }

    // Ciudad específica
    if (formData.ciudad_interes && formData.ciudad_interes !== 'otra') {
      score += 5;
    }

    // Mensaje detallado
    if (formData.mensaje && formData.mensaje.length > 50) {
      score += 5;
    }

    return Math.min(100, score);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);

    try {
      const score = calculateScore();
      
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          pais_origen: formData.pais_origen,
          ciudad_origen: formData.ciudad_origen,
          servicio: formData.servicio,
          ciudad: formData.ciudad_interes,
          presupuesto: formData.presupuesto,
          urgencia: formData.urgencia,
          mensaje: formData.mensaje,
          landing_page: formData.landing_page,
          utm_source: formData.utm_source,
          utm_medium: formData.utm_medium,
          utm_campaign: formData.utm_campaign,
          score,
          idioma_preferido: 'es',
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const data = await response.json();
        alert(data.error || 'Error al enviar. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pantalla de éxito
  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-4">
            ¡Solicitud recibida!
          </h1>
          <p className="text-gray-600 mb-8">
            Gracias por confiar en Health4Spain. Un profesional de nuestro equipo 
            se pondrá en contacto contigo en menos de 24 horas.
          </p>
          <Link href="/es" className="btn-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-[80vh] py-8 md:py-12">
      <div className="container-base max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Paso {currentStep} de {totalSteps}</span>
            <span>{Math.round(progress)}% completado</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
                step === currentStep
                  ? 'bg-primary text-white'
                  : step < currentStep
                  ? 'bg-primary/20 text-primary'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {step < currentStep ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6 md:p-8">
          {/* Steps content */}
          {currentStep === 1 && (
            <Step1 formData={formData} updateFormData={updateFormData} errors={errors} />
          )}
          {currentStep === 2 && (
            <Step2 formData={formData} updateFormData={updateFormData} errors={errors} />
          )}
          {currentStep === 3 && (
            <Step3 formData={formData} updateFormData={updateFormData} errors={errors} />
          )}
          {currentStep === 4 && (
            <Step4 formData={formData} updateFormData={updateFormData} errors={errors} />
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`btn ${
                currentStep === 1
                  ? 'invisible'
                  : 'btn-ghost'
              }`}
            >
              ← Anterior
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Siguiente →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary btn-lg"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  'Enviar solicitud'
                )}
              </button>
            )}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Tus datos están seguros y protegidos
          </p>
        </div>
      </div>
    </div>
  );
}

// Componente wrapper con Suspense
export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <ContactPageContent />
    </Suspense>
  );
}
