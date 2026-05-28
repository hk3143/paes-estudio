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

La independencia de Chile fue el proceso histórico mediante el cual el territorio de la Capitanía General de Chile se emancipó del dominio del Imperio español, desarrollándose en el contexto más amplio de las guerras de independencia hispanoamericanas y del ciclo revolucionario atlántico que transformó el mundo occidental entre 1776 y 1825. Este proceso no fue un evento único sino un conjunto complejo de acontecimientos políticos, militares, sociales e ideológicos que se extendieron por más de una década, desde la formación de la Primera Junta Nacional de Gobierno el 18 de septiembre de 1810 hasta la abdicación de Bernardo O'Higgins como Director Supremo en 1823. La independencia chilena combinó elementos de guerra civil entre patriotas y realistas y entre facciones patriotas rivales, con una guerra internacional contra el Imperio español, y su desenlace dependió tanto de las condiciones internas como del contexto geopolítico sudamericano, particularmente de las campañas del Ejército Libertador de los Andes liderado por José de San Martín.

### Antecedentes y causas

**Crisis de la monarquía española:** El detonante inmediato del proceso independentista fue la invasión napoleónica a España en 1808. Napoleón Bonaparte forzó las abdicaciones de Carlos IV y Fernando VII en Bayona, colocando en el trono español a su hermano José Bonaparte. Esto generó un vacío de poder que desencadenó la formación de juntas de gobierno en España y, posteriormente, en las colonias americanas, que proclamaron mantener la soberanía en ausencia del rey legítimo.

**Pensamiento ilustrado:** A lo largo del siglo XVIII, las ideas de la Ilustración —difundidas a través de libros, viajes y la educación de la élite criolla— habían penetrado en la intelectualidad chilena. Autores como Montesquieu (El espíritu de las leyes), Rousseau (El contrato social), Voltaire y Adam Smith circularon entre la elite criolla. La Declaración de Independencia de los Estados Unidos (1776) y la Revolución Francesa (1789) ofrecieron modelos concretos de república y soberanía popular que inspiraron a los líderes independentistas.

**Descontento criollo:** Los criollos, descendientes de españoles nacidos en América, constituían la elite económica y social del reino, dueños de grandes extensiones de tierra, minas y fortunas comerciales. Sin embargo, estaban sistemáticamente excluidos de los altos cargos políticos, administrativos, militares y eclesiásticos, que la Corona reservaba para los peninsulares (españoles nacidos en España). Esta discriminación generó resentimiento y la demanda de mayor participación en el gobierno del reino.

**Factores económicos:** El monopolio comercial español limitaba severamente las posibilidades de desarrollo económico de la colonia. Chile solo podía comerciar legalmente con España y con otras colonias españolas mediante el sistema de flotas y puertos autorizados. Las guerras napoleónicas interrumpieron el comercio ultramarino y debilitaron la capacidad de control de la metrópoli.

### Etapas del proceso

**Patria Vieja (1810-1814):** El 18 de septiembre de 1810, el gobernador Mateo de Toro y Zambrano convocó un cabildo abierto en Santiago que resolvió constituir la Primera Junta Nacional de Gobierno. Pronto surgieron divisiones entre moderados (liderados por Juan Martínez de Rozas) y radicales (encabezados por José Miguel Carrera). El gobierno de Carrera (1811-1813) impulsó reformas significativas: creó la primera bandera y escudo nacional, inauguró la primera imprenta, fundó la Biblioteca Nacional y promulgó reglamentos constitucionales. La Batalla de Rancagua (1-2 de octubre de 1814), donde las tropas patriotas al mando de O'Higgins fueron derrotadas por Mariano Osorio, marcó el fin de este período y el inicio del exilio masivo de patriotas hacia Mendoza.

**Reconquista (1814-1817):** El gobierno español fue restaurado bajo Osorio y luego Casimiro Marcó del Pont, quien instauró un régimen represivo con persecuciones, confiscaciones y ejecuciones. Manuel Rodríguez lideró una eficaz guerrilla de hostigamiento que mantuvo viva la causa independentista. Mientras tanto, en Mendoza, el general José de San Martín organizó en secreto el Ejército Libertador de los Andes, planificando la reconquista de Chile como paso previo para la liberación del Perú.

**Patria Nueva (1817-1823):** En enero de 1817, el Ejército Libertador inició el Cruce de los Andes, una proeza logística que involucró a unos 5.000 soldados cruzando la cordillera por seis pasos distintos. La Batalla de Chacabuco (12 de febrero de 1817) fue una victoria decisiva, y la Batalla de Maipú (5 de abril de 1818) consolidó militarmente la independencia. La independencia fue declarada formalmente el 1 de enero de 1818. O'Higgins asumió como Director Supremo, impulsando reformas modernizadoras como la abolición de los títulos nobiliarios, la creación de la Legión al Mérito y la fundación de la Escuela Militar. Su estilo autoritario generó una creciente oposición que culminó con su abdicación forzada el 28 de enero de 1823.

### Figuras clave del proceso

| Personaje | Rol | Aporte principal |
|-----------|-----|------------------|
| José Miguel Carrera | Líder de la Patria Vieja | Símbolos patrios, imprenta, constituciones |
| Bernardo O'Higgins | Director Supremo | Consolidación militar, organización republicana |
| José de San Martín | General del Ejército Libertador | Cruce de los Andes, estrategia continental |
| Manuel Rodríguez | Guerrillero | Resistencia durante la Reconquista |
| Fray Camilo Henríquez | Periodista e ideólogo | La Aurora de Chile, difusión ilustrada |
| Mariano Osorio | Jefe realista | Victoria en Rancagua |
| Mateo de Toro y Zambrano | Gobernador | Convocatoria de la Primera Junta (1810) |

### Consecuencias

Políticamente, la independencia estableció las bases del Estado republicano, aunque la organización definitiva del país tomaría varias décadas más. Socialmente, mantuvo en gran medida la estructura jerárquica colonial, con la aristocracia criolla reemplazando a la elite peninsular en el control del poder. Económicamente, abrió a Chile al comercio internacional, particularmente con Gran Bretaña y Estados Unidos. Territorialmente, sentó las bases para la expansión futura del Estado chileno, incluyendo la incorporación de Chiloé (1826) y las reclamaciones sobre el estrecho de Magallanes.

 
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

El período de Organización de la República comprende los años entre la abdicación de Bernardo O'Higgins (1823) y el triunfo conservador en la Batalla de Lircay (1830). Esta etapa, también conocida como la época de los Ensayos Constitucionales, se caracterizó por una profunda inestabilidad política, el enfrentamiento entre facciones rivales (pipiolos, pelucones y estanqueros) y la búsqueda de una fórmula institucional estable que reemplazara al régimen colonial. Durante estos siete años, Chile experimentó múltiples constituciones, formas de gobierno y liderazgos, reflejando las tensiones entre centralismo y federalismo, autoritarismo y liberalismo. La incapacidad de consolidar un orden político duradero condujo a la Guerra Civil de 1829-1830, cuyo desenlace dio inicio a la República Conservadora o Portaliana.

### El legado de O'Higgins y la transición

La abdicación de O'Higgins en 1823 fue el resultado de múltiples presiones. Su gobierno autoritario, aunque modernizador, había generado el rechazo de la aristocracia terrateniente (afectada por la abolición de mayorazgos), de la Iglesia (por sus políticas laicizantes) y de los sectores liberales y federalistas que lo acusaban de dictatorial. Su exilio voluntario al Perú dejó un vacío de poder que ninguna facción pudo llenar fácilmente. El país enfrentaba además una grave crisis económica: las guerras de independencia habían agotado el erario y el comercio estaba desorganizado.

### Los gobiernos del período

**Ramón Freire y el federalismo (1823-1826):** Freire, líder del bando pipiolo (liberal), asumió como Director Supremo en un contexto de caos. Su administración logró la abolición definitiva de la esclavitud en 1823 (Chile fue el segundo país de América en hacerlo, tras Haití) y la anexión del archipiélago de Chiloé en 1826, el último reducto realista en el país. Sin embargo, su proyecto federalista fracasó por la falta de tradición federal y la escasez de recursos.

**Manuel Blanco Encalada y el ensayo federal (1826):** Tras la adopción de las Leyes Federales, Blanco Encalada se convirtió en el primer presidente de Chile (cargo creado para reemplazar al Director Supremo). Su gobierno duró solo siete meses, víctima de la inviabilidad del sistema federal que dividió al país en ocho provincias autónomas sin los recursos necesarios para sostenerse.

**Francisco Antonio Pinto y la Constitución Liberal (1827-1829):** Pinto representó el ala moderada del liberalismo. Su gobierno promulgó la Constitución Liberal de 1828, redactada por José Joaquín de Mora, de inspiración doctrinaria liberal avanzada. Establecía un sistema republicano representativo con división de poderes, soberanía popular y declaración de derechos individuales. Sin embargo, nunca logró consolidarse debido a la oposición conservadora y a la falta de apoyo militar.

### Los bandos políticos en pugna

| Bando | Ideología | Base social | Líderes |
|-------|-----------|-------------|---------|
| Pelucones | Conservadores, centralistas | Aristocracia terrateniente | José Joaquín Prieto, Diego Portales |
| Pipiolos | Liberales, reformistas | Profesionales, sectores medios | Ramón Freire, Francisco Antonio Pinto |
| Estanqueros | Pragmáticos, orden público | Comerciantes del estanco | Diego Portales, Manuel Rengifo |
| O'higginistas | Seguidores de O'Higgins | Militares, burócratas | Bernardo O'Higgins (exiliado) |

### Los ensayos constitucionales

La inestabilidad del período se reflejó en la multiplicidad de intentos constitucionales. La **Constitución Moralista de 1823**, redactada por Juan Egaña, establecía un Poder Moral encargado de velar por las costumbres y un Poder Conservador con facultades cuasidictatoriales; su carácter moralizante y autoritario la hizo impracticable. Las **Leyes Federales de 1826**, inspiradas en la Constitución de Estados Unidos, dividieron el país en ocho provincias con asambleas provinciales electas, pero fracasaron por la ausencia de recursos fiscales provinciales y la inexperiencia en el autogobierno. La **Constitución Liberal de 1828**, considerada una de las más avanzadas de su tiempo en Hispanoamérica, establecía un sistema presidencial moderado con garantías individuales extensas, pero nunca entró plenamente en vigencia.

### La Guerra Civil de 1829-1830

El conflicto armado estalló cuando los conservadores, liderados por José Joaquín Prieto y asesorados por Diego Portales, desconocieron la autoridad del gobierno liberal. La guerra culminó en la Batalla de Lircay (17 de abril de 1830), donde las fuerzas conservadoras derrotaron decisivamente al ejército pipiolo al mando de Ramón Freire. Esta victoria marcó el inicio de la República Conservadora (1830-1861), un período de tres décadas de estabilidad política bajo la hegemonía del pensamiento portaliano, que priorizaba el orden, la autoridad y el respeto a la ley por sobre la libertad política.

### Constitución de 1833

