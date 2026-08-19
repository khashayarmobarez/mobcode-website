export const site = {
  name: "mobcode",
  url: "https://mobcode.dev",
  description:
    "Production-grade mobile code on a subscription. A curated feature pack, reviewed and tested, in your repo every month.",
  email: "hello@mobcode.dev",
};

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const marqueeItems = [
  "Ship monthly",
  "Your IP, always",
  "Native code",
  "Reviewed & tested",
  "App-store ready",
  "Cancel anytime",
];

export type Feature = {
  title: string;
  body: string;
  icon: string;
  span: string;
};

export const features: Feature[] = [
  {
    title: "A shippable update. Every single month.",
    body: "No more nine-month roadmaps. A focused, production-ready feature pack lands in your repository on the same schedule, every month.",
    icon: "rocket",
    span: "lg:col-span-2",
  },
  {
    title: "Native code, not wrappers.",
    body: "Swift, Kotlin and React Native written by senior mobile engineers — typed, tested and documented against your codebase.",
    icon: "code",
    span: "",
  },
  {
    title: "Built to publish.",
    body: "Signing, build config, asset catalogs and store-metadata support so every release is one click from submit.",
    icon: "store",
    span: "",
  },
  {
    title: "Reviewed by engineers, not robots.",
    body: "Every pull request is reviewed for performance, security and UX before it ever lands in your repo.",
    icon: "shield",
    span: "",
  },
  {
    title: "Own every line.",
    body: "All code and IP is yours the moment it is written. Cancel whenever you want — the code stays.",
    icon: "refresh",
    span: "",
  },
  {
    title: "A direct line to your squad.",
    body: "A private channel with the engineers building your app. Roadmap input and bug fixes in days, not quarters.",
    icon: "headset",
    span: "lg:col-span-2",
  },
];

export type Step = {
  number: string;
  title: string;
  body: string;
};

export const steps: Step[] = [
  {
    number: "01",
    title: "Subscribe",
    body: "Pick a plan, choose your platform, and hand over your product vision. Setup takes a single day.",
  },
  {
    number: "02",
    title: "Build & ship",
    body: "We design, code, test and review a feature pack every month. Clean pull requests appear in your repo.",
  },
  {
    number: "03",
    title: "Launch & scale",
    body: "Merge, publish and iterate. Add platforms, scope or a dedicated squad as your product grows.",
  },
];

export type Tier = {
  name: string;
  price: number | "Custom";
  unit?: string;
  tagline: string;
  features: string[];
  featured: boolean;
  badge?: string;
};

export const tiers: Tier[] = [
  {
    name: "Starter",
    price: 490,
    tagline: "For validating your idea on one platform.",
    features: [
      "One platform (iOS or Android)",
      "Monthly feature pack",
      "Shared support queue",
      "Your code and IP, always",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: 990,
    tagline: "For products ready to grow on both platforms.",
    features: [
      "iOS + Android",
      "Priority build queue",
      "Roadmap input every sprint",
      "Dedicated support channel",
      "Bug-fix SLA within 48 hours",
    ],
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Scale",
    price: "Custom",
    tagline: "For teams that need a full engineering partner.",
    features: [
      "Dedicated squad",
      "Unlimited scope + codebase takeover",
      "Architecture & migration work",
      "SLA with guaranteed uptime",
    ],
    featured: false,
  },
];

export type Faq = {
  q: string;
  a: string;
};

export const faqs: Faq[] = [
  {
    q: "Who owns the code?",
    a: "You do. Every line we write is committed to your repository and licensed to you in full. There are no revenue shares, no lock-in and no licensing games.",
  },
  {
    q: "How does delivery work?",
    a: "We work directly in your repo. Each month we open pull requests with the agreed feature pack — fully tested, reviewed and documented. You merge when you're happy.",
  },
  {
    q: "What stacks do you work in?",
    a: "Swift + SwiftUI for iOS, Kotlin + Compose for Android, and React Native (Expo or bare) for cross-platform. Backend support for Node, Go, Supabase and Firebase.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Month to month, cancel in one click. Everything we've shipped stays in your repo and remains yours.",
  },
  {
    q: "When do subscriptions open?",
    a: "We're onboarding the first cohort of waitlist members soon. Join the list to get early access and lock in launch pricing.",
  },
];