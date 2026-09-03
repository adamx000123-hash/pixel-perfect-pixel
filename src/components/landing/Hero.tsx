import { ArrowLeft, ArrowRight, CheckCircle2, Flame, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

function MiniChart() {
  return (
    <svg viewBox="0 0 320 90" className="h-20 w-full" role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="areaGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.82 0.135 84)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.82 0.135 84)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,72 L40,64 L80,68 L120,48 L160,54 L200,34 L240,40 L280,20 L320,26 L320,90 L0,90 Z"
        fill="url(#areaGold)"
      />
      <path
        d="M0,72 L40,64 L80,68 L120,48 L160,54 L200,34 L240,40 L280,20 L320,26"
        fill="none"
        stroke="oklch(0.82 0.135 84)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Hero() {
  const { t, dir } = useI18n();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section id="top" className="relative overflow-hidden px-4 pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="glass-soft inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            {t.hero.badge}
          </span>

          <h1 className="mt-6 text-4xl leading-[1.15] font-bold sm:text-5xl lg:text-6xl">
            <span className="text-gold">{t.hero.title}</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.hero.sub}
          </p>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground/80">{t.hero.note}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="hero" size="xl" asChild>
              <a href="#waitlist">
                {t.hero.primary}
                <Arrow />
              </a>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="#how">{t.hero.secondary}</a>
            </Button>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {t.hero.trust.map((item) => (
              <li
                key={item}
                className="glass-soft rounded-xl px-3 py-3 text-center text-xs font-medium text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="glass glow-gold rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{t.hero.mock.journal}</span>
              <span className="flex items-center gap-1.5 rounded-full bg-secondary/70 px-2.5 py-1 text-[11px] text-muted-foreground">
                <Flame className="size-3 text-primary" />
                {t.hero.mock.streakValue}
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {[
                [t.hero.mock.pair, t.hero.mock.pairValue],
                [t.hero.mock.reason, t.hero.mock.reasonValue],
                [t.hero.mock.emotion, t.hero.mock.emotionValue],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="glass-soft flex items-center justify-between rounded-xl px-3 py-2.5 text-sm"
                >
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-border/60 p-3">
              <MiniChart />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="glass-soft rounded-xl p-3">
                <p className="text-[11px] text-muted-foreground">{t.hero.mock.commitment}</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[78%] rounded-full bg-[image:var(--gradient-gold)]" />
                </div>
                <p className="mt-2 text-sm font-semibold">78%</p>
              </div>
              <div className="glass-soft flex flex-col justify-between rounded-xl p-3">
                <p className="text-[11px] text-muted-foreground">{t.hero.mock.points}</p>
                <p className="flex items-center gap-1.5 text-lg font-semibold">
                  <Trophy className="size-4 text-primary" />
                  {t.hero.mock.pointsValue}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[11px] text-muted-foreground">{t.hero.mock.tasks}</p>
              <ul className="mt-2 space-y-1.5">
                {t.hero.mock.taskList.map((task) => (
                  <li key={task} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-accent" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-3 text-center text-[11px] text-muted-foreground/70">
            {t.hero.mock.label}
          </p>
        </div>
      </div>
    </section>
  );
}