Redactada por Mariano Egaña, esta Constitución estuvo vigente hasta 1925 y estableció las bases del Estado chileno durante casi un siglo. Sus características principales fueron: régimen presidencialista fuerte (Presidente con amplias facultades, veto, nombramiento de jueces, Estado de Sitio, período de 5 años con reelección inmediata), voto censitario (limitado a hombres propietarios o alfabetizados), religión católica como oficial del Estado, y un Estado unitario y centralizado.

### Gobiernos conservadores

José Joaquín Prieto (1831-1841) consolidó la pacificación del país y enfrentó la Guerra contra la Confederación Perú-Boliviana (1836-1839), que culminó con el triunfo chileno en la Batalla de Yungay y la disolución de la confederación liderada por Andrés de Santa Cruz. Manuel Bulnes (1841-1851) inauguró una época de expansión cultural con la fundación de la Universidad de Chile (1842) bajo la rectoría de Andrés Bello y el inicio de la colonización del sur con inmigrantes alemanes en la región de Llanquihue. Manuel Montt (1851-1861) continuó la obra modernizadora con la promulgación del Código Civil (1855, obra de Andrés Bello), el desarrollo del ferrocarril y la fundación de nuevas ciudades, aunque enfrentó revoluciones en 1851 y 1859.
 
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

La República Liberal fue el período de la historia de Chile comprendido entre 1861 y 1891, durante el cual el pensamiento liberal accedió al poder político e impulsó un programa de reformas que transformaron las bases del Estado chileno. Este período se caracterizó por la limitación del poder presidencial heredado de la Constitución de 1833, la laicización del Estado, la expansión de las libertades públicas, la incorporación de nuevos territorios mediante la Guerra del Pacífico y la Ocupación de la Araucanía, y un notable desarrollo cultural e intelectual. La República Liberal terminó abruptamente con la Guerra Civil de 1891, que enfrentó al presidente José Manuel Balmaceda contra el Congreso, resultando en el inicio del régimen parlamentario.

### Gobiernos de la Fusión Liberal-Conservadora (1861-1873)

El período liberal comenzó con un gobierno de conciliación entre liberales moderados y conservadores pragmáticos. **José Joaquín Pérez (1861-1871)** presidió la transición, manteniendo un equilibrio que permitió las primeras reformas. **Federico Errázuriz Zañartu (1871-1876)** impulsó la primera gran reforma constitucional: la prohibición de la reelección inmediata del Presidente. **Aníbal Pinto (1876-1881)** enfrentó la crisis económica de 1876 y gestionó el inicio de la Guerra del Pacífico. **Domingo Santa María (1881-1886)** impulsó las Leyes Laicas y continuó la guerra en su fase final. **José Manuel Balmaceda (1886-1891)** fue el último presidente liberal; su enfrentamiento con el Congreso desencadenó la Guerra Civil de 1891.

### Las Leyes Laicas (1883-1884)

Constituyen el núcleo del programa de secularización liberal y representan la primera gran separación entre la Iglesia y el Estado en Chile. La **Ley de Cementerios Laicos (1883)** estableció que los cementerios públicos serían administrados por el Estado y estarían abiertos a todas las personas sin distinción de credo. La **Ley de Matrimonio Civil (1884)** determinó que el matrimonio celebrado ante el Estado era el único legalmente válido, desplazando a la Iglesia Católica de la jurisdicción sobre esta materia. La **Ley de Registro Civil (1884)** creó un servicio estatal de registro de nacimientos, matrimonios y defunciones, reemplazando los registros parroquiales que la Iglesia había mantenido desde la Colonia.

### Reformas constitucionales

Las reformas de 1874 redujeron el quórum parlamentario, ampliaron el sufragio (aunque seguía siendo censitario, basado en propiedad y alfabetización) y restringieron la facultad presidencial de declarar Estado de Sitio. Estas transformaciones fortalecieron al Congreso frente al Ejecutivo, sentando las bases institucionales para el posterior parlamentarismo.

### Guerra del Pacífico (1879-1883)

Fue el conflicto bélico más importante de la historia republicana de Chile. Las causas inmediatas fueron la disputa por los recursos salitreros en el desierto de Atacama. Chile se enfrentó a Perú y Bolivia. La guerra se desarrolló en varias campañas: la Campaña Marítima (Combate de Iquique, 21 de mayo de 1879, heroísmo de Arturo Prat), la Campaña de Tarapacá, la Campaña de Tacna y Arica (Toma del Morro de Arica), y la Campaña de Lima. Como consecuencias, Chile incorporó Antofagasta, Tarapacá y Arica, mientras Bolivia perdió su acceso soberano al mar.

### Ocupación de la Araucanía (1861-1883)

Este proceso de incorporación del territorio mapuche al Estado chileno se desarrolló mediante acción militar y fundación de ciudades (Angol, Temuco, Villarrica, Pucón). El Estado chileno ocupó más de 10 millones de hectáreas. La Pacificación de la Araucanía significó la pérdida definitiva de la autonomía territorial del pueblo mapuche y su incorporación forzada al sistema estatal chileno.

### Desarrollo cultural

La República Liberal fue también un período de florecimiento intelectual. La Universidad de Chile, bajo el rectorado de Andrés Bello, se consolidó como centro de la vida académica. Surgieron figuras literarias como Alberto Blest Gana (autor de Martín Rivas), José Victorino Lastarria, y los primeros historiadores profesionales como Diego Barros Arana y Benjamín Vicuña Mackenna.

### Guerra Civil de 1891

El conflicto final enfrentó a Balmaceda contra el Congreso, dominado por la oposición liberal y conservadora. Balmaceda buscaba un presidencialismo fuerte, pero su intento de imponer un presupuesto sin aprobación congresional desencadenó la guerra civil. Las fuerzas congresistas derrotaron al ejército balmacedista en las batallas de Concón y Placilla (agosto de 1891). Balmaceda se suicidó el 19 de septiembre de 1891. El triunfo del Congreso marcó el inicio del régimen parlamentario.
 
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

El parlamentarismo fue el régimen político de facto que rigió en Chile entre el triunfo del Congreso en la Guerra Civil de 1891 y la promulgación de la Constitución de 1925. Formalmente, la Constitución de 1833 —que establecía un régimen presidencialista— siguió vigente, pero en la práctica política se operó como un sistema parlamentario mediante convenciones y prácticas no escritas. Este período se caracterizó por el predominio absoluto del Congreso Nacional sobre el Presidente de la República, una rotativa ministerial constante que generó inestabilidad crónica, el control oligárquico del sistema político mediante el fraude electoral y el cohecho, y una creciente incapacidad para abordar los problemas sociales derivados de la industrialización, conocidos como la cuestión social. El desprestigio acumulado del sistema parlamentario condujo a su colapso tras el golpe militar de 1925.

### Origen y bases del sistema

La Guerra Civil de 1891 no fue solo un conflicto entre Balmaceda y el Congreso, sino el choque entre dos concepciones del Estado: el presidencialismo centralizador versus el parlamentarismo oligárquico. El triunfo del Congreso instaló un régimen donde el poder efectivo residía en el Parlamento. El Presidente quedó reducido a una figura decorativa, sometido a la voluntad de las mayorías parlamentarias cambiantes.

### Características del régimen

**Rotativa ministerial:** Entre 1891 y 1925 se sucedieron aproximadamente 100 gabinetes ministeriales, con una duración promedio de apenas 4 meses. Ningún ministerio logró completar su programa de gobierno. Los gabinetes cambiaban no por razones programáticas sino por el juego de combinaciones entre facciones parlamentarias, imposibilitando políticas de largo plazo.

**Gobierno de las combinaciones:** Los partidos políticos de la época —Conservador, Liberal, Liberal Democrático (balmacedista), Radical, Nacional (monttvarista) y Demócrata— eran agrupaciones de notables sin organización estable ni disciplina partidaria. Las alianzas se formaban y disolvían según los intereses del momento, en lo que el historiador Alberto Edwards denominó la república parlamentaria. El clientelismo político y el intercambio de favores eran moneda corriente.

**Fraude electoral:** El sistema electoral era controlado por la oligarquía mediante mecanismos sistemáticos de fraude. El cohecho consistía en la compra directa de votos con dinero o favores. El pegote era la inscripción fraudulenta de votantes fallecidos o inexistentes para aumentar artificialmente el padrón favorable a un candidato. El sufragio seguía siendo censitario y masculino, lo que facilitaba la manipulación.

### Consecuencias políticas y sociales

La parálisis gubernamental producida por el parlamentarismo tuvo consecuencias graves. El Estado fue incapaz de responder a las demandas de la creciente clase obrera, que sufría condiciones laborales inhumanas y vivienda insalubre. Las huelgas y protestas sociales se multiplicaron, siendo reprimidas violentamente. El desprestigio del sistema político se extendió a todos los sectores: la oligarquía perdió legitimidad, los partidos fueron vistos como facciones corruptas, y los sectores populares demandaron un cambio radical.

### Fin del parlamentarismo

La crisis del parlamentarismo coincidió con la crisis del salitre, cuyo precio colapsó tras la invención del salitre sintético por Alemania durante la Primera Guerra Mundial. La inestabilidad política y social llevó a jóvenes oficiales del ejército liderados por Carlos Ibáñez del Campo y Marmaduke Grove a intervenir. En enero de 1925, un golpe militar presionó al presidente Arturo Alessandri Palma a convocar una asamblea constituyente. La nueva Constitución, promulgada el 18 de septiembre de 1925, restauró el presidencialismo, separó la Iglesia del Estado, creó la Contraloría General de la República y estableció derechos sociales, enterrando definitivamente el régimen parlamentario.
 
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

La cuestión social es el concepto historiográfico utilizado para designar el conjunto de problemas sociales, económicos, sanitarios y políticos que afectaron a la clase trabajadora chilena entre fines del siglo XIX y comienzos del XX, como consecuencia de la industrialización, la urbanización acelerada, la expansión de la explotación salitrera y la consolidación del capitalismo en Chile. El término fue acuñado originalmente en la Europa del siglo XIX para referirse a los efectos negativos de la Revolución Industrial, y fue adoptado en Chile por intelectuales, políticos y religiosos que buscaban diagnosticar y proponer soluciones a la miseria de los sectores populares. La cuestión social se convirtió en el tema central del debate político chileno durante el parlamentarismo y fue una de las causas fundamentales del colapso de ese régimen en 1925.

### Contexto económico y demográfico

El auge del salitre en el norte grande (desde la década de 1880) generó un crecimiento económico sin precedentes, pero también transformó la estructura social del país. Miles de trabajadores migraron desde el campo y las ciudades del centro hacia las oficinas salitreras del desierto de Atacama. Paralelamente, Santiago, Valparaíso y Concepción experimentaron un crecimiento urbano explosivo: Santiago pasó de unos 150.000 habitantes en 1875 a más de 500.000 en 1920. La migración campo-ciudad superó la capacidad de absorción de las urbes, generando un grave déficit habitacional y sanitario.

### Condiciones de vida y trabajo

