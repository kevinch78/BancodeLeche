import type { StationData } from '../types/route.types';

/**
 * ÚNICA FUENTE DE VERDAD (Data-driven)
 * Configuración de la trayectoria y contenido de "La Ruta de la Gotita".
 * Todas las coordenadas (x, y) representan porcentajes dentro del contenedor 16:9.
 */
export const ROUTE_STATIONS: StationData[] = [
  {
    id: 'start-point',
    index: 0,
    numberLabel: 'Inicio',
    name: 'El Jardín del Origen',
    subtitle: 'Bajo la sombra del gran árbol protector',
    shortDescription:
      'Aquí despierta nuestra pequeña gotita de leche materna, lista para una misión de vida y amor.',
    educationalContent:
      '¡Hola, amiguito explorador! Soy la Gotita de Leche. Nací del amor incondicional de una mamá donante en el departamento de Nariño. Mi destino es muy especial: ayudar a crecer fuertes y sanos a los recién nacidos en el Hospital Universitario Departamental de Nariño. ¿Me acompañas en este maravilloso viaje?',
    type: 'start',
    coordinates: { x: 16.5, y: 41.5 },
    themeColor: 'sky',
    iconName: 'Sparkles',
    riddle: {
      riddleText:
        'Blanca como la nieve, tibia como el calor del hogar, soy el mejor alimento que a un bebé le puedes dar. ¿Quién soy?',
      hint: 'Soy natural y vengo del pecho materno.',
      answerText: '¡La leche materna!',
      funFact:
        'La leche materna contiene anticuerpos y nutrientes que se adaptan exactamente a las necesidades de cada bebé.',
    },
    badgeReward: {
      title: 'Espíritu Explorador',
      description: '¡Has iniciado la gran aventura de la lactancia materna!',
      emoji: '🌱',
    },
  },
  {
    id: 'estacion-1',
    index: 1,
    numberLabel: 'Estación 1',
    name: 'La Gotita Curiosa',
    subtitle: 'El superpoder del calostro y el oro líquido',
    shortDescription:
      'Descubre por qué las primeras gotas de leche materna salvan vidas y protegen a los bebés.',
    educationalContent:
      'En esta estación aprendemos sobre el "Calostro". Es la primera leche producida por la madre durante los primeros días después del parto. Es espesa, dorada y se le conoce como la primera vacuna del bebé, porque está repleta de defensas naturales que cuidan sus defensas y su corazoncito.',
    type: 'station',
    coordinates: { x: 27.5, y: 33.5 },
    themeColor: 'mint',
    iconName: 'ShieldCheck',
    quiz: {
      id: 'quiz-estacion-1',
      question: '¿Por qué se le llama al calostro "la primera vacuna del bebé"?',
      options: [
        {
          id: 'opt-1',
          text: 'Porque se compra en una farmacia en frasquitos de vidrio.',
          isCorrect: false,
          feedback: '¡Casi! Pero no se compra; viene naturalmente del pecho de mamá.',
        },
        {
          id: 'opt-2',
          text: 'Porque contiene anticuerpos que protegen al recién nacido de infecciones.',
          isCorrect: true,
          feedback:
            '¡Excelente respuesta! El calostro es un escudo protector natural lleno de defensas.',
        },
        {
          id: 'opt-3',
          text: 'Porque cambia de color cuando hace frío.',
          isCorrect: false,
          feedback:
            'La leche es mágica, ¡pero su superpoder principal son los nutrientes y defensas!',
        },
      ],
      explanation:
        'El calostro es rico en inmunoglobulinas, especialmente IgA secretora, que recubre el tracto digestivo del neonato impidiendo el paso de bacterias.',
    },
    riddle: {
      riddleText: 'Oro no es, plata no es, es doradita y muy nutritiva al nacer. ¿Qué es?',
      hint: 'Es la primera leche de mamá.',
      answerText: '¡El calostro!',
      funFact:
        'Unas pocas gotas de calostro son suficientes para saciar el pequeño estómago de un recién nacido.',
    },
    dialogQuestions: [
      {
        id: 1,
        question: '¿Qué es un Banco de Leche Humana?',
        answer:
          '[Texto editable] Es un servicio especializado encargado de promover, proteger y apoyar la lactancia materna, recolectando, procesando y distribuyendo leche humana segura para los bebés que más la necesitan.',
        themeColor: '#38BDF8',
        bgColor: '#E0F2FE',
        badgeLabel: 'Pregunta 1 de 5',
      },
      {
        id: 2,
        question: '¿Cuáles son los objetivos del Banco de Leche?',
        answer:
          '[Texto editable] Garantizar leche materna segura a recién nacidos prematuros o hospitalizados, fomentar la lactancia materna y brindar asesoría gratuita a las madres.',
        themeColor: '#FACC15',
        bgColor: '#FEF9C3',
        badgeLabel: 'Pregunta 2 de 5',
      },
      {
        id: 3,
        question: '¿Quién puede donar?',
        answer:
          '[Texto editable] Toda madre sana que esté amamantando a su propio hijo, tenga excedente de leche y cumpla con los exámenes médicos básicos.',
        themeColor: '#4ADE80',
        bgColor: '#DCFCE7',
        badgeLabel: 'Pregunta 3 de 5',
      },
      {
        id: 4,
        question: '¿Quién recibe la Leche Humana donada?',
        answer:
          '[Texto editable] Bebés prematuros, de muy bajo peso al nacer o recién nacidos hospitalizados en unidades de cuidados intensivos que no pueden recibir leche de su propia madre.',
        themeColor: '#FB923C',
        bgColor: '#FFEDD5',
        badgeLabel: 'Pregunta 4 de 5',
      },
      {
        id: 5,
        question: '¿Dónde puedo acudir o qué debo hacer para donar?',
        answer:
          '[Texto editable] Puedes comunicarte o acercarte directamente al Banco de Leche Humana del Hospital Universitario Departamental de Nariño, donde recibirás orientación paso a paso.',
        themeColor: '#F472B6',
        bgColor: '#FCE7F3',
        badgeLabel: 'Pregunta 5 de 5',
      },
    ],
    badgeReward: {
      title: 'Escudo Inmune',
      description: 'Descubriste el poder protector del calostro materno.',
      emoji: '🛡️',
    },
  },
  {
    id: 'estacion-2',
    index: 2,
    numberLabel: 'Estación 2',
    name: 'La Gotita Viajera',
    subtitle: 'La cadena de frío y el viaje seguro',
    shortDescription:
      'Aprende cómo las madres recolectan y cuidan la leche materna con higiene y temperatura controlada.',
    educationalContent:
      '¡Nuestra Gotita emprende su camino! Para viajar sana y salva, la leche materna se recolecta en frascos limpios de vidrio esterilizado con tapa de plástico. Luego viaja protegida con hielo en neveritas especiales. Este cuidado se llama la "Cadena de Frío", ¡y evita que las bacterias se acerquen!',
    type: 'station',
    coordinates: { x: 54.5, y: 31.5 },
    themeColor: 'sky',
    iconName: 'ThermometerSnowflake',
    quiz: {
      id: 'quiz-estacion-2',
      question: '¿Cuál es el mejor recipiente para almacenar leche materna donada?',
      options: [
        {
          id: 'opt-a',
          text: 'Frasco de vidrio esterilizado con tapa plástica limpia.',
          isCorrect: true,
          feedback:
            '¡Perfecto! El vidrio facilita la higiene y la conservación libre de químicos nocivos.',
        },
        {
          id: 'opt-b',
          text: 'Una botella metálica o lata reciclada.',
          isCorrect: false,
          feedback: 'Los metales pueden oxidarse y alterar la calidad de la leche.',
        },
        {
          id: 'opt-c',
          text: 'Un vaso abierto sin tapa en la ventana.',
          isCorrect: false,
          feedback: '¡No! La leche materna siempre debe estar bien sellada y refrigerada.',
        },
      ],
      explanation:
        'El vidrio templado o boro-silicato con tapa plástica libre de BPA previene la adherencia de grasa en las paredes y garantiza una asepsia total.',
    },
    badgeReward: {
      title: 'Guardián del Frío',
      description: 'Aprendiste a preservar la leche con higiene y amor.',
      emoji: '❄️',
    },
  },
  {
    id: 'estacion-3',
    index: 3,
    numberLabel: 'Estación 3',
    name: 'La Gotita Valiente',
    subtitle: 'Pasteurización y control de calidad riguroso',
    shortDescription:
      'Conoce los filtros de laboratorio que garantizan que cada gota sea 100% segura para bebés prematuros.',
    educationalContent:
      'Al llegar al laboratorio del Banco de Leche Humana, la Gotita se viste con bata de científica. Los profesionales realizan pruebas de acidez, análisis biológico y un proceso suave de calentamiento y enfriamiento rápido llamado "Pasteurización Holder" (62.5 °C por 30 minutos). Así se eliminan microorganismos manteniendo casi intactas sus vitaminas y propiedades.',
    type: 'station',
    coordinates: { x: 72.5, y: 59.0 },
    themeColor: 'lavender',
    iconName: 'Puzzle',
    puzzleActivity: {
      instruction:
        'En esta estación, los participantes deberán organizarse en grupos y armar uno de los tres rompecabezas disponibles en un tiempo de 5 minutos. Cada uno contiene información importante sobre el Banco de Leche Humana.',
      defaultDurationSeconds: 300,
      puzzles: [
        { id: 1, title: 'Rompecabezas 1', subtitle: 'Equipo 1' },
        { id: 2, title: 'Rompecabezas 2', subtitle: 'Equipo 2' },
        { id: 3, title: 'Rompecabezas 3', subtitle: 'Equipo 3' },
      ],
    },
    quiz: {
      id: 'quiz-estacion-3',
      question: '¿Para qué sirve el proceso de pasteurización en el Banco de Leche?',
      options: [
        {
          id: 'opt-p1',
          text: 'Para cambiar el sabor a chocolate y fresa.',
          isCorrect: false,
          feedback:
            '¡Jeje, qué divertido! Pero la leche materna conserva su sabor original y propiedades.',
        },
        {
          id: 'opt-p2',
          text: 'Para asegurar que sea totalmente inocua y libre de bacterias para bebés en cuidados intensivos.',
          isCorrect: true,
          feedback: '¡Brillante! La pasteurización la hace segura para los bebés más vulnerables.',
        },
        {
          id: 'opt-p3',
          text: 'Para congelarla y convertirla en helado de paleta.',
          isCorrect: false,
          feedback: 'El objetivo es médico: proteger a los recién nacidos.',
        },
      ],
      explanation:
        'El Banco de Leche del HUDN aplica rigurosos controles fisicoquímicos y microbiológicos para nutrir a bebés prematuros con total seguridad.',
    },
    badgeReward: {
      title: 'Científico de la Salud',
      description: 'Comprendiste el valor de la pasteurización y bioseguridad.',
      emoji: '🔬',
    },
  },
  {
    id: 'estacion-4',
    index: 4,
    numberLabel: 'Estación 4',
    name: 'La Gotita Generosa',
    subtitle: 'El amor solidario de las mamás donantes',
    shortDescription:
      'Cualquier madre lactante sana con excedente de leche puede convertirse en una superheroína donante.',
    educationalContent:
      '¡Donar leche materna es donar vida! En Nariño, muchas madres generosas que producen más leche de la que su propio hijo necesita, deciden compartirla. Su gesto solidario alimenta a bebés hospitalizados cuyas mamás, por razones de salud temporal, aún no pueden amamantarlos. ¡Cada gota es un abrazo de esperanza!',
    type: 'station',
    coordinates: { x: 61.5, y: 77.5 },
    themeColor: 'pink',
    iconName: 'HeartHandshake',
    riddle: {
      riddleText: 'No lleva capa ni antifaz, pero salva vidas con ternura y bondad. ¿Quién es?',
      hint: 'Es una mamá que comparte su leche con otros bebitos.',
      answerText: '¡La mamá donante de leche materna!',
      funFact:
        'Un litro de leche materna donada puede alimentar y nutrir a varios recién nacidos prematuros en la UCI neonatal.',
    },
    quiz: {
      id: 'quiz-estacion-4',
      question: '¿Quiénes se benefician principalmente de la leche humana donada?',
      options: [
        {
          id: 'opt-g1',
          text: 'Bebés recién nacidos hospitalizados o prematuros que la necesitan para sobrevivir.',
          isCorrect: true,
          feedback:
            '¡Exacto! Es vital para prevenir enfermedades graves como la enterocolitis necrotizante.',
        },
        {
          id: 'opt-g2',
          text: 'Mascotas del parque central.',
          isCorrect: false,
          feedback: 'La leche humana es un tratamiento médico exclusivo para la infancia humana.',
        },
      ],
      explanation:
        'La leche donada pasteurizada es la mejor alternativa cuando la leche de la propia madre no está disponible inmediatamente.',
    },
    badgeReward: {
      title: 'Corazón Solidario',
      description: 'Reconociste el heroísmo de las madres donantes de Nariño.',
      emoji: '💖',
    },
  },
  {
    id: 'meta-hudn',
    index: 5,
    numberLabel: 'Meta',
    name: 'Banco de Leche Humana HUDN',
    subtitle: 'Hospital Universitario Departamental de Nariño',
    shortDescription:
      '¡Misión cumplida! La Gotita llega a su destino para llevar vida, salud y amor a los bebitos de Nariño.',
    educationalContent:
      '¡FELICITACIONES, CAMPEÓN(A)! Has completado "La Ruta de la Gotita". Gracias a tu compromiso y curiosidad, nuestra Gotita llegó feliz y victoriosa al Banco de Leche Humana del Hospital Universitario Departamental de Nariño. Aquí, médicos, enfermeras y nutricionistas entregan este tesoro a los bebés de la Unidad Neonatal. ¡Tú también eres parte de esta hermosa red de vida!',
    type: 'goal',
    coordinates: { x: 31.5, y: 84.5 },
    themeColor: 'hudn',
    iconName: 'Award',
    badgeReward: {
      title: 'Guardián Supremo de la Leche',
      description: '¡Completaste toda la ruta y llevaste vida al Banco de Leche HUDN!',
      emoji: '🏆',
    },
  },
];
