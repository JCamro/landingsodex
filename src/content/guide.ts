// Contenido tomado de docs/CONTENT.md (fuente: Guia_salud_sexual_condon_ITS.docx).
// No alterar datos de salud sin revisión.

export const hero = {
  title: "Guía de salud sexual",
  subtitle: "Uso correcto del condón, ITS y métodos de cuidado",
  lead: "Información clara para vivir una sexualidad responsable y segura",
};

export const usage = {
  intro:
    "El condón es una barrera que ayuda a prevenir embarazos y reduce el riesgo de contraer infecciones de transmisión sexual (ITS). Debe utilizarse desde el inicio hasta el final de cada relación sexual vaginal, anal u oral cuando corresponda.",
  steps: [
    {
      title: "Revisa el empaque y la fecha de vencimiento",
      detail:
        "No lo uses si el envoltorio está roto, abierto, reseco o dañado.",
    },
    {
      title: "Abre el paquete con cuidado",
      detail:
        "Usa los dedos; no utilices dientes, tijeras ni objetos que puedan romperlo.",
    },
    {
      title: "Colócalo antes de cualquier contacto genital",
      detail:
        "Comprueba que esté del lado correcto para desenrollarse. Si lo colocaste al revés y tocó el pene, usa uno nuevo.",
    },
    {
      title: "Aprieta la punta y elimina el aire",
      detail:
        "Deja espacio en la punta para recoger el semen y evita que quede aire atrapado.",
    },
    {
      title: "Desenróllalo hasta la base del pene erecto",
      detail:
        "Si no baja con facilidad, puede estar al revés: deséchalo y comienza con uno nuevo.",
    },
    {
      title: "Después de eyacular, retira el pene sujetando la base",
      detail:
        "Hazlo mientras el pene siga erecto y con cuidado para evitar derrames.",
    },
    {
      title: "Retíralo y deséchalo",
      detail:
        "Haz un nudo si es posible, envuélvelo en papel y tíralo a la basura. No lo arrojes al inodoro.",
    },
    {
      title: "Usa uno nuevo en cada relación o práctica",
      detail: "Nunca reutilices un condón ni uses dos condones a la vez.",
    },
  ],
};

export const recommendations = [
  {
    id: "lubricantes",
    title: "Lubricantes",
    text: "Utiliza lubricantes a base de agua o silicona. Los aceites, vaselina y cremas pueden debilitar los condones de látex.",
    tone: "normal",
  },
  {
    id: "almacenamiento",
    title: "Almacenamiento",
    text: "Guarda los condones en un lugar fresco y seco, lejos del calor y de objetos que puedan dañarlos; evita llevarlos mucho tiempo en la billetera.",
    tone: "normal",
  },
  {
    id: "rotura",
    title: "Si se rompe o se sale",
    text: "Si el condón se rompe o se sale, detengan la relación. Consideren anticoncepción de emergencia si existe riesgo de embarazo y consulten cuanto antes por evaluación de ITS y posible profilaxis para VIH (PEP), que debe iniciarse dentro de las 72 horas.",
    tone: "alert",
  },
] as const;

export const its = {
  intro:
    "Las infecciones de transmisión sexual (ITS) son infecciones que se transmiten principalmente por contacto sexual vaginal, anal u oral, y algunas también por contacto directo de piel con piel o de madre a hijo durante el embarazo, parto o lactancia. El término ETS se utiliza para referirse a enfermedades que pueden aparecer como consecuencia de una ITS. Actualmente se prefiere decir ITS, porque muchas infecciones no producen síntomas.",
  list: [
    {
      name: "VIH",
      text: "Afecta el sistema inmunitario. Sin tratamiento puede avanzar; el tratamiento antirretroviral permite controlar la infección.",
    },
    {
      name: "Virus del papiloma humano (VPH)",
      text: "Es muy frecuente. Algunos tipos causan verrugas y otros pueden provocar cáncer. La vacunación ayuda a prevenir los tipos de mayor riesgo.",
    },
    {
      name: "Sífilis",
      text: "Puede comenzar con una llaga que no duele y luego causar otros síntomas. Sin tratamiento puede ocasionar complicaciones graves.",
    },
    {
      name: "Gonorrea y clamidia",
      text: "Pueden afectar genitales, recto o garganta. A menudo no presentan síntomas y pueden causar complicaciones si no se tratan.",
    },
    {
      name: "Herpes genital",
      text: "Puede causar ampollas o llagas dolorosas, aunque algunas personas no presentan señales visibles.",
    },
    {
      name: "Hepatitis B",
      text: "Puede transmitirse por contacto sexual y afectar el hígado. Existe una vacuna para prevenirla.",
    },
  ],
  alerts: {
    signs: [
      "Flujo o secreción inusual",
      "Ardor al orinar",
      "Llagas",
      "Ampollas",
      "Verrugas",
      "Picazón",
      "Dolor pélvico",
      "Sangrado fuera de lo habitual",
    ],
    // El párrafo original de la guía, dividido en frases para destacarlas por separado.
    intro: "Pueden ser señales de una ITS.",
    warning: "No tener síntomas no significa que no exista una infección.",
    action:
      "Ante una posible exposición o una señal de alerta, acude a un establecimiento de salud para recibir orientación y pruebas.",
    caution: "Evita automedicarte.",
  },
};

