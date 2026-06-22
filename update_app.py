import codecs
import re

with codecs.open('App_old.jsx', 'r', 'utf-8') as f:
    code = f.read()

# Nav
code = code.replace("  { href: '#impacto', label: 'Impacto' },\n  { href: '#categorias', label: 'Categorías' },\n  { href: '#estructura', label: 'Agenda' },\n  { href: '#patrocinio', label: 'Patrocinio' },\n  { href: '#convocatoria', label: 'Convocatoria' },\n  { href: '#contacto', label: 'Contacto' },", 
"""  { href: '#impacto', label: 'Impacto' },
  { href: '#por-que', label: 'Experiencias' },
  { href: '#categorias', label: 'Ejes' },
  { href: '#estructura', label: 'Agenda' },
  { href: '#zonas', label: 'Feria' },
  { href: '#convocatoria', label: 'Convocatoria' },
  { href: '#contacto', label: 'Inscripción' },""")

code = code.replace("Ser Aliado", "Ser aliado")
code = code.replace("Quiero ser Aliado", "Ser aliado")

# Hero
code = code.replace("Bucaramanga, Santander · Colombia · 2026", "29 y 30 de oct · Universidad Autónoma de Bucaramanga")
code = code.replace("Feria de Inteligencia Artificial, Empresa y Talento", "Tecnología, ingeniería y talento para transformar la región")

org_block = """        <div className="flex items-center justify-center gap-6 mt-4 mb-12">
          <p className="text-sm text-slate-600 uppercase tracking-widest font-medium">
            Organizado por
          </p>
          <div className="flex items-center gap-8">
            <img src="/assets/images/logo-clap.png" alt="CLAP Logo" className="h-8 md:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" />
            <div className="w-px h-6 bg-slate-800" />
            <img src="/assets/images/logo-bigdatia.png" alt="BIGDATIA Logo" className="h-8 md:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>"""
code = code.replace(org_block, """        <p className="text-lg text-slate-500 max-w-3xl mx-auto mt-4 mb-10 leading-relaxed">
          Dos días para aprender, experimentar y conectar con quienes están impulsando la innovación tecnológica en Santander. En el marco de la Semana de la Ingeniería de la UNAB.
        </p>""")

code = code.replace("Quiero ser Patrocinador", "Inscríbete al evento")
code = code.replace('href="#patrocinio"\n            className="group inline-flex', 'href="#contacto"\n            className="group inline-flex')
code = code.replace("Quiero participar con mi proyecto", "Conoce la agenda")
code = code.replace('href="#convocatoria"\n            className="inline-flex items-center', 'href="#estructura"\n            className="inline-flex items-center')

chips_old = """          {[
            { icon: <CalendarDays className="w-4 h-4" />, text: 'Viernes · Empresas e Instituciones' },
            { icon: <Users className="w-4 h-4" />, text: 'Sábado · Talento y Público General' },
            { icon: <MonitorPlay className="w-4 h-4" />, text: 'Transmisión en vivo' },
          ].map((item, i) => ("""

chips_new = """          {[
            { icon: <Megaphone className="w-4 h-4" />, text: 'Conferencias' },
            { icon: <MessageCircle className="w-4 h-4" />, text: 'Paneles' },
            { icon: <Briefcase className="w-4 h-4" />, text: 'Talleres' },
            { icon: <Sparkles className="w-4 h-4" />, text: 'Feria' },
            { icon: <Network className="w-4 h-4" />, text: 'Negocios' },
            { icon: <Rocket className="w-4 h-4" />, text: 'Talento' },
          ].map((item, i) => ("""
code = code.replace(chips_old, chips_new)

# Impacto
code = code.replace("El escenario", "PotencIA en cifras")
code = code.replace("IMPACTO ESPERADO", "UNA PROGRAMACIÓN HECHA PARA CONECTAR")
code = code.replace("Dos días que conectan talento, empresas, instituciones y comunidad alrededor de la inteligencia artificial en Santander.", "El evento combina conocimiento, experimentación y oportunidades de relacionamiento en una agenda de dos días.")