**Jornadas laborales y salarios:** La jornada laboral típica en faenas salitreras, fábricas y puertos era de 12 a 16 horas diarias. Mujeres y niños trabajaban en las mismas condiciones, pero con salarios inferiores. El trabajo infantil desde los 6-7 años era práctica generalizada. Los salarios eran insuficientes para cubrir las necesidades básicas. En las salitreras, el sistema de pago en fichas (que solo podían canjearse en la pulpería de la oficina) ataba al trabajador a un ciclo de endeudamiento.

**Vivienda insalubre (conventillos):** El conventillo se convirtió en el símbolo de la vivienda obrera. Consistía en grandes casonas subdivididas en pequeñas piezas de 3x4 metros, donde vivían familias enteras en condiciones de hacinamiento extremo, sin ventilación ni servicios sanitarios. En 1890, se estima que el 75% de la población de Santiago habitaba en conventillos. Las enfermedades infecciosas —tuberculosis, tifus, cólera— se propagaban rápidamente, contribuyendo a una tasa de mortalidad infantil que alcanzaba el 50% en los sectores populares.

**Falta de seguridad social:** No existían leyes de accidentes del trabajo, seguro de desempleo, jubilación ni salud pública. Un trabajador accidentado o enfermo quedaba en la miseria absoluta.

### Organización del movimiento obrero

| Organización | Período | Características |
|-------------|---------|-----------------|
| Sociedades mutualistas | 1850-1890 | Ayuda mutua, socorros mutuos, sin confrontación |
| Mancomunales | 1890-1900 | Primeras organizaciones obreras del salitre |
| Sociedades de resistencia | 1900-1910 | Influencia anarquista, acción directa |
| FOCH | 1909-1920 | Central sindical nacional, influencia socialista |
| IWW Chile | 1919-1924 | Sindicalismo revolucionario de origen estadounidense |
| Partido Obrero Socialista (POS) | 1912-1922 | Fundado por Recabarren, antecedente del PC |

**Luis Emilio Recabarren:** Figura central del movimiento obrero chileno, fundó el Partido Obrero Socialista (1912) y el diario El Despertar de los Trabajadores. Fue el principal impulsor de la organización sindical y política de la clase trabajadora.

### Huelgas y represión

**Huelga del puerto de Valparaíso (1903):** Trabajadores portuarios demandaron mejores condiciones. La represión dejó más de 100 muertos. **Huelga de la carne (1905):** Protesta masiva en Santiago contra el alza del precio de la carne, reprimida con más de 200 muertos. **Matanza de la Escuela Santa María de Iquique (21 de diciembre de 1907):** Es la masacre obrera más grande en la historia de Chile. Miles de obreros salitreros en huelga, junto a sus familias, se habían congregado en la Escuela Santa María. El ejército abrió fuego contra la multitud indefensa, con un saldo de entre 2.000 y 3.600 muertos. **Matanza de San Gregorio (1921):** Represión a obreros salitreros durante el gobierno de Alessandri.

### Primeras leyes sociales

La presión del movimiento obrero y la difusión de la doctrina social de la Iglesia (encíclica Rerum Novarum del Papa León XIII, 1891) impulsaron las primeras leyes sociales: Descanso dominical (1907), Ley de la silla (1914), Accidentes del trabajo (1916), Protección a la maternidad obrera (1917) y Contrato de trabajo (1919). Estas leyes, aunque insuficientes y tardías, sentaron las bases del derecho laboral chileno.
 
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

La Constitución Política de 1925 fue el resultado de un proceso de reforma institucional que puso fin al régimen parlamentario y restauró un presidencialismo fuerte en Chile. Fue promulgada el 18 de septiembre de 1925 durante el gobierno de Arturo Alessandri Palma, quien había regresado del exilio tras el golpe militar de enero de ese año.

**Características principales:** Restableció el presidencialismo fuerte: el Presidente recuperó el control exclusivo del gabinete ministerial y la iniciativa legislativa. Estableció la separación de la Iglesia y el Estado: Chile dejó de tener una religión oficial y consagró la libertad de culto. Por primera vez una Constitución chilena incorporó derechos sociales (trabajo, salud, educación), aunque con aplicación gradual. Creó la Contraloría General de la República, organismo autónomo encargado de controlar la legalidad de los actos administrativos y la gestión fiscal. Estuvo formalmente vigente hasta 1980, pero de facto operó hasta el golpe de 1973.

### Estado de Compromiso (1932-1973)

El Estado de Compromiso es el concepto acuñado por el politólogo Arturo Valenzuela para describir el sistema político que se consolidó en Chile tras la crisis de la Gran Depresión y se mantuvo hasta el quiebre institucional de 1973. Se caracterizó por la representación y negociación de los principales sectores sociales (clase obrera, clase media, empresariado) a través de partidos políticos institucionalizados, con el Estado actuando como mediador.

**Pluralismo político:** El sistema de partidos incluía desde la derecha conservadora (Partido Conservador, luego Nacional) hasta la izquierda revolucionaria (Partido Socialista, Partido Comunista), pasando por un centro político representado por el Partido Radical y la Democracia Cristiana (desde 1957). A pesar de las diferencias ideológicas, las élites políticas compartían un compromiso básico con las reglas del juego democrático y la negociación como método de resolución de conflictos.

**Rol activo del Estado:** El Estado asumió un papel central en el desarrollo económico (a través de CORFO y las empresas estatales), la provisión de servicios sociales (educación, salud, vivienda) y la mediación entre el capital y el trabajo.

### Gobiernos del período

**Gobiernos radicales (1938-1952):** Pedro Aguirre Cerda (1938-1941) simbolizó con su lema Gobernar es educar el compromiso del Estado con el desarrollo social; creó CORFO en 1939, impulsando la industrialización sustitutiva de importaciones. Juan Antonio Ríos (1942-1946) continuó la industrialización y Chile rompió relaciones con el Eje durante la Segunda Guerra Mundial. Gabriel González Videla (1946-1952) promulgó la Ley de Defensa Permanente de la Democracia (Ley Maldita, 1948) que ilegalizó al Partido Comunista, pero también la Ley de Sufragio Femenino (1949).

**Carlos Ibáñez del Campo (1952-1958):** Su segunda presidencia combinó un discurso populista con medidas represivas. Creó el Banco del Estado (1953). **Jorge Alessandri (1958-1964):** Representó un giro liberal-conservador; promulgó la primera Ley de Reforma Agraria en 1962, aunque de alcance limitado. **Eduardo Frei Montalva (1964-1970):** La Revolución en Libertad impulsó la Reforma Agraria (expropiación de latifundios), la chilenización del cobre (51% estatal), la sindicalización campesina y la promoción popular.

### Crisis del Estado de Compromiso

Hacia fines de la década de 1960, el sistema comenzó a mostrar signos de agotamiento. La polarización política se intensificó, la movilización social creció (tomas de terrenos, sindicalización, movimientos estudiantiles) y la economía experimentó estancamiento con inflación creciente. Los proyectos políticos se radicalizaron: la izquierda (Unidad Popular) propuso una transición al socialismo, mientras la derecha y sectores medios se sintieron amenazados. El Estado de Compromiso, basado en la negociación y el centro político, fue erosionado por los extremos, desembocando en la crisis de 1973.
 
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

El gobierno de Salvador Allende Gossens (1970-1973) representa el primer intento en la historia mundial de construir una sociedad socialista mediante procedimientos democráticos e institucionales, conocido como la vía chilena al socialismo. Allende, médico socialista y militante del Partido Socialista desde su juventud, asumió la presidencia el 4 de noviembre de 1970 como candidato de la Unidad Popular (UP), una coalición de partidos de izquierda. Su gobierno implementó un ambicioso programa de transformaciones estructurales: nacionalización del cobre, profundización de la Reforma Agraria y estatización de la banca y las industrias estratégicas. El experimento terminó abruptamente con el golpe de Estado del 11 de septiembre de 1973, que instauró una dictadura militar de 17 años.

### El camino a La Moneda

Allende fue candidato presidencial en cuatro oportunidades (1952, 1958, 1964, 1970). El 4 de septiembre de 1970 obtuvo el 36,6% de los votos, superando a Jorge Alessandri (34,9%) y Radomiro Tomic (27,8%). Al no alcanzar la mayoría absoluta, su elección debía ser ratificada por el Congreso Nacional. La Democracia Cristiana condicionó su apoyo a la aprobación de un Estatuto de Garantías Constitucionales. Allende aceptó y fue ratificado el 24 de octubre de 1970.

### Las grandes transformaciones

**Nacionalización del cobre:** El 11 de julio de 1971, el Congreso Nacional aprobó por unanimidad la reforma constitucional que nacionalizaba la gran minería del cobre. El Estado tomó el control de Chuquicamata, El Teniente, Salvador y Andina, que estaban en manos de empresas estadounidenses (Anaconda, Kennecott, Cerro Corporation). La determinación de las indemnizaciones generó controversia internacional.

**Reforma Agraria:** El gobierno aceleró drásticamente la expropiación de latifundios iniciada por Frei Montalva. En tres años se expropiaron más de 6 millones de hectáreas. **Área de Propiedad Social:** Se estatizaron más de 500 empresas consideradas estratégicas, incluyendo la banca privada, la siderúrgica CAP, el cemento y los nitratos.

### Políticas sociales y culturales

Allende impulsó políticas sociales innovadoras: el Programa de Medio Litro de Leche diario para todos los niños; una campaña masiva de alfabetización; la ampliación de la cobertura de salud pública. En el plano cultural, se apoyó el cine y la música popular (Violeta Parra, Víctor Jara, Inti-Illimani, Quilapayún), democratizando el acceso a la cultura.

### Oposición y crisis

La oposición al gobierno fue múltiple. Políticamente, el Congreso tenía mayoría opositora (DC y PN). Mediáticamente, El Mercurio y la prensa conservadora desarrollaron una campaña de oposición sistemática. Estados Unidos, bajo Nixon y Kissinger, intervino activamente: la CIA financió a la oposición, los medios y los gremios empresariales; el Banco Mundial y el FMI bloquearon créditos; la ITT conspiró para impedir la asunción de Allende. La economía entró en una espiral de crisis con inflación que alcanzó el 600% anual en 1973, desabastecimiento, mercado negro y el paro de transportistas de octubre de 1972. La polarización social alcanzó extremos: tomas de fundos y fábricas, marchas de las cacerolas vacías, enfrentamientos callejeros.

### El desenlace

El 11 de septiembre de 1973, las Fuerzas Armadas lideradas por el general Augusto Pinochet ejecutaron un golpe de Estado. La Moneda fue bombardeada por aviones de la FACH. Salvador Allende, fiel a su promesa de no rendirse, se suicidó en el Palacio de La Moneda. Su última alocución radial se convirtió en un símbolo de su legado: Seguirán ustedes sabiendo que, mucho más temprano que tarde, se abrirán las grandes alamedas por donde pase el hombre libre para construir una sociedad mejor.
 
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

### Dictadura Militar (1973-1990)

Tras el golpe del 11 de septiembre de 1973, se instauró una Junta Militar de Gobierno integrada por Augusto Pinochet (Ejército), José Toribio Merino (Armada), Gustavo Leigh (FACH) y César Mendoza (Carabineros). Se disolvió el Congreso Nacional, se prohibieron los partidos políticos, se impuso censura total a la prensa y se declaró Estado de Sitio. Pinochet concentró progresivamente el poder, autodesignándose Presidente de la República en 1974.

