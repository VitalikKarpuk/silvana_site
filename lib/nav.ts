// Navigation model — mirrors content/GlobalNotes.md and Sitemap.md.

export type NavLink = { label: string; href: string; desc?: string };

export type NavGroup = {
  label: string;
  href: string;
  items: NavLink[];
  featured: NavLink;
};

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Products",
    href: "/products",
    items: [
      { label: "Silvana Book", href: "/products/silvana-book", desc: "The private orderbook on Canton." },
      { label: "Agentic API", href: "/products/agentic-api", desc: "One gRPC interface for everything on Canton." },
      { label: "SDK", href: "/products/sdk", desc: "Turn a strategy into an agent." },
    ],
    featured: { label: "Compare all products", href: "/products" },
  },
  {
    label: "Agents",
    href: "/agents",
    items: [
      { label: "How agents work", href: "/agents", desc: "Trade, settle, and prove — autonomously." },
      { label: "Agent catalog", href: "/agents/catalog", desc: "An agent for every job on the book." },
      { label: "Use cases in action", href: "/agents/use-cases", desc: "Step through live agent workflows." },
      { label: "Playground", href: "/agents/playground", desc: "Drive an agent before you deploy one." },
    ],
    featured: { label: "Try the Playground", href: "/agents/playground" },
  },
  {
    label: "Build",
    href: "/build",
    items: [
      { label: "SDK guide", href: "/build/sdk-guide", desc: "Zero to running agent." },
      { label: "API reference", href: "/build/api-reference", desc: "Four gRPC services, one execution layer." },
      { label: "Agent Space", href: "/build/agent-space", desc: "Agent types and hosting models." },
    ],
    featured: { label: "5-minute quickstart", href: "/build/sdk-guide" },
  },
  {
    label: "Solutions",
    href: "/solutions",
    items: [
      { label: "Use cases", href: "/solutions/trade", desc: "Same mechanism, many stories." },
      { label: "Who can use Silvana", href: "/solutions/who-can-use", desc: "Built for everyone who operates assets." },
      { label: "Case studies", href: "/solutions/case-studies", desc: "Built with the ecosystem." },
    ],
    featured: { label: "Find your fit", href: "/solutions" },
  },
];

export const NAV_STANDALONE: NavLink[] = [
  { label: "Our thesis", href: "/thesis" },
  { label: "Markets", href: "/markets" },
  { label: "EarnHub", href: "/earnhub" },
  { label: "About", href: "/about" },
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Products",
    links: [
      { label: "Silvana Book", href: "/products/silvana-book" },
      { label: "Terminal", href: "/products/silvana-book" },
      { label: "Swap", href: "/products/silvana-book" },
      { label: "Agentic API", href: "/products/agentic-api" },
      { label: "SDK", href: "/products/sdk" },
      { label: "Markets", href: "/markets" },
      { label: "EarnHub", href: "/earnhub" },
    ],
  },
  {
    title: "Agents",
    links: [
      { label: "How agents work", href: "/agents" },
      { label: "Agent catalog", href: "/agents/catalog" },
      { label: "Use cases in action", href: "/agents/use-cases" },
      { label: "Playground", href: "/agents/playground" },
      { label: "Marketplace", href: "/agents#marketplace" },
    ],
  },
  {
    title: "Build",
    links: [
      { label: "SDK guide", href: "/build/sdk-guide" },
      { label: "API reference", href: "/build/api-reference" },
      { label: "Agent Space", href: "/build/agent-space" },
      { label: "docs.silvana.one", href: "https://docs.silvana.one" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Use cases", href: "/solutions/trade" },
      { label: "Who can use Silvana", href: "/solutions/who-can-use" },
      { label: "Case studies", href: "/solutions/case-studies" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our thesis", href: "/thesis" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/about" },
      // external social — handles are placeholders, confirm before publish
      { label: "X", href: "https://x.com/silvana" },
      { label: "Telegram", href: "https://t.me/silvana" },
    ],
  },
];

export const POSITIONING_LINE =
  "Agentic DeFi on Canton. Private execution. Autonomous agents. Atomic settlement.";