stats_old = """  const stats = [
    { end: 2, suffix: ' días', label: 'de evento principal', color: 'cyan', dur: 800 },
    { end: 500, prefix: '+', label: 'asistentes esperados', color: 'cyan', dur: 2000 },
    { end: 20, prefix: '+', label: 'proyectos de IA seleccionados', color: 'amber', dur: 1200 },
    { end: 4, suffix: ' semanas', label: 'de mentorías intensivas previas', color: 'amber', dur: 1000 },
    { end: 2, label: 'audiencias diferenciadas', color: 'cyan', dur: 600 },
    { end: 7, label: 'categorías de reconocimiento', color: 'amber', dur: 900 },
  ];"""

stats_new = """  const stats = [
    { end: 2, label: 'días de programación', color: 'cyan', dur: 800 },
    { end: 5, label: 'bloques de talleres', color: 'cyan', dur: 1500 },
    { end: 3, label: 'paneles temáticos', color: 'amber', dur: 1000 },
    { end: 2, label: 'conferencias magistrales', color: 'cyan', dur: 800 },
    { end: 1, label: 'rueda de negocios', color: 'amber', dur: 500 },
  ];"""
code = code.replace(stats_old, stats_new)

code = code.replace("""{/* Day split */}""", "{/* Day split */}\n{/*")
code = code.replace("""</section>\n  );\n}\n\n/* ─────────────────────────────────────────────────────────────────\n   03 · ¿Por qué POTENC<span className="text-cyan-400">IA</span>?\n───────────────────────────────────────────────────────────────── */""", "*/\n    </section>\n  );\n}\n\n/* ─────────────────────────────────────────────────────────────────\n   03 · Experiencias\n───────────────────────────────────────────────────────────────── */")

# Experiencias (PorQueSection)
reasons_old = """  const reasons = [
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
  ];"""

reasons_new = """  const reasons = [
    { icon: <Megaphone className="w-7 h-7" />, color: 'cyan', title: 'Conferencias magistrales', desc: 'Perspectivas sobre competitividad regional, convergencia tecnológica y futuro de la ingeniería.' },
    { icon: <MessageCircle className="w-7 h-7" />, color: 'amber', title: 'Paneles y conversatorios', desc: 'Diálogos entre academia, empresas, instituciones y especialistas sobre retos de la región.' },
    { icon: <Briefcase className="w-7 h-7" />, color: 'cyan', title: 'Talleres prácticos', desc: 'Sesiones simultáneas para explorar herramientas, metodologías y aplicaciones tecnológicas.' },
    { icon: <Sparkles className="w-7 h-7" />, color: 'amber', title: 'Feria de Experiencias', desc: 'Demostraciones de productos, servicios, prototipos y desarrollos de empresas y grupos académicos.' },
    { icon: <Handshake className="w-7 h-7" />, color: 'cyan', title: 'Networking y negocios', desc: 'Conexiones entre talento, empresas, emprendimientos, investigadores e instituciones.' },
    { icon: <Rocket className="w-7 h-7" />, color: 'amber', title: 'Final de innovación', desc: 'Presentación y premiación de los proyectos seleccionados en la convocatoria PotencIA 2026.' },
  ];"""
code = code.replace(reasons_old, reasons_new)

code = code.replace("El diferencial", "Un evento, múltiples experiencias")
code = code.replace("¿POR QUÉ POTENC<span className=\"text-cyan-400\">IA</span> 2026?", "CONOCIMIENTO QUE SE CONVIERTE EN ACCIÓN")

quote_old = """        {/* Quote block */}
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
        </Reveal>"""
quote_new = """        <Reveal>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto text-center mb-14">
            PotencIA Santander integra espacios para descubrir tendencias, aprender haciendo, conocer soluciones y crear nuevas oportunidades.
          </p>
        </Reveal>"""
code = code.replace(quote_old, quote_new)
code = code.replace("grid-cols-1 md:grid-cols-2 gap-5", "grid-cols-1 md:grid-cols-3 gap-5")

# Ejes Temáticos
cats_old = """  const cats = [
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
  ];"""

