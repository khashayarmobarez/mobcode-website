import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

type FooterLink = {
  label: string;
  href: string;
};

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
        {title}
      </h4>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {site.description}
            </p>
          </div>

          <FooterCol
            title="Product"
            links={[
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how" },
              { label: "Pricing", href: "#pricing" },
              { label: "FAQ", href: "#faq" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "Contact", href: `mailto:${site.email}` },
              { label: "Join waitlist", href: "#waitlist" },
            ]}
          />
          <FooterCol
            title="Legal"
            links={[
              { label: "Privacy", href: "#" },
              { label: "Terms", href: "#" },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 font-mono text-xs text-muted">
            <span>Built with Next.js</span>
            <span className="text-accent">✦</span>
            <span>v0.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}