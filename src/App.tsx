/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Mail, 
  Calendar, 
  Palette, 
  ShieldCheck, 
  ChevronRight, 
  Info,
  Sparkles,
  MessageSquare,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Initialization of Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const CATEGORIES = [
  { id: 'admin', title: 'Gestión Administrativa', icon: Mail, color: 'bg-orange-100 text-orange-600', description: 'Correos, informes y comunicados éticos.' },
  { id: 'planning', title: 'Planeación de Clase', icon: Calendar, color: 'bg-olive-100 text-olive-600', description: 'Curaduría de contenidos y objetivos de aprendizaje.' },
  { id: 'resources', title: 'Recursos Educativos', icon: Palette, color: 'bg-amber-100 text-amber-600', description: 'Diseño de actividades y material didáctico.' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-warm-cream flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-morphism py-4 px-6 md:px-12 flex justify-between items-center transition-all">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 bg-warm-orange rounded-xl flex items-center justify-center text-white font-serif text-xl font-bold">
            E
          </div>
          <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-warm-ink">
            EduÉtica <span className="text-warm-orange italic">AI</span>
          </span>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-warm-ink" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center font-sans text-sm font-medium uppercase tracking-wider">
          <button onClick={() => setActiveTab('ethics')} className={`hover:text-warm-orange transition-colors ${activeTab === 'ethics' ? 'text-warm-orange border-b-2 border-warm-orange' : ''}`}>Ética</button>
          <button onClick={() => setActiveTab('resources')} className={`hover:text-warm-orange transition-colors ${activeTab === 'resources' ? 'text-warm-orange border-b-2 border-warm-orange' : ''}`}>Recursos</button>
          <button onClick={() => setActiveTab('assistant')} className={`bg-warm-olive text-white px-6 py-2 rounded-full hover:bg-warm-ink transition-colors flex items-center gap-2`}>
            <Sparkles size={16} /> Asistente
          </button>
        </div>
      </nav>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 bg-warm-cream z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button onClick={() => { setActiveTab('ethics'); setIsMenuOpen(false); }} className="text-2xl font-serif">Ética</button>
            <button onClick={() => { setActiveTab('resources'); setIsMenuOpen(false); }} className="text-2xl font-serif">Recursos</button>
            <button onClick={() => { setActiveTab('assistant'); setIsMenuOpen(false); }} className="text-2xl font-serif text-warm-orange">Asistente</button>
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 p-2"><X /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-24">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <HomeView key="home" onNavigate={setActiveTab} />}
          {activeTab === 'ethics' && <EthicsView key="ethics" />}
          {activeTab === 'resources' && <ResourcesView key="resources" />}
          {activeTab === 'assistant' && <AssistantView key="assistant" />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-warm-border py-12 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-gray-500">
          <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
            <span className="font-serif font-bold text-lg text-warm-ink uppercase tracking-widest">EduÉtica AI Bogotá</span>
            <p className="max-w-xs">Plataforma comprometida con la formación ética de docentes en la era de la inteligencia artificial.</p>
          </div>
          <div className="flex gap-8 flex-wrap justify-center">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-warm-ink">Fuentes</span>
              <a href="https://unesco.org" className="hover:text-warm-orange flex items-center gap-1">UNESCO <ExternalLink size={12}/></a>
              <a href="https://mineducacion.gov.co" className="hover:text-warm-orange flex items-center gap-1">MinEducación <ExternalLink size={12}/></a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-warm-ink">Recursos</span>
              <button onClick={() => setActiveTab('ethics')} className="hover:text-warm-orange text-left">Lineamientos</button>
              <button onClick={() => setActiveTab('resources')} className="hover:text-warm-orange text-left">Plantillas</button>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-xs opacity-50">
          © 2026 Portafolio Académico - Docentes Bogotá D.C.
        </div>
      </footer>
    </div>
  );
}

