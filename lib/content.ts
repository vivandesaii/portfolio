export const LINKS = {
  email: "vivan.desai@mail.utoronto.ca",
  github: "https://github.com/vivandesaii",
  linkedin: "https://www.linkedin.com/in/vivand/",
  resume: "/resume.pdf",
  finsnap: "https://finsnap-six.vercel.app",
  sipRepo: "https://github.com/vivandesaii/vfv_to_forecast",
  song: "https://open.spotify.com/search/WAIT%20FOR%20U%20Future",
};

export const HERO = {
  name: "Vivan Desai",
  status:
    "3rd year CS Specialist · Computer Systems · University of Toronto · Class of 2028",
  positioning:
    "Backend-leaning engineer building ML and quantitative systems for finance.",
};

export const ABOUT = [
  "I'm a Computer Science Specialist (Computer Systems focus) at the University of Toronto, Class of 2028. I work best at the intersection of fintech and software engineering — backend services, data pipelines, and the ML/quant models that sit on top of them.",
  "Off the terminal: former AIFF-registered competitive footballer (Karnataka State Team), hiker, DJ/producer, and casual astrophysics reader.",
];

export interface Project {
  name: string;
  tagline: string;
  summary: string;
  stack: string[];
  metric: string;
  links?: { href: string; label: string }[];
}

export const PROJECTS: Project[] = [
  {
    name: "Finsnap",
    tagline: "Full-stack ML transaction classifier",
    summary:
      "Solves the messy-merchant-string problem: raw bank transaction descriptions are noisy and inconsistent, so Finsnap classifies each into one of 23 spending categories with a scikit-learn MLP trained on 30,000 transactions across 3,333 Canadian and GCC merchants. Served as a REST API via FastAPI with JWT auth and PostgreSQL on Railway, React frontend on Vercel, plus a user feedback loop that logs misclassification corrections for retraining — the same pattern used in production ML systems.",
    stack: ["scikit-learn", "FastAPI", "PostgreSQL", "JWT", "Railway", "React"],
    metric: "88% weighted F1 across 23 categories",
    links: [{ href: LINKS.finsnap, label: "finsnap-six.vercel.app" }],
  },
  {
    name: "Smart SIP Engine",
    tagline: "Quantitative finance research · VFV.TO",
    summary:
      "A quant/finance-engineering crossover project: models VFV.TO volatility with GARCH, detects market regimes with a 3-state Hidden Markov Model, and sizes systematic investment contributions using an ARIMA/ETS/Prophet forecasting ensemble — timing contributions to regime and volatility instead of a fixed calendar.",
    stack: ["GARCH", "3-state HMM", "ARIMA", "ETS", "Prophet", "Python"],
    metric: "Sharpe 2.43 vs 2.32 baseline",
    links: [{ href: LINKS.sipRepo, label: "github.com/vivandesaii/vfv_to_forecast" }],
  },
  {
    name: "Customer Churn Prediction",
    tagline: "Random Forest + hyperparameter optimization · IB Extended Essay",
    summary:
      "Full supervised ML workflow predicting telecom customer churn on a 7,000-row dataset: feature cleaning and engineering, Random Forest classification, and RandomizedSearchCV tuning across five hyperparameters. Improved cross-validation score from 78.9% to 81.0% with gains across accuracy, precision, recall, and F1. Awarded the highest band (A) for the IB Extended Essay.",
    stack: ["Python", "scikit-learn", "Random Forest", "pandas"],
    metric: "CV score 78.9% → 81.0%",
    links: [{ href: "/assets/proj1.pdf", label: "read the paper (pdf)" }],
  },
  {
    name: "Omani Banking Transaction Classifier",
    tagline: "ML + NLP · the project that became Finsnap",
    summary:
      "Built at Bank Muscat: a supervised classifier for noisy, unstructured Omani bank-statement transactions to power Personal Finance Management and internal analytics. Benchmarked MLP, Gradient Boosting, and SVM architectures with feature-selection and scaling pipelines validated across held-out and out-of-sample sets. This pipeline was later extended into the deployed full-stack product, Finsnap.",
    stack: ["Python", "scikit-learn", "NLP", "SVM / MLP / GBM"],
    metric: "Foundation for a deployed PFM product",
    links: [{ href: "/assets/proj2.pdf", label: "read the report (pdf)" }],
  },
];

export interface Role {
  company: string;
  title: string;
  note?: string;
}

export const EXPERIENCE: Role[] = [
  {
    company: "Bank Muscat",
    title: "Business Intelligence Intern",
    note: "Summer 2025 · returning Summer 2026",
  },
  { company: "IMTAC Oman", title: "Data Analytics Intern", note: "Summer 2024" },
  {
    company: "Toronto Student Investment Council",
    title: "Senior Analyst",
    note: "Apr 2025 – Present",
  },
  { company: "Toronto Trust Investments", title: "Lead Web Developer" },
];

export const SKILLS: { category: string; items: string[] }[] = [
  {
    category: "Languages",
    items: ["Python", "Java", "JavaScript", "SQL"],
  },
  {
    category: "Backend / Infra",
    items: ["FastAPI", "PostgreSQL", "Redis", "Docker", "AWS", "REST APIs", "JWT Auth"],
  },
  {
    category: "ML / Quant",
    items: ["scikit-learn", "pandas", "GARCH", "HMM", "ARIMA / Prophet"],
  },
  {
    category: "Frontend",
    items: ["React", "Tailwind CSS", "CSS"],
  },
];