**Represión sistemática:** El régimen implementó un aparato represivo que violó masivamente los derechos humanos. La Dirección de Inteligencia Nacional (DINA, 1974-1977), dirigida por Manuel Contreras, operó como policía política secreta que perseguía, secuestraba, torturaba y ejecutaba a opositores. La DINA coordinó acciones con otras dictaduras sudamericanas en el marco de la Operación Cóndor. El atentado contra Orlando Letelier en Washington D.C. (1976) reveló la proyección internacional de la represión. La Comisión Nacional de Verdad y Reconciliación (Informe Rettig, 1991) documentó 2.279 casos de violaciones con resultado de muerte. El Informe Valech (2004) reconoció 35.000 casos de prisión política y tortura. Más de 1.000 personas permanecen como detenidos desaparecidos y cientos de miles de chilenos se exiliaron.

**Constitución de 1980:** Fue aprobada en un plebiscito realizado el 11 de septiembre de 1980 en condiciones de nula libertad política: sin registros electorales, sin libertad de prensa y sin partidos políticos. Consagró el modelo neoliberal y el rol subsidiario del Estado, estableció el sistema electoral binominal, creó la figura de los senadores designados y otorgó un papel tutelar a las Fuerzas Armadas a través del Consejo de Seguridad Nacional.

**Reformas económicas neoliberales:** Un grupo de economistas formados en la Universidad de Chicago bajo Milton Friedman —los Chicago Boys— asumió el control de la política económica desde 1975. Las reformas incluyeron: privatización de más de 500 empresas estatales, apertura comercial (aranceles reducidos al 10% uniforme), liberalización de precios, creación del sistema de AFP (1981) y las ISAPRES (1981). La implementación de estas reformas provocó la crisis de 1982-1983, cuando el PIB cayó un 14% y el desempleo superó el 20%.

### Transición a la Democracia

El plebiscito del 5 de octubre de 1988, establecido en la Constitución de 1980, debía decidir la continuidad de Pinochet por otros 8 años. La oposición se unificó en la Concertación de Partidos por el No (16 partidos desde el PC hasta la derecha moderada). El triunfo del No con el 55,99% de los votos forzó a Pinochet a convocar a elecciones.

**Patricio Aylwin (1990-1994):** Primer gobierno democrático. Creó la Comisión Nacional de Verdad y Reconciliación (Informe Rettig). Impulsó reformas tributarias para aumentar el gasto social. Eduardo Frei Ruiz-Tagle (1994-2000): Continuó la modernización y firmó tratados de libre comercio. Ricardo Lagos (2000-2006): Primer presidente socialista desde Allende; implementó la Reforma Procesal Penal, el Plan AUGE y la Ley de Divorcio (2004). Michelle Bachelet (2006-2010): Primera mujer presidenta de Chile; impulsó la Reforma Previsional (Pilar Solidario) y el Transantiago.`,

    },
  })

  // --- Módulo 3: Formación Ciudadana ---
  const hT9 = await prisma.topic.create({
    data: {
      moduleId: hMod3.id, name: "Constitución y Estado de Derecho", slug: "constitucion-estado-derecho", order: 1,
      content: `## Constitución y Estado de Derecho

### Constitución

La Constitución Política de la República es la norma fundamental y suprema del ordenamiento jurídico chileno. Define la organización del Estado, establece los límites del poder público, garantiza los derechos fundamentales de las personas y fija los procedimientos para la creación de las leyes. Como norma suprema, todas las demás normas del ordenamiento jurídico deben ajustarse a sus disposiciones, bajo el principio de supremacía constitucional y el control de constitucionalidad ejercido por el Tribunal Constitucional.

**La Constitución chilena vigente (1980):** Fue aprobada en un plebiscito el 11 de septiembre de 1980 durante la dictadura militar y entró en vigor el 11 de marzo de 1981. Ha sido reformada en múltiples ocasiones, siendo las reformas más significativas las de 1989 (previo al retorno a la democracia), 2005 (eliminación de senadores designados y del rol tutelar de las Fuerzas Armadas) y reformas posteriores en materia de derechos sociales y procesos constituyentes. Establece un Estado unitario, un régimen presidencial de gobierno y un catálogo de derechos fundamentales contenido en el Artículo 19.

### Estado de Derecho

El Estado de Derecho es un principio fundamental según el cual todos los miembros de la sociedad —incluyendo gobernantes y autoridades— están sujetos al imperio de la ley. Nadie está por encima de la ley, y todas las actuaciones del Estado deben realizarse dentro del marco jurídico establecido.

| Elemento | Descripción |
|----------|-------------|
| División de poderes | Separación orgánica y funcional en Ejecutivo, Legislativo y Judicial con control recíproco |
| Principio de legalidad | Toda actuación del Estado debe estar autorizada por una ley previa |
| Jerarquía normativa | Constitución > Tratados Internacionales > Leyes > Decretos > Resoluciones |
| Derechos fundamentales | El Estado debe respetarlos, garantizarlos y promoverlos activamente |
| Control constitucional | Tribunal Constitucional vela por la supremacía de la Constitución |

### Estructura del Estado chileno

**Poder Ejecutivo:** El Presidente de la República es Jefe de Estado y Jefe de Gobierno. Es elegido por sufragio popular directo para un período de 4 años, sin posibilidad de reelección inmediata. Cuenta con la colaboración de los Ministros de Estado, los Delegados Presidenciales Regionales y los Delegados Presidenciales Provinciales.

**Poder Legislativo:** El Congreso Nacional es bicameral. La Cámara de Diputados está compuesta por 155 miembros elegidos por 4 años. El Senado está compuesto por 50 miembros elegidos por 8 años, renovados por mitades. Ambas cámaras tienen iniciativa legislativa, fiscalizan los actos del Ejecutivo y aprueban el presupuesto nacional.

**Poder Judicial:** Está compuesto por los tribunales de justicia organizados jerárquicamente: Juzgados de Letras, Cortes de Apelaciones y la Corte Suprema. Goza de independencia judicial (los jueces no pueden ser removidos arbitrariamente) y se rige por el principio de inexcusabilidad.

**Órganos autónomos constitucionales:** Incluyen la Contraloría General de la República (control de legalidad administrativa), el Banco Central (política monetaria autónoma), el Tribunal Constitucional (control de constitucionalidad), el Ministerio Público (investigación penal), la Defensoría Penal Pública (defensa de imputados) y el Instituto Nacional de Derechos Humanos (INDH).

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

### Concepto y características

Los derechos humanos (DD.HH.) son facultades, libertades y atributos inherentes a toda persona por el solo hecho de su condición humana, reconocidos y garantizados por el ordenamiento jurídico nacional e internacional. Se fundamentan en el principio de la dignidad humana. Los derechos humanos se caracterizan por ser: **universales** (pertenecen a todas las personas), **inalienables** (no pueden ser transferidos ni renunciados), **indivisibles e interdependientes** (todos tienen igual jerarquía) y **progresivos** (los Estados deben avanzar gradualmente en su realización).

### Generaciones de derechos humanos

**Primera generación (derechos civiles y políticos):** Surgen con las revoluciones liberales de los siglos XVIII y XIX (Revolución Francesa, Independencia de Estados Unidos). Comprenden el derecho a la vida, la libertad personal, la igualdad ante la ley, la libertad de expresión, conciencia y religión, el derecho al voto, la propiedad privada y el debido proceso. Su titular es el individuo frente al Estado, y su principal exigencia es la abstención del Estado.

**Segunda generación (derechos económicos, sociales y culturales - DESC):** Emergen con las demandas del movimiento obrero en los siglos XIX y XX, y se consolidan tras la Segunda Guerra Mundial. Incluyen el derecho al trabajo digno y a la sindicalización, el derecho a la salud, la educación, la vivienda, la seguridad social y la alimentación. Exigen una acción positiva del Estado.

**Tercera generación (derechos de solidaridad o colectivos):** Se desarrollan en la segunda mitad del siglo XX, impulsados por procesos de descolonización y movimientos globales. Comprenden el derecho al desarrollo, a un medio ambiente sano, a la paz y a la autodeterminación de los pueblos.

**Cuarta generación (emergentes):** Surgen de los avances tecnológicos y biotecnológicos del siglo XXI: derechos relacionados con internet, protección de datos personales, inteligencia artificial e identidad digital.

### Sistema internacional de protección

**Sistema Universal (ONU):** La Declaración Universal de los Derechos Humanos (10 de diciembre de 1948) es el documento fundacional del sistema internacional de derechos humanos. Ha servido como base para tratados vinculantes como el Pacto Internacional de Derechos Civiles y Políticos (1966) y el Pacto Internacional de Derechos Económicos, Sociales y Culturales (1966).

**Sistema Interamericano (OEA):** La Convención Americana sobre Derechos Humanos o Pacto de San José (1969) estableció la Comisión Interamericana de Derechos Humanos (CIDH) y la Corte Interamericana de Derechos Humanos (Corte IDH), cuyas decisiones son vinculantes para los Estados parte, incluyendo Chile.

### Derechos Humanos en Chile

La Constitución chilena garantiza los derechos fundamentales en su Artículo 19, que enumera 26 numerales desde el derecho a la vida hasta el derecho a vivir en un medio ambiente libre de contaminación. Los principales mecanismos de protección son el recurso de protección (para derechos constitucionales amenazados) y el recurso de amparo (para la libertad personal). El Instituto Nacional de Derechos Humanos (INDH), creado en 2010, tiene la misión de promover y proteger los derechos humanos. La Defensoría de la Niñez fue creada en 2018. Las comisiones de verdad —Informe Rettig (1991) e Informe Valech (2004)— documentaron las violaciones a los derechos humanos durante la dictadura militar y constituyen la base de las políticas de memoria, verdad y justicia en Chile.

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

La participación ciudadana es el conjunto de mecanismos, instituciones y procedimientos mediante los cuales los ciudadanos, individual o colectivamente, inciden en las decisiones públicas, fiscalizan la gestión del Estado, contribuyen a la formulación de políticas públicas y ejercen control sobre las autoridades. En un sistema democrático, la participación ciudadana complementa a la democracia representativa con formas de democracia directa y participativa que fortalecen la legitimidad del sistema político.

### Mecanismos de participación en Chile

**Voto:** Es el principal mecanismo de participación política. En Chile, el sufragio es un derecho y un deber constitucional de todos los ciudadanos mayores de 18 años. Desde 2012 (Ley 20.568), el voto es voluntario pero la inscripción en los registros electorales es automática a través del SERVEL. El voto en el extranjero para elecciones presidenciales está vigente desde 2017.

**Plebiscito:** Consulta popular para someter una decisión política a votación. Los plebiscitos más importantes de la historia reciente son: 1925 (nueva Constitución), 1988 (continuidad de Pinochet), 2020 (nueva Constitución), 2022 y 2023 (procesos constituyentes).

**Iniciativa popular de ley:** Mecanismo constitucional que permite a ciudadanos presentar proyectos de ley. En los procesos constituyentes (2021-2023) se implementó la iniciativa popular de norma, que permitió a la ciudadanía presentar propuestas de normas constitucionales.

