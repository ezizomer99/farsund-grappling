// Static data for the Farsund Grappling website
// This replaces the previous Sanity CMS integration

export interface NewsArticle {
  _id: string;
  title: string;
  slug: { current: string };
  author: {
    name: string;
    slug: { current: string };
  };
  publishedAt: string;
  featuredImage?: {
    url: string;
    alt?: string;
  };
  summary: string;
  content: any[];
  status: "draft" | "published";
}

export interface Instructor {
  _id: string;
  name: string;
  slug: { current: string };
  title: string;
  beltLevel: string;
  profileImage?: {
    url: string;
    alt: string;
  };
  bio: any[];
  email?: string;
  phone?: string;
  order: number;
}

export interface ClubInfo {
  _id: string;
  title: string;
  story: any[];
  mission?: string;
  values?: Array<{
    value: string;
    description?: string;
  }>;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
    socialMedia?: {
      facebook?: string;
      instagram?: string;
    };
  };
  location?: {
    title?: string;
    mapEmbedUrl?: string;
    directionsUrl?: string;
    findUsTitle?: string;
    description?: string;
    directionsText?: string;
  };
}

export interface TrainingProgram {
  _id: string;
  name: string;
  slug: { current: string };
  description: any[];
  level: "beginner" | "intermediate" | "advanced" | "all";
  ageGroup: "kids" | "teens" | "adults" | "all";
  schedule: Array<{
    day: string;
    startTime: string;
    endTime: string;
    instructor?: {
      name: string;
      slug: { current: string };
    };
  }>;
  isActive: boolean;
  order: number;
}

export interface Homepage {
  _id: string;
  title: string;
  heroSection: {
    title: string;
    scheduleButtonText: string;
    memberButtonText: string;
  };
  whyTrainWithUs: {
    title: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  whatIsGrappling: {
    title: string;
    content: any[];
    ctaButtonText: string;
  };
  newsSection: {
    title: string;
    viewAllText: string;
    readMoreText: string;
  };
}

export interface Background {
  _id: string;
  title: string;
  backgroundImage?: {
    url: string;
    alt: string;
  };
}

export interface TrainingPageData {
  _id: string;
  title: string;
  generalInfo: {
    sectionTitle: string;
    whatToBring: {
      title: string;
      items: Array<{ item: string }>;
    };
    hygiene: {
      title: string;
      intro?: string;
      items: Array<{ item: string }>;
    };
    environment: {
      title: string;
      content: string;
    };
  };
  trainingPrograms?: TrainingProgram[];
}

// Static Data

export const clubInfo: ClubInfo = {
  _id: "clubInfo1",
  title: "Farsund Grappling",
  story: [
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "Farsund Grappling ble startet i 2024 med en visjon om å skape et inkluderende og støttende miljø for alle som ønsker å lære grappling. Vi tror på å bygge en sterk klubbkultur der alle hjelper hverandre med å bli bedre.",
        },
      ],
    },
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "Klubben driver ut av Løft Gym i Farsund, hvor vi har tilgang til moderne fasiliteter og en dedikert treningsarena for grappling.",
        },
      ],
    },
  ],
  mission: "Submission Wrestling for alle i Farsund",
  contactInfo: {
    email: "kontakt@farsundgrappling.no",
    phone: "+47 123 45 678",
    address: "Løft Gym, Farsund",
    socialMedia: {
      facebook: "https://facebook.com/farsundgrappling",
      instagram: "https://instagram.com/farsundgrappling",
    },
  },
  location: {
    title: "Finn Oss",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2089.1234567890123!2d6.8123456789012345!3d58.09876543210987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTjCsDA1JzU1LjYiTiA2wrA0OCc0NC40IkU!5e0!3m2!1sen!2sno!4v1234567890123",
    directionsUrl: "https://maps.google.com/?q=Løft+Gym+Farsund",
    findUsTitle: "Hvor vi trener",
    description: "Vi holder til på Løft Gym i sentrum av Farsund.",
    directionsText: "Få veibeskrivelse",
  },
};

export const newsArticles: NewsArticle[] = [
  {
    _id: "news1",
    title: "Velkommen til Farsund Grappling!",
    slug: { current: "velkommen-til-farsund-grappling" },
    author: {
      name: "Farsund Grappling",
      slug: { current: "farsund-grappling" },
    },
    publishedAt: "2024-01-15T10:00:00Z",
    summary:
      "Vi er glade for å kunngjøre starten av Farsund Grappling - din nye treningsarena for grappling i Farsund!",
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Vi er stolte av å presentere Farsund Grappling, klubben som vil tilby kvalitetstrening i grappling for alle i Farsund-området.",
          },
        ],
      },
    ],
    status: "published",
  },
  {
    _id: "news2",
    title: "Nye Begynnerkurs Starter Snart",
    slug: { current: "nye-begynnerkurs-starter-snart" },
    author: {
      name: "Farsund Grappling",
      slug: { current: "farsund-grappling" },
    },
    publishedAt: "2024-02-01T12:00:00Z",
    summary:
      "Perfekt timing for å komme i gang med grappling! Våre begynnerkurs starter i mars.",
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Er du nybegynner og lurer på hvordan du kommer i gang? Våre spesialdesignede begynnerkurs starter i mars og er perfekte for deg som aldri har prøvd grappling før.",
          },
        ],
      },
    ],
    status: "published",
  },
  {
    _id: "news3",
    title: "Treningsutstyr og Anbefalinger",
    slug: { current: "treningsutstyr-og-anbefalinger" },
    author: {
      name: "Farsund Grappling",
      slug: { current: "farsund-grappling" },
    },
    publishedAt: "2024-03-10T14:00:00Z",
    summary:
      "Hva trenger du for å komme i gang med grappling? Her er våre anbefalinger for treningsutstyr.",
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "For å komme i gang trenger du bare komfortable klær. Etter hvert vil du kanskje investere i en gi (kimono) eller rashguard, men det er ingen krav når du starter.",
          },
        ],
      },
    ],
    status: "published",
  },
];

