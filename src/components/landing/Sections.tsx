import { useState } from "react";
import {
  Award,
  BookOpenCheck,
  BrainCircuit,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Flame,
  HeartPulse,
  ListChecks,
  NotebookPen,
  Repeat,
  Search,
  Trophy,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Problem() {
  const { t } = useI18n();
  const icons = [Search, BrainCircuit, Repeat];
  return (
    <section id="idea" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title={t.problem.title} sub={t.problem.sub} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {t.problem.cards.map((card, i) => {
            const Icon = icons[i] ?? Search;
            return (
              <article key={card.t} className="glass rounded-2xl p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-secondary/70 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{card.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.d}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Solution() {
  const { t } = useI18n();
  const icons = [NotebookPen, BookOpenCheck, ListChecks, Trophy];
  return (
    <section id="features" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title={t.solution.title} />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {t.solution.cards.map((card, i) => {
            const Icon = icons[i] ?? Trophy;
            return (
              <article
                key={card.t}
                className="glass rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-[image:var(--gradient-gold)] text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold">{card.t}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.d}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const { t } = useI18n();
  const icons = [NotebookPen, Search, CalendarCheck, Award];
  return (
    <section id="how" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title={t.how.title} sub={t.how.sub} />
        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {t.how.steps.map((step, i) => {
            const Icon = icons[i] ?? Award;
            return (
              <li key={step.t} className="glass relative rounded-2xl p-6">
                <span className="absolute end-5 top-5 text-4xl font-bold text-foreground/8">
                  {i + 1}
                </span>
                <span className="flex size-11 items-center justify-center rounded-xl bg-secondary/70 text-accent">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.d}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function DailyTasks() {
  const { t } = useI18n();
  const [done, setDone] = useState<number[]>([]);
  const pct = Math.round((done.length / t.tasks.items.length) * 100);
  const icons = [
    ClipboardList,
    ListChecks,
    CheckCircle2,
    Flame,
    BrainCircuit,
    Search,
    BookOpenCheck,
    HeartPulse,
    CalendarCheck,
  ];

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title={t.tasks.title} sub={t.tasks.sub} />

        <div className="glass mx-auto mt-10 max-w-xl rounded-2xl p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t.tasks.progress}</span>
            <span className="font-semibold text-primary">{pct}%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-[image:var(--gradient-gold)] transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {t.tasks.items.map((item, i) => {
            const Icon = icons[i % icons.length] ?? ListChecks;
            const isDone = done.includes(i);
            return (
              <li key={item} className="glass flex flex-col justify-between rounded-2xl p-5">
                <div className="flex gap-3">
                  <Icon className="mt-0.5 size-5 shrink-0 text-accent" />
                  <p className="text-sm leading-relaxed">{item}</p>
                </div>
                <Button
                  variant={isDone ? "hero" : "glass"}
                  size="sm"
                  className="mt-4 w-full"
                  aria-pressed={isDone}
                  onClick={() =>
                    setDone((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))
                  }
                >
                  {isDone ? <CheckCircle2 /> : null}
                  {isDone ? t.tasks.doneState : t.tasks.done}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Points() {
  const { t } = useI18n();
  return (
    <section id="points" className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeader title={t.points.title} sub={t.points.sub} />
        <div className="glass mt-10 overflow-hidden rounded-2xl">
          <div className="grid grid-cols-2 bg-secondary/50 px-5 py-3 text-xs font-semibold text-muted-foreground">
            <span>{t.points.head.a}</span>
            <span>{t.points.head.b}</span>
          </div>
          {t.points.rows.map(([a, b]) => (
            <div
              key={a}
              className="grid grid-cols-2 items-center gap-3 border-t border-border/60 px-5 py-4 text-sm"
            >
              <span>{a}</span>
              <span className="font-medium text-primary">{b}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
          {t.points.disclaimer}
        </p>
      </div>
    </section>
  );
}

export function Faq() {
  const { t } = useI18n();
  return (
    <section id="faq" className="px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeader title={t.faq.title} />
        <Accordion type="single" collapsible className="glass mt-10 rounded-2xl px-5">
          {t.faq.items.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="border-border/60">
              <AccordionTrigger className="text-start text-base">{item.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function Closing() {
  const { t } = useI18n();
  return (
    <section className="px-4 py-20">
      <div className="glass glow-gold mx-auto max-w-3xl rounded-3xl px-6 py-14 text-center">
        <h2 className="text-2xl leading-snug font-bold sm:text-3xl">{t.closing.title}</h2>
        <Button variant="hero" size="xl" className="mt-8" asChild>
          <a href="#waitlist">{t.closing.cta}</a>
        </Button>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/60 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <img
                src={logoAsset.url}
                alt={t.brand}
                className="size-9 object-contain"
                style={{ filter: "invert(1) sepia(1) saturate(3) hue-rotate(5deg) brightness(0.9)" }}
              />
              <p className="text-base font-semibold">{t.brand}</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.footer.desc}</p>
          </div>
          <nav className="flex gap-5 text-sm text-muted-foreground">
            <a href="#faq" className="transition-colors hover:text-foreground">
              {t.footer.privacy}
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              {t.footer.terms}
            </a>
          </nav>
        </div>
        <p className="mt-8 text-xs leading-relaxed text-muted-foreground/80">
          {t.footer.disclaimer}
        </p>
        <p className="mt-2 text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
