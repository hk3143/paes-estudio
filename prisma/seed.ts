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

La independencia de Chile fue un proceso histórico que emancipó al país del Imperio español, enmarcado en el ciclo de revoluciones atlánticas que sacudieron el mundo occidental entre 1776 y 1825.

### Causas

**Externas:**
- **Invasión napoleónica a España (1808):** Napoleón Bonaparte tomó prisionero al rey Fernando VII, generando un vacío de poder que desencadenó la formación de juntas de gobierno en toda Hispanoamérica.
- **Ideas ilustradas:** La difusión del pensamiento de Rousseau, Montesquieu y Voltaire promovió ideales de libertad, igualdad y soberanía popular.
- **Revoluciones atlánticas:** Independencia de EE.UU. (1776) y Revolución Francesa (1789) sirvieron como modelos de emancipación.
- **Independencia de Haití (1804):** Primera independencia latinoamericana, demostró que el dominio colonial podía ser derrocado.

**Internas:**
- **Descontento criollo:** Los criollos (descendientes de españoles nacidos en América) estaban marginados de los altos cargos políticos y eclesiásticos, reservados para peninsulares.
- **Monopolio comercial español:** Las colonias solo podían comerciar con España, lo que limitaba el desarrollo económico criollo.
- **Formación de una conciencia nacional:** La publicación de La Aurora de Chile (1812), primer periódico nacional dirigido por fray Camilo Henríquez, difundió ideas independentistas.
- **Crisis económica:** Las guerras napoleónicas afectaron el comercio ultramarino y debilitaron la capacidad de control de la metrópoli.

### Etapas

**1. Patria Vieja (1810-1814):**
- **18 de septiembre de 1810:** Se constituyó la Primera Junta Nacional de Gobierno, presidida por Mateo de Toro y Zambrano, marcando el inicio del proceso independentista.
- Se convocó al Primer Congreso Nacional (1811), donde surgieron las facciones de moderados (liderados por Juan Martínez de Rozas) y exaltados (José Miguel Carrera).
- **Gobierno de José Miguel Carrera (1811-1813):** Implementó reformas como la creación de la bandera y el escudo nacional, la apertura de nuevas escuelas y la primera imprenta.
- Se dictaron los primeros reglamentos constitucionales (Reglamento de 1811 y Reglamento de 1812).
- **Batalla de Rancagua (1-2 de octubre de 1814):** Las fuerzas realistas al mando de Mariano Osorio derrotaron a los patriotas. Fin de la Patria Vieja y emigración del ejército patriota a Mendoza.

**2. Reconquista (1814-1817):**
- Restauración del poder español con el gobierno de Mariano Osorio y luego Casimiro Marcó del Pont.
- Régimen de terror y represión contra los patriotas: persecuciones, confiscaciones de bienes, prisión y ejecuciones.
- **Manuel Rodríguez:** Lideró una eficaz guerrilla de hostigamiento contra los realistas, manteniendo viva la causa patriota.
- En Mendoza, el general José de San Martín organizó el Ejército Libertador de los Andes con apoyo de O'Higgins y los exiliados chilenos.

**3. Patria Nueva (1817-1823):**
- **Cruce de los Andes (enero-febrero 1817):** Proeza militar donde 5.000 soldados cruzaron la cordillera por seis pasos distintos, sorprendiendo a los realistas.
- **Batalla de Chacabuco (12 de febrero de 1817):** Victoria patriota que permitió la recuperación de Santiago.
- **Batalla de Maipú (5 de abril de 1818):** Victoria decisiva que consolidó la independencia chilena.
- **Declaración de Independencia (1 de enero de 1818):** Firmada por O'Higgins en Concepción y proclamada oficialmente en Santiago.
- **Gobierno de Bernardo O'Higgins como Director Supremo (1817-1823):** Abolió los títulos de nobleza y mayorazgos, creó la Legión al Mérito, fundó la Escuela Militar, impulsó obras públicas. Sin embargo, su autoritarismo y medidas centralistas generaron oposición.

### Figuras clave
- **Bernardo O'Higgins Riquelme:** Director Supremo, impulsor de la independencia y la organización republicana inicial.
- **José de San Martín:** General argentino, líder del Ejército Libertador de los Andes, figura clave en las independencias de Chile y Perú.
- **José Miguel Carrera:** Líder radical de la Patria Vieja, impulsor de los primeros símbolos patrios.
- **Manuel Rodríguez:** Guerrillero y héroe de la Reconquista, símbolo de la resistencia patriota.
- **Fray Camilo Henríquez:** Periodista, escritor y sacerdote, fundador de La Aurora de Chile, difusor de las ideas ilustradas.

