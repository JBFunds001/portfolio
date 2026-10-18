// All site copy lives here. Edit this file to update the portfolio —
// no component changes needed.

export const profile = {
  name: "Joseph Adeniji",
  role: "Full-stack engineer",
  location: "Based in Nigeria, working remotely",
  intro:
    "I build web products end to end, from the interface people use to the APIs and data behind it. I started in e-commerce, shipping 15+ Shopify stores for clients, and I bring that habit of building for real customers to everything I make.",
  // TODO: replace with the address you want public.
  email: "you@example.com",
  github: "https://github.com/JBFunds001",
  // TODO: add your LinkedIn and a booking link (Calendly, Cal.com, etc.).
  linkedin: "",
  bookingUrl: "",
};

export type StackLayer = {
  id: string;
  name: string;
  summary: string;
  tools: string[];
  proof: string;
};

// Ordered top to bottom: what users see first, down to the systems underneath.
export const stack: StackLayer[] = [
  {
    id: "interface",
    name: "Interface",
    summary: "Responsive, accessible UIs that load fast and feel considered.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS/JS"],
    proof: "This site, plus custom front-end components for client stores.",
  },
  {
    id: "api",
    name: "API",
    summary: "Route handlers and services with validated input and clear errors.",
    tools: ["Node.js", "REST", "GraphQL", "Zod", "Vitest"],
    proof: "The contact endpoint on this site is validated and unit tested.",
  },
  {
    id: "data",
    name: "Data",
    summary: "Schemas, queries and auth for apps that store real user data.",
    tools: ["PostgreSQL", "Supabase", "Prisma"],
    proof: "Freelance client tracker (in progress).",
  },
  {
    id: "commerce",
    name: "Commerce",
    summary: "Stores, apps and integrations that move products and orders.",
    tools: ["Shopify Liquid", "Shopify Admin API", "WooCommerce", "Klaviyo", "AutoDS"],
    proof: "15+ Shopify stores shipped for clients.",
  },
];

export type Project = {
  name: string;
  description: string;
  stack: string[];
  status: "Live" | "In progress";
  repo?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    name: "Freelance client tracker",
    description:
      "A full-stack app for freelancers to track clients, projects and invoices, with sign-in and a Postgres database.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    status: "In progress",
  },
  {
    name: "Shopify inventory alerts app",
    description:
      "An embedded Shopify app that watches stock levels through the Admin GraphQL API and alerts merchants before products sell out.",
    stack: ["Shopify CLI", "React Router", "GraphQL", "Polaris"],
    status: "In progress",
  },
  {
    name: "Orders API service",
    description:
      "A standalone REST API with tests, Docker and a CI pipeline, built to show production habits rather than UI.",
    stack: ["Node.js", "Fastify", "Docker", "GitHub Actions"],
    status: "In progress",
  },
];

// Client stores and sites. Keep only ones you're comfortable naming publicly.
export const clientWork: { name: string; url: string }[] = [
  { name: "Floem Tea", url: "https://floemtea.com" },
  { name: "Forest Superfoods", url: "https://forestsuperfoods.eu" },
  { name: "Holistic Skin by Jen", url: "https://holisticskinbyjen.com" },
  { name: "Body and Soul", url: "https://bodyandsoul.ca" },
  { name: "LJ Performance", url: "https://ljperformance.com" },
  { name: "Dropps", url: "https://dropps.com" },
];