**Cuenta pública:** El Presidente de la República tiene la obligación constitucional de rendir cuenta al país cada 1 de junio.

**Presupuestos participativos:** Mecanismo municipal donde los vecinos deciden directamente una parte del presupuesto comunal, priorizando proyectos e inversiones.

### Partidos políticos

Los partidos políticos son organizaciones de interés público que canalizan la participación política, reclutan candidatos, formulan programas de gobierno y articulan las demandas de la sociedad. En Chile, el sistema de partidos incluye: Partido Comunista (PC), Partido Socialista (PS), Partido por la Democracia (PPD), Democracia Cristiana (DC) en el centroizquierda; Renovación Nacional (RN), Unión Demócrata Independiente (UDI), Evópoli en la centroderecha; y partidos emergentes como el Frente Amplio (FA), Republicano, Partido de la Gente (PDG) y Demócratas.

### Sistema electoral

El sistema electoral chileno actual se basa en el método proporcional D'Hondt, implementado desde 2015 en reemplazo del sistema binominal (1989-2013) que favorecía a las dos grandes coaliciones. El país está dividido en 28 distritos para diputados y 16 circunscripciones para senadores. El sistema incluye una ley de cuotas de género (máximo 60% de candidaturas de un mismo género) y un sistema de financiamiento electoral regulado que prohíbe los aportes empresariales desde 2016.

### Organizaciones de la sociedad civil

Incluyen sindicatos, juntas de vecinos, centros de padres, centros de estudiantes, organizaciones no gubernamentales (ONGs), asociaciones gremiales y fundaciones. Estas organizaciones ejercen un rol de intermediación entre la ciudadanía y el Estado, canalizando demandas sociales y participando en la formulación e implementación de políticas públicas.

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

### La economía como ciencia social

La economía es la ciencia social que estudia la asignación de recursos escasos para satisfacer necesidades humanas que son ilimitadas. Esta definición, acuñada por Lionel Robbins en 1932, refleja el problema económico fundamental: los recursos productivos son limitados mientras que las necesidades humanas son potencialmente infinitas. La economía se divide en dos grandes ramas: la **microeconomía**, que analiza el comportamiento de los agentes individuales (hogares, empresas, mercados), y la **macroeconomía**, que estudia la economía en su conjunto (crecimiento, inflación, desempleo, políticas económicas).

### Agentes económicos

| Agente | Función principal | Objetivo |
|--------|------------------|----------|
| Familias | Consumen bienes y servicios, ofrecen trabajo | Maximizar su bienestar o utilidad |
| Empresas | Producen bienes y servicios, demandan trabajo | Maximizar beneficios |
| Estado | Regula, provee bienes públicos, redistribuye, estabiliza | Maximizar el bienestar social |
| Sector externo | Relaciones comerciales y financieras internacionales | Obtener ventajas comparativas |

### Factores productivos

Los recursos o factores productivos son los insumos necesarios para producir bienes y servicios. La economía clásica identifica tres factores: **tierra** (recursos naturales, minerales, territorio), **trabajo** (esfuerzo humano físico e intelectual) y **capital** (bienes producidos utilizados para producir otros bienes: maquinaria, herramientas, edificios, infraestructura). La economía moderna añade el **capital humano** (conocimientos, habilidades, educación y experiencia) y la **capacidad empresarial**.

### El mercado y la formación de precios

El mercado es el mecanismo mediante el cual oferentes (vendedores) y demandantes (compradores) intercambian bienes y servicios. La **ley de la oferta** establece una relación directa entre precio y cantidad ofrecida: a mayor precio, mayor cantidad ofrecida. La **ley de la demanda** establece una relación inversa: a mayor precio, menor cantidad demandada. El **precio de equilibrio** es aquel donde la cantidad ofrecida iguala a la cantidad demandada, sin excedentes ni escasez.

| Estructura de mercado | N° de oferentes | Tipo de producto | Capacidad de fijar precio |
|----------------------|----------------|-----------------|--------------------------|
| Competencia perfecta | Muchos | Homogéneo | Ninguna (precio aceptante) |
| Competencia monopolística | Muchos | Diferenciado | Limitada |
| Oligopolio | Pocos | Homogéneo o diferenciado | Significativa (posible colusión) |
| Monopolio | Uno | Único | Total (fija el precio) |

### Indicadores macroeconómicos fundamentales

**Producto Interno Bruto (PIB):** Es el valor monetario de todos los bienes y servicios finales producidos dentro de las fronteras de un país durante un período determinado. El PIB nominal mide el valor a precios corrientes, mientras que el PIB real ajusta por inflación. El PIB per cápita (PIB dividido por la población) es un indicador aproximado del nivel de vida promedio.

**Inflación:** Es el aumento sostenido y generalizado del nivel de precios. Se mide mediante el Índice de Precios al Consumidor (IPC), que refleja la variación de precios de una canasta de bienes representativa del consumo de los hogares. El Banco Central de Chile tiene como objetivo mantener la inflación en torno al 3% anual. Las causas de la inflación pueden ser por demanda, por costos o monetarias.

**Desempleo:** Es la proporción de la fuerza laboral que no tiene empleo pero busca activamente trabajo. Se clasifica en desempleo friccional (transitorio), estructural (desajuste de habilidades) y cíclico (asociado a recesiones).

**Tasa de interés:** Es el precio del dinero. La Tasa de Política Monetaria (TPM) es fijada por el Banco Central y constituye la principal herramienta de la política monetaria.

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

El modelo económico chileno actual es el resultado de las reformas estructurales implementadas a partir de 1975 durante la dictadura militar, que reemplazaron el modelo de industrialización sustitutiva de importaciones (ISI) vigente desde la década de 1930 por uno basado en el libre mercado, la apertura comercial, las privatizaciones y el rol subsidiario del Estado. Este modelo, conocido como el neoliberalismo chileno o el modelo Chicago, fue mantenido y ajustado por los gobiernos democráticos de la Concertación (1990-2010), que introdujeron reformas sociales y regulaciones manteniendo los pilares fundamentales del sistema. Sus resultados han sido mixtos: crecimiento económico sostenido y reducción significativa de la pobreza, pero también persistencia de la desigualdad y problemas en pensiones, salud y educación.

### Origen: el giro neoliberal

**Los Chicago Boys:** A mediados de la década de 1970, un grupo de economistas chilenos formados en la Universidad de Chicago bajo Milton Friedman —conocidos como los Chicago Boys— asumieron el control de la política económica. Su diagnóstico era que el modelo ISI había agotado su capacidad de crecimiento, generando ineficiencia, inflación crónica y dependencia del Estado.

**Reformas estructurales (1975-1989):** Incluyeron la eliminación del control de precios, la reducción unilateral de aranceles (de un promedio de 105% a un 10% uniforme), la liberalización financiera, la privatización de más de 500 empresas estatales, la reforma previsional (AFP, 1981), la reforma de salud (ISAPRES, 1981) y una nueva legislación laboral que flexibilizó el despido.

### Pilares del modelo

| Pilar | Característica | Institución clave |
|-------|---------------|------------------|
| Autonomía del Banco Central | Política monetaria independiente, objetivo de inflación | Banco Central (autónomo desde 1989) |
| Sistema de pensiones | Capitalización individual, AFP | AFP privadas, reguladas por Superintendencia |
| Sistema de salud | Seguros privados (ISAPRES) y sistema público (FONASA) | ISAPRES, FONASA |
| Apertura comercial | TLCs, aranceles bajos, inserción global | Subsecretaría de Relaciones Económicas Internacionales |
| Tipo de cambio flotante | Valor del peso determinado por el mercado | Banco Central |
| Regla de balance estructural | Política fiscal contracíclica | Dipres, Ministerio de Hacienda |

### Fortalezas del modelo

Entre 1990 y 2010, Chile creció a una tasa promedio del 5% anual, una de las más altas de América Latina. La pobreza se redujo del 38,6% (1990) a aproximadamente el 8% (2020). La inflación se mantuvo baja y estable (en torno al 3% anual). Chile obtuvo el grado de inversión de las principales clasificadoras de riesgo. La política fiscal responsable —basada en la regla de balance estructural y los fondos soberanos FEES (Fondo de Estabilización Económica y Social, 2006) y FRP (Fondo de Reserva de Pensiones)— permitió al país enfrentar crisis internacionales con solidez fiscal.

### Debilidades y críticas

La desigualdad de ingresos, medida por el coeficiente de Gini, es una de las más altas entre los países de la OCDE. El sistema de AFP ha sido criticado por generar pensiones insuficientes (bajas tasas de reemplazo) y altas comisiones. Las ISAPRES han sido acusadas de selección adversa y costos elevados. La concentración de mercados en pocos conglomerados (oligopolios en retail, banca, farmacias, AFP, ISAPRES) es una falla estructural señalada recurrentemente. El endeudamiento de las familias alcanzó niveles elevados y la precarización laboral ha sido una característica persistente.

### Reformas recientes

Los gobiernos posteriores a 2010 han introducido reformas para corregir las debilidades del modelo: Reforma Tributaria (2014), Reforma Laboral (2016), Reforma al Sistema de Pensiones (Pilar Solidario, 2008; proyecto de reforma estructural en discusión), Ley de Techo para las Tasas de Interés (2021), y los procesos constituyentes que buscaban redefinir el rol del Estado en la economía.

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

La extracción de información explícita es la habilidad lectora fundamental que consiste en identificar, localizar y recuperar datos, ideas o detalles que aparecen de manera directa y literal en un texto. Esta competencia constituye la base de la comprensión lectora, pues no requiere interpretación, inferencia ni juicio crítico, sino únicamente la capacidad de localizar información tal como está escrita. Es la primera de las tres habilidades evaluadas en la prueba de Competencia Lectora de la PAES, y su dominio es requisito indispensable para desarrollar las habilidades superiores de comprensión e inferencia y evaluación crítica. En la vida cotidiana, esta habilidad se aplica constantemente: al buscar un número de teléfono, una fecha de vencimiento, una dirección o un dato específico en un instructivo.

### ¿Qué preguntas busca responder?

- "Según el texto, ¿cuándo ocurrió X evento?"
- "El autor menciona que... ¿cuál es la causa?"
- "¿Qué significa la palabra X en el primer párrafo?"
- "¿Cuántas personas participaron según el texto?"
- "¿Dónde se realizó la actividad descrita?"

La clave de estas preguntas es que la respuesta está literalmente escrita en el texto, sin necesidad de deducir, interpretar o evaluar.

### Estrategias específicas

**Identificación de palabras clave:** El primer paso consiste en leer cuidadosamente la pregunta e identificar las palabras más significativas: nombres propios, fechas, lugares, cantidades, cifras o términos técnicos. Estas palabras clave son la puerta de entrada a la información en el texto.

**Técnica de escaneo (scanning):** El escaneo es una técnica de lectura rápida y selectiva en la que el lector desplaza la vista rápidamente por el texto en busca de la palabra clave o sus sinónimos. Esta técnica es particularmente útil cuando se busca información específica como fechas (1810, 1973), nombres (Allende, Portales) o cifras (36,6%, 55,99%).