### 📺 Videos recomendados
- [Historia de la INDEPENDENCIA de CHILE - Resumen | Cuaderno de Historia](https://youtu.be/ex5KqTKzYZA)

### 🔗 Enlaces útiles
- [Wikipedia - Independencia de Chile](https://es.wikipedia.org/wiki/Independencia_de_Chile)
- [Currículum Nacional - Independencia de Chile](https://www.curriculumnacional.cl/portal/Ejes/Historia-Geografia-y-Ciencias-Sociales/Historia/18233:HI06-OA-01)
- [Unitips - Causas y consecuencias de la Independencia de Chile](https://blog.unitips.cl/independencia-de-chile)`,
    },
  })
  const hT2 = await prisma.topic.create({
    data: {
      moduleId: hMod1.id, name: "Organización de la República", slug: "organizacion-republica", order: 2,
      content: `## Organización de la República (1823-1830)

Este período abarca desde la abdicación de O'Higgins (1823) hasta el triunfo conservador en la Batalla de Lircay (1830), caracterizado por la inestabilidad política y los ensayos constitucionales.

### Periodo de Ensayos Constitucionales (1823-1830)

**Gobierno de O'Higgins (1817-1823):**
- O'Higgins enfrentó creciente oposición de la aristocracia criolla, la Iglesia y los sectores federalistas.
- Abdicó forzadamente el 28 de enero de 1823, exiliándose al Perú.
- Su legado incluye la abolición de los mayorazgos y títulos nobiliarios, la creación de la Escuela Militar y el inicio de obras de infraestructura.

**Gobierno de Ramón Freire (1823-1826):**
- Líder del bando federalista, enfrentó el caos económico y político.
- **Abolición definitiva de la esclavitud (1823):** Chile se convirtió en el segundo país de América en abolir la esclavitud (tras Haití).
- Invasión y toma del archipiélago de Chiloé (1826), último bastión español en Chile.

**Ensayos constitucionales:**
- **Constitución Moralista (1823):** Redactada por Juan Egaña, de carácter fuertemente moralizante y autoritario. Establecía un "Poder Moral" y un "Poder Conservador". Nunca entró plenamente en vigencia.
- **Leyes Federales (1826):** Inspiradas en el modelo estadounidense, dividieron Chile en ocho provincias autónomas. Fracasaron por falta de tradición federal y recursos.
- **Constitución Liberal (1828):** Redactada por José Joaquín de Mora, establecía un régimen liberal con libertades públicas, soberanía popular, división de poderes y sufragio ampliado (aunque no universal).

**Bandos políticos:**
- **Pelucones (conservadores):** Defendían el orden tradicional, el centralismo, el rol de la Iglesia y un Ejecutivo fuerte. Representaban a la aristocracia terrateniente.
- **Pipiolos (liberales):** Promovían reformas liberales, federalismo y mayor participación política. Representaban a sectores medios y profesionales.
- **Estanqueros:** Grupo liderado por Diego Portales y los comerciantes del estanco del tabaco, buscaban orden y estabilidad por sobre cualquier ideología.

**Guerra Civil de 1829-1830:**
- Conflicto armado entre las facciones pipiola (gobierno de Francisco Antonio Pinto) y pelucona-estanquera.
- **Batalla de Lircay (17 de abril de 1830):** Victoria decisiva de los conservadores liderados por José Joaquín Prieto, con Portales como ideólogo. Fin del periodo de ensayos constitucionales.

### República Conservadora o Portaliana (1830-1861)

**Diego Portales:**
- Figura central del orden conservador, aunque nunca fue presidente. Ejerció como ministro de Guerra, Interior y Relaciones Exteriores.
- **Ideas portalians:** "Orden, autoridad, respeto a la ley". Priorizó la estabilidad política sobre la libertad.
- "El orden social se mantiene por el peso de la noche": los ciudadanos deben obedecer sin discutir.

**Constitución de 1833:**
- Redactada por Mariano Egaña, estuvo vigente hasta 1925.
- **Características:** Régimen presidencialista fuerte, voto censitario (solo hombres propietarios o alfabetizados), religión católica oficial, Presidente duraba 5 años con reelección inmediata, poder ejecutivo con amplias atribuciones (veto, nombramiento de jueces, Estado de Sitio).
- Estableció un Estado unitario y centralizado.

**Gobiernos conservadores:**
- **José Joaquín Prieto (1831-1841):** Primer gobierno conservador. Pacificación del país.
- **Guerra contra la Confederación Perú-Boliviana (1836-1839):** Chile declaró la guerra a la confederación liderada por Andrés de Santa Cruz, considerándola una amenaza. Triunfo chileno en la Batalla de Yungay (1839), disolución de la confederación.
- **Manuel Bulnes (1841-1851):** Época de expansión cultural. Fundación de la Universidad de Chile (1842) bajo la rectoría de Andrés Bello. Inicio de la colonización del sur (Llanquihue) con inmigrantes alemanes.
- **Manuel Montt (1851-1861):** Continuó la obra modernizadora. Promulgación del Código Civil (1855, obra de Andrés Bello). Desarrollo del ferrocarril. Enfrentó revoluciones en 1851 y 1859.

### 📺 Videos recomendados
- [Formación de la República en Chile - Puntaje Nacional PAES](https://youtu.be/LhV8_0ipE14)

### 🔗 Enlaces útiles
- [Wikipedia - Organización de la República (Chile)](https://es.wikipedia.org/wiki/Organizaci%C3%B3n_de_la_Rep%C3%BAblica_(Chile))
- [Wikipedia - Constitución de 1833](https://es.wikipedia.org/wiki/Constituci%C3%B3n_de_1833)
- [Memoria Chilena - Periodo de Ensayos Constitucionales](http://www.memoriachilena.gob.cl/602/w3-article-3606.html)`,
    },
  })
  const hT3 = await prisma.topic.create({
    data: {
      moduleId: hMod1.id, name: "República Liberal", slug: "republica-liberal", order: 3,
      content: `## República Liberal (1861-1891)

La República Liberal marcó el ascenso del pensamiento liberal al poder, con reformas que limitaron el poder presidencial, laicizaron el Estado y expandieron las libertades públicas.

### Gobiernos liberales
- **José Joaquín Pérez (1861-1871):** Primer presidente liberal (fusionado con sectores conservadores moderados). Gobiernos de "conciliación".
- **Federico Errázuriz Zañartu (1871-1876):** Su gobierno inició las reformas liberales. Reforma constitucional que prohibió la reelección inmediata (1871).
- **Aníbal Pinto (1876-1881):** Enfrentó la crisis económica de 1876 y gestionó el inicio de la Guerra del Pacífico.
- **Domingo Santa María (1881-1886):** Impulsó las Leyes Laicas. Continuó la Guerra del Pacífico en su fase final.
- **José Manuel Balmaceda (1886-1891):** Último presidente liberal. Su enfrentamiento con el Congreso desencadenó la Guerra Civil de 1891.

### Reformas liberales

**Reformas constitucionales y políticas:**
- Reforma de 1871: Prohibición de la reelección inmediata del Presidente.
- Reforma de 1874: Reducción del quórum parlamentario, ampliación del sufragio (aunque seguía siendo censitario), limitación de las facultades del Ejecutivo para declarar Estado de Sitio.
- Libertad de asociación y de reunión.

**Leyes Laicas (1883-1884):**
- **Ley de Cementerios Laicos (1883):** Creación de cementerios públicos no confesionales, quitando a la Iglesia el control exclusivo de los entierros.
- **Ley de Matrimonio Civil (1884):** Estableció que el matrimonio ante el Estado es el único válido legalmente, quitando a la Iglesia la jurisdicción sobre esta materia.
- **Ley de Registro Civil (1884):** Creó un registro estatal de nacimientos, matrimonios y defunciones, reemplazando los registros parroquiales.
- Estas leyes representaron la primera gran separación Iglesia-Estado en Chile.

### Conflictos

**Guerra del Pacífico (1879-1883):**
- Causas: Disputa por el control de los recursos salitreros en el desierto de Atacama.
- Chile vs. Perú y Bolivia.
- **Campañas:** Campaña marítima (Combate de Iquique, 21 de mayo de 1879, heroísmo de Arturo Prat), Campaña de Tarapacá, Campaña de Tacna y Arica (Toma del Morro de Arica), Campaña de Lima.
- **Consecuencias:** Chile incorporó Antofagasta (Bolivia) y Tarapacá y Arica (Perú). Bolivia perdió su acceso soberano al mar.

**Ocupación de la Araucanía (1861-1883):**
- Incorporación del territorio mapuche al Estado chileno mediante acción militar y fundación de ciudades (Angol, Temuco, Villarrica).
- Significó la pérdida de tierras y autonomía del pueblo mapuche.

**Guerra Civil de 1891:**
- Conflicto entre el presidente José Manuel Balmaceda y el Congreso Nacional por las facultades presupuestarias.
- Triunfo del Congreso. Balmaceda se suicidó en la embajada argentina.
- Inicio del régimen parlamentario.

### 📺 Videos recomendados
- [La Guerra del Pacífico - Resumen - Academia Play](https://youtu.be/FNM2g3q28YI)

### 🔗 Enlaces útiles
- [Wikipedia - República Liberal (Chile)](https://es.wikipedia.org/wiki/Rep%C3%BAblica_Liberal_(Chile))
- [Wikipedia - Guerra del Pacífico](https://es.wikipedia.org/wiki/Guerra_del_Pac%C3%ADfico)
- [Memoria Chilena - República Liberal](http://www.memoriachilena.gob.cl/602/w3-article-3607.html)`,
    },
  })
  const hT4 = await prisma.topic.create({
    data: {
      moduleId: hMod1.id, name: "Parlamentarismo", slug: "parlamentarismo", order: 4,
      content: `## Parlamentarismo (1891-1925)

El parlamentarismo fue un régimen político de facto que rigió en Chile entre la Guerra Civil de 1891 y la promulgación de la Constitución de 1925. Formalmente, la Constitución de 1833 (presidencialista) siguió vigente, pero se operó como un sistema parlamentario a través de prácticas políticas.

### Origen
- Triunfo del Congreso en la Guerra Civil de 1891.
- Se instauró un régimen donde el Parlamento (Congreso Nacional) predominaba sobre el Presidente de la República.
- El presidente quedó reducido a una figura decorativa, sin capacidad real de gobierno.

### Características clave

**1. Predominio del Congreso sobre el Ejecutivo:**
- El Presidente estaba subordinado al Congreso, que controlaba el presupuesto y aprobaba los nombramientos ministeriales.
- Los ministros respondían políticamente ante el Congreso, no ante el Presidente.

**2. Rotativa ministerial constante:**
- Los ministros cambiaban frecuentemente al perder la confianza del Congreso mediante interpelaciones y votos de censura.
- En 33 años hubo aproximadamente 100 gabinetes ministeriales, con una duración promedio de 4 meses.
- Esta inestabilidad impedía la implementación de políticas de largo plazo.

**3. "Gobierno de las combinaciones":**
- Alianzas fluctuantes y cambiantes entre partidos (Conservador, Liberal, Liberal Democrático, Radical, Nacional, Demócrata) para formar mayorías parlamentarias.
- Los partidos eran agrupaciones de notables, sin organización estable ni disciplina partidaria.
- El sistema fomentaba el clientelismo político y el intercambio de favores.

**4. Cohecho y fraude electoral:**
- La oligarquía controlaba las elecciones mediante el soborno directo (cohecho) y la falsificación de registros electorales.
- **"Pegote":** Inscripción fraudulenta de votantes fallecidos o inexistentes para aumentar el padrón electoral de un candidato.
- El sufragio seguía siendo restringido (censitario y masculino), lo que facilitaba la manipulación.

**5. Freno al desarrollo de leyes sociales:**
- El Congreso, dominado por la élite terrateniente y minera, bloqueó sistemáticamente las reformas laborales y sociales que demandaba la creciente clase obrera.
- Esta incapacidad para abordar la "cuestión social" generó un creciente desprestigio del sistema político.

### Consecuencias
- Inestabilidad ministerial crónica que paralizó la acción gubernamental.
- Incapacidad para abordar los problemas sociales (vivienda, salud, trabajo).
- Desprestigio del sistema político, los partidos y la clase política.
- Creciente presión social: huelgas, movilizaciones, formación de organizaciones obreras.

### Fin del sistema
- **Golpe de Estado de 1925:** Liderado por Carlos Ibáñez del Campo y Marmaduke Grove.
- **Promulgación de la Constitución de 1925:** Restauró un presidencialismo fuerte, separó la Iglesia del Estado, creó la Contraloría General de la República y estableció derechos sociales.
- Alessandri retornó del exilio y promulgó la nueva Constitución el 18 de septiembre de 1925.

### 📺 Videos recomendados
- [La Guerra Civil de 1891 - Cuaderno de Historia](https://youtu.be/zldHUZfMamk)

### 🔗 Enlaces útiles
- [Wikipedia - Parlamentarismo chileno](https://es.wikipedia.org/wiki/Parlamentarismo_chileno)
- [Memoria Chilena - Parlamentarismo](http://www.memoriachilena.gob.cl/602/w3-article-3608.html)
- [BCN - Historia Política del Parlamentarismo](https://www.bcn.cl/historiapolitica/hitos_periodo/periodo-parlamentario)`,
    },
  })

  // --- Módulo 2: Chile siglo XX ---
  const hT5 = await prisma.topic.create({
    data: {
      moduleId: hMod2.id, name: "Cuestión Social", slug: "cuestion-social", order: 1,
      content: `## Cuestión Social (1880-1920)

La "cuestión social" fue el conjunto de problemas sociales derivados de la industrialización, la urbanización acelerada y el crecimiento de la clase obrera en Chile entre fines del siglo XIX y comienzos del XX.

### Definición y contexto
- La expresión fue acuñada en Europa a mediados del siglo XIX para referirse a los efectos negativos de la Revolución Industrial.
- En Chile, el fenómeno se manifestó con fuerza desde la década de 1880, impulsado por el auge salitrero en el norte, la expansión ferroviaria, el crecimiento urbano acelerado (Santiago, Valparaíso, Concepción) y la migración campo-ciudad.

### Problemas concretos

**Condiciones laborales inhumanas:**
- Jornadas de 12 a 16 horas diarias, incluso para mujeres y niños.
- Salarios miserables que no cubrían las necesidades básicas.
- Trabajo infantil generalizado desde los 6-7 años en fábricas, minas y salitreras.
- Accidentes laborales sin indemnización ni protección.
- No existía seguro médico, jubilación ni compensación por despido.

**Vivienda insalubre:**
- **Conventillos:** Viviendas hacinadas en ciudades, donde familias enteras vivían en una pieza de 3x4 m, sin ventilación, agua potable ni servicios sanitarios.
- En 1890, el 75% de la población de Santiago vivía en conventillos, propagando enfermedades como tuberculosis, tifus y cólera.

**Falta de seguridad social:**
- No existían leyes de accidentes del trabajo, seguro de desempleo, jubilación ni salud pública.
- Un trabajador accidentado quedaba en la miseria. Viudas y huérfanos quedaban desamparados.

**Consecuencias sociales:** Alcoholismo generalizado, desintegración familiar, altas tasas de mortalidad infantil (hasta 50% en sectores populares), prostitución.

### Actores y respuestas

**Movimiento obrero:**
- **Mancomunales (1890-1900):** Primeras organizaciones mutualistas de ayuda mutua.
- **Sociedades de resistencia (1900-1910):** Organizaciones anarquistas que promovían la huelga y acción directa.
- **FOCH (Federación Obrera de Chile, 1909):** Primera gran central sindical.
- **IWW en Chile (1919):** Corriente sindical revolucionaria de origen estadounidense.

**Huelgas y represión:**
- **Huelga del puerto de Valparaíso (1903):** Represión con saldo de muertos.
- **Huelga de la carne (1905):** Protesta masiva en Santiago contra el aumento del precio de la carne. Más de 200 muertos.
- **Matanza de la Escuela Santa María de Iquique (21 dic 1907):** Obreros del salitre acribillados por el ejército. Entre 2.000 y 3.600 muertos. Peor masacre obrera en la historia de Chile.
- **Matanza de San Gregorio (1921):** Represión a obreros salitreros.

**La Iglesia y la cuestión social:**
- **Encíclica Rerum Novarum (1891):** El Papa León XIII llamó a mejorar la condición de los trabajadores, criticando tanto al capitalismo salvaje como al socialismo.

### Primeras leyes sociales
- Descanso dominical (1907)
- Sillas para empleadas de comercio / Ley de la silla (1914)
- Accidentes del trabajo (1916)
- Protección a la maternidad obrera (1917)
- Contrato de trabajo (1919)

### Conexión con el Parlamentarismo
La incapacidad del régimen parlamentario para abordar la cuestión social fue una de las causas principales de su desprestigio y caída en 1925.

### 📺 Videos recomendados
- [Matanza de la Escuela Santa María de Iquique - Cuaderno de Historia](https://youtu.be/H49pC7wBvZY)

### 🔗 Enlaces útiles
- [Wikipedia - Cuestión social en Chile](https://es.wikipedia.org/wiki/Cuesti%C3%B3n_social_en_Chile)
- [Wikipedia - Matanza de la Escuela Santa María de Iquique](https://es.wikipedia.org/wiki/Matanza_de_la_Escuela_Santa_Mar%C3%ADa_de_Iquique)
- [Memoria Chilena - La Cuestión Social](http://www.memoriachilena.gob.cl/602/w3-article-3609.html)`,
    },
  })
  const hT6 = await prisma.topic.create({
    data: {
      moduleId: hMod2.id, name: "Constitución de 1925 y Estado de Compromiso", slug: "constitucion-1925", order: 2,
      content: `## Constitución de 1925 y Estado de Compromiso

### Constitución de 1925
Elaborada bajo el gobierno de Arturo Alessandri Palma tras el golpe militar de 1925, que puso fin al parlamentarismo.

**Características principales:**
- **Restableció el presidencialismo fuerte:** El Presidente recuperó el control del gabinete ministerial y la iniciativa legislativa.
- **Separación de la Iglesia y el Estado:** Chile dejó de tener una religión oficial. Libertad de culto.
- **Derechos sociales:** Por primera vez una Constitución chilena incorporó derechos sociales (trabajo, salud, educación), aunque con aplicación gradual.
- **Creación de la Contraloría General de la República:** Órgano autónomo encargado de controlar la legalidad de los actos administrativos y la gestión fiscal.
- **Duración:** Formalmente vigente hasta 1980, pero de facto operó hasta el golpe de 1973.

### Estado de Compromiso (1932-1973)

Sistema político chileno caracterizado por la representación y negociación de los principales sectores sociales (clase obrera, clase media, empresarios) a través de partidos políticos. El Estado actuaba como mediador.

**Características:**
- Sistema de partidos amplio: Conservador, Liberal, Radical, Socialista, Comunista, Demócrata Cristiano (desde 1957).
- Negociación y compromiso entre élites políticas.
- El Estado asumió un rol activo en la economía y el bienestar social.
- Sufragio femenino desde 1949 (primeras elecciones con voto femenino en 1952).

**Gobiernos radicales (1938-1952):**
- **Pedro Aguirre Cerda (1938-1941):** "Gobernar es educar". Creación de CORFO (1939) para impulsar la industrialización. Construcción de escuelas.
- **Juan Antonio Ríos (1942-1946):** Continuó la industrialización. Chile rompió con el Eje en la Segunda Guerra Mundial. Impulso a la siderurgia (Huachipato) y energía (ENDESA).
- **Gabriel González Videla (1946-1952):** Ley de Defensa Permanente de la Democracia (Ley Maldita, 1948) que ilegalizó al Partido Comunista. Ley de Sufragio Femenino (1949).

**Gobierno de Carlos Ibáñez (1952-1958):** Campaña populista. Giro represivo. Creación del Banco del Estado (1953).

**Gobierno de Jorge Alessandri (1958-1964):** Liberal-conservador. Primera Ley de Reforma Agraria (1962).

**Gobierno de Eduardo Frei Montalva (1964-1970):** "Revolución en Libertad". Reforma Agraria, chilenización del cobre (51% estatal), sindicalización campesina, promoción popular.

**Crisis del Estado de Compromiso:** Polarización política, movilización social creciente, estancamiento económico, inflación, radicalización de los proyectos políticos.

### 📺 Videos recomendados
- [Los Gobiernos Radicales (1938-1952) - Cuaderno de Historia](https://youtu.be/eOq0A6F_8dI)

### 🔗 Enlaces útiles
- [Wikipedia - Constitución de 1925](https://es.wikipedia.org/wiki/Constituci%C3%B3n_de_1925)
- [Wikipedia - Estado de Compromiso](https://es.wikipedia.org/wiki/Estado_de_compromiso)
- [Memoria Chilena - Gobiernos Radicales](http://www.memoriachilena.gob.cl/602/w3-article-3611.html)`,
    },
  })
  const hT7 = await prisma.topic.create({
    data: {
      moduleId: hMod2.id, name: "Gobierno de Salvador Allende", slug: "gobierno-allende", order: 3,
      content: `## Gobierno de Salvador Allende (1970-1973)

El gobierno de Salvador Allende representa el primer intento en el mundo de construir una sociedad socialista por la vía democrática e institucional, conocido como la "vía chilena al socialismo".

### Contexto
- **Triunfo electoral:** Allende ganó la elección presidencial del 4 de septiembre de 1970 con el 36.6% de los votos como candidato de la Unidad Popular (UP).
- Al no alcanzar mayoría absoluta, su elección fue ratificada por el Congreso Nacional tras un acuerdo con la Democracia Cristiana que incluía un Estatuto de Garantías Constitucionales.

### Programa de la Unidad Popular

**Nacionalizaciones:**
- **Nacionalización del cobre (11 de julio de 1971):** Aprobada por unanimidad del Congreso Nacional. El Estado tomó el control de Chuquicamata, El Teniente, Salvador y Andina.
- Nacionalización de la banca privada nacional y extranjera.
- Estatización de industrias estratégicas: textil, siderúrgica (CAP), cemento, nitratos.

**Reforma Agraria:**
- Aceleración drástica de la expropiación de latifundios iniciada por Frei.
- Se expropiaron más de 6 millones de hectáreas en tres años.

**Política social:**
- Medio litro de leche diario para todos los niños y niñas del país.
- Campaña de alfabetización masiva.
- Salud pública gratuita y universal.

### Problemas y oposición

**Oposición política:** Congreso con mayoría opositora (DC y PN). Prensa opositora (El Mercurio, canal 13) en campaña de desestabilización.

**Intervención de Estados Unidos:**
- La administración Nixon y la CIA financiaron a la oposición, medios de comunicación y gremios.
- Bloqueo económico y financiero internacional.
- La ITT conspiró activamente contra Allende.

**Crisis económica:**
- Inflación descontrolada (600% anual en 1973).
- Desabastecimiento y mercado negro.
- Paro de transportistas de octubre de 1972 (financiado por la CIA).

**Polarización social:** Tomas de fundos y fábricas, marchas de las "cacerolas vacías", tensión extrema.

### Desenlace
- **Golpe de Estado del 11 de septiembre de 1973:** Bombardeo de La Moneda.
- **Muerte de Allende:** Se suicidó en La Moneda cumpliendo su promesa de no rendirse.
- Inicio de la dictadura militar que duraría 17 años.

### 📺 Videos recomendados
- [La Batalla de Chile - Parte 1 (Documental)](https://youtu.be/yarS-ifaHI8)
- [La Batalla de Chile - Parte 2 (Documental)](https://youtu.be/ivp_bg1ImnQ)
- [Salvador Allende - Discurso en la Universidad de Guadalajara](https://youtu.be/qGyqUznMXhs)

### 🔗 Enlaces útiles
- [Wikipedia - Gobierno de Salvador Allende](https://es.wikipedia.org/wiki/Gobierno_de_Salvador_Allende)
- [Wikipedia - Golpe de Estado en Chile de 1973](https://es.wikipedia.org/wiki/Golpe_de_Estado_en_Chile_de_1973)
- [Memoria Chilena - La Unidad Popular](http://www.memoriachilena.gob.cl/602/w3-article-3615.html)`,
    },
  })
  const hT8 = await prisma.topic.create({
    data: {
      moduleId: hMod2.id, name: "Dictadura Militar y Transición", slug: "dictadura-transicion", order: 4,
      content: `## Dictadura Militar (1973-1990) y Transición a la Democracia

### Dictadura Militar

**Régimen de facto:**
- Tras el golpe del 11 de septiembre de 1973, se instauró una Junta Militar (Pinochet, Merino, Leigh, Mendoza).
- Pinochet concentró el poder, autodesignándose Presidente en 1974.
- Se disolvió el Congreso, se prohibieron los partidos políticos y se impuso control total de la prensa.

**Represión sistemática:**
- Violaciones masivas a los DD.HH.: detención ilegal, tortura, ejecuciones, desaparición forzada.
- **Informe Valech (2004):** 35.000 casos de prisión política y tortura.
- **Detenidos desaparecidos:** Más de 1.000 personas.
- **Exilio:** Cientos de miles de chilenos.
- **Órganos represivos:** DINA (1974-1977) y CNI. Operación Cóndor.

**Constitución de 1980:**
- Aprobada en plebiscito irregular (sin registros electorales ni libertad de prensa).
- Consagró el modelo neoliberal y el rol subsidiario del Estado.
- "Enclaves autoritarios": senadores designados, sistema binominal, rol tutelar de las FF.AA.

**Reformas económicas neoliberales:**
- **Chicago Boys:** Economistas de la Universidad de Chicago.
- Privatizaciones masivas (más de 500 empresas estatales).
- Apertura comercial (aranceles reducidos al 10%).
- Liberalización de precios y mercados.
- Reforma previsional (AFP, 1981) y de salud (ISAPRES, 1981).

**Crisis de 1982-1983:**
- PIB cayó 14%, desempleo superó 20%.
- Protestas nacionales (1983-1986) lideradas por la Asamblea de la Civilidad.

### Transición a la Democracia

**Plebiscito de 1988:**
- La oposición se unió en la Concertación de Partidos por el No.
- **Resultado:** No obtuvo 55.99% de los votos.
- Pinochet aceptó el resultado y convocó a elecciones.

**Gobierno de Patricio Aylwin (1990-1994):**
- Primer gobierno de la Concertación.
- **Informe Rettig (1991):** Investigó violaciones a los DD.HH. con resultado de muerte.
- Reformas tributarias para aumentar el gasto social.

**Gobiernos de la Concertación:**
- **Eduardo Frei Ruiz-Tagle (1994-2000):** Modernización, TLC.
- **Ricardo Lagos (2000-2006):** Reforma procesal penal, Reforma AUGE/GES, Ley de divorcio (2004).
- **Michelle Bachelet (2006-2010):** Primera mujer presidenta. Reforma previsional (Pilar Solidario). Transantiago.`,

    },
  })

  // --- Módulo 3: Formación Ciudadana ---
  const hT9 = await prisma.topic.create({
    data: {
      moduleId: hMod3.id, name: "Constitución y Estado de Derecho", slug: "constitucion-estado-derecho", order: 1,
      content: `## Constitución y Estado de Derecho

### Constitución
La Constitución es la norma fundamental que organiza el poder del Estado, establece los límites de su ejercicio y garantiza los derechos fundamentales de las personas. Es la norma de mayor jerarquía en el ordenamiento jurídico (principio de supremacía constitucional).

**Constitución chilena vigente (1980):**
- Aprobada en 1980 y reformada en múltiples ocasiones: 1989, 2005 (eliminación de senadores designados y fin del rol tutelar de las FF.AA.) y reformas posteriores.
- Establece un Estado unitario, no federal.
- Régimen presidencial: el Presidente es Jefe de Estado y Jefe de Gobierno.
- Contiene un catálogo de derechos fundamentales (Artículo 19).
- Consagra el rol subsidiario del Estado en materia económica.

### Estado de Derecho
Principio fundamental donde todos, gobernantes y gobernados, están sometidos a la ley. Nadie está por encima de la ley.

**Elementos esenciales:**
- **División de poderes:** Separación orgánica y funcional del poder en tres ramas independientes que se controlan mutuamente.
- **Principio de legalidad:** Toda actuación del Estado debe estar autorizada por la ley.
- **Jerarquía normativa:** Constitución > tratados internacionales > leyes > decretos > resoluciones.
- **Derechos fundamentales:** El Estado debe respetarlos y promoverlos.
- **Control de constitucionalidad:** Tribunal Constitucional.

### Estructura del Estado chileno

**Poder Ejecutivo:**
- Presidente de la República (jefe de Estado y de gobierno), elegido por 4 años sin reelección inmediata.
- Ministros de Estado, Delegados presidenciales regionales y provinciales.

**Poder Legislativo:**
- Congreso Nacional bicameral: Cámara de Diputados (155 miembros) y Senado (50 miembros).

**Poder Judicial:**
- Tribunales de justicia: Juzgados de Letras, Cortes de Apelaciones, Corte Suprema.
- Independencia judicial y principio de inexcusabilidad.

**Órganos autónomos:**
- Contraloría General de la República, Banco Central, Tribunal Constitucional, Ministerio Público, Defensoría Penal Pública, INDH.

### 📺 Videos recomendados
- [Los 3 Poderes del Estado chileno - MINEDUC](https://youtu.be/owpz1Bf7oN0)

### 🔗 Enlaces útiles
- [Wikipedia - Constitución chilena de 1980](https://es.wikipedia.org/wiki/Constituci%C3%B3n_chilena_de_1980)
- [BCN - Constitución Política de la República](https://www.bcn.cl/leychile/navegar?idNorma=242302)
- [INDH - Instituto Nacional de Derechos Humanos](https://www.indh.cl/)`,
    },
  })
  const hT10 = await prisma.topic.create({
    data: {
      moduleId: hMod3.id, name: "Derechos Humanos", slug: "derechos-humanos", order: 2,
      content: `## Derechos Humanos

### Concepto
Los derechos humanos son facultades, libertades y atributos inherentes a toda persona por su dignidad humana, reconocidos y garantizados por el ordenamiento jurídico nacional e internacional. Son universales, inalienables, indivisibles e interdependientes.

### Generaciones de DD.HH.

**Primera generación (civiles y políticos):**
Surgen con las revoluciones burguesas (s. XVIII).
- Derecho a la vida, libertad e integridad personal.
- Libertad de expresión, conciencia y religión.
- Derecho al voto.
- Derecho a la propiedad privada.
- Derecho a un juicio justo y debido proceso.

**Segunda generación (económicos, sociales y culturales - DESC):**
Surgen con las demandas del movimiento obrero (s. XIX-XX).
- Derecho al trabajo digno y a la sindicalización.
- Derecho a la salud.
- Derecho a la educación.
- Derecho a la vivienda.
- Derecho a la seguridad social.

**Tercera generación (solidaridad o derechos colectivos):**
Surgen en la segunda mitad del siglo XX.
- Derecho al desarrollo.
- Derecho a un medio ambiente sano.
- Derecho a la paz.
- Derecho a la autodeterminación de los pueblos.

### Instrumentos internacionales

**Sistema Universal (ONU):**
- Declaración Universal de los Derechos Humanos (1948).
- Pacto Internacional de Derechos Civiles y Políticos (1966).
- Pacto Internacional de Derechos Económicos, Sociales y Culturales (1966).

**Sistema Interamericano (OEA):**
- Declaración Americana de los Derechos y Deberes del Hombre (1948).
- Convención Americana sobre Derechos Humanos (Pacto de San José, 1969).
- Comisión Interamericana de DD.HH. (CIDH) y Corte Interamericana (Corte IDH).

### Derechos Humanos en Chile

**Mecanismos nacionales:**
- Artículo 19 de la Constitución: catálogo de derechos fundamentales.
- Recurso de protección y recurso de amparo.
- Instituto Nacional de Derechos Humanos (INDH, 2010).
- Defensoría de la Niñez (2018).

**Comisiones de verdad:**
- Informe Rettig (1991): violaciones con resultado de muerte.
- Informe Valech (2004): prisión política y tortura.

### 📺 Videos recomendados
- [Derechos Humanos: Primera, Segunda y Tercera Generación - Academia Play](https://youtu.be/J6j7t7-uWok)

### 🔗 Enlaces útiles
- [Wikipedia - Derechos humanos](https://es.wikipedia.org/wiki/Derechos_humanos)
- [Wikipedia - Derechos humanos en Chile](https://es.wikipedia.org/wiki/Derechos_humanos_en_Chile)
- [INDH - Instituto Nacional de Derechos Humanos](https://www.indh.cl/)`,
    },
  })
  const hT11 = await prisma.topic.create({
    data: {
      moduleId: hMod3.id, name: "Participación Ciudadana", slug: "participacion-ciudadana", order: 3,
      content: `## Participación Ciudadana

La participación ciudadana es el conjunto de mecanismos mediante los cuales los ciudadanos inciden en las decisiones públicas, fiscalizan la gestión del Estado y contribuyen a la construcción de políticas públicas.

### Mecanismos de participación en Chile

**Voto:**
- Derecho y deber constitucional de todo ciudadano mayor de 18 años.
- **Voto voluntario desde 2012** (Ley 20.568), antes era obligatorio.
- **Inscripción automática** en el SERVEL.
- Voto en el extranjero para elecciones presidenciales (desde 2017).

**Plebiscito:**
- Consulta nacional o comunal para someter una decisión política a votación popular.
- Plebiscitos históricos: 1925 (nueva Constitución), 1988 (continuidad de Pinochet), 2020 (nueva Constitución), 2022 y 2023 (procesos constituyentes).

**Iniciativa popular de ley:** Mecanismo para que ciudadanos presenten proyectos de ley (no implementado plenamente).

**Cuenta pública:** Obligación del Presidente de informar al país (1 de junio de cada año).

**Presupuestos participativos:** Mecanismos municipales donde los vecinos deciden parte del gasto comunal.

### Partidos políticos
Organizaciones que representan intereses y programas de gobierno. Funcionan como intermediarios entre la sociedad y el Estado.

**Funciones:** Reclutar candidatos, formular programas, canalizar demandas, formar opinión pública, fiscalizar autoridades.

**Sistema de partidos en Chile:** PC, PS, PPD, DC (centroizquierda); RN, UDI (centroderecha); FA, Republicano, PDG, Evópoli, PL (emergentes).

### Organizaciones de la sociedad civil
- Sindicatos, juntas de vecinos, centros de padres, centros de estudiantes, ONGs, asociaciones gremiales.

### Sistema electoral
- **Sistema proporcional (método D'Hondt, desde 2015):** Reemplazó al sistema binominal (1989-2013) que favorecía a las dos grandes coaliciones.
- 28 distritos (Cámara) y 16 circunscripciones (Senado).
- Ley de cuotas de género (máximo 60% de un género en candidaturas).
- Financiamiento electoral regulado: prohibidos los aportes empresariales (desde 2016).

### 📺 Videos recomendados
- [Sistema Electoral Chileno - MINEDUC](https://youtu.be/QFSJ_ztf4Lc)
- [¿Qué es el Sistema D'Hondt? - Academia Play](https://youtu.be/MdhS3QYv_Js)

### 🔗 Enlaces útiles
- [Wikipedia - Participación ciudadana](https://es.wikipedia.org/wiki/Participaci%C3%B3n_ciudadana)
- [SERVEL - Servicio Electoral de Chile](https://www.servel.cl/)
- [BCN - Participación Ciudadana en Chile](https://www.bcn.cl/formacioncivica/participacion_ciudadana)`,
    },
  })

  // --- Módulo 4: Sistema Económico ---
  const hT12 = await prisma.topic.create({
    data: {
      moduleId: hMod4.id, name: "Conceptos Económicos Fundamentales", slug: "conceptos-economicos", order: 1,
      content: `## Conceptos Económicos Fundamentales

### Economía
Ciencia social que estudia cómo las sociedades administran recursos escasos para satisfacer necesidades humanas que son ilimitadas.

**Microeconomía:** Estudio de decisiones de agentes individuales (hogares, empresas) y mercados específicos.
**Macroeconomía:** Estudio de la economía en su conjunto (crecimiento, inflación, desempleo).

### Agentes económicos
- **Familias:** Consumen bienes y servicios, ofrecen trabajo. Dueñas de factores productivos.
- **Empresas:** Producen bienes y servicios, demandan trabajo. Buscan maximizar beneficios.
- **Estado:** Regula, provee bienes públicos, redistribuye el ingreso, estabiliza la economía.
- **Sector externo:** Relaciones comerciales y financieras con otros países.

### Factores productivos
- **Tierra:** Recursos naturales (minerales, tierra, agua, bosques).
- **Trabajo:** Esfuerzo humano aplicado a la producción.
- **Capital:** Bienes producidos usados para producir (maquinaria, herramientas, edificios).
- **Capital humano:** Conocimientos, habilidades y experiencia de los trabajadores.

### Mercado
Espacio donde oferentes y demandantes intercambian bienes y servicios.

**Tipos de mercado:**
- **Competencia perfecta:** Muchos oferentes y demandantes, productos homogéneos. Nadie influye en el precio.
- **Monopolio:** Un solo oferente, fija el precio.
- **Oligopolio:** Pocos oferentes que pueden coludirse.
- **Competencia monopolística:** Muchos oferentes con productos diferenciados.

### Ley de oferta y demanda
- **Oferta:** A mayor precio, mayor cantidad ofrecida (relación directa).
- **Demanda:** A mayor precio, menor cantidad demandada (relación inversa).
- **Precio de equilibrio:** Punto donde oferta = demanda.

### Indicadores económicos

**PIB (Producto Interno Bruto):**
- Valor de todos los bienes y servicios finales producidos en un país.
- PIB nominal (precios corrientes) vs. PIB real (precios constantes, ajustado por inflación).
- PIB per cápita = PIB / población.

**Inflación:**
- Aumento sostenido del nivel general de precios.
- **IPC (Índice de Precios al Consumidor):** Mide variación de precios de una canasta fija de bienes.
- Causas: Exceso de demanda, aumento de costos, emisión monetaria.

**Desempleo:**
- Porcentaje de la fuerza laboral sin trabajo que busca activamente.
- Tipos: friccional, estructural, cíclico.

**Tasa de interés:**
- Precio del dinero. La TPM (Tasa de Política Monetaria) la fija el Banco Central.

### 📺 Videos recomendados
- [Oferta y Demanda en 10 minutos - Academia Play](https://youtu.be/Wn0OGztLbnk)

### 🔗 Enlaces útiles
- [Wikipedia - Economía](https://es.wikipedia.org/wiki/Econom%C3%ADa)
- [Wikipedia - Producto Interno Bruto](https://es.wikipedia.org/wiki/Producto_interno_bruto)
- [Banco Central de Chile](https://www.bcentral.cl/)`,
    },
  })
  const hT13 = await prisma.topic.create({
    data: {
      moduleId: hMod4.id, name: "Modelo Económico Chileno", slug: "modelo-economico-chileno", order: 2,
      content: `## Modelo Económico Chileno

El modelo económico chileno actual es resultado de las reformas estructurales implementadas durante la dictadura militar (1975 en adelante) y mantenidas (con ajustes) por los gobiernos democráticos posteriores.

### Origen: El modelo neoliberal

**Chicago Boys:**
- Economistas chilenos formados en la Universidad de Chicago bajo Milton Friedman.
- Asumieron el control de la política económica desde 1975.
- Objetivo: reemplazar el modelo de industrialización sustitutiva de importaciones (ISI) por uno de libre mercado.

**Reformas estructurales (1975-1989):**
- **Privatizaciones:** Más de 500 empresas estatales vendidas al sector privado.
- **Apertura comercial:** Aranceles reducidos de más de 100% a un 10% uniforme.
- **Liberalización de precios.**
- **Reforma previsional (1981):** AFP, capitalización individual.
- **Reforma de salud (1981):** ISAPRES.
- **Liberalización financiera.**
- **Reforma laboral:** Debilitamiento sindical, flexibilización del despido.

### Elementos clave del modelo

**Banco Central autónomo (desde 1989):** Controla la inflación mediante política monetaria. Prohibido financiar al fisco.

**AFP:** Ahorro individual obligatorio (10% del salario). Críticas: bajas pensiones, altas comisiones.

**ISAPRES:** Sistema privado de salud. Críticas: selección adversa, costos elevados, segmentación.

**Apertura comercial:** Chile tiene TLC con EE.UU., China, UE, Japón, Corea, etc.

**Tipo de cambio flotante:** El valor del peso se determina en el mercado de divisas.

### Fortalezas y debilidades

**Fortalezas:**
- Crecimiento sostenido (5% anual promedio 1990-2010).
- Reducción de pobreza: de 38.6% (1990) a ~8% actual.
- Estabilidad macroeconómica (baja inflación, finanzas ordenadas).
- Grado de inversión.

**Debilidades:**
- Alta desigualdad (Gini elevado entre países OCDE).
- Endeudamiento de las familias.
- Bajas pensiones del sistema AFP.
- Concentración de mercados (oligopolios).
- Precarización laboral.
- Sistema de salud segmentado.

### Política fiscal
- **Regla de balance estructural:** Ahorrar en bonanza para gastar en crisis.
- **FEES (Fondo de Estabilización Económica y Social, 2006):** Ahorro de excedentes del cobre.
- **FRP (Fondo de Reserva de Pensiones).**

### 📺 Videos recomendados
- [Los Chicago Boys y el Neoliberalismo en Chile - Cuaderno de Historia](https://youtu.be/RAzQTYeR47w)

### 🔗 Enlaces útiles
- [Wikipedia - Modelo económico de Chile](https://es.wikipedia.org/wiki/Modelo_econ%C3%B3mico_de_Chile)
- [Wikipedia - Chicago Boys](https://es.wikipedia.org/wiki/Chicago_Boys)
- [Banco Central de Chile](https://www.bcentral.cl/)`,
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
      content: `## Extracción de Información Explícita

La extracción de información explícita consiste en identificar y recuperar datos, ideas o detalles que aparecen de manera directa y literal en un texto. No requiere interpretación, inferencia ni juicio crítico; solo localizar la información tal como está escrita.

### ¿Qué preguntas busca responder?
- "Según el texto, ¿cuándo ocurrió X evento?"
- "El autor menciona que... ¿cuál es la causa?"
- "¿Qué significa la palabra X en el primer párrafo?"
- "¿Cuántas personas participaron según el texto?"
- "¿Dónde se realizó la actividad descrita?"

### Estrategias específicas

**1. Identificar palabras clave en la pregunta:**
- Lee la pregunta y subraya las palabras más importantes (nombres propios, fechas, lugares, cifras).
- Busca esas mismas palabras (o sinónimos directos) en el texto.

**2. Escaneo (scanning):**
- Técnica de lectura rápida que busca información específica sin leer palabra por palabra.
- Desplaza la vista rápidamente por el texto buscando la palabra clave.
- Especialmente útil en textos con datos numéricos, fechas o nombres.

**3. Localización por paráfrasis:**
- A veces la respuesta no usa las mismas palabras exactas, sino sinónimos.
- Ejemplo: Pregunta: "¿Qué beneficio obtenían los trabajadores?" Texto: "Los operarios recibían como ventaja..." → "beneficio" = "ventaja", "trabajadores" = "operarios".

**4. Distinción entre información principal y secundaria:**
- Identifica qué datos son centrales y cuáles son detalles accesorios o ejemplos.

### Tipos de texto
- **Expositivos:** artículos científicos, enciclopedias, manuales, noticias.
- **Instructivos:** recetas, manuales de uso, reglamentos.
- **Narrativos:** cuentos, novelas, crónicas (personajes, tiempo, espacio, acciones).
- **Argumentativos:** columnas de opinión, editoriales (datos y citas explícitas).

### 📺 Videos recomendados
- [Estrategias de Comprensión Lectora - Puntaje Nacional PAES](https://youtu.be/dTq6p2VYKT0)

### 🔗 Enlaces útiles
- [Wikipedia - Comprensión lectora](https://es.wikipedia.org/wiki/Comprensi%C3%B3n_lectora)
- [Currículum Nacional - Competencia Lectora PAES](https://www.curriculumnacional.cl/614/articles-318458_recurso_1.pdf)`,
    },
  })
  const lT2 = await prisma.topic.create({
    data: {
      moduleId: lMod2.id, name: "Comprensión e Inferencia", slug: "comprension-inferencia", order: 1,
      content: `## Comprensión e Inferencia

La comprensión e inferencia implica ir más allá de la información explícita para entender el significado profundo del texto, establecer relaciones entre ideas y extraer conclusiones que no están escritas directamente.

### Diferencia entre información explícita e implícita

| Información explícita | Información implícita / inferida |
|---|---|
| Está escrita directamente | No está escrita, se deduce |
| Se localiza (no se interpreta) | Se interpreta (no se localiza) |
| Ej: "Eran las 3 de la tarde" | Ej: "El sol estaba en lo más alto" → es mediodía |

### Habilidades inferenciales

**1. Identificar ideas principales y secundarias:**
- Idea principal = mensaje central o tesis del texto.
- Ideas secundarias = detalles, ejemplos, explicaciones que apoyan la idea principal.

**2. Establecer relaciones lógicas:**
- **Causa-efecto:** "porque", "ya que", "debido a", "por lo tanto", "en consecuencia".
- **Problema-solución:** conflicto y alternativas de solución.
- **Comparación-contraste:** "similarmente", "a diferencia de", "mientras que".
- **Secuencia temporal:** "primero", "luego", "después", "finalmente".

**3. Realizar inferencias:**
- Sacar conclusiones no escritas explícitamente pero deducibles lógicamente.
- **Inferencia pragmática:** intención del hablante.
- **Inferencia causal:** causas no mencionadas a partir de efectos descritos.
- Ejemplo: "María tomó un paraguas" → inferencia: "estaba lloviendo o había probabilidad de lluvia".

**4. Determinar el propósito comunicativo del autor:**
- **Informativo:** entregar datos objetivos (expositivos, noticias).
- **Persuasivo:** convencer al lector (argumentativos, publicidad).
- **Estético:** crear experiencia artística (poesía, cuentos literarios).
- **Apelativo:** llamar a la acción (propaganda, discursos).

**5. Analizar la estructura textual:**
- **Narrativo:** personajes, conflicto, tiempo, espacio. Inicio-desarrollo-desenlace.
- **Argumentativo:** tesis-argumentos-conclusión.
- **Expositivo:** introducción-desarrollo-conclusión.
- **Dialogado:** conversaciones (teatro, entrevistas).
- **Descriptivo:** características de personas, objetos, lugares.

### 📺 Videos recomendados
- [Cómo hacer inferencias al leer - MINEDUC](https://youtu.be/3LBQvV3kOoE)

### 🔗 Enlaces útiles
- [Wikipedia - Inferencia](https://es.wikipedia.org/wiki/Inferencia)
- [Currículum Nacional - Lectura Comprensiva](https://www.curriculumnacional.cl/portal/Ejes/Lenguaje-y-Comunicacion)`,
    },
  })
  const lT3 = await prisma.topic.create({
    data: {
      moduleId: lMod3.id, name: "Evaluación Crítica", slug: "evaluacion-critica", order: 1,
      content: `## Evaluación Crítica

La evaluación crítica es la habilidad lectora de más alto nivel. Implica emitir juicios fundamentados sobre el texto, evaluar la calidad de su argumentación, identificar sesgos y manipulación, y reflexionar sobre el contenido desde una perspectiva personal y contextual.

### Habilidades de evaluación crítica

**1. Evaluar la calidad de la argumentación:**
- **Solidez de las evidencias:** ¿Los datos son verificables? ¿Las fuentes son confiables?
- **Pertinencia de los ejemplos:** ¿Realmente apoyan la tesis o son anecdóticos?
- **Suficiencia de la información:** ¿Hay suficiente evidencia o se generaliza a partir de casos aislados?
- **Razonamiento lógico:** ¿Las conclusiones se siguen de las premisas?

**2. Identificar la intención del emisor y el público objetivo:**
- ¿El autor es parcial u objetivo? ¿Qué intereses puede tener?
- ¿A quién va dirigido? ¿Lenguaje accesible o excluyente?
- ¿Busca informar, persuadir, manipular, entretener?

**3. Detectar sesgos, falacias o manipulación:**

**Sesgos comunes:**
- **Sesgo de confirmación:** Solo evidencias que apoyan la postura del autor.
- **Sesgo político o ideológico:** Alineado con una visión del mundo sin explicitarlo.
- **Sesgo cultural o etnocéntrico:** Juzgar otras culturas desde los valores propios.

**Falacias argumentativas:**
- **Ad hominem:** Atacar a la persona, no al argumento.
- **Falsa causalidad:** Asumir que porque A ocurrió antes que B, A causó B.
- **Falso dilema:** Solo dos opciones cuando hay más.
- **Generalización apresurada:** Conclusión general a partir de casos insuficientes.
- **Apelación a la autoridad:** Cita fuera de contexto.
- **Pendiente resbaladiza:** Un paso pequeño lleva inevitablemente a una catástrofe.
- **Petición de principio:** Argumento circular.

**Manipulación:**
- Lenguaje emotivo o cargado.
- Omisión selectiva de información.
- Repetición para generar familiaridad.
- Apelación al miedo o esperanza sin evidencia.

**4. Valorar recursos lingüísticos:**
- Figuras retóricas (metáforas, ironía, sátira, hipérbole).
- Tono (objetivo, sarcástico, solemne, informal, agresivo).
- Registro (formal/informal, técnico/divulgativo).

**5. Relacionar el texto con conocimientos previos:**
- ¿Coincide con lo que sabes? ¿Hay contradicciones con otras fuentes?

**6. Comparar distintas perspectivas sobre un mismo tema:**
- ¿Cómo aborda el mismo tema otro autor? ¿Hay consenso o controversia?

### 📺 Videos recomendados
- [Falacias Argumentativas - Academia Play](https://youtu.be/u3tGxb3JFTA)

### 🔗 Enlaces útiles
- [Wikipedia - Pensamiento crítico](https://es.wikipedia.org/wiki/Pensamiento_cr%C3%ADtico)
- [Wikipedia - Falacia](https://es.wikipedia.org/wiki/Falacia)
- [Currículum Nacional - Competencia Lectora PAES](https://www.curriculumnacional.cl/614/articles-318458_recurso_1.pdf)`,
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

### Números enteros (ℤ)
Son los números positivos, negativos y el cero: ..., -3, -2, -1, 0, 1, 2, 3, ...

**Operaciones básicas:**
- **Suma y resta:** Signos iguales se suman y conservan el signo. Signos diferentes se restan y se coloca el signo del número de mayor valor absoluto. Ej: (-5) + (-3) = -8; (-7) + 4 = -3.
- **Multiplicación y división:** Regla de signos: (+) × (+) = (+); (+) × (-) = (-); (-) × (-) = (+). Ej: (-4) × 3 = -12; (-6) × (-2) = 12.

**Propiedades:** Cerradura, conmutatividad, asociatividad, distributividad, elemento neutro (0 suma, 1 multiplicación).

**Jerarquía de operaciones (PEMDAS):**
1. Paréntesis y corchetes (de adentro hacia afuera)
2. Exponentes y potencias
3. Multiplicación y división (izquierda a derecha)
4. Adición y sustracción (izquierda a derecha)

### Números racionales (ℚ)
Fracciones a/b donde b ≠ 0. Incluyen enteros (3 = 3/1), fracciones y decimales finitos o periódicos.

**Operaciones con fracciones:**
- **Suma y resta:** Denominador común (MCM). Ej: 2/3 + 3/4 = 8/12 + 9/12 = 17/12
- **Multiplicación:** Numerador × numerador, denominador × denominador. Ej: 2/3 × 4/5 = 8/15
- **División:** Multiplicar por el recíproco. Ej: 2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6

**Comparación:** Multiplicación cruzada: a/b vs c/d → a × d vs c × b. Ej: 3/4 vs 2/3 → 9 > 8 → 3/4 > 2/3

### Porcentajes
- Porcentaje = (parte / total) × 100%
- Aumento: valor × (1 + %/100). Ej: $30.000 + 15% → 30.000 × 1.15 = $34.500
- Disminución: valor × (1 - %/100). Ej: $30.000 - 15% → 30.000 × 0.85 = $25.500
- Variación porcentual: ((Final - Inicial) / Inicial) × 100

### 📺 Videos recomendados
- [Números Enteros: regla de signos - JulioProfe](https://youtu.be/FhSxBLc8eGg)
- [Fracciones: suma y resta - JulioProfe](https://youtu.be/0We7n_qjj2M)

### 🔗 Enlaces útiles
- [Wikipedia - Número entero](https://es.wikipedia.org/wiki/N%C3%BAmero_entero)
- [Wikipedia - Número racional](https://es.wikipedia.org/wiki/N%C3%BAmero_racional)
- [Khan Academy - Aritmética (español)](https://es.khanacademy.org/math/arithmetic)`,
    },
  })
  const m1T2 = await prisma.topic.create({
    data: {
      moduleId: m1Mod2.id, name: "Ecuaciones y Proporcionalidad", slug: "ecuaciones", order: 1,
      content: `## Ecuaciones y Proporcionalidad

### Ecuaciones de primer grado
Forma: ax + b = c, donde a ≠ 0. Solución: x = (c - b)/a.

**Ejemplo:** 3x + 5 = 20 → 3x = 15 → x = 5

**Con paréntesis:** 2(x + 3) = 14 → 2x + 6 = 14 → x = 4

**Con denominadores:** Multiplicar por el MCM.
Ej: x/2 + x/3 = 5 → (3x + 2x)/6 = 5 → 5x = 30 → x = 6

### Sistemas de ecuaciones lineales

**Método de sustitución:**
Despejar una variable en una ecuación, reemplazarla en la otra.
Ej: x + y = 7 → y = 7 - x; x - y = 3 → x - (7 - x) = 3 → x = 5, y = 2

**Método de igualación:**
Despejar la misma variable en ambas ecuaciones e igualar.
Ej: x = 7 - y, x = 3 + y → 7 - y = 3 + y → y = 2, x = 5

**Método de reducción:**
Multiplicar para eliminar una variable sumando/restanto.
Ej: x + y = 7 / x - y = 3 → sumando: 2x = 10 → x = 5, y = 2

### Proporcionalidad

**Razón:** a/b. **Proporción:** a/b = c/d → a × d = b × c

**Proporcionalidad directa:** y = kx. Si x aumenta, y aumenta.
- Regla de tres directa: a → b, c → x → x = (b × c)/a

**Proporcionalidad inversa:** y = k/x o x × y = k. Si x aumenta, y disminuye.
- Regla de tres inversa: a → b, c → x → x = (a × b)/c

**Ejemplo directa:** 3 kg cuestan $2.400 → 5 kg cuestan (2400/3) × 5 = $4.000
**Ejemplo inversa:** 3 obreros tardan 12 días → 6 obreros tardan (3 × 12)/6 = 6 días

### 📺 Videos recomendados
- [Ecuaciones de primer grado - JulioProfe](https://youtu.be/31JTn5ADGks)
- [Sistemas de ecuaciones (sustitución) - JulioProfe](https://youtu.be/-qW8CKU23k0)

### 🔗 Enlaces útiles
- [Wikipedia - Ecuación de primer grado](https://es.wikipedia.org/wiki/Ecuaci%C3%B3n_de_primer_grado)
- [Wikipedia - Proporcionalidad](https://es.wikipedia.org/wiki/Proporcionalidad)
- [Khan Academy - Álgebra (español)](https://es.khanacademy.org/math/algebra)`,
    },
  })
  const m1T3 = await prisma.topic.create({
    data: {
      moduleId: m1Mod3.id, name: "Áreas y Perímetros", slug: "areas-perimetros", order: 1,
      content: `## Áreas y Perímetros

### Figuras planas

| Figura | Perímetro | Área |
|---|---|---|
| **Cuadrado** (lado a) | P = 4a | A = a² |
| **Rectángulo** (lados a, b) | P = 2(a + b) | A = a × b |
| **Triángulo** (base b, altura h) | P = a + b + c | A = (b × h) / 2 |
| **Círculo** (radio r) | P = 2πr | A = πr² |
| **Rombo** (diagonales D, d) | P = 4a | A = (D × d) / 2 |
| **Trapecio** (bases B, b; altura h) | P = B + b + lados | A = ((B + b) × h) / 2 |

### Teorema de Pitágoras
En un triángulo rectángulo: **c² = a² + b²** (c = hipotenusa)
- c = √(a² + b²); a = √(c² - b²)
- Triple pitagórico clásico: (3, 4, 5) porque 9 + 16 = 25

**Ejemplo:** Catetos 6 cm y 8 cm → h = √(36 + 64) = √100 = 10 cm

### Volúmenes
| Cuerpo | Volumen |
|---|---|
| Cubo (arista a) | V = a³ |
| Paralelepípedo (lados a, b, c) | V = a × b × c |
| Cilindro (radio r, altura h) | V = πr² × h |
| Esfera (radio r) | V = (4/3)πr³ |
| Cono (radio r, altura h) | V = (1/3)πr² × h |

### 📺 Videos recomendados
- [Áreas y perímetros - JulioProfe](https://youtu.be/lH3FK7tFt2s)
- [Teorema de Pitágoras - JulioProfe](https://youtu.be/6o3xFs7ffU0)

### 🔗 Enlaces útiles
- [Wikipedia - Geometría](https://es.wikipedia.org/wiki/Geometr%C3%ADa)
- [Wikipedia - Teorema de Pitágoras](https://es.wikipedia.org/wiki/Teorema_de_Pit%C3%A1goras)
- [Khan Academy - Geometría (español)](https://es.khanacademy.org/math/geometry)`,
    },
  })
  const m1T4 = await prisma.topic.create({
    data: {
      moduleId: m1Mod4.id, name: "Estadística Descriptiva", slug: "estadistica", order: 1,
      content: `## Estadística Descriptiva

### Medidas de tendencia central

**Media aritmética (promedio):** x̄ = (suma de datos) / (cantidad de datos)
- **Media ponderada:** x̄ = (Σ xᵢwᵢ) / (Σ wᵢ)

**Mediana:** Valor central cuando los datos están ordenados.
- Si n es impar: valor en posición (n+1)/2.
- Si n es par: promedio de los dos valores centrales.
- Ventaja: no afectada por valores extremos.

**Moda:** Valor que más se repite. Puede ser unimodal, bimodal o multimodal.

### Medidas de posición
- **Cuartiles:** Q1 (25%), Q2 = mediana (50%), Q3 (75%).
- **Rango intercuartil (IQR):** Q3 - Q1. Mide dispersión del 50% central.
- **Percentiles:** Pk deja el k% de los datos por debajo.

### Tablas y gráficos

**Tabla de frecuencias:**
| Dato | Frecuencia absoluta (f) | Frecuencia relativa (fr) | Frecuencia acumulada (F) |
|---|---|---|---|
| x₁ | f₁ | fr₁ = f₁/n | F₁ = f₁ |
| ... | ... | ... | ... |

**Gráficos:**
- **Barras:** Compara categorías discretas.
- **Histograma:** Datos continuos agrupados en intervalos.
- **Circular (torta):** Proporción de cada categoría.
- **Boxplot:** Mínimo, Q1, mediana, Q3, máximo y outliers.

### 📺 Videos recomendados
- [Medidas de tendencia central - JulioProfe](https://youtu.be/ISp00YpBF7g)

### 🔗 Enlaces útiles
- [Wikipedia - Estadística descriptiva](https://es.wikipedia.org/wiki/Estad%C3%ADstica_descriptiva)
- [Khan Academy - Estadística (español)](https://es.khanacademy.org/math/statistics-probability)`,
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

### Función lineal: f(x) = mx + n
- **m = pendiente:** Tasa de cambio. Indica la inclinación de la recta.
  - m > 0: recta creciente; m < 0: recta decreciente; m = 0: recta horizontal.
- **n = intercepto con el eje Y:** Punto donde la recta cruza el eje vertical (0, n).
- Fórmula de la pendiente: m = (y₂ - y₁) / (x₂ - x₁)

### Función cuadrática: f(x) = ax² + bx + c
- Gráfica: parábola. Si a > 0 abre hacia arriba (mínimo), si a < 0 abre hacia abajo (máximo).
- **Vértice:** Punto máximo o mínimo de la parábola.
  - x_v = -b / (2a)
  - y_v = f(x_v)
- **Discriminante:** Δ = b² - 4ac
  - Δ > 0 → dos raíces reales distintas
  - Δ = 0 → una raíz real (raíz doble)
  - Δ < 0 → sin raíces reales (raíces complejas)
- **Eje de simetría:** Recta vertical x = x_v

**Ejemplo:** f(x) = x² - 4x + 3
- x_v = 4/2 = 2; f(2) = 4 - 8 + 3 = -1 → vértice: (2, -1)
- Δ = 16 - 12 = 4 > 0 → dos raíces reales
- Raíces: x = (4 ± 2)/2 → x = 3, x = 1

### 📺 Videos recomendados
- [Función Lineal - JulioProfe](https://youtu.be/m3Adb4soetU)
- [Función Cuadrática - JulioProfe](https://youtu.be/tGt6Odi0Zq0)

### 🔗 Enlaces útiles
- [Wikipedia - Función lineal](https://es.wikipedia.org/wiki/Funci%C3%B3n_lineal)
- [Wikipedia - Función cuadrática](https://es.wikipedia.org/wiki/Funci%C3%B3n_cuadr%C3%A1tica)
- [Khan Academy - Funciones (español)](https://es.khanacademy.org/math/algebra)`,
    },
  })
  const m2T2 = await prisma.topic.create({
    data: {
      moduleId: m2Mod2.id, name: "Razones Trigonométricas", slug: "razones-trigonometricas", order: 1,
      content: `## Trigonometría

### Razones trigonométricas en un triángulo rectángulo
- **sen(θ)** = cateto opuesto / hipotenusa
- **cos(θ)** = cateto adyacente / hipotenusa
- **tan(θ)** = cateto opuesto / cateto adyacente

**Relación fundamental:** tan(θ) = sen(θ) / cos(θ)

### Identidad fundamental
**sen²(θ) + cos²(θ) = 1** (válida para cualquier ángulo θ)

### Ángulos notables
| Ángulo | sen | cos | tan |
|---|---|---|---|
| 0° | 0 | 1 | 0 |
| 30° | 1/2 | √3/2 | √3/3 |
| 45° | √2/2 | √2/2 | 1 |
| 60° | √3/2 | 1/2 | √3 |
| 90° | 1 | 0 | ∞ |

### Teoremas para triángulos no rectángulos

**Teorema del seno:** a/sen(A) = b/sen(B) = c/sen(C) = 2R (R = radio circunferencia circunscrita)

**Teorema del coseno:** a² = b² + c² - 2bc · cos(A)
- Útil cuando se conocen dos lados y el ángulo entre ellos, o los tres lados.

### 📺 Videos recomendados
- [Razones Trigonométricas - JulioProfe](https://youtu.be/gRhsg7sQGuU)
- [Teorema del Seno y Coseno - JulioProfe](https://youtu.be/MR_6RG9TF_E)

### 🔗 Enlaces útiles
- [Wikipedia - Trigonometría](https://es.wikipedia.org/wiki/Trigonometr%C3%ADa)
- [Wikipedia - Razones trigonométricas](https://es.wikipedia.org/wiki/Raz%C3%B3n_trigonom%C3%A9trica)
- [Khan Academy - Trigonometría (español)](https://es.khanacademy.org/math/trigonometry)`,
    },
  })
  const m2T3 = await prisma.topic.create({
    data: {
      moduleId: m2Mod3.id, name: "Probabilidad Condicional", slug: "probabilidad-condicional", order: 1,
      content: `## Probabilidad Avanzada

### Probabilidad condicional
Probabilidad de que ocurra A dado que ya ocurrió B:
**P(A|B) = P(A ∩ B) / P(B)**, donde P(B) > 0.

### Eventos independientes
Dos eventos son independientes si la ocurrencia de uno no afecta la probabilidad del otro:
**P(A ∩ B) = P(A) · P(B)**

### Teorema de Bayes
Permite actualizar la probabilidad de un evento A dado que ocurrió B:
**P(A|B) = P(B|A) · P(A) / P(B)**

Este teorema es fundamental en estadística inferencial, diagnósticos médicos y machine learning.

### Combinatoria

**Principio multiplicativo:** Si una tarea tiene m formas de hacerse y otra n formas, ambas juntas tienen m × n formas.

**Permutaciones (orden importa):**
- **Permutación de n elementos:** P(n) = n! (factorial de n)
- **Variaciones (sin repetición):** V(n,k) = n! / (n - k)!
- Ej: ¿De cuántas formas se pueden ordenar 3 libros en un estante? P(3) = 3! = 6

**Combinaciones (orden no importa):**
- **Combinaciones de n en k:** C(n,k) = n! / (k! (n - k)!)
- También se escribe como (n choose k) o coeficiente binomial.
- Ej: ¿Cuántos grupos de 2 personas se pueden formar con {A, B, C}? C(3,2) = 3! / (2!·1!) = 3

### 📺 Videos recomendados
- [Probabilidad Condicional - JulioProfe](https://youtu.be/o-x9k98E2Ak)
- [Combinaciones y Permutaciones - Matemóvil](https://youtu.be/x8wFfFQVm_U)

### 🔗 Enlaces útiles
- [Wikipedia - Probabilidad condicional](https://es.wikipedia.org/wiki/Probabilidad_condicionada)
- [Wikipedia - Combinatoria](https://es.wikipedia.org/wiki/Combinatoria)
- [Khan Academy - Probabilidad (español)](https://es.khanacademy.org/math/statistics-probability)`,
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

### Teoría celular
La teoría celular es uno de los fundamentos de la biología moderna:
1. Todos los seres vivos están formados por una o más células.
2. La célula es la unidad básica de estructura y función de los seres vivos.
3. Todas las células provienen de células preexistentes (división celular).

### Tipos de células

**Procariotas (pro = antes, karyon = núcleo):**
- Sin núcleo definido. El material genético (ADN) está disperso en el citoplasma (nucleoide).
- Sin organelos membranosos internos.
- Ejemplos: bacterias (Escherichia coli), arqueas.
- Generalmente más pequeñas (1-5 μm).

**Eucariotas (eu = verdadero, karyon = núcleo):**
- Con núcleo definido rodeado por una membrana nuclear.
- Poseen organelos membranosos (mitocondrias, retículo endoplasmático, aparato de Golgi).
- Pueden ser:
  - **Animales:** Sin pared celular ni cloroplastos. Con centríolos.
  - **Vegetales:** Con pared celular de celulosa y cloroplastos. Con vacuola central grande.
  - **Hongos:** Con pared celular de quitina.
  - **Protistas:** Grupo diverso (algas, amebas, paramecios).

### Organelos celulares

| Organelo | Función principal |
|---|---|
| **Núcleo** | Contiene el ADN, controla la actividad celular |
| **Mitocondrias** | Producción de ATP (energía) mediante respiración celular |
| **Cloroplastos** | Fotosíntesis (solo en células vegetales) |
| **Membrana plasmática** | Regula el paso de sustancias (bicapa lipídica) |
| **Retículo endoplasmático** | Síntesis de proteínas (RE rugoso) y lípidos (RE liso) |
| **Aparato de Golgi** | Modifica, empaca y distribuye proteínas |
| **Ribosomas** | Síntesis de proteínas |
| **Lisosomas** | Digestión celular |
| **Vacuola** | Almacenamiento y mantenimiento de presión (grande en vegetales) |
| **Pared celular** | Soporte y protección (vegetales, hongos, bacterias) |

### 📺 Videos recomendados
- [La Célula: Procariota vs Eucariota - La Hiperactina](https://youtu.be/URUJD5NEXC8)

### 🔗 Enlaces útiles
- [Wikipedia - Célula](https://es.wikipedia.org/wiki/C%C3%A9lula)
- [Wikipedia - Teoría celular](https://es.wikipedia.org/wiki/Teor%C3%ADa_celular)
- [Khan Academy - Biología celular (español)](https://es.khanacademy.org/science/biology)`,
    },
  })
  const cT2 = await prisma.topic.create({
    data: {
      moduleId: cMod2.id, name: "Átomos y Enlaces", slug: "atomos-enlaces", order: 1,
      content: `## Química: Átomos y Enlaces

### Estructura atómica
El átomo es la unidad básica de la materia. Está compuesto por:
- **Protones (+):** Partículas con carga positiva en el núcleo.
- **Neutrones (0):** Partículas sin carga en el núcleo.
- **Electrones (-):** Partículas con carga negativa que orbitan el núcleo en niveles de energía.

**Número atómico (Z):** Cantidad de protones en el núcleo. Identifica al elemento.
**Masa atómica (A):** Suma de protones + neutrones (A = Z + N).
**Isótopos:** Átomos del mismo elemento con distinto número de neutrones (mismo Z, distinto A).

Ejemplo: Carbono-12: Z = 6, A = 12 (6 protones, 6 neutrones).

### Tabla periódica
Organización de los elementos químicos por número atómico creciente.
- **Períodos (filas):** Indican el nivel de energía de los electrones externos.
- **Grupos (columnas):** Elementos con el mismo número de electrones de valencia (propiedades químicas similares).
  - Grupo 1: Metales alcalinos (muy reactivos).
  - Grupo 17: Halógenos.
  - Grupo 18: Gases nobles (estables, no reactivos).

### Enlaces químicos

**1. Enlace iónico:**
- Transferencia de electrones de un metal a un no metal.
- El metal dona electrones (se vuelve catión +) y el no metal los acepta (se vuelve anión -).
- Atracción electrostática entre iones de carga opuesta.
- Ejemplo: NaCl (cloruro de sodio). Na⁺ dona un electrón a Cl⁻.
- Propiedades: Altos puntos de fusión, solubles en agua, conducen electricidad en disolución.

**2. Enlace covalente:**
- Compartición de electrones entre dos no metales.
- **Covalente simple:** Comparten un par de electrones (H₂, Cl₂).
- **Covalente doble:** Comparten dos pares (O₂, CO₂).
- **Covalente triple:** Comparten tres pares (N₂).
- **Covalente polar:** Electrones compartidos desigualmente (H₂O, HCl).
- **Covalente apolar:** Electrones compartidos equitativamente (H₂, O₂).
- Propiedades: Puntos de fusión variables, pueden ser solubles o no.

**3. Enlace metálico:**
- Electrones libres que se mueven entre una red de cationes metálicos.
- Ejemplo: Fe, Cu, Al, Au.
- Propiedades: Buenos conductores de calor y electricidad, maleables, dúctiles, brillantes.

### 📺 Videos recomendados
- [Enlace Químico: Iónico, Covalente y Metálico - Amigos de la Química](https://youtu.be/NLdUjNQjE-o)

### 🔗 Enlaces útiles
- [Wikipedia - Enlace químico](https://es.wikipedia.org/wiki/Enlace_qu%C3%ADmico)
- [Wikipedia - Tabla periódica](https://es.wikipedia.org/wiki/Tabla_peri%C3%B3dica_de_los_elementos)
- [Khan Academy - Química (español)](https://es.khanacademy.org/science/chemistry)`,
    },
  })
  const cT3 = await prisma.topic.create({
    data: {
      moduleId: cMod3.id, name: "Movimiento y Fuerzas", slug: "movimiento-fuerzas", order: 1,
      content: `## Física: Movimiento y Fuerzas

### Leyes de Newton

**1. Primera ley (Ley de inercia):**
Un cuerpo permanece en estado de reposo o movimiento rectilíneo uniforme a menos que una fuerza externa actúe sobre él.
- La inercia es la resistencia de un cuerpo a cambiar su estado de movimiento.
- A mayor masa, mayor inercia.

**2. Segunda ley (Ley de fuerza):**
**F = m · a** (Fuerza = masa × aceleración)
- La fuerza neta aplicada a un objeto es directamente proporcional a su aceleración.
- La aceleración tiene la misma dirección que la fuerza neta.
- Unidad de fuerza: Newton (N) = kg · m/s²

**3. Tercera ley (Ley de acción y reacción):**
Por cada fuerza de acción, existe una fuerza de reacción igual en magnitud y opuesta en dirección.
- Las fuerzas siempre ocurren en pares.
- Ejemplo: Al empujar una pared, la pared empuja con la misma fuerza.

### Movimiento rectilíneo uniforme (MRU)
- Velocidad constante: v = d / t
- Aceleración = 0
- Ejemplo: Un auto que viaja a 80 km/h en línea recta sin variar su velocidad.

### Movimiento uniformemente acelerado (MUA)
- Aceleración constante.
- **Ecuaciones:**
  - v_f = v_i + a · t
  - d = v_i · t + (1/2) · a · t²
  - v_f² = v_i² + 2a · d

**Caída libre:** La aceleración de gravedad (g) = 9.8 m/s² ≈ 10 m/s².
- v_f = g · t
- h = (1/2) · g · t²

**Ejemplo:** Un auto acelera de 0 a 20 m/s en 5 segundos.
a = (20 - 0) / 5 = 4 m/s²

### 📺 Videos recomendados
- [Leyes de Newton - JulioProfe](https://youtu.be/C6Ny3w2zsqY)
- [MRU y MUA - JulioProfe](https://youtu.be/kFOGjnlFOjA)

### 🔗 Enlaces útiles
- [Wikipedia - Leyes de Newton](https://es.wikipedia.org/wiki/Leyes_de_Newton)
- [Wikipedia - Movimiento rectilíneo uniforme](https://es.wikipedia.org/wiki/Movimiento_rectil%C3%ADneo_uniforme)
- [Khan Academy - Física (español)](https://es.khanacademy.org/science/physics)`,
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