// `its`: relación con la protección frente a ITS. `pregnancy`: si previene embarazos.
export type Protection = "yes" | "no" | "detects" | "partial" | "na";

export const methods: {
  id: string;
  name: string;
  text: string;
  its: Protection;
  itsLabel: string;
  pregnancy: boolean;
}[] = [
  {
    id: "condon",
    name: "Condón externo o interno",
    text: "Reduce el riesgo de ITS y ayuda a prevenir embarazos. Debe usarse correctamente en cada relación.",
    its: "yes",
    itsLabel: "Reduce el riesgo de ITS",
    pregnancy: true,
  },
  {
    id: "hormonales",
    name: "Anticonceptivos hormonales",
    text: "La píldora, inyección, implante, parche y anillo ayudan a prevenir embarazos, pero no protegen contra las ITS.",
    its: "no",
    itsLabel: "No protegen de ITS",
    pregnancy: true,
  },
  {
    id: "diu",
    name: "DIU",
    text: "El dispositivo intrauterino de cobre o hormonal es un método muy eficaz para prevenir embarazos; no protege contra las ITS.",
    its: "no",
    itsLabel: "No protege de ITS",
    pregnancy: true,
  },
  {
    id: "pruebas",
    name: "Pruebas de ITS",
    text: "Realizarse pruebas según la orientación del personal de salud permite detectar infecciones incluso cuando no hay síntomas.",
    its: "detects",
    itsLabel: "Detectan infecciones",
    pregnancy: false,
  },
  {
    id: "vacunacion",
    name: "Vacunación",
    text: "Las vacunas contra el VPH y la hepatitis B ayudan a prevenir infecciones importantes.",
    its: "partial",
    itsLabel: "Previene VPH y hepatitis B",
    pregnancy: false,
  },
  {
    id: "prep-pep",
    name: "PrEP y PEP para VIH",
    text: "La PrEP es un medicamento preventivo para personas con posibilidad continua de exposición al VIH. La PEP se usa después de una posible exposición y debe iniciarse lo antes posible, como máximo dentro de 72 horas, bajo atención médica.",
    its: "partial",
    itsLabel: "Previene el VIH",
    pregnancy: false,
  },
  {
    id: "consentimiento",
    name: "Consentimiento y comunicación",
    text: "Todas las personas deben aceptar libremente la relación, poder cambiar de opinión y conversar sobre límites, protección y pruebas.",
    its: "na",
    itsLabel: "Base de todo cuidado",
    pregnancy: false,
  },
];

export const remember = {
  doubleProtection:
    "La doble protección consiste en combinar el condón con otro método anticonceptivo eficaz, cuando se desea prevenir tanto embarazos como ITS. Ningún método anticonceptivo hormonal ni el DIU reemplaza al condón para reducir el riesgo de infecciones.",
  closing: "Cuidarte también es cuidar a la otra persona.",
  closingLine: "Infórmate, conversa y decide sin presiones.",
};

export const sources = [
  {
    label: "OMS. Infecciones de transmisión sexual (ITS)",
    href: "https://www.who.int/es/news-room/fact-sheets/detail/sexually-transmitted-infections-(stis)",
  },
  {
    label: "OMS. Planificación familiar y anticoncepción",
    href: "https://www.who.int/es/news-room/fact-sheets/detail/family-planning-contraception",
  },
  {
    label: "CDC. Uso del condón",
    href: "https://www.cdc.gov/condom-use/",
  },
  {
    label: "Ministerio de Salud del Perú (MINSA)",
    href: "https://www.gob.pe/institucion/minsa/tema/478-salud-sexual-y-reproductiva",
  },
];

export const disclaimer =
  "Esta página es informativa y no reemplaza la consulta con un profesional de salud.";

export const nav = [
  { href: "#pasos", label: "Uso del condón" },
  { href: "#recomendaciones", label: "Recomendaciones" },
  { href: "#its", label: "ITS" },
  { href: "#metodos", label: "Métodos" },
  { href: "#recuerda", label: "Recuerda" },
  { href: "#fuentes", label: "Fuentes" },
];