cats_new = """  const cats = [
    { icon: <Heart className="w-8 h-8" />, color: 'cyan', name: 'Biotecnología', items: ['Salud y bioinnovación', 'Tecnologías asistivas y dispositivos', 'Diagnóstico y alimentos', 'Soluciones centradas en la vida'] },
    { icon: <Brain className="w-8 h-8" />, color: 'blue', name: 'Inteligencia Artificial', items: ['Datos y automatización', 'Sistemas inteligentes', 'Analítica y ciberseguridad', 'Aplicaciones responsables'] },
    { icon: <Zap className="w-8 h-8" />, color: 'amber', name: 'Energía y Sostenibilidad', items: ['Transición energética', 'Eficiencia y renovables', 'Tecnología ambiental', 'Territorio y resiliencia'] },
    { icon: <TrendingUp className="w-8 h-8" />, color: 'violet', name: 'Gestión Empresarial e Innovación', items: ['Productividad y finanzas', 'Transformación digital', 'Procesos y emprendimiento', 'Nuevos modelos de negocio'] },
  ];"""
code = code.replace(cats_old, cats_new)

code = code.replace("Convocatoria de proyectos", "Ejes temáticos")
code = code.replace("5 CATEGORÍAS", "CUATRO CAMINOS PARA PENSAR EL FUTURO")
code = code.replace("Proyectos que resuelven problemas reales del sector público y privado usando inteligencia artificial.", "Los contenidos se organizan en cuatro ejes transversales que permiten integrar distintas disciplinas, sectores y aplicaciones.")

# Agenda
agenda_code = """function EstructuraSection() {
  const [active, setActive] = useState('dia1');
  const schedule = active === 'dia1' ? [
    { time: '8:00 AM', activity: 'Registro, café de bienvenida y apertura de la Feria de Experiencias' },
    { time: '9:00 AM', activity: 'Apertura institucional de PotencIA Santander 2026' },
    { time: '9:15 AM', activity: 'Conferencia: De la innovación tecnológica a la competitividad regional' },
    { time: '10:00 AM', activity: 'Talleres simultáneos (Ruta A: IA y datos, Ruta B: Biotecnología)' },
    { time: '11:15 AM', activity: 'Panel: Biotecnología para el bienestar y el desarrollo sostenible' },
    { time: '12:15 PM', activity: 'Almuerzo y networking empresarial' },
    { time: '2:15 PM', activity: 'Talleres simultáneos (Ruta A: Automatización, Ruta B: Innovación tecnológica)' },
    { time: '3:15 PM', activity: 'Panel: Empresas que innovan: productividad y transformación digital' },
    { time: '4:15 PM', activity: 'Talleres simultáneos (Ruta A: Energía, Ruta B: Finanzas y datos)' },
    { time: '5:30 PM', activity: 'Panel: Energía, sostenibilidad y territorio' },
  ] : [
    { time: '8:00 AM', activity: 'Registro, café de bienvenida y apertura de la Feria de Experiencias' },
    { time: '9:00 AM', activity: 'Bienvenida: Innovación, talento y oportunidades' },
    { time: '9:15 AM', activity: 'Talleres simultáneos (Ruta A: De necesidad a solución, Ruta B: IA responsable)' },
    { time: '10:15 AM', activity: 'Conferencia: El futuro de la ingeniería' },
    { time: '11:15 AM', activity: 'Finalistas: Soluciones con potencial para transformar la región' },
    { time: '12:30 PM', activity: 'Almuerzo y conexiones del ecosistema PotencIA' },
    { time: '2:30 PM', activity: 'Rueda de negocios: Conexiones para implementar, escalar y colaborar' },
    { time: '4:00 PM', activity: 'Talleres simultáneos (Ruta A: Comunicar solución, Ruta B: Prototipo a implementación)' },
    { time: '5:15 PM', activity: 'Premiación: Reconocimiento al talento y la innovación tecnológica' },
    { time: '6:15 PM', activity: 'Cierre: Compromisos y próximos pasos' },
  ];

  return (
    <section id="estructura" className="py-24 bg-[#050d1a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-cyan-400 text-xs font-bold tracking-[0.22em] uppercase">Agenda Preliminar</span>
            <h2 className="font-display font-black text-white text-4xl sm:text-5xl mt-3">
              DOS DÍAS PARA APRENDER, EXPERIMENTAR Y CONECTAR
            </h2>
            <p className="text-slate-400 mt-4">La programación integra los tiempos de transición dentro de cada bloque para presentar una agenda más clara y compacta.</p>
          </div>
        </Reveal>

        {/* Toggle */}
        <Reveal>
          <div className="flex rounded-xl overflow-hidden border border-slate-700 max-w-sm mx-auto mb-10">
            <button
              onClick={() => setActive('dia1')}
              className={`flex-1 py-3 font-display font-bold text-sm transition-all ${
                active === 'dia1' ? 'bg-cyan-500 text-slate-900' : 'bg-[#0a1628] text-slate-400 hover:text-white'
              }`}
            >
              DÍA 1 · Jueves 29
            </button>
            <button
              onClick={() => setActive('dia2')}
              className={`flex-1 py-3 font-display font-bold text-sm transition-all ${
                active === 'dia2' ? 'bg-amber-500 text-slate-900' : 'bg-[#0a1628] text-slate-400 hover:text-white'
              }`}
            >
              DÍA 2 · Viernes 30
            </button>
          </div>
        </Reveal>

        {/* Schedule */}
        <div className="space-y-3">
          {schedule.map((item, i) => (
            <Reveal key={`${active}-${i}`} delay={i * 35}>
              <div className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl bg-[#0a1628] border border-slate-800 hover:border-slate-600 transition-colors">
                <span className={`text-sm font-mono font-bold sm:w-28 flex-shrink-0 mt-0.5 ${active === 'dia1' ? 'text-cyan-400' : 'text-amber-400'}`}>
                  {item.time}
                </span>
                <span className="text-[15px] text-white font-medium">
                  {item.activity}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}"""