function HomeView({ onNavigate }: { onNavigate: (tab: string) => void, key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-24"
    >
      {/* Hero Section */}
      <section className="relative grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-warm-orange/10 text-warm-orange text-xs font-bold uppercase tracking-widest border border-warm-orange/20">
            <Sparkles size={14} /> Innovación Bogotá
          </div>
          <h1 className="text-6xl md:text-8xl leading-[0.9] font-medium tracking-tighter">
            Hacia una <span className="text-warm-orange italic">IA Ética</span> en el Aula.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-lg leading-relaxed font-light">
            Recursos y herramientas diseñadas para docentes de Bogotá que buscan integrar la inteligencia artificial de manera responsable y creativa.
          </p>
          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => onNavigate('ethics')}
              className="bg-warm-ink text-white px-8 py-4 rounded-full font-bold hover:bg-warm-orange transition-all transform hover:scale-105"
            >
              Comenzar ahora
            </button>
            <button 
              onClick={() => onNavigate('resources')}
              className="border border-warm-ink text-warm-ink px-8 py-4 rounded-full font-bold hover:bg-warm-ink hover:text-white transition-all transform hover:scale-105"
            >
              Ver Recursos
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div className="aspect-[4/5] rounded-[2rem] bg-warm-olive overflow-hidden border-8 border-white shadow-2xl relative">
            <img 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
              alt="Educación y Tecnología"
              className="w-full h-full object-cover grayscale brightness-110 active:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-warm-orange/20 mix-blend-overlay"></div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-400 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-orange-500 rounded-full blur-3xl opacity-20"></div>
        </div>
      </section>

      {/* Intro Stats/Infographic Section */}
      <section className="py-20 border-y border-warm-border">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-warm-olive rounded-lg flex items-center justify-center text-white">
              <ShieldCheck />
            </div>
            <h3 className="text-2xl font-bold">Uso Ético</h3>
            <p className="text-gray-600">Consideraciones sobre transparencia, sesgos y protección de datos en instituciones educativas.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-warm-orange rounded-lg flex items-center justify-center text-white">
              <BookOpen />
            </div>
            <h3 className="text-2xl font-bold">Inspiración</h3>
            <p className="text-gray-600">Casos de éxito y plantillas listas para implementar en su planeación curricular.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-warm-ink rounded-lg flex items-center justify-center text-white">
              <Info />
            </div>
            <h3 className="text-2xl font-bold">Actualización</h3>
            <p className="text-gray-600">Herramientas actualizadas periódicamente para docentes de educación media en Bogotá.</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function EthicsView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-16"
    >
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-5xl font-medium tracking-tight">Principios de la IA Ética</h2>
        <p className="text-lg text-gray-600">Basados en las normativas del Ministerio de Educación de Colombia y recomendaciones internacionales.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Diagram Simulation */}
        <div className="relative p-8 bg-white rounded-3xl border border-warm-border shadow-sm">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
                <span className="text-xl font-bold">01</span>
              </div>
              <div className="flex-1 border-b border-warm-border pb-4">
                <h4 className="text-xl font-bold mb-1">Transparencia</h4>
                <p className="text-sm text-gray-500">Informar siempre si un contenido o evaluación fue asistido por IA.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-16 h-16 rounded-full bg-olive-100 flex items-center justify-center text-olive-600 group-hover:bg-olive-600 group-hover:text-white transition-all shadow-sm">
                <span className="text-xl font-bold">02</span>
              </div>
              <div className="flex-1 border-b border-warm-border pb-4">
                <h4 className="text-xl font-bold mb-1">Inclusión</h4>
                <p className="text-sm text-gray-500">Evitar sesgos que puedan segregar a los estudiantes de Bogotá.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-sm">
                <span className="text-xl font-bold">03</span>
              </div>
              <div className="flex-1 border-b border-warm-border pb-4">
                <h4 className="text-xl font-bold mb-1">Privacidad</h4>
                <p className="text-sm text-gray-500">Nunca subir datos personales o identificables de estudiantes a la nube.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-3xl font-medium italic">¿Por qué es vital en Bogotá?</h3>
          <p className="text-gray-600 leading-relaxed">
            La ciudad de Bogotá cuenta con una diversidad socioeconómica y cultural única. Implementar la IA de forma ética no es solo una opción técnica, es un compromiso social para reducir la brecha digital y fomentar el pensamiento crítico en nuestros jóvenes.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-warm-orange"></div> Fomenta la honestidad académica.</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-warm-orange"></div> Protege la integridad del docente y el alumno.</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-warm-orange"></div> Mejora la calidad de la respuesta pedagógica.</li>
          </ul>
        </div>
      </div>

      {/* References Section */}
      <div className="bg-white/50 p-8 rounded-3xl border border-warm-border">
        <h4 className="text-xl font-bold mb-4 flex items-center gap-2 italic">
          <Info size={20} className="text-warm-orange" /> Fuentes y Referencias de Consulta
        </h4>
        <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-600">
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-warm-orange font-bold">•</span>
              <span><strong>UNESCO (2023):</strong> Orientaciones sobre la IA generativa en la educación y la investigación.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-warm-orange font-bold">•</span>
              <span><strong>Ministerio de Educación Nacional (Colombia):</strong> Guía para el uso ético y responsable de la IA en educación media.</span>
            </li>
          </ul>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-warm-orange font-bold">•</span>
              <span><strong>SED Bogotá:</strong> Lineamientos de innovación educativa para instituciones distritales.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-warm-orange font-bold">•</span>
              <span><strong>Open Source:</strong> Iconografía de Lucide-React y recursos visuales de Unsplash (Licencia Abierta).</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function ResourcesView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-16"
    >
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-warm-border pb-8">
        <div className="space-y-2">
          <h2 className="text-5xl font-medium uppercase tracking-tighter">Portafolio de Herramientas</h2>
          <p className="text-gray-600">Material listo para descargar e implementar en su jornada laboral.</p>
        </div>
        <div className="flex gap-2">
          {['Todo', 'Planeación', 'Actividades', 'Admin'].map(filter => (
            <button key={filter} className={`px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full border border-warm-border ${filter === 'Todo' ? 'bg-warm-ink text-white' : 'hover:bg-gray-100'}`}>
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {CATEGORIES.map((cat, idx) => (
          <ResourceCard key={idx} {...cat} />
        ))}
      </div>

      {/* Detailed diagram/infographic area */}
      <div className="bg-warm-olive text-white p-12 rounded-[3rem] space-y-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="max-w-2xl">
          <h3 className="text-4xl font-medium mb-4">Hoja de Ruta: Implementación IA</h3>
          <p className="text-white/70 text-lg">Siga estos pasos para integrar la IA en sus procesos pedagógicos de manera segura.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 relative">
          {[
            { step: '01', title: 'Identificar', desc: 'Determine qué tarea desea optimizar.' },
            { step: '02', title: 'Consultar', desc: 'Use plantillas verificadas de este portal.' },
            { step: '03', title: 'Validar', desc: 'Revise y ajuste el resultado humanamente.' },
            { step: '04', title: 'Evaluar', desc: 'Mida el impacto en el aprendizaje.' }
          ].map(item => (
            <div key={item.step} className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all group">
              <span className="text-3xl font-serif italic mb-2 block opacity-50 group-hover:opacity-100 transition-opacity">{item.step}</span>
              <h4 className="font-bold mb-2">{item.title}</h4>
              <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function AssistantView() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Eres un experto en IA Ética educativa para docentes en Bogotá. 
        El docente quiere realizar lo siguiente: ${prompt}.
        1. Devuelve un "Prompt Maestro" optimizado y ético para usar con una IA (ChatGPT, Gemini, etc).
        2. Añade una "Nota de Ética" específica sobre transparencia y sesgos para Bogotá.
        Estructura el resultado de forma clara y estética.`,
      });
      setResult(response.text || '');
    } catch (error) {
      console.error(error);
      setResult('Hubo un error al generar la respuesta. Por favor intente de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto space-y-12"
    >
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-medium">Asistente de Prompts Éticos</h2>
        <p className="text-gray-600 max-w-xl mx-auto">Escriba su necesidad pedagógica y le ayudaremos a formular un pedido ético a la IA.</p>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-warm-border space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-bold uppercase tracking-widest text-warm-olive flex items-center gap-2">
            <MessageSquare size={16} /> Su necesidad:
          </label>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ej: Necesito redactar un correo para padres sobre la excursión al Planetario..."
            className="w-full h-32 p-4 bg-warm-cream border-2 border-transparent focus:border-warm-orange rounded-2xl outline-none transition-all resize-none text-warm-ink"
          />
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-warm-orange text-white py-4 rounded-full font-bold hover:bg-warm-ink transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Generando...' : <><Sparkles size={18} /> Optimizar para IA Ética</>}
        </button>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-warm-cream/50 rounded-2xl border-2 border-dashed border-warm-orange/30 prose max-w-none prose-orange"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="bg-warm-orange text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Resultado Sugerido</span>
            </div>
            <div className="whitespace-pre-wrap text-warm-ink font-sans leading-relaxed">
              {result}
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-olive-100 p-6 rounded-2xl flex gap-4">
          <div className="text-olive-600 shrink-0"><Info size={24} /></div>
          <div>
            <h4 className="font-bold text-olive-800">Consejo Rápido</h4>
            <p className="text-sm text-olive-700/80">Sea específico con el grado escolar de su curso en Bogotá (Ej: 10mo o 11vo grado).</p>
          </div>
        </div>
        <div className="bg-orange-100 p-6 rounded-2xl flex gap-4">
          <div className="text-orange-600 shrink-0"><ShieldCheck size={24} /></div>
          <div>
            <h4 className="font-bold text-orange-800">Privacidad</h4>
            <p className="text-sm text-orange-700/80">Recuerde no incluir nombres reales de sus estudiantes en el prompt.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ResourceCard({ title, icon: Icon, color, description }: { title: string, icon: any, color: string, description: string, id?: string, key?: number }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="p-8 bg-white rounded-3xl border border-warm-border shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
    >
      <div className="space-y-6">
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon size={28} />
        </div>
        <h4 className="text-2xl font-bold font-serif">{title}</h4>
        <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
      </div>
      <button className="mt-8 flex items-center gap-2 text-warm-orange font-bold text-sm group-hover:gap-4 transition-all">
        Acceder Recursos <ChevronRight size={16} />
      </button>
    </motion.div>
  );
}
