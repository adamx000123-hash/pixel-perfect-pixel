import { createFileRoute } from "@tanstack/react-router";

import { LanguageProvider } from "@/lib/i18n";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import {
  Problem,
  Solution,
  HowItWorks,
  DailyTasks,
  Points,
  Faq,
  Closing,
  Footer,
} from "@/components/landing/Sections";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { BackgroundMusic } from "@/components/landing/BackgroundMusic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LEGEND — ليجند | قائمة الانتظار" },
      {
        name: "description",
        content:
          "انضم إلى قائمة انتظار المنصة العربية لتطوير المتداولين: مهام يومية، نقاط انضباط، ويوميات تداول منظمة.",
      },
      { property: "og:title", content: "قائمة الانتظار | منصة انضباط التداول" },
      {
        property: "og:description",
        content:
          "منصة عربية لبناء انضباط التداول عبر المهام اليومية ونظام النقاط. سجّل في قائمة الانتظار.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <Problem />
          <Solution />
          <HowItWorks />
          <DailyTasks />
          <Points />
          <WaitlistForm />
          <Faq />
          <Closing />
        </main>
        <Footer />
        <BackgroundMusic />
      </div>
    </LanguageProvider>
  );
}
