import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, ChevronDown, ArrowRight,
  Award, Briefcase, Building2,
  CalendarDays, CheckCircle2, Cpu,
  GraduationCap, Handshake,
  Heart, Landmark,
  MapPin, Megaphone, MessageCircle,
  MonitorPlay, Network, Rocket,
  Shield, Sparkles, Star, Target,
  TrendingUp, Trophy, Users, Video,
  Wifi, Zap, Globe, Mail, BookOpen,
  Brain, Clock,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────
   Utility Components
───────────────────────────────────────────────────────────────── */

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Counter({ end, prefix = '', suffix = '', duration = 1600 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('es-CO')}{suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Navigation
───────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { href: '#impacto', label: 'Impacto' },
  { href: '#categorias', label: 'Categorías' },
  { href: '#estructura', label: 'Agenda' },
  { href: '#patrocinio', label: 'Patrocinio' },
  { href: '#convocatoria', label: 'Convocatoria' },
  { href: '#contacto', label: 'Contacto' },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050d1a]/95 backdrop-blur-xl border-b border-cyan-500/10 shadow-2xl shadow-black/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="font-display font-black text-xl tracking-tight text-white">
              POTENC<span className="text-cyan-400">IA</span>
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#patrocinio"
              className="ml-4 px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-sm rounded-lg transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
            >
              Ser Aliado
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#050d1a]/98 backdrop-blur-xl border-t border-slate-800 px-4 py-3 space-y-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#patrocinio"
            onClick={() => setOpen(false)}
            className="block mt-2 px-4 py-3 bg-cyan-500 text-slate-900 font-bold rounded-lg text-center"
          >
            Quiero ser Aliado
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────────
   01 · Hero
───────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050d1a]"
    >
      {/* Grid background */}
      <div className="absolute inset-0 hero-grid" />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/6 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] rounded-full bg-blue-700/6 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-28 pb-20">
        {/* Live badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/25 bg-cyan-500/8 text-cyan-300 text-sm font-medium mb-10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Bucaramanga, Santander · Colombia · 2026
        </div>

        {/* Main title */}
        <h1 className="font-display font-black leading-none mb-2">
          <span className="block text-[clamp(4rem,14vw,9rem)] tracking-tight text-white">
            POTENC<span className="text-cyan-400">IA</span>
          </span>
          <span className="block text-[clamp(2rem,7vw,5.5rem)] tracking-widest text-slate-300 mt-1">
            2026
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl text-slate-400 max-w-2xl mx-auto mt-7 mb-3 leading-relaxed">
          Feria de Inteligencia Artificial, Empresa y Talento
        </p>
        <div className="flex items-center justify-center gap-6 mt-4 mb-12">
          <p className="text-sm text-slate-600 uppercase tracking-widest font-medium">
            Organizado por
          </p>
          <div className="flex items-center gap-8">
            <img src="/assets/images/logo-clap.png" alt="CLAP Logo" className="h-8 md:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" />
            <div className="w-px h-6 bg-slate-800" />
            <img src="/assets/images/logo-bigdatia.png" alt="BIGDATIA Logo" className="h-8 md:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#patrocinio"
            className="group inline-flex items-center justify-center gap-2 px-9 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
          >
            Quiero ser Patrocinador
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#convocatoria"
            className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-slate-600 hover:border-cyan-500/40 text-slate-300 hover:text-white font-semibold text-lg rounded-xl transition-all hover:bg-white/5"
          >
            Quiero participar con mi proyecto
          </a>
        </div>

        {/* Format pills */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {[
            { icon: <CalendarDays className="w-4 h-4" />, text: 'Viernes · Empresas e Instituciones' },
            { icon: <Users className="w-4 h-4" />, text: 'Sábado · Talento y Público General' },
            { icon: <MonitorPlay className="w-4 h-4" />, text: 'Transmisión en vivo' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-sm"
            >
              <span className="text-cyan-400">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-700">
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   02 · Impacto
───────────────────────────────────────────────────────────────── */

function ImpactoSection() {
  const stats = [
    { end: 2, suffix: ' días', label: 'de evento principal', color: 'cyan', dur: 800 },
    { end: 500, prefix: '+', label: 'asistentes esperados', color: 'cyan', dur: 2000 },
    { end: 20, prefix: '+', label: 'proyectos de IA seleccionados', color: 'amber', dur: 1200 },
    { end: 4, suffix: ' semanas', label: 'de mentorías intensivas previas', color: 'amber', dur: 1000 },
    { end: 2, label: 'audiencias diferenciadas', color: 'cyan', dur: 600 },
    { end: 7, label: 'categorías de reconocimiento', color: 'amber', dur: 900 },
  ];

  return (
    <section id="impacto" className="py-24 bg-[#050d1a] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/4 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.22em] uppercase">El escenario</span>
            <h2 className="font-display font-black text-white text-5xl sm:text-6xl lg:text-7xl mt-3">
              IMPACTO ESPERADO
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              Dos días que conectan talento, empresas, instituciones y comunidad alrededor de la inteligencia artificial en Santander.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="rounded-2xl p-6 md:p-8 bg-[#0a1628] border border-slate-700/60 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5">
                <div
                  className={`font-display font-black text-5xl md:text-6xl ${
                    s.color === 'cyan' ? 'text-gradient-cyan' : 'text-gradient-amber'
                  }`}
                >
                  <Counter end={s.end} prefix={s.prefix || ''} suffix={s.suffix || ''} duration={s.dur} />
                </div>
                <p className="text-slate-500 text-sm mt-2 leading-snug">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Day split */}
        <Reveal delay={200}>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl p-6 bg-[#0a1628] border border-cyan-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="font-display font-black text-xl text-white tracking-wide">VIERNES</span>
              </div>
              <p className="text-cyan-400 font-semibold text-sm mb-1.5">Abierto a todo público</p>
              <p className="text-slate-500 text-sm leading-relaxed">
                Evento abierto a toda la comunidad. Incluye{' '}
                <span className="text-cyan-300 font-medium">espacios exclusivos para empresas e instituciones</span>
                {' '}— paneles empresariales, rueda de conexión y networking con directivos, gremios y aliados estratégicos.
              </p>
            </div>
            <div className="rounded-2xl p-6 bg-[#0a1628] border border-amber-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Users className="w-5 h-5" />
                </div>
                <span className="font-display font-black text-xl text-white tracking-wide">SÁBADO</span>
              </div>
              <p className="text-amber-400 font-semibold text-sm mb-1.5">Abierto a todo público</p>
              <p className="text-slate-500 text-sm leading-relaxed">
                Evento abierto a toda la comunidad. Incluye{' '}
                <span className="text-amber-300 font-medium">espacios exclusivos para talento, proyectos y emprendedores</span>
                {' '}— muestra de proyectos finalistas, talleres prácticos, pitch ante jurados y premiación.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   03 · ¿Por qué POTENC<span className="text-cyan-400">IA</span>?
───────────────────────────────────────────────────────────────── */

function PorQueSection() {
  const reasons = [
    {
      icon: <Zap className="w-7 h-7" />,
      color: 'cyan',
      title: 'No solo hablamos de IA',
      desc: 'Convocamos talento real, fortalecemos proyectos durante 4 semanas y los conectamos con empresas e instituciones que necesitan esas soluciones.',
    },
    {
      icon: <Target className="w-7 h-7" />,
      color: 'amber',
      title: 'Proyectos preparados, no improvisados',
      desc: 'Cada equipo seleccionado pasa por diagnóstico, MVP, modelo de negocio y pitch antes del evento. Llegan listos para cerrar deals.',
    },
    {
      icon: <Network className="w-7 h-7" />,
      color: 'cyan',
      title: 'Conexión real entre sectores',
      desc: 'Rueda de conexión empresarial, pitch ante jurados y empresas, networking estructurado con patrocinadores y aliados clave.',
    },
    {
      icon: <Globe className="w-7 h-7" />,
      color: 'amber',
      title: 'Plataforma regional con impacto duradero',
      desc: 'Bucaramanga como capital de la innovación IA en Colombia. Postevento digital de 7 a 15 días con contenido, cápsulas e informe de impacto.',
    },
  ];

  return (
    <section id="por-que" className="py-24 bg-[#070f1e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-amber-400 text-xs font-bold tracking-[0.22em] uppercase">El diferencial</span>
            <h2 className="font-display font-black text-white text-5xl sm:text-6xl lg:text-7xl mt-3">
              ¿POR QUÉ POTENC<span className="text-cyan-400">IA</span> 2026?
            </h2>
          </div>
        </Reveal>

        {/* Quote block */}
        <Reveal>
          <div className="relative mb-14 rounded-2xl p-8 md:p-12 bg-[#0a1628] border border-cyan-500/20 overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-transparent" />
            <div className="absolute right-0 top-0 w-72 h-72 bg-cyan-500/4 rounded-full blur-3xl" />
            <p className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-white leading-tight relative z-10">
              "Mientras otros eventos solo llevan speakers, nosotros podemos decir:{' '}
              <span className="text-cyan-400">
                No solo hablamos de inteligencia artificial. Convocamos talento, fortalecemos proyectos y conectamos soluciones reales con empresas e instituciones que las necesitan."
              </span>
            </p>
            <p className="text-slate-600 text-sm mt-5">— Propuesta Estratégica POTENC<span className="text-cyan-400">IA</span> 2026</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reasons.map((r, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                className={`flex gap-5 rounded-2xl p-6 bg-[#0a1628] border transition-all duration-300 hover:-translate-y-0.5 ${
                  r.color === 'cyan'
                    ? 'border-cyan-500/15 hover:border-cyan-500/35'
                    : 'border-amber-500/15 hover:border-amber-500/35'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center border ${
                    r.color === 'cyan'
                      ? 'bg-cyan-500/12 text-cyan-400 border-cyan-500/20'
                      : 'bg-amber-500/12 text-amber-400 border-amber-500/20'
                  }`}
                >
                  {r.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">{r.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{r.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   04 · 5 Categorías
───────────────────────────────────────────────────────────────── */

const CAT_COLORS = {
  cyan:   { icon: 'bg-cyan-500/12 text-cyan-400 border-cyan-500/20',   card: 'border-cyan-500/15 hover:border-cyan-500/40',   dot: '#22d3ee', label: 'text-cyan-400' },
  blue:   { icon: 'bg-blue-500/12 text-blue-400 border-blue-500/20',   card: 'border-blue-500/15 hover:border-blue-500/40',   dot: '#60a5fa', label: 'text-blue-400' },
  amber:  { icon: 'bg-amber-500/12 text-amber-400 border-amber-500/20', card: 'border-amber-500/15 hover:border-amber-500/40', dot: '#fbbf24', label: 'text-amber-400' },
  violet: { icon: 'bg-violet-500/12 text-violet-400 border-violet-500/20', card: 'border-violet-500/15 hover:border-violet-500/40', dot: '#a78bfa', label: 'text-violet-400' },
  rose:   { icon: 'bg-rose-500/12 text-rose-400 border-rose-500/20',   card: 'border-rose-500/15 hover:border-rose-500/40',   dot: '#fb7185', label: 'text-rose-400' },
};

function CategoriasSection() {
  const cats = [
    {
      icon: <Briefcase className="w-8 h-8" />, color: 'cyan',
      name: 'IA para Empresas',
      items: ['Ventas y atención al cliente', 'Productividad y automatización', 'Análisis de datos e inventarios', 'Procesos internos'],
    },
    {
      icon: <Shield className="w-8 h-8" />, color: 'blue',
      name: 'IA para Seguridad',
      items: ['Videovigilancia inteligente', 'Control de accesos con IA', 'Alertas y monitoreo en tiempo real', 'Análisis de riesgos'],
    },
    {
      icon: <GraduationCap className="w-8 h-8" />, color: 'amber',
      name: 'IA para Educación',
      items: ['Tutores virtuales', 'Personalización del aprendizaje', 'Apoyo docente y evaluación', 'Reducción de deserción'],
    },
    {
      icon: <Landmark className="w-8 h-8" />, color: 'violet',
      name: 'IA para Sector Público',
      items: ['Trámites y servicios ciudadanos', 'Movilidad y salud pública', 'Seguridad ciudadana', 'Gestión documental'],
    },
    {
      icon: <Heart className="w-8 h-8" />, color: 'rose',
      name: 'IA para Impacto Social',
      items: ['Empleabilidad e inclusión', 'Medio ambiente', 'Acceso a información', 'Comunidades vulnerables'],
    },
  ];

  return (
    <section id="categorias" className="py-24 bg-[#050d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.22em] uppercase">Convocatoria de proyectos</span>
            <h2 className="font-display font-black text-white text-5xl sm:text-6xl lg:text-7xl mt-3">
              5 CATEGORÍAS
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              Proyectos que resuelven problemas reales del sector público y privado usando inteligencia artificial.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cats.map((cat, i) => {
            const c = CAT_COLORS[cat.color];
            return (
              <Reveal key={i} delay={i * 70}>
                <div
                  className={`rounded-2xl p-6 bg-[#0a1628] border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 h-full ${c.card}`}
                >
                  <div className={`w-14 h-14 rounded-xl border flex items-center justify-center mb-5 ${c.icon}`}>
                    {cat.icon}
                  </div>
                  <h3 className={`font-display font-bold text-xl mb-3 ${c.label}`}>{cat.name}</h3>
                  <ul className="space-y-2">
                    {cat.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-slate-500 text-sm">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: c.dot }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   05 · El Camino (Timeline)
───────────────────────────────────────────────────────────────── */

function CaminoSection() {
  const steps = [
    { weeks: 'Semana 1–2', title: 'Lanzamiento de la convocatoria', desc: 'Difusión en universidades, SENA, comunidades tech, Cámara de Comercio, redes y aliados.' },
    { weeks: 'Semana 3–4', title: 'Difusión y recepción de proyectos', desc: 'Charlas en universidades y espacios de innovación. Recolección de formularios.' },
    { weeks: 'Semana 5', title: 'Selección de finalistas', desc: 'Criterios: claridad del problema, uso real de IA, viabilidad, impacto y potencial comercial.' },
    { weeks: 'Semana 6', title: 'Diagnóstico de cada equipo', desc: 'Identificar fortalezas, debilidades y necesidades específicas de cada proyecto seleccionado.' },
    { weeks: 'Semanas 7–10', title: '4 Mentorías intensivas', desc: 'Problema & usuario → MVP y demo → Modelo de negocio → Pitch, storytelling y networking.' },
    { weeks: 'Semana 11', title: 'Ensayo general', desc: 'Práctica de presentaciones con ajustes finales antes del evento principal.' },
    { weeks: 'Semana 12', title: 'EL EVENTO', desc: 'Presentación ante empresas, jurados, aliados e instituciones. Premiación y cierre.', highlight: true },
  ];

  return (
    <section id="camino" className="py-24 bg-[#070f1e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-amber-400 text-xs font-bold tracking-[0.22em] uppercase">De la idea al escenario</span>
            <h2 className="font-display font-black text-white text-5xl sm:text-6xl lg:text-7xl mt-3">
              EL CAMINO
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              12 semanas de convocatoria, selección y preparación intensiva antes de llegar al evento.
            </p>
          </div>
        </Reveal>

        <div className="relative ml-6 md:ml-0">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-6 top-3 bottom-3 w-px bg-gradient-to-b from-cyan-500/40 via-amber-500/30 to-transparent" />

          <div className="space-y-5">
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="relative flex gap-6 md:gap-8 items-start pl-8 md:pl-16">
                  {/* Node */}
                  <div
                    className={`absolute left-0 md:left-6 top-5 -translate-x-1/2 z-10 ${
                      step.highlight
                        ? 'w-6 h-6 rounded-full bg-cyan-400 border-2 border-cyan-300 shadow-lg shadow-cyan-500/50'
                        : 'w-4 h-4 rounded-full bg-[#070f1e] border-2 border-cyan-500/50'
                    }`}
                  />

                  <div
                    className={`flex-1 rounded-xl p-5 border transition-all duration-300 ${
                      step.highlight
                        ? 'bg-gradient-to-br from-cyan-500/15 to-amber-500/8 border-cyan-500/35'
                        : 'bg-[#0a1628] border-slate-700/50 hover:border-slate-600/80'
                    }`}
                  >
                    <span
                      className={`text-xs font-bold tracking-widest uppercase ${
                        step.highlight ? 'text-cyan-300' : 'text-slate-600'
                      }`}
                    >
                      {step.weeks}
                    </span>
                    <h3
                      className={`font-display font-bold text-lg mt-0.5 ${
                        step.highlight ? 'text-cyan-300 text-xl' : 'text-white'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   06 · Estructura del Evento
───────────────────────────────────────────────────────────────── */

const DIA1 = [
  { time: '8:00 AM', activity: 'Registro, café de bienvenida y apertura de Zona de Experiencias' },
  { time: '9:00 AM', activity: 'Acto de apertura institucional' },
  { time: '9:30 AM', activity: 'Conferencia Central: La IA como motor de competitividad regional' },
  { time: '10:15 AM', activity: 'Panel 1: IA para empresas, productividad y toma de decisiones' },
  { time: '11:00 AM', activity: 'Recorrido por stands y demostraciones' },
  { time: '11:30 AM', activity: 'Panel 2: Seguridad con IA para empresas y vigilancia privada' },
  { time: '12:30 PM', activity: 'Almuerzo / Networking empresarial' },
  { time: '2:00 PM', activity: 'Taller: Cómo identificar procesos que pueden automatizarse con IA' },
  { time: '3:00 PM', activity: 'Panel 3: IA en educación, formación y futuro del trabajo' },
  { time: '4:30 PM', activity: 'RUEDA DE CONEXIÓN: Empresas + Proyectos IA', highlight: true },
  { time: '5:30 PM', activity: 'Presentación de soluciones IA para empresas y sector público', highlight: true },
  { time: '6:15 PM', activity: 'Networking con patrocinadores, aliados y equipos seleccionados', highlight: true },
];

const DIA2 = [
  { time: '8:30 AM', activity: 'Ingreso, registro y apertura de experiencias' },
  { time: '9:30 AM', activity: 'Bienvenida del Día de Talento' },
  { time: '10:00 AM', activity: 'Charla: IA para la vida cotidiana, el estudio y el trabajo' },
  { time: '11:00 AM', activity: 'MUESTRA DE PROYECTOS FINALISTAS', highlight: true },
  { time: '12:30 PM', activity: 'Almuerzo / Recorrido libre por stands' },
  { time: '2:00 PM', activity: 'Taller 1: Cómo usar IA para estudiar, trabajar o emprender' },
  { time: '3:00 PM', activity: 'Taller 2: Cómo crear una solución con IA sin ser experto en código' },
  { time: '4:30 PM', activity: 'PITCH DE TALENTOS ante jurados, empresas e instituciones', highlight: true },
  { time: '5:30 PM', activity: 'Conexión entre proyectos, empresas y entidades públicas', highlight: true },
  { time: '6:30 PM', activity: 'PREMIACIÓN Y CIERRE DE CONVOCATORIA', highlight: true },
];

function EstructuraSection() {
  const [active, setActive] = useState('dia1');
  const schedule = active === 'dia1' ? DIA1 : DIA2;

  return (
    <section id="estructura" className="py-24 bg-[#050d1a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.22em] uppercase">Agenda</span>
            <h2 className="font-display font-black text-white text-5xl sm:text-6xl mt-3">
              ESTRUCTURA DEL EVENTO
            </h2>
          </div>
        </Reveal>

        {/* Toggle */}
        <Reveal>
          <div className="flex rounded-xl overflow-hidden border border-slate-700 max-w-sm mx-auto mb-6">
            <button
              onClick={() => setActive('dia1')}
              className={`flex-1 py-3 font-display font-bold text-sm transition-all ${
                active === 'dia1' ? 'bg-cyan-500 text-slate-900' : 'bg-[#0a1628] text-slate-400 hover:text-white'
              }`}
            >
              DÍA 1 · Viernes
            </button>
            <button
              onClick={() => setActive('dia2')}
              className={`flex-1 py-3 font-display font-bold text-sm transition-all ${
                active === 'dia2' ? 'bg-amber-500 text-slate-900' : 'bg-[#0a1628] text-slate-400 hover:text-white'
              }`}
            >
              DÍA 2 · Sábado
            </button>
          </div>
        </Reveal>

        {/* Context note */}
        <Reveal>
          <div
            className={`rounded-xl p-4 mb-5 text-sm border ${
              active === 'dia1'
                ? 'bg-cyan-500/8 border-cyan-500/20 text-cyan-300'
                : 'bg-amber-500/8 border-amber-500/20 text-amber-300'
            }`}
          >
            {active === 'dia1'
              ? '🎯 Abierto a todo público · Horario 8:00 AM – 7:00 PM. Incluye espacios exclusivos para empresas: paneles, taller empresarial, rueda de conexión y networking con patrocinadores.'
              : '🚀 Abierto a todo público · Horario 8:30 AM – 7:30 PM. Incluye espacios exclusivos para talento: muestra de proyectos, talleres, pitch ante jurados y premiación.'}
          </div>
        </Reveal>

        {/* Schedule */}
        <div className="space-y-2">
          {schedule.map((item, i) => (
            <Reveal key={`${active}-${i}`} delay={i * 35}>
              <div
                className={`flex gap-4 p-4 rounded-xl border transition-colors ${
                  item.highlight
                    ? active === 'dia1'
                      ? 'bg-cyan-500/8 border-cyan-500/20'
                      : 'bg-amber-500/8 border-amber-500/20'
                    : 'bg-[#0a1628] border-slate-800'
                }`}
              >
                <span
                  className={`text-xs font-mono font-bold w-16 flex-shrink-0 mt-0.5 ${
                    item.highlight
                      ? active === 'dia1' ? 'text-cyan-400' : 'text-amber-400'
                      : 'text-slate-600'
                  }`}
                >
                  {item.time}
                </span>
                <span className={`text-sm ${item.highlight ? 'text-white font-semibold' : 'text-slate-400'}`}>
                  {item.activity}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p
            className={`mt-6 text-center text-sm ${
              active === 'dia1' ? 'text-cyan-500' : 'text-amber-500'
            }`}
          >
            {active === 'dia1'
              ? 'Objetivo: Que empresas e instituciones salgan con ideas claras de implementar soluciones de IA, ahorrar costos y conectar con talento. Abierto a todos.'
              : 'Objetivo: Plataforma para descubrir talento, visibilizar proyectos y conectar jóvenes con empresas. Abierto a todos.'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   07 · Zonas del Evento
───────────────────────────────────────────────────────────────── */

function ZonasSection() {
  const zones = [
    { icon: <Megaphone className="w-6 h-6" />, name: 'Auditorio Principal', desc: 'Conferencias, paneles y acto de apertura', color: 'cyan' },
    { icon: <Sparkles className="w-6 h-6" />, name: 'Zona de Experiencias IA', desc: 'Demostraciones en vivo de soluciones', color: 'blue' },
    { icon: <Briefcase className="w-6 h-6" />, name: 'Zona Empresarial', desc: 'Stands de marcas, empresas y patrocinadores', color: 'amber' },
    { icon: <Rocket className="w-6 h-6" />, name: 'Zona de Talento', desc: 'Proyectos seleccionados de la convocatoria', color: 'cyan' },
    { icon: <BookOpen className="w-6 h-6" />, name: 'Sala de Talleres', desc: 'Formación práctica y sesiones premium', color: 'violet' },
    { icon: <Network className="w-6 h-6" />, name: 'Zona de Networking', desc: 'Reuniones, rueda de negocios y conexiones', color: 'amber' },
    { icon: <Video className="w-6 h-6" />, name: 'Zona de Contenido', desc: 'Podcast, entrevistas y cápsulas digitales', color: 'rose' },
  ];

  const iconCls = {
    cyan:   'bg-cyan-500/12 text-cyan-400 border-cyan-500/20',
    blue:   'bg-blue-500/12 text-blue-400 border-blue-500/20',
    amber:  'bg-amber-500/12 text-amber-400 border-amber-500/20',
    violet: 'bg-violet-500/12 text-violet-400 border-violet-500/20',
    rose:   'bg-rose-500/12 text-rose-400 border-rose-500/20',
  };

  return (
    <section id="zonas" className="py-24 bg-[#070f1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.22em] uppercase">Distribución del espacio</span>
            <h2 className="font-display font-black text-white text-5xl sm:text-6xl lg:text-7xl mt-3">
              ZONAS DEL EVENTO
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {zones.map((z, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="rounded-xl p-5 bg-[#0a1628] border border-slate-700/50 hover:border-slate-600 hover:-translate-y-1 transition-all duration-300 h-full">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${iconCls[z.color]}`}>
                  {z.icon}
                </div>
                <h3 className="font-display font-bold text-white text-lg leading-tight">{z.name}</h3>
                <p className="text-slate-500 text-sm mt-1.5">{z.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   08 · Modelo de Patrocinio
───────────────────────────────────────────────────────────────── */

function PatrocinioSection() {
  const roles = [
    {
      icon: <Award className="w-7 h-7" />, color: 'amber',
      title: 'PATROCINADORES',
      sub: 'Aporte financiero',
      desc: 'Bancos, Govtech, empresas grandes, gremios, aseguradoras. Garantizan la sostenibilidad económica del evento.',
    },
    {
      icon: <Handshake className="w-7 h-7" />, color: 'cyan',
      title: 'ALIADOS ESTRATÉGICOS',
      sub: 'Aporte en especie',
      desc: 'Sede, conectividad, seguridad, audiovisual, café, impresos, mobiliario. Reducen los costos logísticos críticos.',
    },
    {
      icon: <Network className="w-7 h-7" />, color: 'violet',
      title: 'ECOSISTEMA',
      sub: 'Talento y contenido',
      desc: 'Universidades, SENA, comunidades tech, empresas de software. Aseguran calidad académica y participación.',
    },
  ];

  const pkgs = [
    {
      name: 'Aliado Sede Oficial',
      value: '$50M – $150M COP',
      tier: 'platinum',
      contribution: 'Auditorio, salones, laboratorios, equipos, personal de apoyo, parqueadero, difusión estudiantil.',
      benefits: ['Logo como Sede Oficial del evento', 'Participación en acto de apertura', 'Stand institucional propio', '20 cupos premium', 'Presencia en toda la comunicación', 'Posibilidad de panel académico', 'Reconocimiento en informe de impacto'],
    },
    {
      name: 'Aliado de Conectividad',
      value: '$15M – $40M COP',
      tier: 'gold',
      contribution: 'Internet dedicado, WiFi oficial, backup, routers, zona de conexión.',
      benefits: ['WiFi oficial con nombre de marca', 'Logo en landing page y piezas', 'Mención en tarima', 'Stand de activación', 'Base de interés autorizada (si aplica)'],
    },
    {
      name: 'Aliado de Seguridad Inteligente',
      value: '$15M – $50M COP',
      tier: 'gold',
      contribution: 'Personal de seguridad, control de acceso, monitoreo, cámaras, demo de tecnología IA.',
      benefits: ['Presencia en rama IA y Seguridad', 'Stand propio en feria', 'Participación en panel', 'Demo en vivo durante el evento', 'Contacto con conjuntos y sector público', 'Posibilidad de piloto post-evento'],
    },
    {
      name: 'Aliado Audiovisual',
      value: '$30M – $80M COP',
      tier: 'gold',
      contribution: 'Cámaras, streaming, switcher, grabación, clips, video resumen.',
      benefits: ['Crédito como Productora Oficial', 'Logo en transmisión en vivo', 'Mención en piezas post-evento', 'Derecho a usar caso en portafolio', 'Presencia en cierres de video'],
    },
    {
      name: 'Aliado de Experiencia',
      value: '$8M – $40M COP',
      tier: 'silver',
      contribution: 'Café, agua, snacks, coctel, almuerzos VIP, zona de hidratación.',
      benefits: ['Marca en zona de networking', 'Activación propia de marca', 'Logo en piezas del evento', 'Producto en mano de cada asistente', 'Presencia en la Noche del Ecosistema'],
    },
  ];

  const tierCls = {
    platinum: { badge: 'bg-gradient-to-r from-slate-300 to-white text-slate-900', border: 'border-slate-300/25', ring: 'hover:border-slate-300/50' },
    gold:     { badge: 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900', border: 'border-amber-500/25', ring: 'hover:border-amber-500/50' },
    silver:   { badge: 'bg-gradient-to-r from-slate-400 to-slate-300 text-slate-900', border: 'border-slate-500/20', ring: 'hover:border-slate-400/40' },
  };

  return (
    <section id="patrocinio" className="py-24 bg-[#050d1a] relative overflow-hidden">
      {/* bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-amber-500/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-amber-400 text-xs font-bold tracking-[0.22em] uppercase">Oportunidad de marca</span>
            <h2 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-3 leading-tight">
              TU MARCA, EN EL CENTRO DE<br className="hidden sm:block" />{' '}
              <span className="text-gradient-amber">LA REVOLUCIÓN IA DE SANTANDER</span>
            </h2>
            <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-lg">
              No estamos vendiendo un espacio publicitario. Estamos invitando a tu marca a construir un ecosistema regional de IA que convoca talento, empresas e instituciones.
            </p>
          </div>
        </Reveal>

        {/* 3 Roles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {roles.map((r, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                className={`rounded-2xl p-6 bg-[#0a1628] border h-full ${
                  r.color === 'amber' ? 'border-amber-500/20' : r.color === 'cyan' ? 'border-cyan-500/20' : 'border-violet-500/20'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                    r.color === 'amber' ? 'bg-amber-500/12 text-amber-400' : r.color === 'cyan' ? 'bg-cyan-500/12 text-cyan-400' : 'bg-violet-500/12 text-violet-400'
                  }`}
                >
                  {r.icon}
                </div>
                <p
                  className={`text-xs font-bold tracking-widest uppercase mb-1 ${
                    r.color === 'amber' ? 'text-amber-400' : r.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'
                  }`}
                >
                  {r.sub}
                </p>
                <h3 className="font-display font-black text-white text-2xl mb-3">{r.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="font-display font-black text-white text-3xl sm:text-4xl text-center mb-8">
            PAQUETES DE PATROCINIO EN ESPECIE
          </h3>
        </Reveal>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pkgs.map((pkg, i) => {
            const t = tierCls[pkg.tier];
            return (
              <Reveal key={i} delay={i * 70}>
                <div
                  className={`rounded-2xl bg-[#0a1628] border p-6 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 ${t.border} ${t.ring}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <h4 className="font-display font-black text-white text-xl leading-tight">{pkg.name}</h4>
                    <span className={`flex-shrink-0 text-[11px] font-black px-2.5 py-1 rounded-full uppercase ${t.badge}`}>
                      {pkg.tier}
                    </span>
                  </div>

                  <div className="font-display font-black text-2xl text-gradient-amber mb-4">{pkg.value}</div>

                  <div className="rounded-lg p-3 mb-4 bg-white/4 border border-white/8">
                    <p className="text-xs text-slate-600 uppercase tracking-wider font-bold mb-1">Aporta</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{pkg.contribution}</p>
                  </div>

                  <div className="flex-1">
                    <p className="text-xs text-slate-600 uppercase tracking-wider font-bold mb-2">Recibe</p>
                    <ul className="space-y-1.5">
                      {pkg.benefits.map((b, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#contacto"
                    className="mt-5 block text-center py-2.5 rounded-lg border border-cyan-500/25 text-cyan-400 text-sm font-semibold hover:bg-cyan-500/8 hover:border-cyan-500/50 transition-all"
                  >
                    Quiero ser aliado →
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   09 · ¿Quién puede participar? (Convocatoria)
───────────────────────────────────────────────────────────────── */

function ConvocatoriaSection() {
  const profiles = [
    { icon: <GraduationCap className="w-5 h-5" />, title: 'Estudiantes universitarios', desc: 'Ideas, proyectos académicos o prototipos' },
    { icon: <Rocket className="w-5 h-5" />, title: 'Emprendedores', desc: 'Soluciones con potencial de negocio' },
    { icon: <Cpu className="w-5 h-5" />, title: 'Startups', desc: 'Productos o MVP en desarrollo' },
    { icon: <BookOpen className="w-5 h-5" />, title: 'Docentes e Investigadores', desc: 'Proyectos educativos o de investigación aplicada' },
    { icon: <Users className="w-5 h-5" />, title: 'Equipos Multidisciplinarios', desc: 'Soluciones técnicas, sociales y comerciales' },
    { icon: <Briefcase className="w-5 h-5" />, title: 'Empresas o áreas de innovación', desc: 'Casos internos con potencial de escalamiento' },
  ];

  const benefits = [
    '4 mentorías intensivas: Problema → MVP → Negocio → Pitch',
    'Espacio propio en la Zona de Talento IA',
    'Pitch en tarima ante empresas, jurados y aliados',
    'Muestra de MVP y demostraciones prácticas',
    'Conexión con inversionistas y clientes potenciales',
    'Reconocimiento en 7 categorías de premios',
  ];

  return (
    <section id="convocatoria" className="py-24 bg-[#070f1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.22em] uppercase">Convocatoria abierta</span>
            <h2 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl mt-3">
              ¿TIENES UN PROYECTO CON IA?
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
              No buscamos proyectos terminados. Buscamos ideas con potencial. Los mejores equipos reciben acompañamiento intensivo durante 4 semanas antes del evento.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Profiles */}
          <Reveal>
            <div>
              <h3 className="font-display font-bold text-white text-2xl mb-6">¿Quiénes pueden participar?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profiles.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[#0a1628] border border-slate-700/50 hover:border-cyan-500/25 transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/12 text-cyan-400 border border-cyan-500/15 flex items-center justify-center flex-shrink-0">
                      {p.icon}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{p.title}</p>
                      <p className="text-slate-600 text-xs mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Benefits + CTA */}
          <Reveal delay={100}>
            <div className="rounded-2xl bg-gradient-to-br from-[#0a1628] to-[#0f1e38] border border-cyan-500/20 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-white text-2xl">Qué reciben los seleccionados</h3>
              </div>
              <ul className="space-y-3 mb-8">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                className="group flex items-center justify-center gap-2 w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:-translate-y-0.5"
              >
                Inscribe tu proyecto
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   10 · Premios y Reconocimientos
───────────────────────────────────────────────────────────────── */

function PremiosSection() {
  const awards = [
    { icon: <Briefcase className="w-6 h-6" />, title: 'Mejor Solución IA para Empresas', desc: 'Mayor potencial de implementación privada', special: false },
    { icon: <Building2 className="w-6 h-6" />, title: 'Mejor Solución IA para Sector Público', desc: 'Mayor impacto en gestión pública o ciudad', special: false },
    { icon: <GraduationCap className="w-6 h-6" />, title: 'Mejor Solución IA para Educación', desc: 'Mayor aporte formativo', special: false },
    { icon: <Shield className="w-6 h-6" />, title: 'Mejor Solución IA para Seguridad', desc: 'Mayor impacto en protección, monitoreo o prevención', special: false },
    { icon: <Cpu className="w-6 h-6" />, title: 'Mejor MVP', desc: 'Mejor prototipo funcional demostrado en vivo', special: false },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Mayor Potencial Comercial', desc: 'Solución con mayor posibilidad de venta o escalamiento', special: false },
    { icon: <Users className="w-6 h-6" />, title: 'Premio del Público', desc: 'Proyecto más votado por los asistentes del evento', special: true },
  ];

  return (
    <section id="premios" className="py-24 bg-[#050d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-amber-400 text-xs font-bold tracking-[0.22em] uppercase">Reconocimiento</span>
            <h2 className="font-display font-black text-white text-5xl sm:text-6xl lg:text-7xl mt-3">
              PREMIOS
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              7 categorías de reconocimiento para los proyectos más destacados de la convocatoria.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {awards.map((a, i) => (
            <Reveal key={i} delay={i * 55}>
              <div
                className={`rounded-2xl p-6 h-full border transition-all duration-300 hover:-translate-y-1 ${
                  a.special
                    ? 'bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/30 hover:border-amber-500/50'
                    : 'bg-[#0a1628] border-slate-700/50 hover:border-slate-600'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${
                    a.special
                      ? 'bg-amber-500/15 text-amber-400 border-amber-500/25'
                      : 'bg-cyan-500/12 text-cyan-400 border-cyan-500/18'
                  }`}
                >
                  {a.icon}
                </div>
                <span className={`text-xs font-bold tracking-widest uppercase ${a.special ? 'text-amber-400' : 'text-slate-600'}`}>
                  #{i + 1}
                </span>
                <h3 className="font-display font-bold text-white text-lg leading-tight mt-1 mb-2">{a.title}</h3>
                <p className="text-slate-500 text-sm">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   11 · Contacto / CTA Final
───────────────────────────────────────────────────────────────── */

function ContactoSection() {
  const [form, setForm] = useState({ nombre: '', empresa: '', email: '', tipo: 'patrocinador', mensaje: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contacto" className="py-24 bg-[#070f1e] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-500/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.22em] uppercase">Haz parte</span>
            <h2 className="font-display font-black text-white text-5xl sm:text-6xl lg:text-7xl mt-3">
              ¿LISTO PARA UNIRTE?
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: CTA cards + organizers */}
          <Reveal>
            <div className="space-y-5">
              {/* Sponsor CTA */}
              <div className="rounded-2xl p-6 bg-gradient-to-br from-amber-500/8 to-amber-500/3 border border-amber-500/20">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-white text-2xl mb-2">¿Quieres ser patrocinador o aliado?</h3>
                <p className="text-slate-500 text-sm mb-5 leading-relaxed">
                  Hay categorías disponibles en sede, conectividad, seguridad, audiovisual, experiencia y más. Construye tu posición en el ecosistema IA de Santander.
                </p>
                <a
                  href="mailto:contacto@potenciaia.co"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-all text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Contactar como Patrocinador
                </a>
              </div>

              {/* Project CTA */}
              <div className="rounded-2xl p-6 bg-gradient-to-br from-cyan-500/8 to-cyan-500/3 border border-cyan-500/20">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-white text-2xl mb-2">¿Tienes un proyecto con IA?</h3>
                <p className="text-slate-500 text-sm mb-5 leading-relaxed">
                  Inscribe tu proyecto en la convocatoria. Si tiene potencial lo seleccionamos y te acompañamos con mentorías hasta el evento.
                </p>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-all text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Inscribir mi Proyecto
                </a>
              </div>

              {/* Organizers */}
              <div className="rounded-2xl p-6 bg-[#0a1628] border border-slate-700/50">
                <p className="text-slate-600 text-xs uppercase tracking-wider font-bold mb-6">Organizado por</p>
                <div className="flex flex-wrap items-center gap-8">
                  <img src="/assets/images/logo-clap.png" alt="CLAP" className="h-10 md:h-12 w-auto" />
                  <div className="text-slate-700 text-2xl font-light">×</div>
                  <img src="/assets/images/logo-bigdatia.png" alt="BIGDATIA" className="h-10 md:h-12 w-auto" />
                  <div className="w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-slate-800 pt-6 sm:pt-0 sm:pl-6">
                    <p className="text-slate-300 text-sm font-semibold text-left">Bucaramanga, Santander</p>
                    <p className="text-slate-600 text-xs mt-0.5 text-left">Colombia · 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Contact form */}
          <Reveal delay={100}>
            <div className="rounded-2xl bg-[#0a1628] border border-slate-700/50 p-8">
              {sent ? (
                <div className="text-center py-14">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/15 text-cyan-400 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-white text-2xl mb-2">¡Mensaje enviado!</h3>
                  <p className="text-slate-500">El equipo de POTENC<span className="text-cyan-400">IA</span> se pondrá en contacto contigo muy pronto.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-cyan-400 text-sm hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-display font-bold text-white text-2xl mb-6">Envíanos un mensaje</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-500 text-xs uppercase tracking-wider font-bold mb-1.5">Nombre *</label>
                        <input
                          type="text"
                          required
                          value={form.nombre}
                          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                          className="w-full bg-[#050d1a] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-cyan-500/50 transition-colors"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 text-xs uppercase tracking-wider font-bold mb-1.5">Empresa / Organización</label>
                        <input
                          type="text"
                          value={form.empresa}
                          onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                          className="w-full bg-[#050d1a] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-cyan-500/50 transition-colors"
                          placeholder="Tu empresa"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-500 text-xs uppercase tracking-wider font-bold mb-1.5">Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#050d1a] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        placeholder="tu@correo.com"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-xs uppercase tracking-wider font-bold mb-1.5">Soy...</label>
                      <select
                        value={form.tipo}
                        onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                        className="w-full bg-[#050d1a] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                      >
                        <option value="patrocinador">Interesado en ser Patrocinador / Aliado</option>
                        <option value="proyecto">Tengo un proyecto con IA</option>
                        <option value="asistente">Quiero asistir al evento</option>
                        <option value="media">Medio de comunicación</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-500 text-xs uppercase tracking-wider font-bold mb-1.5">Mensaje</label>
                      <textarea
                        rows={4}
                        value={form.mensaje}
                        onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                        className="w-full bg-[#050d1a] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                        placeholder="Cuéntanos sobre tu interés en POTENCIA 2026..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg shadow-cyan-500/15 hover:shadow-cyan-500/30 hover:-translate-y-0.5"
                    >
                      Enviar mensaje
                    </button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Footer
───────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-[#050d1a] border-t border-slate-800/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="font-display font-black text-xl text-white">
              POTENC<span className="text-cyan-400">IA</span>
              <span className="text-slate-700 font-normal text-sm ml-2">2026</span>
            </span>
          </div>

          <div className="flex items-center gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <img src="/assets/images/logo-clap.png" alt="CLAP" className="h-6 w-auto" />
            <div className="w-px h-4 bg-slate-800" />
            <img src="/assets/images/logo-bigdatia.png" alt="BIGDATIA" className="h-6 w-auto" />
          </div>

          <div className="text-right flex flex-col items-center md:items-end">
            <p className="text-slate-700 text-sm">
              Feria de Inteligencia Artificial, Empresa y Talento
            </p>
            <p className="text-slate-800 text-[10px] uppercase tracking-widest mt-1">
              Bucaramanga · Santander · Colombia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Scroll To Top Button
───────────────────────────────────────────────────────────────── */

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-[#0a1628]/80 backdrop-blur-xl border border-cyan-500/30 text-cyan-400 shadow-2xl shadow-cyan-500/10 hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300 group ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90 pointer-events-none'
      }`}
      aria-label="Volver al inicio"
    >
      <ChevronDown className="w-6 h-6 rotate-180 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   App
───────────────────────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <Nav />
      <Hero />
      <ImpactoSection />
      <PorQueSection />
      <CategoriasSection />
      <CaminoSection />
      <EstructuraSection />
      <ZonasSection />
      <PatrocinioSection />
      <ConvocatoriaSection />
      <PremiosSection />
      <ContactoSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