**Localización por paráfrasis:** En muchos casos, la pregunta utiliza palabras diferentes a las del texto, aunque con el mismo significado. Por ejemplo, si la pregunta usa beneficio y el texto dice ventaja, el lector debe reconocer esta equivalencia semántica. El reconocimiento de sinónimos y paráfrasis es crucial para localizar información correctamente.

**Distinción entre información principal y secundaria:** No toda la información en un texto tiene la misma relevancia. La información principal constituye el núcleo del mensaje, mientras que la información secundaria son detalles, ejemplos y aclaraciones.

### Tipologías textuales y estrategias

| Tipo de texto | Características | Estrategia de extracción |
|--------------|-----------------|-------------------------|
| Expositivo | Hechos, datos, definiciones | Buscar conceptos, fechas y cifras |
| Narrativo | Personajes, tiempo, espacio, acciones | Identificar quién, cuándo, dónde |
| Argumentativo | Tesis, argumentos, evidencias | Localizar la tesis y los argumentos |
| Instructivo | Pasos, procedimientos, reglas | Seguir la secuencia de acciones |

### Errores comunes

Confundir información explícita con inferida (agregar información que no está en el texto), seleccionar información parcial (elegir solo parte de la respuesta) y distraerse con información secundaria (elegir datos llamativos pero que no responden la pregunta).

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

La comprensión e inferencia es la habilidad lectora de nivel intermedio que implica ir más allá de la información explícita para entender el significado profundo del texto, establecer relaciones entre ideas, identificar el propósito comunicativo del autor y extraer conclusiones que no están escritas directamente pero que se pueden deducir lógicamente. Mientras que la extracción de información explícita responde a la pregunta ¿qué dice exactamente el texto?, la comprensión e inferencia responde a ¿qué quiere decir el texto?, ¿qué relaciones existen entre las ideas? y ¿qué conclusiones se pueden extraer?

### Diferencia entre información explícita e implícita

| Información explícita | Información implícita / inferida |
|---|---|
| Está escrita directamente en el texto | No está escrita, se deduce del texto |
| Se localiza mediante escaneo | Se interpreta mediante razonamiento |
| Ejemplo: "Eran las 3 de la tarde" | Ejemplo: "El sol estaba en lo más alto" → es mediodía |
| Ejemplo: "María abrió un paraguas" | → se infiere que está lloviendo o va a llover |

### Habilidades inferenciales fundamentales

**Identificación de ideas principales y secundarias:** La idea principal es el mensaje central o la tesis del texto, aquello que el autor quiere comunicar fundamentalmente. Las ideas secundarias son los detalles, ejemplos, explicaciones y argumentos que apoyan, desarrollan o ilustran la idea principal. Distinguir entre unas y otras es esencial para comprender la estructura lógica del texto.

**Establecimiento de relaciones lógicas:** Los textos establecen diversas relaciones entre las ideas: causa-efecto (porque, ya que, debido a, por lo tanto, en consecuencia), problema-solución (conflicto y alternativas de solución), comparación-contraste (similarmente, a diferencia de, mientras que) y secuencia temporal (primero, luego, después, finalmente).

**Realización de inferencias:** La inferencia es el proceso cognitivo mediante el cual se extraen conclusiones que no están expresadas explícitamente pero que se siguen lógicamente de la información disponible. Existen varios tipos: inferencia pragmática (identificar la intención del hablante más allá de sus palabras literales), inferencia causal (deducir causas no mencionadas a partir de los efectos descritos), inferencia predictiva (anticipar lo que podría ocurrir después) e inferencia de significado contextual (deducir el significado de una palabra desconocida a partir del contexto).

**Determinación del propósito comunicativo:** Todo texto tiene un propósito: informar (transmitir datos objetivos), persuadir (convencer al lector de una postura), entretener (crear experiencia estética) o apelar (llamar a la acción).

### Estructura textual según el tipo de texto

| Tipo textual | Estructura típica | Propósito |
|-------------|-------------------|-----------|
| Narrativo | Inicio - Desarrollo - Desenlace | Relatar hechos o historias |
| Argumentativo | Tesis - Argumentos - Conclusión | Convencer o persuadir |
| Expositivo | Introducción - Desarrollo - Conclusión | Informar o explicar |
| Descriptivo | Caracterización detallada | Describir personas, objetos o lugares |
| Dialogado | Intercambio de intervenciones | Representar conversaciones |

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

La evaluación crítica es la habilidad lectora de más alto nivel en la jerarquía de competencias evaluadas en la PAES. Implica emitir juicios fundamentados sobre el texto, evaluar la calidad y pertinencia de su argumentación, identificar sesgos, falacias y posibles manipulaciones, y reflexionar sobre el contenido desde una perspectiva personal informada y contextualizada. A diferencia de la extracción de información (que busca datos literales) y la comprensión e inferencia (que busca el significado implícito), la evaluación crítica no se limita a entender el texto, sino que lo interpela, lo cuestiona y lo valora. Esta competencia es esencial para el ejercicio de una ciudadanía informada, especialmente en un contexto de sobrecarga informativa y noticias falsas.

### Habilidades de evaluación crítica

**Evaluación de la calidad argumentativa:** El primer paso consiste en analizar la solidez de la argumentación: ¿las evidencias son verificables? ¿provienen de fuentes confiables? ¿son pertinentes para la tesis? ¿hay suficiente evidencia o se generaliza a partir de casos aislados? Un argumento sólido debe basarse en evidencia suficiente, relevante y confiable.

**Identificación de la intención del emisor y el público objetivo:** Todo texto es producido por alguien con una intención específica y dirigido a un público particular. Evaluar críticamente implica preguntarse: ¿quién es el autor y qué intereses puede tener? ¿Es parcial u objetivo? ¿Busca informar, persuadir, manipular o entretener?

### Detección de sesgos, falacias y manipulación

**Sesgos:** El sesgo de confirmación selecciona solo evidencia que apoya la postura del autor. El sesgo político o ideológico presenta una visión del mundo como la única válida. El sesgo cultural o etnocéntrico juzga otras culturas desde los valores propios.

**Falacias argumentativas:** Son razonamientos incorrectos con apariencia de validez. Incluyen: ad hominem (atacar a la persona en lugar del argumento), falsa causalidad (asumir que porque A ocurrió antes que B, A causó B), falso dilema (presentar solo dos opciones cuando hay más), generalización apresurada (concluir algo general a partir de casos insuficientes), apelación a la autoridad (cita fuera de contexto), pendiente resbaladiza (afirmar que un paso pequeño llevará inevitablemente a una catástrofe) y petición de principio (argumento circular).

| Falacia | Descripción | Ejemplo |
|---------|-------------|---------|
| Ad hominem | Atacar a la persona | "No podemos creerle, es un político corrupto" |
| Falsa causalidad | A antes de B implica que A causó B | "Desde que llegó el nuevo alcalde, llueve más" |
| Falso dilema | Solo dos opciones cuando hay más | "O estás con nosotros o contra nosotros" |
| Generalización apresurada | Conclusión general de casos insuficientes | "Conocí a dos franceses antipáticos, todos son así" |

**Manipulación:** Incluye lenguaje emotivo o cargado, omisión selectiva de información, repetición para generar familiaridad, apelación al miedo o esperanza sin evidencia.

### Valoración de recursos lingüísticos

El lenguaje no es neutral. La evaluación crítica implica analizar el tono (objetivo, sarcástico, solemne), el registro (formal, informal, técnico) y las figuras retóricas (metáforas, ironía, sátira, hipérbole). Estos elementos revelan la postura del autor y pueden orientar la interpretación en una dirección determinada.

### Relación con conocimientos previos

El lector crítico debe relacionar el contenido del texto con sus conocimientos previos y otras fuentes de información: ¿coincide lo que dice el texto con lo que sabemos? ¿hay contradicciones? ¿qué perspectivas alternativas existen? Un lector crítico no acepta pasivamente el contenido, sino que lo interroga, lo contrasta y forma su propio juicio fundamentado.

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

Los números son los conceptos fundamentales de la matemática y constituyen la base sobre la cual se construyen todas las operaciones y relaciones matemáticas posteriores. El estudio de los números enteros y racionales es esencial para la prueba de Matemática M1 de la PAES, ya que estas nociones se aplican en contextos cotidianos, financieros, científicos y técnicos.

### Números enteros (ℤ)

El conjunto de los números enteros incluye los números naturales (1, 2, 3...), sus opuestos negativos (-1, -2, -3...) y el cero (0): ℤ = {..., -3, -2, -1, 0, 1, 2, 3, ...}. Los números enteros son fundamentales para representar situaciones que involucran deudas, temperaturas bajo cero, altitudes bajo el nivel del mar y desplazamientos en sentidos opuestos.

**Operaciones básicas:** En la suma y resta, cuando los signos son iguales se suman los valores absolutos y se conserva el signo; cuando los signos son diferentes se restan los valores absolutos y se coloca el signo del número de mayor valor absoluto. Ejemplo: (-5) + (-3) = -8; (-7) + 4 = -3. En la multiplicación y división, la regla de signos establece que (+) × (+) = (+), (+) × (-) = (-), (-) × (-) = (+). Ejemplo: (-4) × 3 = -12; (-6) × (-2) = 12.

**Propiedades:** Los números enteros cumplen las propiedades de cerradura, conmutatividad, asociatividad, distributividad, existencia de elemento neutro (0 para la suma, 1 para la multiplicación) y existencia de inverso aditivo.

**Jerarquía de operaciones (PEMDAS):** 1) Paréntesis y corchetes (resolviendo desde adentro hacia afuera), 2) Exponentes y potencias, 3) Multiplicación y división (de izquierda a derecha), 4) Adición y sustracción (de izquierda a derecha). Un error común es realizar las operaciones en el orden en que aparecen sin respetar esta jerarquía.

### Números racionales (ℚ)

El conjunto de los números racionales está formado por todas las fracciones a/b donde a y b son números enteros y b ≠ 0. Incluyen los enteros (3 = 3/1), las fracciones propias e impropias, los decimales finitos (0,75 = 3/4) y los decimales periódicos (0,333... = 1/3). Los racionales son densos: entre dos números racionales siempre existe otro número racional.

**Operaciones con fracciones:** Para sumar o restar, se calcula el mínimo común múltiplo (MCM) de los denominadores y se convierten las fracciones a ese denominador común. Ejemplo: 2/3 + 3/4 = 8/12 + 9/12 = 17/12. En la multiplicación, se multiplican numeradores entre sí y denominadores entre sí. Ejemplo: 2/3 × 4/5 = 8/15. En la división, se multiplica la primera fracción por el recíproco de la segunda. Ejemplo: 2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6.

**Comparación:** Para comparar a/b con c/d, se utiliza la multiplicación cruzada: se compara a × d con c × b. Ejemplo: 3/4 vs 2/3 → 3 × 3 = 9 > 2 × 4 = 8 → 3/4 > 2/3.

### Porcentajes