code = re.sub(r'const DIA1 = \[.*?(?=/\* ─+)', agenda_code + "\n\n", code, flags=re.DOTALL)
code = code.replace("      <CaminoSection />", "{/* <CaminoSection /> */}")

# Zonas -> Feria
code = code.replace("Zonas del Evento", "Feria de Experiencias Tecnológicas")
code = code.replace("ZONAS DEL EVENTO", "TECNOLOGÍA QUE SE PUEDE VER Y VIVIR")
code = code.replace("Distribución del espacio", "Feria de Experiencias Tecnológicas")
zones_old = """  const zones = [
    { icon: <Megaphone className="w-6 h-6" />, name: 'Auditorio Principal', desc: 'Conferencias, paneles y acto de apertura', color: 'cyan' },
    { icon: <Sparkles className="w-6 h-6" />, name: 'Zona de Experiencias IA', desc: 'Demostraciones en vivo de soluciones', color: 'blue' },
    { icon: <Briefcase className="w-6 h-6" />, name: 'Zona Empresarial', desc: 'Stands de marcas, empresas y patrocinadores', color: 'amber' },
    { icon: <Rocket className="w-6 h-6" />, name: 'Zona de Talento', desc: 'Proyectos seleccionados de la convocatoria', color: 'cyan' },
    { icon: <BookOpen className="w-6 h-6" />, name: 'Sala de Talleres', desc: 'Formación práctica y sesiones premium', color: 'violet' },
    { icon: <Network className="w-6 h-6" />, name: 'Zona de Networking', desc: 'Reuniones, rueda de negocios y conexiones', color: 'amber' },
    { icon: <Video className="w-6 h-6" />, name: 'Zona de Contenido', desc: 'Podcast, entrevistas y cápsulas digitales', color: 'rose' },
  ];"""
zones_new = """  const zones = [
    { icon: <Sparkles className="w-6 h-6" />, name: 'Demostraciones', desc: 'Experiencias en vivo, pruebas de concepto, prototipos y aplicaciones tecnológicas.', color: 'cyan' },
    { icon: <Building2 className="w-6 h-6" />, name: 'Soluciones empresariales', desc: 'Productos y servicios orientados a productividad, transformación digital e innovación.', color: 'amber' },
    { icon: <GraduationCap className="w-6 h-6" />, name: 'Desarrollos académicos', desc: 'Investigación aplicada, semilleros, laboratorios, proyectos y capacidades universitarias.', color: 'blue' },
    { icon: <Rocket className="w-6 h-6" />, name: 'Emprendimientos', desc: 'Soluciones emergentes con potencial de crecimiento, implementación y articulación.', color: 'violet' },
    { icon: <Globe className="w-6 h-6" />, name: 'Innovación sostenible', desc: 'Tecnologías para energía, ambiente, eficiencia y desarrollo territorial.', color: 'rose' },
    { icon: <MonitorPlay className="w-6 h-6" />, name: 'Experiencias interactivas', desc: 'Activaciones, simulaciones y demostraciones diseñadas para el público general.', color: 'cyan' },
  ];"""