export const instructors: Instructor[] = [
  {
    _id: "instructor1",
    name: "Instruktør Navn",
    slug: { current: "instruktor-navn" },
    title: "Hovedinstruktør",
    beltLevel: "Lilla Belte",
    bio: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Med over 10 års erfaring innen grappling og Brazilian Jiu-Jitsu, brenner jeg for å dele kunnskapen min med andre. Jeg tror på å skape et trygt og støttende miljø hvor alle kan utvikle seg i sitt eget tempo.",
          },
        ],
      },
    ],
    email: "instruktor@farsundgrappling.no",
    phone: "+47 987 65 432",
    order: 1,
  },
];

export const trainingPrograms: TrainingProgram[] = [
  {
    _id: "program1",
    name: "Voksne Nybegynner",
    slug: { current: "voksne-nybegynner" },
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Perfekt for deg som er helt ny til grappling. Vi starter med grunnleggende teknikker og posisjonering.",
          },
        ],
      },
    ],
    level: "beginner",
    ageGroup: "adults",
    schedule: [
      {
        day: "Mandag",
        startTime: "18:00",
        endTime: "19:30",
        instructor: {
          name: "Instruktør Navn",
          slug: { current: "instruktor-navn" },
        },
      },
      {
        day: "Onsdag",
        startTime: "18:00",
        endTime: "19:30",
        instructor: {
          name: "Instruktør Navn",
          slug: { current: "instruktor-navn" },
        },
      },
    ],
    isActive: true,
    order: 1,
  },
  {
    _id: "program2",
    name: "Alle Nivåer",
    slug: { current: "alle-nivaer" },
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Åpen trening for alle ferdighetsnivåer. Her kan du trene teknikk og sparring i ditt eget tempo.",
          },
        ],
      },
    ],
    level: "all",
    ageGroup: "adults",
    schedule: [
      {
        day: "Fredag",
        startTime: "18:00",
        endTime: "19:30",
        instructor: {
          name: "Instruktør Navn",
          slug: { current: "instruktor-navn" },
        },
      },
    ],
    isActive: true,
    order: 2,
  },
  {
    _id: "program3",
    name: "Open Mat",
    slug: { current: "open-mat" },
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Fri trening hvor medlemmer kan trene sammen uten strukturert undervisning. Perfekt for sparring og å jobbe på egne teknikker.",
          },
        ],
      },
    ],
    level: "all",
    ageGroup: "adults",
    schedule: [
      {
        day: "Lørdag",
        startTime: "11:00",
        endTime: "13:00",
      },
    ],
    isActive: true,
    order: 3,
  },
];

export const homepage: Homepage = {
  _id: "homepage1",
  title: "Farsund Grappling - Hjem",
  heroSection: {
    title: "Velkommen til Farsund Grappling",
    scheduleButtonText: "Se Timeplanen",
    memberButtonText: "Bli Medlem",
  },
  whyTrainWithUs: {
    title: "Hvorfor Trene Med Oss?",
    features: [
      {
        icon: "🥋",
        title: "Erfaren Instruktør",
        description:
          "Lær fra en erfaren instruktør, som vil veilede deg gjennom teknikker og konsepter.",
      },
      {
        icon: "👨‍👩‍👧‍👦",
        title: "Støttende Fellesskap",
        description:
          "Bli med i et vennlig og inkluderende miljø hvor alle hjelper hverandre med å bli bedre.",
      },
      {
        icon: "🏆",
        title: "Alle Ferdighetsnivåer",
        description:
          "Uansett om du er helt nybegynner eller en erfaren utøver, har vi klasser for deg.",
      },
    ],
  },
  whatIsGrappling: {
    title: "🤼‍♂️ Hva er Grappling?",
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Grappling er en fellesnevner for kampsporter som er grepsbaserte (BJJ / judo / bryting / submission wrestling), i motsetning til de som benytter slag og spark. I stedet brukes teknikker som kast, posisjonering og bakkekontroll – med mål om å avslutte kampen ved hjelp av leddlåser eller kvelinger.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: 'Disse avslutningene kalles submissions, fordi motstanderen må gi seg ("tappe ut") for å unngå skade når teknikken utføres korrekt. (obs: man skader ikke hverandre på trening med vilje)',
          },
        ],
      },
    ],
    ctaButtonText: "Start i Dag",
  },
  newsSection: {
    title: "Siste Nytt",
    viewAllText: "Se Alle",
    readMoreText: "Les Mer",
  },
};

export const background: Background = {
  _id: "background1",
  title: "Background",
};

// Fetch functions (now synchronous, returning static data)
export function getNewsArticles(): NewsArticle[] {
  return newsArticles;
}

export function getNewsArticle(slug: string): NewsArticle | null {
  return (
    newsArticles.find(
      (article) =>
        article.slug.current === slug && article.status === "published",
    ) || null
  );
}

export function getInstructors(): Instructor[] {
  return instructors;
}

export function getInstructor(slug: string): Instructor | null {
  return (
    instructors.find((instructor) => instructor.slug.current === slug) || null
  );
}

export function getClubInfo(): ClubInfo {
  return clubInfo;
}

export function getTrainingPrograms(): TrainingProgram[] {
  return trainingPrograms;
}

export function getHomepage(): Homepage {
  return homepage;
}

export function getBackground(): Background {
  return background;
}
