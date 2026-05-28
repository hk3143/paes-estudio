import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.quizResult.deleteMany()
  await prisma.quizQuestion.deleteMany()
  await prisma.quiz.deleteMany()
  await prisma.question.deleteMany()
  await prisma.topic.deleteMany()
  await prisma.module.deleteMany()
  await prisma.subject.deleteMany()

  // =====================
  // HISTORIA Y CS. SOCIALES
  // =====================
  const historia = await prisma.subject.create({
    data: {
      name: "Historia y Ciencias Sociales",
      slug: "historia",
      icon: "landmark",
      color: "#8B4513",
      order: 1,
    },
  })

  const hMod1 = await prisma.module.create({
    data: { subjectId: historia.id, name: "Chile Republicano (s. XIX)", slug: "chile-republicano-siglo-xix", order: 1 },
  })
  const hMod2 = await prisma.module.create({
    data: { subjectId: historia.id, name: "Chile en el siglo XX", slug: "chile-siglo-xx", order: 2 },
  })
  const hMod3 = await prisma.module.create({
    data: { subjectId: historia.id, name: "Formación Ciudadana", slug: "formacion-ciudadana", order: 3 },
  })
  const hMod4 = await prisma.module.create({
    data: { subjectId: historia.id, name: "Sistema Económico", slug: "sistema-economico", order: 4 },
  })
  const hMod5 = await prisma.module.create({
    data: { subjectId: historia.id, name: "Historia Universal", slug: "historia-universal", order: 5 },
  })

  // --- Módulo 1: Chile Republicano s. XIX ---
  const hT1 = await prisma.topic.create({
    data: {
      moduleId: hMod1.id, name: "Independencia de Chile", slug: "independencia-chile", order: 1,
      content: `## Independencia de Chile (1810-1823)

**Causas:**
- **Externas:** Invasión napoleónica a España (1808), crisis de la monarquía española, ideas ilustradas y revoluciones atlánticas (independencia de EE.UU. 1776, Revolución Francesa 1789).
- **Internas:** Descontento criollo por el monopolio comercial español, rivalidad entre criollos y peninsulares, formación de una conciencia nacional.

**Etapas:**
1. **Patria Vieja (1810-1814):** Primera Junta de Gobierno (18 sept 1810), Congreso Nacional, gobierno de José Miguel Carrera, creación de la bandera y escudo. Batalla de Rancagua (1814) → fin de la Patria Vieja.
2. **Reconquista (1814-1817):** Restauración del poder español con el gobierno de Mariano Osorio y Casimiro Marcó del Pont. Represión a los patriotas. Guerrilla de Manuel Rodríguez.
3. **Patria Nueva (1817-1823):** Cruce de los Andes por San Martín, Batalla de Chacabuco (12 feb 1817), Batalla de Maipú (5 abr 1818). Declaración de Independencia (1 ene 1818). Abolición de títulos de nobleza y mayorazgos.

**Figuras clave:** Bernardo O'Higgins, José de San Martín, José Miguel Carrera, Manuel Rodríguez, Camilo Henríquez.`,
    },
  })
  const hT2 = await prisma.topic.create({
    data: {
      moduleId: hMod1.id, name: "Organización de la República", slug: "organizacion-republica", order: 2,
      content: `## Organización de la República (1823-1830)

**Periodo de Ensayos Constitucionales (1823-1830):**
- **Gobierno de O'Higgins (1817-1823):** Abdicación forzada por presiones de la aristocracia.
- **Gobierno de Ramón Freire (1823-1826):** Abolición definitiva de la esclavitud.
- **Ensayos constitucionales:** Constitución Moralista (1823), Leyes Federales (1826), Constitución Liberal (1828).
- **Bandos políticos:** Pelucones (conservadores, centralistas) vs Pipiolos (liberales, federalistas).
- **Guerra Civil de 1829-1830:** Triunfo conservador en la Batalla de Lircay → fin del periodo de ensayos.

**República Conservadora (1830-1861):**
- **Gobierno de Diego Portales:** Figura clave del orden conservador. Ideas: orden, autoridad, portaliano.
- **Constitución de 1833:** Régimen presidencialista, voto censitario, religión oficial, poder ejecutivo fuerte.
- **Gobiernos:** José Joaquín Prieto (1831-1841), Manuel Bulnes (1841-1851), Manuel Montt (1851-1861).
- **Obras:** Estabilidad política, Guerra contra la Confederación Perú-Boliviana (1836-1839), colonización de La Araucanía, fundación de la Universidad de Chile (1842), Código Civil (1855).`,
    },
  })
  const hT3 = await prisma.topic.create({
    data: {
      moduleId: hMod1.id, name: "República Liberal", slug: "republica-liberal", order: 3,
      content: `## República Liberal (1861-1891)

**Gobiernos liberales:** José Joaquín Pérez (1861-1871), Federico Errázuriz Zañartu (1871-1876), Aníbal Pinto (1876-1881), Domingo Santa María (1881-1886), José Manuel Balmaceda (1886-1891).

**Reformas liberales:**
- Reforma constitucional de 1871 (prohibición de la reelección inmediata).
- Leyes laicas: Ley de Cementerios Laicos (1883), Ley de Matrimonio Civil (1884), Ley de Registro Civil (1884).
- Libertad de enseñanza y prensa.

**Conflictos:**
- **Guerra del Pacífico (1879-1883):** Chile vs Perú y Bolivia por el control del salitre. Triunfo chileno → incorporación de Antofagasta, Tarapacá y Arica.
- **Ocupación de la Araucanía (1861-1883):** Pacificación del territorio mapuche e incorporación al Estado chileno.
- **Guerra Civil de 1891:** Conflicto entre Balmaceda (presidente) y el Congreso. Triunfo del Congreso → inicio del Parlamentarismo.`,
    },
  })
  const hT4 = await prisma.topic.create({
    data: {
      moduleId: hMod1.id, name: "Parlamentarismo", slug: "parlamentarismo", order: 4,
      content: `## Parlamentarismo (1891-1925)

**Origen:** Triunfo del Congreso en la Guerra Civil de 1891. Se instauró un régimen parlamentario de facto (la Constitución de 1833 seguía vigente, pero se operó parlamentariamente).

**Características clave:**
- **Predominio del Congreso sobre el Ejecutivo:** El presidente quedó subordinado al Parlamento.
- **Rotativa ministerial constante:** Los ministros cambiaban frecuentemente al perder la confianza del Congreso (interpelaciones y censuras). En 33 años hubo alrededor de 100 gabinetes.
- **"Gobierno de las combinaciones":** Alianzas fluctuantes entre partidos (Conservador, Liberal, Radical, Nacional, Demócrata) para formar mayorías.
- **Cohecho y fraude electoral:** Control de las elecciones por la oligarquía a través del soborno y el "pegote" (inscripción fraudulenta de votantes).
- **Freno al desarrollo de leyes sociales:** El Congreso, dominado por la élite, bloqueó reformas que abordaran la cuestión social.

**Consecuencias:**
- Inestabilidad ministerial crónica.
- Incapacidad para abordar los problemas sociales.
- Desprestigio del sistema político y de los partidos.
- Crisis de fines de la década de 1910 y creciente presión social.

**Fin del sistema:** Golpe de Estado de 1925 (liderado por Carlos Ibáñez del Campo y Marmaduke Grove), promulgación de la Constitución de 1925 que restauró un presidencialismo fuerte.`,
    },
  })

  // --- Módulo 2: Chile siglo XX ---
  const hT5 = await prisma.topic.create({
    data: {
      moduleId: hMod2.id, name: "Cuestión Social", slug: "cuestion-social", order: 1,
      content: `## Cuestión Social (1880-1920)

**Definición:** Conjunto de problemas sociales derivados de la industrialización, urbanización y el crecimiento de la clase obrera en Chile.

**Problemas concretos:**
- **Condiciones laborales inhumanas:** Jornadas de 12-16 horas, salarios miserables, trabajo infantil y femenino sin protección, accidentes laborales sin indemnización.
- **Vivienda insalubre:** Los "conventillos" hacinados en ciudades como Santiago y Valparaíso (piezas pequeñas, sin ventilación ni servicios sanitarios).
- **Falta de seguridad social:** No existían leyes de accidentes del trabajo, jubilación ni salud.
- **Alcoholismo y desintegración familiar** como consecuencias visibles.

**Actores y respuestas:**
- **Movimiento obrero:** Surgieron mancomunales, sociedades de resistencia y las primeras federaciones obreras (FOCH, 1909; IWW en Chile, 1919).
- **Huelgas y represión:** Huelga del puerto de Valparaíso (1903), huelga de la carne (1905), Matanza de la Escuela Santa María de Iquique (1907, ~2000-3600 muertos).
- **"Cuestión social" como debate:** Intelectuales y sectores de la Iglesia (encíclica Rerum Novarum, 1891) comenzaron a presionar por reformas.

**Primeras leyes sociales:**
- Descanso dominical (1907)
- Sillas para empleadas de comercio (1914)
- Accidentes del trabajo (1916)
- Protección a la maternidad obrera (1917)
- Ley de la silla (1914)

**Conexión con el Parlamentarismo:** La incapacidad del régimen parlamentario para abordar la cuestión social fue una de las causas principales de su desprestigio y caída.`,
    },
  })
  const hT6 = await prisma.topic.create({
    data: {
      moduleId: hMod2.id, name: "Constitución de 1925 y Estado de Compromiso", slug: "constitucion-1925", order: 2,
      content: `## Constitución de 1925 y Estado de Compromiso

**Constitución de 1925:**
- Elaborada bajo el gobierno de Arturo Alessandri Palma.
- Restableció el presidencialismo fuerte.
- Separación de la Iglesia y el Estado.
- Estableció derechos sociales (pero con aplicación gradual).
- Creación de la Contraloría General de la República.
- Duración: hasta 1973 (golpe militar) y formalmente hasta 1980.

**Estado de Compromiso (1932-1973):**
- Sistema político donde los principales sectores sociales (clase obrera, clase media, empresarios) estaban representados y negociaban sus intereses.
- Partidos políticos: Radical, Conservador, Liberal, Socialista, Comunista, Demócrata Cristiano.
- **Gobiernos radicales (1938-1952):** Pedro Aguirre Cerda, Juan Antonio Ríos, Gabriel González Videla. Industrialización: CORFO (1939).
- **Gobierno de Carlos Ibáñez (1952-1958):** Populismo, giro represivo.
- **Gobierno de Jorge Alessandri (1958-1964):** Liberal-conservador.
- **Gobierno de Eduardo Frei Montalva (1964-1970):** Reformismo: Reforma Agraria, chilenización del cobre, sindicalización campesina.

**Crisis del Estado de Compromiso:** Polarización política, creciente movilización social, estancamiento económico, inflación.`,
    },
  })
  const hT7 = await prisma.topic.create({
    data: {
      moduleId: hMod2.id, name: "Gobierno de Salvador Allende", slug: "gobierno-allende", order: 3,
      content: `## Gobierno de Salvador Allende (1970-1973)

**Contexto:** Triunfo de la Unidad Popular (UP) con Allende como primer presidente socialista elegido democráticamente en el mundo.

**Programa de la UP:**
- **Nacionalizaciones:** Cobre (nacionalización por reforma constitucional unánime, 1971), bancos, industria textil, siderúrgica.
- **Aceleración de la Reforma Agraria:** Expropiación de latifundios.
- **Política social:** Distribución de medio litro de leche diario a niños, alfabetización, salud pública.
- **Control de precios y estatización de la distribución.**

**Problemas:**
- Oposición del Congreso (mayoría opositora), de la prensa y de Estados Unidos.
- Polarización extrema: tensiones entre la UP y la oposición de derecha.
- Crisis económica: inflación descontrolada, desabastecimiento, mercado negro.
- Paro de octubre de 1972 (empresarios, transportistas).
- Intervención de Estados Unidos (ITT, CIA) para desestabilizar el gobierno.

**Desenlace:**
- Golpe de Estado del 11 de septiembre de 1973.
- Muerte de Allende en La Moneda.
- Inicio de la dictadura militar liderada por Augusto Pinochet.`,
    },
  })
  const hT8 = await prisma.topic.create({
    data: {
      moduleId: hMod2.id, name: "Dictadura Militar y Transición", slug: "dictadura-transicion", order: 4,
      content: `## Dictadura Militar (1973-1990) y Transición a la Democracia

**Dictadura Militar:**
- **Régimen de facto** liderado por una Junta Militar (Pinochet, Merino, Leigh, Mendoza).
- **Represión sistemática:** Violaciones a los DD.HH., detenidos desaparecidos, tortura, exilio.
- **Constitución de 1980:** Aprobada en plebiscito sin registros electorales. Consagró el modelo neoliberal y el rol subsidiario del Estado.
- **Reformas económicas neoliberales:** Los "Chicago Boys". Privatizaciones, apertura comercial, eliminación de aranceles, reducción del gasto social.
- **Crisis de 1982-1983:** Recesión, desempleo masivo, protestas nacionales.

**Transición a la Democracia:**
- **Plebiscito de 1988:** Triunfo del "No" (55.99%) → fin de la dictadura.
- **Gobierno de Patricio Aylwin (1990-1994):** Primer gobierno de la Concertación. Comisión de Verdad y Reconciliación (Informe Rettig).
- **Gobiernos de la Concertación (1990-2010):** Aylwin, Frei Ruiz-Tagle, Lagos, Bachelet. Crecimiento económico, reducción de la pobreza, pero con enclaves autoritarios de la Constitución de 1980.
- **Reformas posteriores:** Reforma tributaria, reforma previsional, Ley de divorcio (2004).`,
    },
  })

  // --- Módulo 3: Formación Ciudadana ---
  const hT9 = await prisma.topic.create({
    data: {
      moduleId: hMod3.id, name: "Constitución y Estado de Derecho", slug: "constitucion-estado-derecho", order: 1,
      content: `## Constitución y Estado de Derecho

**Constitución:**
- Norma fundamental que organiza el poder del Estado y garantiza los derechos de las personas.
- **Constitución vigente en Chile:** 1980 (con reformas importantes: 1989, 2005).

**Estado de Derecho:**
- Principio donde todos (gobernantes y gobernados) están sometidos a la ley.
- **Elementos:** División de poderes, legalidad, jerarquía normativa, derechos fundamentales.

**Estructura del Estado chileno:**
- **Poder Ejecutivo:** Presidente de la República (jefe de Estado y de gobierno), ministros, intendencias, gobernaciones.
- **Poder Legislativo:** Congreso Nacional bicameral (Senado y Cámara de Diputados).
- **Poder Judicial:** Tribunales de justicia, Corte Suprema.

**Órganos autónomos:**
- Contraloría General de la República
- Banco Central
- Tribunal Constitucional
- Ministerio Público`,
    },
  })
  const hT10 = await prisma.topic.create({
    data: {
      moduleId: hMod3.id, name: "Derechos Humanos", slug: "derechos-humanos", order: 2,
      content: `## Derechos Humanos

**Concepto:** Facultades y libertades inherentes a toda persona por su dignidad humana.

**Generaciones de DD.HH.:**
- **Primera generación (civiles y políticos):** Derecho a la vida, libertad de expresión, voto, libertad de conciencia.
- **Segunda generación (económicos, sociales, culturales):** Derecho al trabajo, salud, educación, vivienda.
- **Tercera generación (solidaridad):** Derecho al desarrollo, medio ambiente sano, paz.

**Instrumentos internacionales:**
- Declaración Universal de los DD.HH. (1948)
- Pacto Internacional de Derechos Civiles y Políticos
- Pacto Internacional de Derechos Económicos, Sociales y Culturales
- Convención Americana de DD.HH. (Pacto de San José)

**En Chile:**
- Comisión Nacional de Verdad y Reconciliación (Informe Rettig, 1991)
- Comisión Nacional sobre Prisión Política y Tortura (Informe Valech, 2004)
- Instituto Nacional de Derechos Humanos (INDH, 2010)`,
    },
  })
  const hT11 = await prisma.topic.create({
    data: {
      moduleId: hMod3.id, name: "Participación Ciudadana", slug: "participacion-ciudadana", order: 3,
      content: `## Participación Ciudadana

**Mecanismos de participación en Chile:**
- **Voto:** Derecho y deber ciudadano (voto voluntario desde 2012). Inscripción automática.
- **Plebiscito:** Consulta nacional vinculante (requiere reforma constitucional para convocarlo).
- **Iniciativa popular de ley:** Mecanismo para que ciudadanos presenten proyectos de ley (no implementado plenamente).
- **Cuenta pública:** Obligación del presidente de informar al país.

**Partidos políticos:**
- Organizaciones que representan intereses y programas de gobierno.
- Funcionan como intermediarios entre la sociedad y el Estado.

**Organizaciones de la sociedad civil:**
- Sindicatos, juntas de vecinos, centros de padres, ONGs, fundaciones.
- Canalizan demandas sociales y participación en políticas públicas.

**Sistema electoral:**
- Sistema proporcional (desde 2015, reemplazó al binominal).
- Permite mayor representación de diversas fuerzas políticas.`,
    },
  })

  // --- Módulo 4: Sistema Económico ---
  const hT12 = await prisma.topic.create({
    data: {
      moduleId: hMod4.id, name: "Conceptos Económicos Fundamentales", slug: "conceptos-economicos", order: 1,
      content: `## Conceptos Económicos Fundamentales

**Economía:** Ciencia que estudia la administración de recursos escasos para satisfacer necesidades ilimitadas.

**Agentes económicos:**
- **Familias:** Consumen bienes y servicios, ofrecen trabajo.
- **Empresas:** Producen bienes y servicios, demandan trabajo.
- **Estado:** Regula, provee bienes públicos, redistribuye.
- **Sector externo:** Relaciones comerciales con otros países.

**Mercado:** Espacio donde oferentes y demandantes intercambian bienes y servicios.

**Ley de oferta y demanda:**
- Oferta: cantidad de bienes que los productores quieren vender a un precio.
- Demanda: cantidad de bienes que los consumidores quieren comprar.
- Precio de equilibrio: punto donde oferta = demanda.

**Indicadores económicos:**
- **PIB (Producto Interno Bruto):** Valor de todos los bienes y servicios finales producidos en un país.
- **Inflación:** Aumento sostenido del nivel general de precios.
- **Desempleo:** Porcentaje de fuerza laboral sin trabajo.
- **IPC (Índice de Precios al Consumidor):** Mide la variación de precios de una canasta de bienes.`,
    },
  })
  const hT13 = await prisma.topic.create({
    data: {
      moduleId: hMod4.id, name: "Modelo Económico Chileno", slug: "modelo-economico-chileno", order: 2,
      content: `## Modelo Económico Chileno

**Modelo neoliberal (desde 1975):**
- Implementado por los "Chicago Boys" durante la dictadura militar.
- **Características:** Libre mercado, apertura comercial, privatizaciones, rol subsidiario del Estado, propiedad privada.

**Elementos clave:**
- **Banco Central autónomo:** Desde 1989, maneja la política monetaria para controlar la inflación.
- **AFPs:** Sistema de capitalización individual (1981).
- **ISAPRES:** Sistema de salud privado (1981).
- **Apertura comercial:** Tratados de libre comercio con múltiples países.
- **Tipo de cambio flotante.**

**Fortalezas:**
- Crecimiento económico sostenido (1990-2010).
- Reducción significativa de la pobreza (de 38.6% en 1990 a ~8% actual).
- Estabilidad macroeconómica.

**Debilidades:**
- Alta desigualdad económica (coeficiente de Gini elevado).
- Endeudamiento de las familias.
- Sistema previsional con bajas pensiones.
- Concentración de mercados (oligopolios).

**Política fiscal:** Regla de balance estructural. El Estado ahorra en tiempos de bonanza para gastar en crisis.`,
    },
  })

  // Questions for Historia
  const hQuestions = [
    // Parlamentarismo
    { topicId: hT4.id, text: "¿En qué periodo se desarrolló el parlamentarismo en Chile?", options: '["1830-1861", "1861-1891", "1891-1925", "1925-1973"]', correct: 2, explanation: "El parlamentarismo chileno se desarrolló entre 1891 (triunfo del Congreso en la Guerra Civil) y 1925 (promulgación de la nueva Constitución presidencialista)." },
    { topicId: hT4.id, text: "¿Cuál fue una característica principal del régimen parlamentario chileno?", options: '["Fuerte poder ejecutivo", "Rotativa ministerial constante", "Ausencia de partidos políticos", "Sufragio universal obligatorio"]', correct: 1, explanation: "La rotativa ministerial era constante: los ministros cambiaban frecuentemente al perder la confianza del Congreso mediante interpelaciones y censuras. Hubo alrededor de 100 gabinetes en 33 años." },
    { topicId: hT4.id, text: "¿Qué evento marcó el inicio del parlamentarismo en Chile?", options: '["La Batalla de Lircay", "La Guerra del Pacífico", "La Guerra Civil de 1891", "La Revolución de 1851"]', correct: 2, explanation: "La Guerra Civil de 1891 terminó con el triunfo del Congreso sobre el presidente Balmaceda, dando inicio al periodo parlamentario." },
    { topicId: hT4.id, text: "¿Qué práctica fraudulenta era común durante el parlamentarismo?", options: '["El cohecho y el pegote", "La nacionalización de empresas", "El voto femenino", "La expropiación de tierras"]', correct: 0, explanation: "El cohecho (soborno) y el pegote (inscripción fraudulenta de votantes fallecidos o inexistentes) eran prácticas comunes para controlar elecciones." },
    { topicId: hT4.id, text: "¿Qué Constitución estuvo formalmente vigente durante el parlamentarismo?", options: '["Constitución de 1828", "Constitución de 1833", "Constitución de 1925", "Constitución de 1980"]', correct: 1, explanation: "La Constitución de 1833 siguió vigente, pero se operó de facto como un régimen parlamentario, aunque formalmente era presidencialista." },
    // Cuestión Social
    { topicId: hT5.id, text: "¿Qué fue la 'cuestión social' en Chile?", options: '["Un movimiento político del siglo XIX", "El conjunto de problemas sociales derivados de la industrialización", "Una reforma constitucional", "Un tratado internacional"]', correct: 1, explanation: "La cuestión social fue el conjunto de problemas derivados de la industrialización, urbanización y crecimiento de la clase obrera en Chile (1880-1920)." },
    { topicId: hT5.id, text: "¿Qué era un 'conventillo' en el contexto de la cuestión social?", options: '["Una iglesia", "Una vivienda hacinada e insalubre para obreros", "Una fábrica textil", "Un sindicato"]', correct: 1, explanation: "Los conventillos eran viviendas hacinadas en ciudades como Santiago y Valparaíso, donde vivían los obreros en condiciones insalubres." },
    { topicId: hT5.id, text: "¿Qué matanza obrera ocurrió en 1907 durante el parlamentarismo?", options: '["Matanza de Ranquil", "Matanza de la Escuela Santa María de Iquique", "Matanza del Seguro Obrero", "Matanza de Bulnes"]', correct: 1, explanation: "La Matanza de la Escuela Santa María de Iquique (1907) fue la represión de una huelga de obreros del salitre, con entre 2000 y 3600 muertos." },
    { topicId: hT5.id, text: "¿Qué encíclica papal influyó en el debate sobre la cuestión social?", options: '["Pacem in Terris", "Rerum Novarum", "Populorum Progressio", "Laudato Si"]', correct: 1, explanation: "La encíclica Rerum Novarum (1891) del Papa León XIII abordó la condición de los trabajadores y promovió la doctrina social de la Iglesia." },
    { topicId: hT5.id, text: "¿Qué ley social se dictó por primera vez en Chile en 1907?", options: '["Ley de la silla", "Ley de descanso dominical", "Ley de accidentes del trabajo", "Ley de protección a la maternidad"]', correct: 1, explanation: "La Ley de Descanso Dominical (1907) fue una de las primeras leyes sociales en Chile, estableciendo el descanso obligatorio los domingos." },
    // Independencia
    { topicId: hT1.id, text: "¿Qué fecha se considera el inicio del proceso de Independencia de Chile?", options: '["18 de septiembre de 1810", "12 de febrero de 1817", "5 de abril de 1818", "1 de enero de 1818"]', correct: 0, explanation: "El 18 de septiembre de 1810 se constituyó la Primera Junta de Gobierno, marcando el inicio del proceso de independencia." },
    { topicId: hT1.id, text: "¿Dónde se libró la batalla que puso fin a la Patria Vieja?", options: '["Chacabuco", "Maipú", "Rancagua", "Cancha Rayada"]', correct: 2, explanation: "La Batalla de Rancagua (1814) significó la derrota de los patriotas y el fin de la Patria Vieja, iniciando la Reconquista española." },
    { topicId: hT1.id, text: "¿Quién lideró el Cruce de los Andes en 1817?", options: '["Bernardo O\'Higgins", "José de San Martín", "José Miguel Carrera", "Manuel Rodríguez"]', correct: 1, explanation: "El general argentino José de San Martín lideró el Cruce de los Andes, junto con O'Higgins, para liberar Chile del dominio español." },
    // Organización de la República
    { topicId: hT2.id, text: "¿Qué bando político triunfó en la Batalla de Lircay?", options: '["Pipiolos", "Pelucones", "Federalistas", "Liberales"]', correct: 1, explanation: "Los pelucones (conservadores) triunfaron sobre los pipiolos (liberales) en la Batalla de Lircay (1830), iniciando la República Conservadora." },
    { topicId: hT2.id, text: "¿Qué Constitución estableció el régimen presidencialista en el siglo XIX?", options: '["Constitución de 1823", "Constitución de 1828", "Constitución de 1833", "Constitución de 1925"]', correct: 2, explanation: "La Constitución de 1833 estableció un régimen presidencialista fuerte, con voto censitario y religión oficial del Estado." },
    // República Liberal
    { topicId: hT3.id, text: "¿Qué reforma NO fue parte de las Leyes Laicas?", options: '["Ley de Cementerios Laicos", "Ley de Matrimonio Civil", "Ley de Registro Civil", "Ley de libertad de culto"]', correct: 3, explanation: "Las Leyes Laicas (1883-1884) incluyeron cementerios laicos, matrimonio civil y registro civil, pero no una ley específica de libertad de culto." },
    { topicId: hT3.id, text: "¿Qué guerra territorial ocurrió durante la República Liberal?", options: '["Guerra contra la Confederación Perú-Boliviana", "Guerra del Pacífico", "Guerra del Paraguay", "Guerra de la Triple Alianza"]', correct: 1, explanation: "La Guerra del Pacífico (1879-1883) enfrentó a Chile contra Perú y Bolivia, resultando en la incorporación de Antofagasta, Tarapacá y Arica." },
    // Constitución 1925
    { topicId: hT6.id, text: "¿Qué sistema político caracterizó a Chile entre 1932 y 1973?", options: '["Parlamentarismo", "Estado de Compromiso", "Dictadura militar", "República autoritaria"]', correct: 1, explanation: "El Estado de Compromiso fue un sistema donde los principales sectores sociales negociaban sus intereses a través de partidos políticos." },
    { topicId: hT6.id, text: "¿Qué organismo se creó en 1939 para impulsar la industrialización?", options: '["Banco Central", "CORFO", "Codelco", "INE"]', correct: 1, explanation: "La CORFO (Corporación de Fomento de la Producción) fue creada en 1939 durante el gobierno de Pedro Aguirre Cerda para impulsar la industrialización." },
    // Allende
    { topicId: hT7.id, text: "¿En qué año Salvador Allende asumió la presidencia de Chile?", options: '["1964", "1970", "1971", "1973"]', correct: 1, explanation: "Salvador Allende asumió la presidencia en 1970 como el primer presidente socialista elegido democráticamente en el mundo." },
    { topicId: hT7.id, text: "¿Qué recurso natural fue nacionalizado por unanimidad en 1971?", options: '["El carbón", "El salitre", "El cobre", "El litio"]', correct: 2, explanation: "La nacionalización del cobre fue aprobada por unanimidad del Congreso en 1971, durante el gobierno de Salvador Allende." },
    // Dictadura
    { topicId: hT8.id, text: "¿Qué resultado tuvo el Plebiscito de 1988?", options: '["Triunfo del Sí (55%)", "Triunfo del No (55.99%)", "Triunfo del Sí (60%)", "Empate técnico"]', correct: 1, explanation: "El No obtuvo el 55.99% de los votos, lo que significó el fin de la dictadura militar y el inicio de la transición a la democracia." },
    { topicId: hT8.id, text: "¿Quién fue el primer presidente de la Concertación?", options: '["Eduardo Frei Ruiz-Tagle", "Ricardo Lagos", "Patricio Aylwin", "Michelle Bachelet"]', correct: 2, explanation: "Patricio Aylwin fue el primer presidente de la Concertación (1990-1994), luego del triunfo del No en el plebiscito de 1988." },
    // Formación Ciudadana
    { topicId: hT9.id, text: "¿Cuáles son los tres poderes del Estado en Chile?", options: '["Ejecutivo, Legislativo, Judicial", "Federal, Regional, Municipal", "Presidencial, Ministerial, Senatorial", "Público, Privado, Mixto"]', correct: 0, explanation: "La Constitución chilena establece tres poderes independientes: Ejecutivo (Presidente), Legislativo (Congreso) y Judicial (Tribunales)." },
    { topicId: hT10.id, text: "¿Qué generación de DD.HH. incluye el derecho a la educación y la salud?", options: '["Primera generación", "Segunda generación", "Tercera generación", "Cuarta generación"]', correct: 1, explanation: "Los derechos económicos, sociales y culturales (DESC), como educación, salud y trabajo, corresponden a la segunda generación de DD.HH." },
    { topicId: hT11.id, text: "¿Desde qué año el voto en Chile es voluntario?", options: '["1990", "2005", "2012", "2015"]', correct: 2, explanation: "El voto voluntario rige desde 2012, junto con la inscripción automática en los registros electorales." },
    // Sistema Económico
    { topicId: hT12.id, text: "¿Qué mide el Producto Interno Bruto (PIB)?", options: '["El nivel de inflación", "El valor de todos los bienes y servicios finales producidos", "La tasa de desempleo", "El índice de precios"]', correct: 1, explanation: "El PIB mide el valor de todos los bienes y servicios finales producidos en un país durante un periodo determinado." },
    { topicId: hT13.id, text: "¿Qué caracteriza al modelo económico implementado en Chile desde 1975?", options: '["Economía centralizada", "Libre mercado y rol subsidiario del Estado", "Autarquía económica", "Estado empresario"]', correct: 1, explanation: "El modelo neoliberal chileno se basa en el libre mercado, la apertura comercial, privatizaciones y un rol subsidiario del Estado." },
  ]

  for (const q of hQuestions) {
    await prisma.question.create({ data: q })
  }

  // =====================
  // COMPETENCIA LECTORA
  // =====================
  const lectora = await prisma.subject.create({
    data: {
      name: "Competencia Lectora",
      slug: "competencia-lectora",
      icon: "book-open",
      color: "#2563EB",
      order: 2,
    },
  })

  const lMod1 = await prisma.module.create({
    data: { subjectId: lectora.id, name: "Localizar Información", slug: "localizar", order: 1 },
  })
  const lMod2 = await prisma.module.create({
    data: { subjectId: lectora.id, name: "Interpretar Textos", slug: "interpretar", order: 2 },
  })
  const lMod3 = await prisma.module.create({
    data: { subjectId: lectora.id, name: "Evaluar y Reflexionar", slug: "evaluar", order: 3 },
  })

  const lT1 = await prisma.topic.create({
    data: {
      moduleId: lMod1.id, name: "Extracción de Información Explícita", slug: "extraccion-informacion", order: 1,
      content: `## Localizar Información

Consiste en identificar y extraer información que aparece de manera explícita en el texto. No requiere inferencia ni interpretación.

**Estrategias:**
- Identificar palabras clave en la pregunta.
- Buscar sinónimos o paráfrasis en el texto.
- Leer los párrafos donde aparecen los términos buscados.
- Distinguir entre información principal y secundaria.`,
    },
  })
  const lT2 = await prisma.topic.create({
    data: {
      moduleId: lMod2.id, name: "Comprensión e Inferencia", slug: "comprension-inferencia", order: 1,
      content: `## Interpretar Textos

Implica comprender el significado del texto más allá de lo explícito.

**Habilidades:**
- **Identificar ideas principales y secundarias.**
- **Establecer relaciones:** causa-efecto, problema-solución, comparación-contraste.
- **Realizar inferencias:** extraer conclusiones no dichas explícitamente.
- **Determinar el propósito comunicativo** del autor.
- **Analizar la estructura textual:** narrativa, argumentativa, expositiva.

**Tipos textuales:**
- **Narrativo:** Cuenta una historia con personajes, tiempo y espacio.
- **Argumentativo:** Defiende una postura con argumentos.
- **Expositivo:** Explica o informa sobre un tema.`,
    },
  })
  const lT3 = await prisma.topic.create({
    data: {
      moduleId: lMod3.id, name: "Evaluación Crítica", slug: "evaluacion-critica", order: 1,
      content: `## Evaluar y Reflexionar

Implica emitir juicios sobre el texto y reflexionar sobre su contenido.

**Habilidades:**
- **Evaluar la calidad de la argumentación:** solidez de las evidencias, pertinencia de los ejemplos.
- **Identificar la intención del emisor y el público objetivo.**
- **Detectar sesgos, falacias o manipulación.**
- **Valorar recursos lingüísticos:** figuras retóricas, tono, registro.
- **Relacionar el texto con conocimientos previos o experiencias personales.**
- **Comparar distintas perspectivas sobre un mismo tema.**`,
    },
  })

  const lQuestions = [
    { topicId: lT1.id, text: "¿Qué significa localizar información en un texto?", options: '["Interpretar el mensaje oculto", "Extraer datos que están escritos explícitamente", "Opinar sobre el contenido", "Resumir el texto completo"]', correct: 1, explanation: "Localizar información consiste en encontrar datos que aparecen de manera directa y explícita en el texto, sin necesidad de inferir." },
    { topicId: lT1.id, text: "¿Qué técnica es útil para localizar información en un texto?", options: '["Leer solo el primer párrafo", "Identificar palabras clave y buscar sinónimos", "Memorizar todo el texto", "Saltarse los párrafos largos"]', correct: 1, explanation: "Identificar palabras clave y buscar sinónimos o paráfrasis en el texto ayuda a localizar rápidamente la información relevante." },
    { topicId: lT2.id, text: "¿Qué es una inferencia en la lectura?", options: '["Copiar una cita textual", "Extraer una conclusión no dicha explícitamente", "Contar las palabras del texto", "Subrayar ideas principales"]', correct: 1, explanation: "Inferir es sacar conclusiones o deducciones que no están escritas directamente, pero que se pueden derivar de la información del texto." },
    { topicId: lT2.id, text: "¿Cuál es el propósito de un texto argumentativo?", options: '["Contar una historia", "Defender una postura con argumentos", "Explicar un procedimiento", "Describir un lugar"]', correct: 1, explanation: "El texto argumentativo busca convencer al lector de una postura mediante argumentos, evidencias y razonamientos." },
    { topicId: lT2.id, text: "¿Qué tipo de relación se establece entre 'falta de lluvias' y 'sequía'?", options: '["Causa-efecto", "Problema-solución", "Comparación", "Secuencia temporal"]', correct: 0, explanation: "La falta de lluvias es la causa que produce el efecto de la sequía. Es una relación de causa-efecto." },
    { topicId: lT3.id, text: "¿Qué significa evaluar un texto críticamente?", options: '["Aceptar todo lo que dice el autor", "Emitir un juicio sobre la calidad y validez del contenido", "Memorizar los datos", "Ignorar los argumentos débiles"]', correct: 1, explanation: "Evaluar críticamente implica juzgar la calidad de la argumentación, identificar sesgos, valorar las evidencias y reflexionar sobre el contenido." },
    { topicId: lT3.id, text: "¿Qué es una falacia argumentativa?", options: '["Un argumento válido y sólido", "Un razonamiento incorrecto pero con apariencia de verdad", "Una cita textual", "Una evidencia científica"]', correct: 1, explanation: "Una falacia es un razonamiento que parece válido pero no lo es, utilizado a menudo para manipular o engañar al lector." },
  ]

  for (const q of lQuestions) {
    await prisma.question.create({ data: q })
  }

  // =====================
  // MATEMÁTICA M1
  // =====================
  const m1 = await prisma.subject.create({
    data: {
      name: "Matemática M1",
      slug: "matematica-m1",
      icon: "calculator",
      color: "#059669",
      order: 3,
    },
  })

  const m1Mod1 = await prisma.module.create({
    data: { subjectId: m1.id, name: "Números y Operaciones", slug: "numeros", order: 1 },
  })
  const m1Mod2 = await prisma.module.create({
    data: { subjectId: m1.id, name: "Álgebra y Funciones", slug: "algebra", order: 2 },
  })
  const m1Mod3 = await prisma.module.create({
    data: { subjectId: m1.id, name: "Geometría", slug: "geometria", order: 3 },
  })
  const m1Mod4 = await prisma.module.create({
    data: { subjectId: m1.id, name: "Probabilidad y Estadística", slug: "probabilidad-estadistica", order: 4 },
  })

  const m1T1 = await prisma.topic.create({
    data: {
      moduleId: m1Mod1.id, name: "Números Enteros y Racionales", slug: "enteros-racionales", order: 1,
      content: `## Números Enteros y Racionales

**Números enteros (Z):** ... -3, -2, -1, 0, 1, 2, 3 ...
- Operaciones: suma, resta, multiplicación, división.
- Regla de signos: + · + = +, + · - = -, - · - = +.

**Números racionales (Q):** Fracciones a/b donde b ≠ 0.
- Operaciones: suma con igual denominador, producto cruzado.
- Comparación: multiplicar cruzado para determinar cuál es mayor.

**Porcentajes:**
- Porcentaje = (parte / total) × 100%
- Aumento porcentual: valor × (1 + %/100)
- Disminución porcentual: valor × (1 - %/100)`,
    },
  })
  const m1T2 = await prisma.topic.create({
    data: {
      moduleId: m1Mod2.id, name: "Ecuaciones y Proporcionalidad", slug: "ecuaciones", order: 1,
      content: `## Ecuaciones y Proporcionalidad

**Ecuaciones de primer grado:** ax + b = c → x = (c - b)/a

**Sistemas de ecuaciones:**
- Método de sustitución.
- Método de igualación.
- Método de reducción.

**Proporcionalidad directa:** y = kx (si x aumenta, y aumenta)
**Proporcionalidad inversa:** y = k/x (si x aumenta, y disminuye)

**Razones y proporciones:**
- Razón: a/b
- Proporción: a/b = c/d → ad = bc`,
    },
  })
  const m1T3 = await prisma.topic.create({
    data: {
      moduleId: m1Mod3.id, name: "Áreas y Perímetros", slug: "areas-perimetros", order: 1,
      content: `## Áreas y Perímetros

**Cuadrado:** P = 4a, A = a²
**Rectángulo:** P = 2(a + b), A = a · b
**Triángulo:** P = a + b + c, A = (b · h)/2
**Círculo:** P = 2πr, A = πr²

**Teorema de Pitágoras:** En un triángulo rectángulo: c² = a² + b² (c = hipotenusa)

**Volúmenes:**
- Cubo: V = a³
- Paralelepípedo: V = a · b · c`,
    },
  })
  const m1T4 = await prisma.topic.create({
    data: {
      moduleId: m1Mod4.id, name: "Estadística Descriptiva", slug: "estadistica", order: 1,
      content: `## Estadística Descriptiva

**Medidas de tendencia central:**
- **Media (promedio):** Suma de datos / cantidad de datos
- **Mediana:** Valor central cuando los datos están ordenados
- **Moda:** Valor que más se repite

**Medidas de posición:**
- Cuartiles (Q1, Q2, Q3)
- Percentiles

**Tablas y gráficos:**
- Tabla de frecuencias (frecuencia absoluta, relativa, acumulada)
- Gráfico de barras, histograma, gráfico circular`,
    },
  })

  const m1Questions = [
    { topicId: m1T1.id, text: "¿Cuál es el resultado de (-5) × (3) + 12 ÷ (-4)?", options: '["-18", "18", "-15", "-12"]', correct: 0, explanation: "(-5) × 3 = -15. 12 ÷ (-4) = -3. -15 + (-3) = -18." },
    { topicId: m1T1.id, text: "Si un producto cuesta $25.000 y tiene un descuento del 20%, ¿cuánto se paga?", options: '["$20.000", "$5.000", "$22.000", "$18.000"]', correct: 0, explanation: "20% de $25.000 = $5.000. $25.000 - $5.000 = $20.000." },
    { topicId: m1T1.id, text: "¿Cuál de las siguientes fracciones es mayor?", options: '["3/4", "2/3", "5/8", "7/12"]', correct: 0, explanation: "3/4 = 0.75, 2/3 ≈ 0.666, 5/8 = 0.625, 7/12 ≈ 0.583." },
    { topicId: m1T1.id, text: "¿Cuánto es el 15% de 200?", options: '["15", "20", "25", "30"]', correct: 3, explanation: "15% de 200 = 200 × 15/100 = 200 × 0.15 = 30." },
    { topicId: m1T2.id, text: "Resuelve: 2x + 5 = 13. ¿Cuánto vale x?", options: '["3", "4", "5", "6"]', correct: 1, explanation: "2x + 5 = 13 → 2x = 8 → x = 4." },
    { topicId: m1T2.id, text: "Si 3 kg de manzanas cuestan $2.400, ¿cuánto cuestan 5 kg?", options: '["$3.000", "$4.000", "$3.600", "$4.800"]', correct: 1, explanation: "Es proporcionalidad directa: 2400/3 = x/5 → x = 2400 × 5 / 3 = 4000." },
    { topicId: m1T2.id, text: "¿Cuál es la solución del sistema x + y = 7, x - y = 3?", options: '["x = 5, y = 2", "x = 2, y = 5", "x = 3, y = 4", "x = 4, y = 3"]', correct: 0, explanation: "Sumando: 2x = 10 → x = 5. Luego 5 + y = 7 → y = 2." },
    { topicId: m1T3.id, text: "¿Cuál es el área de un triángulo con base 8 cm y altura 5 cm?", options: '["20 cm²", "40 cm²", "13 cm²", "25 cm²"]', correct: 0, explanation: "Área del triángulo = (base × altura) / 2 = (8 × 5) / 2 = 20 cm²." },
    { topicId: m1T3.id, text: "Si un cuadrado tiene perímetro 36 cm, ¿cuál es su área?", options: '["81 cm²", "36 cm²", "144 cm²", "72 cm²"]', correct: 0, explanation: "Perímetro = 4a → a = 36/4 = 9 cm. Área = 9² = 81 cm²." },
    { topicId: m1T3.id, text: "En un triángulo rectángulo, si los catetos miden 3 y 4, ¿cuánto mide la hipotenusa?", options: '["5", "6", "7", "8"]', correct: 0, explanation: "Teorema de Pitágoras: h² = 3² + 4² = 9 + 16 = 25 → h = 5." },
    { topicId: m1T4.id, text: "Dados los datos: 2, 3, 5, 5, 7, 8. ¿Cuál es la moda?", options: '["2", "5", "7", "8"]', correct: 1, explanation: "La moda es el valor que más se repite. El 5 aparece dos veces, los demás una vez." },
    { topicId: m1T4.id, text: "¿Cuál es la mediana de: 1, 3, 5, 7, 9?", options: '["3", "5", "7", "4"]', correct: 1, explanation: "La mediana es el valor central cuando los datos están ordenados: 5." },
  ]

  for (const q of m1Questions) {
    await prisma.question.create({ data: q })
  }

  // =====================
  // MATEMÁTICA M2
  // =====================
  const m2 = await prisma.subject.create({
    data: {
      name: "Matemática M2",
      slug: "matematica-m2",
      icon: "sigma",
      color: "#7C3AED",
      order: 4,
    },
  })

  const m2Mod1 = await prisma.module.create({
    data: { subjectId: m2.id, name: "Funciones", slug: "funciones", order: 1 },
  })
  const m2Mod2 = await prisma.module.create({
    data: { subjectId: m2.id, name: "Trigonometría", slug: "trigonometria", order: 2 },
  })
  const m2Mod3 = await prisma.module.create({
    data: { subjectId: m2.id, name: "Probabilidad Avanzada", slug: "probabilidad-avanzada", order: 3 },
  })

  const m2T1 = await prisma.topic.create({
    data: {
      moduleId: m2Mod1.id, name: "Función Lineal y Cuadrática", slug: "funcion-lineal-cuadratica", order: 1,
      content: `## Funciones

**Función lineal:** f(x) = mx + n
- m = pendiente (tasa de cambio)
- n = intercepto con el eje Y

**Función cuadrática:** f(x) = ax² + bx + c
- Vértice: x = -b/(2a)
- Discriminante: Δ = b² - 4ac
- Si Δ > 0 → dos raíces reales
- Si Δ = 0 → una raíz real
- Si Δ < 0 → sin raíces reales`,
    },
  })
  const m2T2 = await prisma.topic.create({
    data: {
      moduleId: m2Mod2.id, name: "Razones Trigonométricas", slug: "razones-trigonometricas", order: 1,
      content: `## Trigonometría

**Razones trigonométricas en un triángulo rectángulo:**
- sen(θ) = cateto opuesto / hipotenusa
- cos(θ) = cateto adyacente / hipotenusa
- tan(θ) = cateto opuesto / cateto adyacente

**Identidad fundamental:** sen²(θ) + cos²(θ) = 1

**Teorema del seno:** a/sen(A) = b/sen(B) = c/sen(C)

**Teorema del coseno:** a² = b² + c² - 2bc·cos(A)`,
    },
  })
  const m2T3 = await prisma.topic.create({
    data: {
      moduleId: m2Mod3.id, name: "Probabilidad Condicional", slug: "probabilidad-condicional", order: 1,
      content: `## Probabilidad Avanzada

**Probabilidad condicional:** P(A|B) = P(A ∩ B) / P(B)

**Eventos independientes:** P(A ∩ B) = P(A) · P(B)

**Teorema de Bayes:** P(A|B) = P(B|A) · P(A) / P(B)

**Combinatoria:**
- Permutaciones: P(n) = n!
- Variaciones: V(n,k) = n! / (n-k)!
- Combinaciones: C(n,k) = n! / (k!(n-k)!)`,
    },
  })

  const m2Questions = [
    { topicId: m2T1.id, text: "¿Cuál es la pendiente de la función y = 3x + 5?", options: '["3", "5", "-3", "1/3"]', correct: 0, explanation: "En la forma y = mx + n, la pendiente m es el coeficiente de x, que en este caso es 3." },
    { topicId: m2T1.id, text: "¿Cuántas raíces reales tiene la ecuación x² - 5x + 6 = 0?", options: '["0", "1", "2", "3"]', correct: 2, explanation: "Δ = (-5)² - 4·1·6 = 25 - 24 = 1 > 0, por lo tanto tiene dos raíces reales." },
    { topicId: m2T1.id, text: "¿Cuál es el vértice de la función f(x) = x² - 4x + 3?", options: '["(2, -1)", "(-2, 3)", "(2, 1)", "(-2, -1)"]', correct: 0, explanation: "x_v = -b/(2a) = 4/2 = 2. f(2) = 4 - 8 + 3 = -1. Vértice: (2, -1)." },
    { topicId: m2T2.id, text: "Si en un triángulo rectángulo el cateto opuesto a θ mide 3 y la hipotenusa 5, ¿cuánto vale sen(θ)?", options: '["3/5", "4/5", "3/4", "5/3"]', correct: 0, explanation: "sen(θ) = cateto opuesto / hipotenusa = 3/5." },
    { topicId: m2T2.id, text: "¿Cuál es el valor de sen²(30°) + cos²(30°)?", options: '["0", "1/2", "1", "3/4"]', correct: 2, explanation: "Por la identidad fundamental: sen²(θ) + cos²(θ) = 1 para cualquier ángulo θ." },
    { topicId: m2T3.id, text: "Se lanza un dado. ¿Cuál es la probabilidad de obtener un número par?", options: '["1/2", "1/3", "1/4", "2/3"]', correct: 0, explanation: "Números pares en un dado: 2, 4, 6 (3 casos favorables). Total: 6. Probabilidad = 3/6 = 1/2." },
    { topicId: m2T3.id, text: "¿Cuántas combinaciones de 2 elementos se pueden formar con {A, B, C}?", options: '["3", "4", "5", "6"]', correct: 0, explanation: "C(3,2) = 3! / (2!·1!) = 6/2 = 3. Las combinaciones son AB, AC, BC." },
  ]

  for (const q of m2Questions) {
    await prisma.question.create({ data: q })
  }

  // =====================
  // CIENCIAS
  // =====================
  const ciencias = await prisma.subject.create({
    data: {
      name: "Ciencias",
      slug: "ciencias",
      icon: "flask",
      color: "#DC2626",
      order: 5,
    },
  })

  const cMod1 = await prisma.module.create({
    data: { subjectId: ciencias.id, name: "Biología", slug: "biologia", order: 1 },
  })
  const cMod2 = await prisma.module.create({
    data: { subjectId: ciencias.id, name: "Química", slug: "quimica", order: 2 },
  })
  const cMod3 = await prisma.module.create({
    data: { subjectId: ciencias.id, name: "Física", slug: "fisica", order: 3 },
  })

  const cT1 = await prisma.topic.create({
    data: {
      moduleId: cMod1.id, name: "Célula y Organismos", slug: "celula", order: 1,
      content: `## Biología Celular

**Teoría celular:** Todos los seres vivos están formados por células, la célula es la unidad básica de la vida.

**Tipos de células:**
- **Procariotas:** Sin núcleo definido (bacterias).
- **Eucariotas:** Con núcleo definido. Pueden ser animales o vegetales.

**Organelos celulares:**
- **Núcleo:** Contiene el ADN.
- **Mitocondrias:** Producción de energía (ATP).
- **Cloroplastos:** Fotosíntesis (solo en vegetales).
- **Membrana plasmática:** Regula el paso de sustancias.`,
    },
  })
  const cT2 = await prisma.topic.create({
    data: {
      moduleId: cMod2.id, name: "Átomos y Enlaces", slug: "atomos-enlaces", order: 1,
      content: `## Química: Átomos y Enlaces

**Estructura atómica:**
- Protones (+), neutrones (0), electrones (-)
- Número atómico (Z) = cantidad de protones
- Masa atómica (A) = protones + neutrones

**Tabla periódica:**
- Periodos (filas): niveles de energía
- Grupos (columnas): electrones de valencia

**Enlaces:**
- **Iónico:** Transferencia de electrones (metal + no metal)
- **Covalente:** Compartición de electrones (no metal + no metal)
- **Metálico:** Electrones libres entre metales`,
    },
  })
  const cT3 = await prisma.topic.create({
    data: {
      moduleId: cMod3.id, name: "Movimiento y Fuerzas", slug: "movimiento-fuerzas", order: 1,
      content: `## Física: Movimiento y Fuerzas

**Leyes de Newton:**
1. **Inercia:** Un cuerpo mantiene su estado de reposo o movimiento a menos que actúe una fuerza externa.
2. **F = m · a:** La fuerza es igual a la masa por la aceleración.
3. **Acción y reacción:** Toda acción genera una reacción igual y opuesta.

**Movimiento rectilíneo uniforme (MRU):** v = d/t, aceleración = 0.
**Movimiento uniformemente acelerado (MUA):** v_f = v_i + a·t, d = v_i·t + (1/2)·a·t²`,
    },
  })

  const cQuestions = [
    { topicId: cT1.id, text: "¿Qué organelo es responsable de la producción de energía en la célula?", options: '["Núcleo", "Mitocondria", "Cloroplasto", "Ribosoma"]', correct: 1, explanation: "Las mitocondrias son los organelos encargados de producir ATP (energía) mediante la respiración celular." },
    { topicId: cT1.id, text: "¿Qué tipo de célula tiene cloroplastos?", options: '["Animal", "Vegetal", "Bacteriana", "Fúngica"]', correct: 1, explanation: "Los cloroplastos son exclusivos de las células vegetales y son los responsables de la fotosíntesis." },
    { topicId: cT2.id, text: "¿Qué tipo de enlace se produce cuando un átomo dona electrones a otro?", options: '["Covalente", "Iónico", "Metálico", "Puente de hidrógeno"]', correct: 1, explanation: "El enlace iónico se produce por transferencia de electrones, típicamente entre un metal y un no metal." },
    { topicId: cT2.id, text: "¿Qué indica el número atómico (Z) de un elemento?", options: '["La masa atómica", "La cantidad de neutrones", "La cantidad de protones", "La cantidad de electrones de valencia"]', correct: 2, explanation: "El número atómico (Z) indica la cantidad de protones en el núcleo de un átomo." },
    { topicId: cT3.id, text: "Según la primera ley de Newton, si no actúa una fuerza externa sobre un objeto en movimiento, este:", options: '["Se detiene", "Acelera", "Continúa moviéndose a velocidad constante", "Cambia de dirección"]', correct: 2, explanation: "La primera ley de Newton (inercia) establece que un objeto en movimiento mantiene su velocidad constante si no actúa una fuerza externa." },
    { topicId: cT3.id, text: "Un auto acelera de 0 a 20 m/s en 5 segundos. ¿Cuál es su aceleración?", options: '["2 m/s²", "4 m/s²", "5 m/s²", "10 m/s²"]', correct: 1, explanation: "a = (v_f - v_i) / t = (20 - 0) / 5 = 4 m/s²." },
  ]

  for (const q of cQuestions) {
    await prisma.question.create({ data: q })
  }

  console.log("Seed completado exitosamente!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