code = code.replace(zones_old, zones_new)
code = code.replace("grid-cols-1 sm:grid-cols-2 lg:grid-cols-4", "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")

# Patrocinio -> Aliados
code = code.replace("Modelo de Patrocinio", "Aliados")
code = code.replace("Oportunidad de marca", "Aliados")
code = code.replace("TU MARCA, EN EL CENTRO DE<br className=\"hidden sm:block\" />{' '}\n              <span className=\"text-gradient-amber\">LA REVOLUCIÓN IA DE SANTANDER</span>", "CONSTRUYAMOS JUNTOS<br className=\"hidden sm:block\" />{' '}\n              <span className=\"text-gradient-amber\">EL ECOSISTEMA TECNOLÓGICO</span>")
code = code.replace("No estamos vendiendo un espacio publicitario. Estamos invitando a tu marca a construir un ecosistema regional de IA que convoca talento, empresas e instituciones.", "Las organizaciones aliadas pueden participar mediante contenidos, talleres, experiencias, demostraciones, conexión empresarial o apoyo institucional.")

roles_old = """  const roles = [
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
  ];"""
roles_new = """  const roles = [
    {
      icon: <BookOpen className="w-7 h-7" />, color: 'amber',
      title: 'Aliado de contenidos',
      sub: 'Conocimiento',
      desc: 'Conferencias, paneles, talleres y conocimiento especializado.',
    },
    {
      icon: <Sparkles className="w-7 h-7" />, color: 'cyan',
      title: 'Aliado de experiencias',
      sub: 'Demostración',
      desc: 'Demostraciones, activaciones, productos y experiencias tecnológicas.',
    },
    {
      icon: <Network className="w-7 h-7" />, color: 'violet',
      title: 'Aliado del ecosistema',
      sub: 'Conexiones',
      desc: 'Relacionamiento, convocatoria, rueda de negocios y articulación regional.',
    },
  ];"""
code = code.replace(roles_old, roles_new)
code = code.replace("PAQUETES DE PATROCINIO EN ESPECIE", "¿PARA QUIÉN ES EL EVENTO?")

pkgs_old = """  const pkgs = [
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
  ];"""

pkgs_new = """  const pkgs = [
    { name: 'Estudiantes y egresados', tier: 'platinum', value: 'Aprendizaje', contribution: 'Aprende, participa en talleres y conecta con organizaciones y oportunidades.', benefits: ['Asistencia a conferencias', 'Talleres prácticos', 'Conexiones con empresas'] },
    { name: 'Profesionales e investigadores', tier: 'gold', value: 'Conocimiento', contribution: 'Actualiza conocimientos y conversa con especialistas de diferentes disciplinas.', benefits: ['Paneles especializados', 'Networking de alto nivel', 'Tendencias tecnológicas'] },
    { name: 'Empresas e instituciones', tier: 'platinum', value: 'Negocios', contribution: 'Conoce soluciones, identifica talento y participa en espacios de relacionamiento.', benefits: ['Identificación de talento', 'Rueda de negocios', 'Actualización empresarial'] },
    { name: 'Emprendimientos y expositores', tier: 'gold', value: 'Visibilidad', contribution: 'Da visibilidad a productos, servicios, prototipos y desarrollos tecnológicos.', benefits: ['Stand en feria', 'Presentación a inversionistas', 'Feedback de mercado'] },
  ];"""
code = code.replace(pkgs_old, pkgs_new)
code = code.replace("grid-cols-1 md:grid-cols-2 lg:grid-cols-3", "grid-cols-1 md:grid-cols-2 lg:grid-cols-4")

# Contacto
code = code.replace("Hay categorías disponibles en sede, conectividad, seguridad, audiovisual, experiencia y más. Construye tu posición en el ecosistema IA de Santander.", "Las organizaciones aliadas pueden participar mediante contenidos, talleres, experiencias, demostraciones, conexión empresarial o apoyo institucional.")
code = code.replace("Inscribe tu proyecto en la convocatoria. Si tiene potencial lo seleccionamos y te acompañamos con mentorías hasta el evento.", "La fase final y la premiación de la convocatoria PotencIA 2026 se realizarán durante el evento. Los proyectos seleccionados accederán a un proceso previo y presentarán sus soluciones.")

with codecs.open('src/App.jsx', 'w', 'utf-8') as f:
    f.write(code)

print("Updated App.jsx successfully!")