El porcentaje expresa una proporción como fracción de 100. Para calcular el p% de una cantidad: (p/100) × cantidad. Ejemplo: 15% de 200 = 30. Para un aumento: valor × (1 + p/100). Ejemplo: $30.000 + 15% = 30.000 × 1,15 = $34.500. Para una disminución: valor × (1 - p/100). Ejemplo: $30.000 - 15% = 30.000 × 0,85 = $25.500. La variación porcentual se calcula como ((Valor final - Valor inicial) / Valor inicial) × 100%. El interés simple se calcula como I = C × r × t.

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

Las ecuaciones y la proporcionalidad constituyen herramientas matemáticas fundamentales para modelar y resolver problemas de la vida cotidiana, las ciencias y la economía. Una ecuación expresa una igualdad entre dos expresiones algebraicas que contiene una o más variables desconocidas, mientras que la proporcionalidad establece relaciones de correspondencia entre magnitudes que varían de manera conjunta.

### Ecuaciones de primer grado

Una ecuación de primer grado tiene la forma general ax + b = c, donde a ≠ 0. La solución es x = (c - b)/a. Para resolverla se deben: 1) simplificar cada lado eliminando paréntesis y combinando términos semejantes, 2) agrupar términos con la variable en un lado y constantes en el otro, 3) despejar la variable dividiendo ambos lados por el coeficiente.

**Ejemplos:** 3x + 5 = 20 → 3x = 15 → x = 5. Con paréntesis: 2(x + 3) = 14 → 2x + 6 = 14 → x = 4. Con denominadores: x/2 + x/3 = 5 → MCM = 6 → (3x + 2x)/6 = 5 → 5x = 30 → x = 6.

### Sistemas de ecuaciones lineales

Un sistema de ecuaciones lineales es un conjunto de dos o más ecuaciones que deben cumplirse simultáneamente. Existen tres métodos principales de resolución:

**Método de sustitución:** Se despeja una variable en una ecuación y se reemplaza en la otra. Ejemplo: x + y = 7 → y = 7 - x; x - y = 3 → x - (7 - x) = 3 → 2x = 10 → x = 5, y = 2.

**Método de igualación:** Se despeja la misma variable en ambas ecuaciones y se igualan las expresiones. Ejemplo: x = 7 - y, x = 3 + y → 7 - y = 3 + y → y = 2, x = 5.

**Método de reducción:** Se multiplican las ecuaciones para que los coeficientes de una variable sean opuestos y se suman. Ejemplo: x + y = 7; x - y = 3 → sumando: 2x = 10 → x = 5, y = 2.

### Proporcionalidad

**Razón y proporción:** Una razón es la comparación entre dos cantidades mediante el cociente a/b. Una proporción es la igualdad de dos razones: a/b = c/d, lo que implica que a × d = b × c.

**Proporcionalidad directa (y = kx):** Si x aumenta, y aumenta en la misma proporción. Regla de tres directa: a → b, c → x → x = (b × c)/a. Ejemplo: si 3 kg cuestan $2.400, entonces 5 kg cuestan (2.400/3) × 5 = $4.000.

**Proporcionalidad inversa (x × y = k):** Si x aumenta, y disminuye. Regla de tres inversa: a → b, c → x → x = (a × b)/c. Ejemplo: si 3 obreros tardan 12 días, entonces 6 obreros tardan (3 × 12)/6 = 6 días.

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

La geometría es la rama de la matemática que estudia las propiedades y medidas de las figuras en el plano y en el espacio. El cálculo de áreas, perímetros y volúmenes es una habilidad fundamental evaluada en la PAES, con aplicaciones en arquitectura, ingeniería, diseño y la vida cotidiana.

### Figuras planas: perímetros y áreas

| Figura | Perímetro | Área |
|--------|-----------|------|
| Cuadrado (lado a) | P = 4a | A = a² |
| Rectángulo (lados a, b) | P = 2(a + b) | A = a × b |
| Triángulo (base b, altura h) | P = a + b + c | A = (b × h) / 2 |
| Círculo (radio r) | P = 2πr | A = πr² |
| Rombo (diagonales D, d) | P = 4a | A = (D × d) / 2 |
| Trapecio (bases B, b; altura h) | P = B + b + lados | A = ((B + b) × h) / 2 |

El perímetro es la medida del contorno de una figura, mientras que el área es la medida de la superficie encerrada por dicho contorno. Las unidades de perímetro son unidades lineales (m, cm, km), mientras que las de área son unidades cuadradas (m², cm²).

### Teorema de Pitágoras

En un triángulo rectángulo, el cuadrado de la hipotenusa (el lado opuesto al ángulo recto) es igual a la suma de los cuadrados de los catetos: c² = a² + b². Este teorema, atribuido al matemático griego Pitágoras de Samos (siglo VI a.C.), es uno de los resultados más fundamentales de la geometría.

La hipotenusa se calcula como c = √(a² + b²), y cada cateto como a = √(c² - b²). El triple pitagórico clásico es (3, 4, 5), pues 9 + 16 = 25. Ejemplo: si los catetos miden 6 cm y 8 cm, entonces h = √(36 + 64) = √100 = 10 cm.

### Volúmenes de cuerpos geométricos

El volumen es la medida del espacio tridimensional ocupado por un cuerpo. Las unidades de volumen son unidades cúbicas (m³, cm³, litros).

| Cuerpo | Volumen |
|--------|---------|
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

La estadística descriptiva es la rama de la estadística que se ocupa de recolectar, organizar, resumir y presentar datos de manera informativa. Su objetivo es describir las características principales de un conjunto de datos mediante medidas numéricas y representaciones gráficas. Es una herramienta fundamental para el análisis de datos en ciencias sociales, naturales, economía y la vida cotidiana.

### Medidas de tendencia central

Estas medidas indican el valor típico o central alrededor del cual se agrupan los datos.

**Media aritmética (promedio):** Se calcula como x̄ = (suma de datos)/(cantidad de datos). Su principal desventaja es que es sensible a valores extremos (outliers). La **media ponderada** se usa cuando los datos tienen distinta importancia: x̄ = (Σ xᵢwᵢ) / (Σ wᵢ).

**Mediana:** Es el valor central cuando los datos están ordenados de menor a mayor. Si n es impar, es el valor en la posición (n+1)/2. Si n es par, es el promedio de los dos valores centrales. Su principal ventaja es que no es afectada por valores extremos, lo que la hace más representativa que la media en distribuciones asimétricas.

**Moda:** Es el valor que más se repite en el conjunto de datos. Puede ser unimodal (una moda), bimodal (dos modas) o multimodal (más de dos). Es la única medida de tendencia central aplicable a datos cualitativos (categóricos).

### Medidas de posición

Los cuartiles dividen los datos ordenados en cuatro partes iguales: Q1 (primer cuartil, 25%), Q2 (segundo cuartil o mediana, 50%) y Q3 (tercer cuartil, 75%). El rango intercuartil (IQR = Q3 - Q1) mide la dispersión del 50% central de los datos y es útil para identificar valores atípicos (outliers). Los percentiles indican el valor por debajo del cual se encuentra un porcentaje determinado de los datos: Pk deja el k% de los datos por debajo.

### Tablas y gráficos estadísticos

**Tabla de frecuencias:** Organiza los datos mostrando la frecuencia absoluta (f), la frecuencia relativa (fr = f/n) y la frecuencia acumulada (F) para cada valor o intervalo.

| Dato | Frecuencia absoluta (f) | Frecuencia relativa (fr) | Frecuencia acumulada (F) |
|------|------------------------|-------------------------|-------------------------|
| x₁ | f₁ | fr₁ = f₁/n | F₁ = f₁ |
| x₂ | f₂ | fr₂ = f₂/n | F₂ = f₁ + f₂ |

**Gráficos:** Los **gráficos de barras** comparan categorías discretas. Los **histogramas** representan datos continuos agrupados en intervalos. Los **gráficos circulares (torta)** muestran la proporción de cada categoría respecto del total. El **boxplot** (diagrama de caja y bigotes) resume la distribución mostrando mínimo, Q1, mediana, Q3, máximo y valores atípicos.

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

Las funciones son relaciones matemáticas que asignan a cada elemento de un conjunto (dominio) un único elemento de otro conjunto (codominio). Son herramientas fundamentales para modelar fenómenos del mundo real, desde el crecimiento de una población hasta la trayectoria de un proyectil. En la PAES, las funciones lineal y cuadrática son los tipos más importantes.

### Función lineal: f(x) = mx + n

La función lineal representa una relación de proporcionalidad directa entre dos variables. Su gráfica es una línea recta. La **pendiente (m)** indica la tasa de cambio y la inclinación de la recta: si m > 0 la recta es creciente, si m < 0 es decreciente, si m = 0 es horizontal (constante). El **intercepto (n)** es el punto donde la recta cruza el eje Y (0, n). La pendiente se calcula como m = (y₂ - y₁) / (x₂ - x₁) conocidos dos puntos de la recta. La función lineal modela situaciones de crecimiento aritmético constante, como el costo total de un servicio con tarifa fija más costo variable, la distancia recorrida a velocidad constante o la conversión entre unidades de medida.

### Función cuadrática: f(x) = ax² + bx + c

La función cuadrática tiene como gráfica una parábola. Si a > 0 la parábola abre hacia arriba (tiene un valor mínimo), y si a < 0 abre hacia abajo (tiene un valor máximo). El **vértice** es el punto máximo o mínimo de la parábola y se calcula como x_v = -b/(2a) e y_v = f(x_v). El **eje de simetría** es la recta vertical que pasa por el vértice: x = x_v.

El **discriminante** Δ = b² - 4ac determina la naturaleza de las raíces (ceros) de la función: si Δ > 0 hay dos raíces reales distintas, si Δ = 0 hay una raíz real (raíz doble), y si Δ < 0 no hay raíces reales (raíces complejas). Las raíces se calculan con la fórmula cuadrática: x = (-b ± √Δ) / (2a).

**Ejemplo:** f(x) = x² - 4x + 3. El vértice es x_v = 4/2 = 2, f(2) = 4 - 8 + 3 = -1 → (2, -1). El discriminante es Δ = 16 - 12 = 4 > 0, por lo que tiene dos raíces reales: x = (4 ± 2)/2 → x = 3 y x = 1.

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

La trigonometría es la rama de la matemática que estudia las relaciones entre los ángulos y los lados de los triángulos. Las razones trigonométricas son herramientas fundamentales para resolver problemas que involucran distancias inaccesibles, alturas, ángulos de elevación y depresión, y fenómenos periódicos.

### Razones trigonométricas en un triángulo rectángulo

Dado un triángulo rectángulo con un ángulo agudo θ, se definen: sen(θ) = cateto opuesto / hipotenusa; cos(θ) = cateto adyacente / hipotenusa; tan(θ) = cateto opuesto / cateto adyacente. La relación fundamental entre estas funciones es tan(θ) = sen(θ) / cos(θ).

### Identidad fundamental

Para cualquier ángulo θ, se cumple que sen²(θ) + cos²(θ) = 1. Esta identidad pitagórica es la más importante de la trigonometría y se deriva directamente del teorema de Pitágoras aplicado a un triángulo rectángulo con hipotenusa igual a 1.

### Ángulos notables

Los ángulos de 0°, 30°, 45°, 60° y 90° tienen valores exactos de seno, coseno y tangente que deben memorizarse:

