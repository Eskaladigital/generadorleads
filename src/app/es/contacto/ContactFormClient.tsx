'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Tipos
interface FormData {
  servicio: string;
  ciudad_interes: string;
  nombre: string;
  email: string;
  telefono: string;
  pais_origen: string;
  ciudad_origen: string;
  presupuesto: string;
  urgencia: string;
  mensaje: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  landing_page: string;
}

interface StepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  errors: Partial<Record<keyof FormData, string>>;
  ciudades?: { id: string; label: string }[];
  onAutoAdvance?: () => void;
}

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
  { id: 'abogados', label: 'Abogados', icon: '⚖️' },
  { id: 'inmobiliarias', label: 'Inmobiliarias', icon: '🏠' },
  { id: 'gestorias', label: 'Gestorías', icon: '📋' },
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

function Step1({ formData, updateFormData, errors, onAutoAdvance }: StepProps) {
  const handleServicioClick = (servicioId: string) => {
    updateFormData('servicio', servicioId);
    // Auto-avanzar después de un pequeño delay para que el usuario vea la selección
    if (onAutoAdvance) {
      setTimeout(() => {
        onAutoAdvance();
      }, 300);
    }
  };

  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Qué servicio necesitas?</h2>
        <p className="text-lg text-gray-600">Selecciona el tipo de profesional que buscas</p>
      </div>
      <ul className="service-list-minimal">
        {SERVICIOS.map((servicio, index) => (
          <li
            key={servicio.id}
            onClick={() => handleServicioClick(servicio.id)}
            className={`service-item-minimal cursor-pointer ${
              formData.servicio === servicio.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <div className={`service-number ${formData.servicio === servicio.id ? 'text-red-600' : 'text-gray-400'}`}>
              {String(index + 1).padStart(2, '0')}
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-1">{servicio.label}</h3>
            </div>
            <div className="service-arrow">
              {formData.servicio === servicio.id ? '✓' : '→'}
            </div>
          </li>
        ))}
      </ul>
      {errors.servicio && <p className="text-red-600 text-center mt-4">{errors.servicio}</p>}
    </div>
  );
}

function Step2({ formData, updateFormData, errors, ciudades = [], onAutoAdvance }: StepProps) {
  const handleCiudadClick = (ciudadId: string) => {
    updateFormData('ciudad_interes', ciudadId);
    // Auto-avanzar después de un pequeño delay para que el usuario vea la selección
    if (onAutoAdvance) {
      setTimeout(() => {
        onAutoAdvance();
      }, 300);
    }
  };

  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Dónde en España?</h2>
        <p className="text-lg text-gray-600">Selecciona la ciudad donde necesitas el servicio</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {ciudades.map((ciudad) => (
          <button
            key={ciudad.id}
            type="button"
            onClick={() => handleCiudadClick(ciudad.id)}
            className={`p-4 border border-gray-200 text-left transition-opacity ${
              formData.ciudad_interes === ciudad.id
                ? 'border-black opacity-100'
                : 'opacity-50 hover:opacity-100'
            }`}
          >
            <span className="font-medium">{ciudad.label}</span>
            {formData.ciudad_interes === ciudad.id && (
              <span className="ml-2 text-red-600">✓</span>
            )}
          </button>
        ))}
      </div>
      {errors.ciudad_interes && <p className="text-red-600 text-center mt-4">{errors.ciudad_interes}</p>}
    </div>
  );
}

function Step3({ formData, updateFormData, errors }: StepProps) {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Cuéntanos sobre ti</h2>
        <p className="text-lg text-gray-600">Necesitamos algunos datos para conectarte con el profesional adecuado</p>
      </div>
      <div className="space-y-8">
        <div>
          <label className="form-label-minimal">Nombre completo *</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => updateFormData('nombre', e.target.value)}
            className={`form-input-minimal ${errors.nombre ? 'border-red-600' : ''}`}
            placeholder="Tu nombre"
          />
          {errors.nombre && <p className="text-red-600 text-sm mt-2">{errors.nombre}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="form-label-minimal">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className={`form-input-minimal ${errors.email ? 'border-red-600' : ''}`}
              placeholder="tu@email.com"
            />
            {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email}</p>}
          </div>
          <div>
            <label className="form-label-minimal">Teléfono *</label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) => updateFormData('telefono', e.target.value)}
              className={`form-input-minimal ${errors.telefono ? 'border-red-600' : ''}`}
              placeholder="+34 600 000 000"
            />
            {errors.telefono && <p className="text-red-600 text-sm mt-2">{errors.telefono}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="form-label-minimal">País de origen *</label>
            <select
              value={formData.pais_origen}
              onChange={(e) => updateFormData('pais_origen', e.target.value)}
              className={`form-input-minimal ${errors.pais_origen ? 'border-red-600' : ''}`}
            >
              <option value="">Selecciona tu país</option>
              {PAISES.map((pais) => (
                <option key={pais} value={pais}>{pais}</option>
              ))}
            </select>
            {errors.pais_origen && <p className="text-red-600 text-sm mt-2">{errors.pais_origen}</p>}
          </div>
          <div>
            <label className="form-label-minimal">Ciudad de origen</label>
            <input
              type="text"
              value={formData.ciudad_origen}
              onChange={(e) => updateFormData('ciudad_origen', e.target.value)}
              className="form-input-minimal"
              placeholder="Tu ciudad actual"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Step4({ formData, updateFormData, errors }: StepProps) {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Últimos detalles</h2>
        <p className="text-lg text-gray-600">Esto nos ayudará a encontrar el profesional ideal para ti</p>
      </div>
      <div className="space-y-10">
        <div>
          <label className="form-label-minimal mb-6">¿Cuál es tu presupuesto aproximado? *</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {PRESUPUESTOS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => updateFormData('presupuesto', option.id)}
                className={`p-4 border border-gray-200 text-left transition-opacity ${
                  formData.presupuesto === option.id
                    ? 'border-black opacity-100'
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                <span className="font-medium text-sm">{option.label}</span>
                {formData.presupuesto === option.id && (
                  <span className="ml-2 text-red-600">✓</span>
                )}
              </button>
            ))}
          </div>
          {errors.presupuesto && <p className="text-red-600 text-sm mt-4">{errors.presupuesto}</p>}
        </div>
        <div>
          <label className="form-label-minimal mb-6">¿Cuándo lo necesitas? *</label>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {URGENCIAS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => updateFormData('urgencia', option.id)}
                className={`p-4 border border-gray-200 text-left transition-opacity ${
                  formData.urgencia === option.id
                    ? 'border-black opacity-100'
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                <span className="font-medium text-sm">{option.label}</span>
                {formData.urgencia === option.id && (
                  <span className="ml-2 text-red-600">✓</span>
                )}
              </button>
            ))}
          </div>
          {errors.urgencia && <p className="text-red-600 text-sm mt-4">{errors.urgencia}</p>}
        </div>
        <div>
          <label className="form-label-minimal">
            ¿Algo más que debamos saber? <span className="text-gray-400">(opcional)</span>
          </label>
          <textarea
            value={formData.mensaje}
            onChange={(e) => updateFormData('mensaje', e.target.value)}
            className="form-input-minimal min-h-[120px] mt-4"
            placeholder="Cuéntanos más sobre tu situación..."
          />
        </div>
      </div>
    </div>
  );
}

interface ContactFormClientProps {
  ciudades: { id: string; label: string }[];
}

export default function ContactFormClient({ ciudades }: ContactFormClientProps) {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  // Determinar el flujo: si viene con servicio preseleccionado, primero pedimos ciudad
  const [flowType, setFlowType] = useState<'default' | 'from-service' | 'from-city'>('default');

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

  useEffect(() => {
    const servicio = searchParams.get('servicio') || '';
    const ciudad = searchParams.get('ciudad') || '';
    const utm_source = searchParams.get('utm_source') || '';
    const utm_medium = searchParams.get('utm_medium') || '';
    const utm_campaign = searchParams.get('utm_campaign') || '';

    setFormData((prev) => ({
      ...prev,
      servicio: servicio || prev.servicio,
      ciudad_interes: ciudad || prev.ciudad_interes,
      utm_source,
      utm_medium,
      utm_campaign,
      landing_page: typeof window !== 'undefined' ? window.location.href : '',
    }));

    // Determinar el tipo de flujo
    if (servicio && ciudad) {
      // Ambos preseleccionados: saltar a paso 3 (datos personales)
      setCurrentStep(3);
      setFlowType('default');
    } else if (servicio) {
      // Viene desde página de servicio: primero elegir ciudad
      setFlowType('from-service');
      setCurrentStep(1);
    } else if (ciudad) {
      // Viene desde página de ciudad: primero elegir servicio
      setFlowType('from-city');
      setCurrentStep(1);
    } else {
      // Sin preselección: flujo normal (servicio → ciudad → datos)
      setFlowType('default');
      setCurrentStep(1);
    }
  }, [searchParams]);

  useEffect(() => {
    document.body.classList.add('form-active');
    return () => document.body.classList.remove('form-active');
  }, []);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    // Validación según el tipo de flujo
    if (flowType === 'from-service') {
      // Flujo: ciudad → datos → detalles
      if (step === 1 && !formData.ciudad_interes) newErrors.ciudad_interes = 'Selecciona una ciudad';
      if (step === 2) {
        if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
        if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email no válido';
        if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio';
        if (!formData.pais_origen) newErrors.pais_origen = 'Selecciona tu país';
      }
      if (step === 3) {
        if (!formData.presupuesto) newErrors.presupuesto = 'Selecciona tu presupuesto';
        if (!formData.urgencia) newErrors.urgencia = 'Selecciona cuándo lo necesitas';
      }
    } else if (flowType === 'from-city') {
      // Flujo: servicio → datos → detalles
      if (step === 1 && !formData.servicio) newErrors.servicio = 'Selecciona un servicio';
      if (step === 2) {
        if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
        if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email no válido';
        if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio';
        if (!formData.pais_origen) newErrors.pais_origen = 'Selecciona tu país';
      }
      if (step === 3) {
        if (!formData.presupuesto) newErrors.presupuesto = 'Selecciona tu presupuesto';
        if (!formData.urgencia) newErrors.urgencia = 'Selecciona cuándo lo necesitas';
      }
    } else {
      // Flujo default: servicio → ciudad → datos → detalles
      if (step === 1 && !formData.servicio) newErrors.servicio = 'Selecciona un servicio';
      if (step === 2 && !formData.ciudad_interes) newErrors.ciudad_interes = 'Selecciona una ciudad';
      if (step === 3) {
        if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
        if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email no válido';
        if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio';
        if (!formData.pais_origen) newErrors.pais_origen = 'Selecciona tu país';
      }
      if (step === 4) {
        if (!formData.presupuesto) newErrors.presupuesto = 'Selecciona tu presupuesto';
        if (!formData.urgencia) newErrors.urgencia = 'Selecciona cuándo lo necesitas';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    const maxSteps = flowType === 'default' ? 4 : 3;
    if (validateStep(currentStep)) setCurrentStep((prev) => Math.min(prev + 1, maxSteps));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const calculateScore = (): number => {
    let score = 50;
    const presupuestoOption = PRESUPUESTOS.find((p) => p.id === formData.presupuesto);
    if (presupuestoOption) score += presupuestoOption.score;
    const urgenciaOption = URGENCIAS.find((u) => u.id === formData.urgencia);
    if (urgenciaOption) score += urgenciaOption.score;
    if (['seguros', 'abogados', 'inmobiliarias'].includes(formData.servicio)) score += 10;
    if (formData.ciudad_interes && formData.ciudad_interes !== 'otra') score += 5;
    if (formData.mensaje && formData.mensaje.length > 50) score += 5;
    return Math.min(100, score);
  };

  const handleSubmit = async () => {
    const lastStep = flowType === 'default' ? 4 : 3;
    if (!validateStep(lastStep)) return;
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
      if (response.ok) setIsSuccess(true);
      else {
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

  if (isSuccess) {
    return (
      <div className="section">
        <div className="container-narrow text-center">
          <div className="mb-12">
            <div className="text-6xl mb-8">✓</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Solicitud Recibida</h1>
            <p className="text-xl text-gray-600 mb-12 max-w-lg mx-auto">
              Gracias por confiar en Health4Spain. Un profesional se pondrá en contacto contigo en menos de 24 horas.
            </p>
            <Link href="/es" className="btn-minimal-lg">
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalSteps = flowType === 'default' ? 4 : 3;
  
  // Función para auto-avanzar al siguiente paso
  const autoAdvanceToNextStep = () => {
    const maxSteps = totalSteps;
    if (currentStep < maxSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  
  // Función para renderizar el paso correcto según el flujo
  const renderStep = () => {
    if (flowType === 'from-service') {
      // Flujo: ciudad → datos → detalles
      switch (currentStep) {
        case 1:
          return <Step2 formData={formData} updateFormData={updateFormData} errors={errors} ciudades={ciudades} onAutoAdvance={autoAdvanceToNextStep} />;
        case 2:
          return <Step3 formData={formData} updateFormData={updateFormData} errors={errors} />;
        case 3:
          return <Step4 formData={formData} updateFormData={updateFormData} errors={errors} />;
        default:
          return null;
      }
    } else if (flowType === 'from-city') {
      // Flujo: servicio → datos → detalles
      switch (currentStep) {
        case 1:
          return <Step1 formData={formData} updateFormData={updateFormData} errors={errors} onAutoAdvance={autoAdvanceToNextStep} />;
        case 2:
          return <Step3 formData={formData} updateFormData={updateFormData} errors={errors} />;
        case 3:
          return <Step4 formData={formData} updateFormData={updateFormData} errors={errors} />;
        default:
          return null;
      }
    } else {
      // Flujo default: servicio → ciudad → datos → detalles
      switch (currentStep) {
        case 1:
          return <Step1 formData={formData} updateFormData={updateFormData} errors={errors} onAutoAdvance={autoAdvanceToNextStep} />;
        case 2:
          return <Step2 formData={formData} updateFormData={updateFormData} errors={errors} ciudades={ciudades} onAutoAdvance={autoAdvanceToNextStep} />;
        case 3:
          return <Step3 formData={formData} updateFormData={updateFormData} errors={errors} />;
        case 4:
          return <Step4 formData={formData} updateFormData={updateFormData} errors={errors} />;
        default:
          return null;
      }
    }
  };

  return (
    <div className="section">
      <div className="container-narrow">
        <div className="mb-16">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium uppercase tracking-widest">
              Paso {currentStep} / {totalSteps}
            </span>
          </div>
          <div className="h-px bg-gray-200">
            <div
              className="h-px bg-black transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-8 md:p-12">
          {/* Banner de información preseleccionada */}
          {(formData.servicio || formData.ciudad_interes) && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium mb-2">Ya has seleccionado:</p>
              <div className="flex flex-wrap gap-3">
                {formData.servicio && (
                  <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm">
                    <span className="text-blue-600">✓</span>
                    <span className="font-medium">
                      {SERVICIOS.find(s => s.id === formData.servicio)?.label}
                    </span>
                  </div>
                )}
                {formData.ciudad_interes && (
                  <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm">
                    <span className="text-green-600">📍</span>
                    <span className="font-medium">
                      {ciudades.find(c => c.id === formData.ciudad_interes)?.label}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {renderStep()}

          <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`btn-ghost-minimal ${currentStep === 1 ? 'invisible' : ''}`}
            >
              ← Anterior
            </button>
            {currentStep < totalSteps ? (
              <button type="button" onClick={nextStep} className="btn-minimal">
                Siguiente →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-minimal"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">🔒 Tus datos están seguros y protegidos</p>
        </div>
      </div>
    </div>
  );
}
