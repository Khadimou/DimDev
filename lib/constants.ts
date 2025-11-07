export const SITE_CONFIG = {
  name: "DimDev",
  title: "DimDev - Portfolio & Services POC",
  description: "Je transforme vos idées en prototypes fonctionnels — en quelques jours.",
  url: "https://dimdev.com",
  author: "Rassoul Dim",
  email: "contact@dimdev.com",
  social: {
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourprofile",
    tiktok: "https://tiktok.com/@yourprofile",
    instagram: "https://instagram.com/yourprofile",
  },
};

export const SERVICES = [
  {
    id: "poc-express",
    title: "POC Express",
    description: "Prototype fonctionnel pour valider l'idée et convaincre des partenaires.",
    price: "À partir de 400 €",
    priceAmount: 400,
    duration: "3-5 jours",
    features: [
      "Prototype interactif (web)",
      "1 flow utilisateur principal",
      "Documentation technique",
      "Export deployable",
      "2 révisions incluses",
    ],
    popular: false,
    stripePriceId: process.env.STRIPE_PRICE_POC || "",
    paymentEnabled: true,
  },
  {
    id: "starter-mvp",
    title: "Starter MVP",
    description: "Produit utilisable par des premiers utilisateurs.",
    price: "À partir de 1 200 €",
    priceAmount: 1200,
    duration: "2-4 semaines",
    features: [
      "Authentification complète",
      "Base de données configurée",
      "Admin panel minimal",
      "Intégration Stripe",
      "Envoi d'emails transactionnels",
      "Documentation + support 30j",
    ],
    popular: true,
    stripePriceId: process.env.STRIPE_PRICE_MVP || "",
    paymentEnabled: true,
  },
  {
    id: "full-dev",
    title: "Growth / Full Dev",
    description: "Produit scalé, support et maintenance.",
    price: "Sur devis",
    priceAmount: null,
    duration: "Variable",
    features: [
      "Architecture scalable",
      "DevOps (Docker, Kubernetes)",
      "Monitoring et logs",
      "Tests automatisés",
      "CI/CD pipeline",
      "Roadmap et maintenance",
    ],
    popular: false,
    stripePriceId: null,
    paymentEnabled: false,
  },
];

export const ADD_ONS = [
  {
    name: "Hébergement & maintenance",
    price: "70 €/mois",
  },
  {
    name: "Design UI/UX",
    price: "+300 €",
  },
  {
    name: "Intégration mobile native",
    price: "Sur devis",
  },
];

export const STACK = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  backend: ["Python", "Django", "FastAPI", "PostgreSQL"],
  devops: ["Git", "Docker", "Jenkins", "Kubernetes"],
};

export const NAV_ITEMS = [
  { label: "Works", href: "/works" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];