| Ángulo | sen | cos | tan |
|--------|-----|-----|-----|
| 0° | 0 | 1 | 0 |
| 30° | 1/2 | √3/2 | √3/3 |
| 45° | √2/2 | √2/2 | 1 |
| 60° | √3/2 | 1/2 | √3 |
| 90° | 1 | 0 | ∞ (indefinido) |

### Teoremas para triángulos no rectángulos

Para triángulos que no son rectángulos, se utilizan dos teoremas fundamentales. El **teorema del seno** establece que a/sen(A) = b/sen(B) = c/sen(C) = 2R, donde R es el radio de la circunferencia circunscrita al triángulo. Es útil cuando se conocen dos ángulos y un lado (ALA o AAL). El **teorema del coseno**, generalización del teorema de Pitágoras, establece que a² = b² + c² - 2bc·cos(A). Es útil cuando se conocen dos lados y el ángulo entre ellos (LAL) o los tres lados (LLL).

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

La probabilidad es la rama de la matemática que estudia la incertidumbre y los fenómenos aleatorios. La probabilidad condicional y la combinatoria son herramientas avanzadas que permiten calcular probabilidades en situaciones donde la información disponible modifica las expectativas iniciales.

### Probabilidad condicional

La probabilidad de que ocurra un evento A dado que ya ocurrió un evento B se denota como P(A|B) y se calcula como P(A|B) = P(A ∩ B) / P(B), donde P(B) > 0. La probabilidad condicional refleja cómo la ocurrencia de un evento modifica la probabilidad de otro. Por ejemplo, la probabilidad de tener una enfermedad dado que un examen dio positivo es muy diferente de la probabilidad general de tener la enfermedad.

### Eventos independientes

Dos eventos son independientes si la ocurrencia de uno no afecta la probabilidad del otro. En este caso, P(A ∩ B) = P(A) · P(B). Ejemplo: el resultado de lanzar una moneda dos veces; el segundo lanzamiento es independiente del primero.

### Teorema de Bayes

El teorema de Bayes permite actualizar la probabilidad de un evento A basándose en nueva información B: P(A|B) = P(B|A) · P(A) / P(B). Este teorema, desarrollado por el matemático inglés Thomas Bayes (1702-1761), es fundamental en estadística inferencial, diagnósticos médicos, sistemas de recomendación y machine learning. Permite incorporar evidencia para refinar estimaciones probabilísticas de manera sistemática.

### Combinatoria

La combinatoria estudia las formas de contar y agrupar elementos. El **principio multiplicativo** establece que si una tarea tiene m formas de hacerse y otra n formas, ambas juntas tienen m × n formas.

**Permutaciones (el orden importa):** La permutación de n elementos distintos es P(n) = n!. Las variaciones (sin repetición) de n elementos tomados de k en k son V(n,k) = n! / (n - k)!. Ejemplo: ¿de cuántas formas se pueden ordenar 3 libros en un estante? P(3) = 3! = 6.

**Combinaciones (el orden no importa):** Las combinaciones de n elementos tomados de k en k son C(n,k) = n! / (k! (n - k)!). También se denota como coeficiente binomial (n choose k). Ejemplo: ¿cuántos grupos de 2 personas se pueden formar con {A, B, C}? C(3,2) = 3! / (2!·1!) = 3 (AB, AC, BC).

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

La célula es la unidad fundamental de la vida. Todos los seres vivos están compuestos por una o más células, y todas las funciones vitales de los organismos ocurren dentro de las células. El estudio de la célula es esencial para comprender la biología, la medicina y las ciencias de la salud.

### Teoría celular

La teoría celular es uno de los pilares fundamentales de la biología moderna. Fue desarrollada en el siglo XIX gracias al trabajo de Matthias Schleiden (botánico alemán) y Theodor Schwann (fisiólogo alemán), quienes en 1838-1839 propusieron que todos los organismos están compuestos por células. Posteriormente, Rudolf Virchow (1855) añadió el principio de que toda célula proviene de otra célula preexistente (omnis cellula e cellula). Los postulados de la teoría celular son: 1) Todos los seres vivos están formados por una o más células, 2) La célula es la unidad básica de estructura y función de los seres vivos, 3) Todas las células provienen de células preexistentes mediante división celular.

### Tipos de células

**Células procariotas (pro = antes, karyon = núcleo):** Carecen de núcleo definido; el material genético (ADN) se encuentra disperso en el citoplasma en una región llamada nucleoide. No poseen organelos membranosos internos (no tienen mitocondrias, retículo endoplasmático ni aparato de Golgi). Son generalmente más pequeñas (1-5 μm). Incluyen bacterias (como Escherichia coli) y arqueas.

**Células eucariotas (eu = verdadero, karyon = núcleo):** Poseen un núcleo definido rodeado por una membrana nuclear que contiene el ADN. Tienen organelos membranosos especializados. Las células eucariotas se clasifican en: animales (sin pared celular, sin cloroplastos, con centríolos), vegetales (con pared celular de celulosa, cloroplastos y vacuola central grande), hongos (con pared celular de quitina) y protistas (grupo diverso que incluye algas, amebas y paramecios).

### Organelos celulares

| Organelo | Función principal |
|----------|------------------|
| Núcleo | Contiene el ADN, controla la actividad celular |
| Mitocondrias | Producción de ATP (energía) mediante respiración celular |
| Cloroplastos | Fotosíntesis (solo en células vegetales) |
| Membrana plasmática | Regula el paso de sustancias (bicapa lipídica) |
| Retículo endoplasmático rugoso | Síntesis de proteínas |
| Retículo endoplasmático liso | Síntesis de lípidos |
| Aparato de Golgi | Modifica, empaca y distribuye proteínas |
| Ribosomas | Síntesis de proteínas |
| Lisosomas | Digestión celular |
| Vacuola | Almacenamiento y mantenimiento de presión (grande en vegetales) |
| Pared celular | Soporte y protección (vegetales, hongos, bacterias) |

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

La química estudia la composición, estructura, propiedades y transformaciones de la materia. El átomo es la unidad básica de la materia, y los enlaces químicos son las fuerzas que mantienen unidos a los átomos para formar moléculas y compuestos. Estos conceptos son fundamentales para comprender la química y sus aplicaciones en la vida cotidiana, la industria y la tecnología.

### Estructura atómica

El átomo está compuesto por tres tipos de partículas subatómicas: **protones** (carga positiva, en el núcleo), **neutrones** (sin carga, en el núcleo) y **electrones** (carga negativa, que orbitan el núcleo en niveles de energía). El **número atómico (Z)** es la cantidad de protones en el núcleo e identifica al elemento químico. La **masa atómica (A)** es la suma de protones y neutrones (A = Z + N). Los **isótopos** son átomos del mismo elemento (mismo Z) con distinto número de neutrones (distinto A). Ejemplo: Carbono-12: Z = 6, A = 12 (6 protones, 6 neutrones); Carbono-14: Z = 6, A = 14 (6 protones, 8 neutrones), utilizado en datación radiométrica.

### Tabla periódica

Organiza los elementos químicos por número atómico creciente. Los **períodos (filas)** indican el nivel de energía de los electrones externos. Los **grupos (columnas)** agrupan elementos con el mismo número de electrones de valencia, por lo tanto con propiedades químicas similares. El Grupo 1 (metales alcalinos: Li, Na, K) son altamente reactivos; el Grupo 17 (halógenos: F, Cl, Br) forman sales con los metales; el Grupo 18 (gases nobles: He, Ne, Ar) son estables y no reactivos.

### Enlaces químicos

**Enlace iónico:** Se produce por transferencia de electrones desde un metal (que se convierte en catión positivo) hacia un no metal (que se convierte en anión negativo). La atracción electrostática entre iones de carga opuesta mantiene el compuesto unido. Ejemplo: NaCl (cloruro de sodio). Los compuestos iónicos tienen altos puntos de fusión, son solubles en agua y conducen electricidad en disolución.

**Enlace covalente:** Se produce por compartición de electrones entre dos no metales. Puede ser simple (un par de electrones: H₂, Cl₂), doble (dos pares: O₂, CO₂) o triple (tres pares: N₂). En el enlace covalente polar, los electrones se comparten desigualmente (H₂O, HCl), generando una carga parcial positiva y otra negativa. En el enlace covalente apolar, los electrones se comparten equitativamente (H₂, O₂).

**Enlace metálico:** Los electrones se mueven libremente entre una red de cationes metálicos, formando una nube electrónica. Ejemplo: Fe, Cu, Al, Au. Los metales son buenos conductores de calor y electricidad, maleables, dúctiles y brillantes.

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

La física estudia las propiedades de la materia y las interacciones fundamentales de la naturaleza. La mecánica clásica, desarrollada principalmente por Isaac Newton en el siglo XVII, describe el movimiento de los cuerpos y las fuerzas que lo causan. Estos principios son esenciales para comprender desde el movimiento de los planetas hasta el funcionamiento de máquinas y vehículos.

### Leyes de Newton

**Primera ley (Ley de inercia):** Un cuerpo permanece en estado de reposo o movimiento rectilíneo uniforme a menos que una fuerza externa neta actúe sobre él. La inercia es la resistencia de un cuerpo a cambiar su estado de movimiento; a mayor masa, mayor inercia. Esta ley explica por qué los pasajeros de un auto se sienten empujados hacia adelante cuando el auto frena bruscamente.

**Segunda ley (Ley de fuerza):** La fuerza neta aplicada a un objeto es igual al producto de su masa por su aceleración: F = m · a. La aceleración tiene la misma dirección que la fuerza neta. La unidad de fuerza en el Sistema Internacional es el Newton (N), equivalente a kg·m/s². Cuanto mayor es la masa de un objeto, menor es la aceleración producida por una fuerza dada.

**Tercera ley (Ley de acción y reacción):** Por cada fuerza de acción, existe una fuerza de reacción igual en magnitud y opuesta en dirección. Las fuerzas siempre ocurren en pares, actuando sobre cuerpos diferentes. Ejemplos: al caminar, empujamos el suelo hacia atrás y el suelo nos empuja hacia adelante; al remar, el remo empuja el agua hacia atrás y el agua empuja el bote hacia adelante.

### Movimiento rectilíneo uniforme (MRU)

En el MRU, la velocidad es constante y la aceleración es cero. La ecuación fundamental es v = d/t, donde d es la distancia recorrida y t el tiempo empleado. Ejemplo: un auto que viaja a 80 km/h en línea recta sin variar su velocidad recorre 80 km cada hora.

### Movimiento uniformemente acelerado (MUA)

En el MUA, la aceleración es constante. Las ecuaciones fundamentales son: v_f = v_i + a·t; d = v_i·t + (1/2)·a·t²; v_f² = v_i² + 2a·d. La **caída libre** es un caso particular de MUA donde la aceleración es la gravedad (g = 9,8 m/s² ≈ 10 m/s²). Las ecuaciones para caída libre son: v_f = g·t y h = (1/2)·g·t². Ejemplo: un auto acelera de 0 a 20 m/s en 5 segundos, su aceleración es a = (20 - 0) / 5 = 4 m/s².

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
