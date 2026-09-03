import { useEffect, useState } from "react";
import { Languages, LineChart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const links = [
  { id: "idea", key: "idea" },
  { id: "features", key: "features" },
  { id: "how", key: "how" },
  { id: "points", key: "points" },
  { id: "faq", key: "faq" },
] as const;

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300",
          scrolled ? "glass" : "border border-transparent",
        )}
      >
        <a href="#top" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[image:var(--gradient-gold)] text-primary-foreground">
            <LineChart className="size-4" />
          </span>
          <span className="text-base font-semibold tracking-tight">{t.brand}</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-secondary/60 hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
            >
              {t.nav[l.key]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            aria-label={t.switchTo}
          >
            <Languages />
            <span className="hidden sm:inline">{t.switchTo}</span>
          </Button>
          <Button variant="hero" size="sm" asChild className="hidden sm:inline-flex">
            <a href="#waitlist">{t.nav.cta}</a>
          </Button>
          <Button
            variant="glass"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-3 lg:hidden">
          <div className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
              >
                {t.nav[l.key]}
              </a>
            ))}
            <Button variant="hero" className="mt-2" asChild onClick={() => setOpen(false)}>
              <a href="#waitlist">{t.nav.cta}</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
