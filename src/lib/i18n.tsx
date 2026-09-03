import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

export const dict = {
  ar: {
    dir: "rtl",
    brand: "تِرِيدر لوغ",
    nav: {
      idea: "الفكرة",
      features: "المزايا",
      how: "طريقة العمل",
      points: "النقاط والمسابقات",
      faq: "الأسئلة الشائعة",
      cta: "احجز مكاني المبكر",
    },
    hero: {
      badge: "قائمة الانتظار مفتوحة",
      title: "دوّن صفقاتك. طوّر مهارتك. ابنِ انضباطك.",
      sub: "منصة تساعدك على تدوين صفقاتك بدون تعقيد، مراجعة قراراتك بوضوح، وبناء روتين يومي ذهني وصحي يدعم تطورك في التداول خطوة بخطوة.",
      note: "المنصة لا تعدك بأرباح مضمونة، بل تساعدك على تحسين جودة قراراتك وتنظيم عاداتك.",
      primary: "احجز مكاني الآن",
      secondary: "اكتشف كيف تعمل المنصة",
      trust: ["تدوين أسرع", "مراجعة أوضح", "عادات أقوى", "تقدم يمكن رؤيته"],
      mock: {
        label: "معاينة توضيحية للواجهة — بيانات تجريبية فقط",
        journal: "مفكرة الصفقة",
        pair: "الزوج",
        pairValue: "EUR/USD",
        reason: "سبب الدخول",
        reasonValue: "كسر مستوى مع إعادة اختبار",
        emotion: "الحالة الذهنية",
        emotionValue: "هادئ",
        commitment: "الالتزام اليومي",
        streak: "سلسلة الأيام",
        streakValue: "١٢ يوم",
        points: "النقاط",
        pointsValue: "٣٤٠",
        tasks: "مهام اليوم",
        taskList: ["مراجعة خطة التداول", "تحديد المخاطرة", "مراجعة صفقة واحدة"],
      },
    },
    problem: {
      title: "لماذا يتوقف التطور؟",
      sub: "كثير من المتداولين لا يتوقف تطورهم بسبب نقص المعلومات فقط، بل بسبب عدم توثيق قراراتهم، تكرار الأخطاء نفسها، الدخول بدافع العاطفة، وترك المراجعة بعد فترة قصيرة.",
      cards: [
        { t: "نسيان سبب الدخول", d: "يدخل المتداول الصفقة ثم لا يتذكر لاحقًا لماذا اتخذ القرار." },
        { t: "التداول العاطفي", d: "الخوف والطمع والانتقام تؤثر في القرار أكثر من الخطة." },
        { t: "غياب الاستمرارية", d: "يبدأ المتداول بالتدوين والتعلم ثم يتوقف بعد أيام قليلة." },
      ],
    },
    solution: {
      title: "أربع ركائز تدعم تطورك",
      cards: [
        { t: "مفكرة تداول سهلة", d: "سجّل الأصل أو الزوج، نوع الصفقة، سبب الدخول، خطة الخروج، النتيجة، المشاعر، وأرفق صورة الشارت." },
        { t: "مراجعة منظمة", d: "ارجع إلى صفقاتك السابقة، لاحظ الأخطاء المتكررة، واعرف مدى التزامك بالخطة وتطورك بمرور الوقت." },
        { t: "مهام يومية متوازنة", d: "مهام للتداول وإدارة المخاطر والتعلم والصحة والنوم والتركيز وتجنب التداول الانتقامي." },
        { t: "نظام استمرارية وتحفيز", d: "نقاط وشارات وسلاسل إنجاز عند الالتزام بالعادات، مع تحديات ومسابقات مستقبلية." },
      ],
    },
    how: {
      title: "طريقة العمل",
      sub: "أربع خطوات واضحة تكرّرها كل يوم.",
      steps: [
        { t: "سجّل الصفقة", d: "أدخل أهم المعلومات خلال دقائق قليلة، وأضف صورة الشارت أو ملاحظة مختصرة." },
        { t: "راجع قرارك", d: "اكتشف ما الذي التزمت به وما الذي يحتاج إلى تحسين." },
        { t: "أكمل روتينك اليومي", d: "نفّذ مهام التداول والذهن والصحة وسجّل إنجازك." },
        { t: "اجمع النقاط وتطور", d: "حافظ على الاستمرارية، افتح مستويات وشارات جديدة، واستعد للمسابقات عند الإطلاق." },
      ],
    },
    tasks: {
      title: "المهام اليومية",
      sub: "المهام اليومية لا تضمن الأرباح، لكنها تساعدك على بناء السلوكيات التي تدعم جودة القرار.",
      done: "أكملت المهمة",
      doneState: "تم",
      progress: "نسبة الالتزام اليوم",
      items: [
        "مراجعة خطة التداول قبل بداية الجلسة",
        "تحديد مقدار المخاطرة قبل الدخول",
        "عدم الدخول في صفقة خارج الخطة",
        "التوقف بعد عدد معين من الصفقات",
        "تجنب التداول الانتقامي بعد الخسائر",
        "مراجعة صفقة واحدة في نهاية اليوم",
        "قراءة كتاب أو محتوى تعليمي مفيد",
        "المشي أو الرياضة أو استراحة ذهنية",
        "النوم الجيد والاستيقاظ في وقت مناسب",
      ],
    },
    points: {
      title: "النقاط والمسابقات والجوائز",
      sub: "النقاط تُكتسب من الاستمرارية وجودة العادات، وليس من مقدار الأرباح.",
      head: { a: "السلوك", b: "النتيجة التوضيحية" },
      rows: [
        ["تدوين صفقة كاملة", "نقاط يومية"],
        ["إكمال روتين اليوم", "رفع سلسلة الالتزام"],
        ["مراجعة أسبوعية", "شارة تطور"],
        ["الحفاظ على الاستمرارية", "فتح مستويات أو تحديات"],
        ["استيفاء شروط المسابقة", "فرصة دخول في مسابقات وجوائز"],
      ],
      disclaimer: "النقاط تكافئ الاستمرارية وجودة العادات، ولا تمثل ضمانًا للربح أو الفوز. سيتم الإعلان عن شروط المسابقات والجوائز رسميًا عند الإطلاق.",
    },
    form: {
      title: "كن من أوائل من يدخلون إلى المنصة",
      sub: "اترك بياناتك الآن لتحجز مكانك في قائمة الانتظار. سنرسل لك رسالة فور إطلاق الموقع حتى تكون من أوائل المستفيدين من عروض ومزايا الإطلاق.",
      first: "الاسم الشخصي",
      last: "الاسم العائلي",
      phone: "رقم الهاتف",
      country: "رمز الدولة",
      submit: "احجز مكاني المبكر",
      loading: "جارٍ الإرسال…",
      success: "تم تسجيلك بنجاح في قائمة الانتظار. سنرسل لك إشعارًا عند إطلاق الموقع.",
      again: "تسجيل شخص آخر",
      privacy: "سنستخدم بياناتك فقط لإرسال إشعار الإطلاق والعروض المرتبطة به. لن نبيع بياناتك أو نشاركها مع جهات غير مرتبطة بالموقع.",
      errFirst: "يرجى إدخال الاسم الشخصي (حرفان على الأقل).",
      errLast: "يرجى إدخال الاسم العائلي (حرفان على الأقل).",
      errPhone: "رقم الهاتف غير صالح. أدخل رقمًا صحيحًا بدون رمز الدولة.",
      errGeneric: "تعذّر إتمام التسجيل. حاول مرة أخرى.",
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        { q: "هل المنصة تعطي إشارات تداول؟", a: "لا. المنصة تساعد على التوثيق والمراجعة وبناء الانضباط، وليست خدمة إشارات تداول." },
        { q: "هل تضمن المنصة الأرباح؟", a: "لا. لا توجد ضمانات للربح. الهدف هو تطوير جودة القرار والعادات وإدارة المخاطر." },
        { q: "متى سيتم إطلاق الموقع؟", a: "سيتم إرسال إشعار إلى المسجلين في قائمة الانتظار فور جاهزية الإطلاق." },
        { q: "كيف تعمل النقاط؟", a: "تُجمع النقاط من خلال تدوين الصفقات، إنجاز المهام، والمراجعة المستمرة. سيتم الإعلان عن شروط المسابقات عند الإطلاق." },
        { q: "هل بياناتي آمنة؟", a: "في هذه المرحلة نجمع الاسم ورقم الهاتف فقط لغرض إشعار الإطلاق. لم يتم بعد ربط قاعدة بيانات نهائية، وسننشر تفاصيل حماية البيانات الفعلية عند الإطلاق." },
      ],
    },
    closing: {
      title: "لا تنتظر أن تصبح منضبطًا حتى تبدأ. ابدأ بتوثيق يوم واحد، ثم كرره.",
      cta: "احجز مكاني في قائمة الانتظار",
    },
    footer: {
      desc: "منصة لتدوين الصفقات، مراجعة القرارات، وبناء انضباط يومي مستمر.",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      disclaimer: "المحتوى المعروض تعليمي وتنظيمي، ولا يمثل نصيحة مالية أو توصية استثمارية.",
      rights: "جميع الحقوق محفوظة.",
    },
    switchTo: "English",
  },
  en: {
    dir: "ltr",
    brand: "TraderLog",
    nav: {
      idea: "The idea",
      features: "Features",
      how: "How it works",
      points: "Points & contests",
      faq: "FAQ",
      cta: "Reserve my early spot",
    },
    hero: {
      badge: "Waitlist open",
      title: "Journal your trades. Sharpen your skill. Build your discipline.",
      sub: "A platform that helps you log trades without friction, review your decisions clearly, and build a daily mental and healthy routine that supports your progress step by step.",
      note: "We don't promise guaranteed profits — we help you improve decision quality and organise your habits.",
      primary: "Reserve my spot",
      secondary: "See how it works",
      trust: ["Faster logging", "Clearer review", "Stronger habits", "Visible progress"],
      mock: {
        label: "Illustrative UI preview — sample data only",
        journal: "Trade journal",
        pair: "Pair",
        pairValue: "EUR/USD",
        reason: "Entry reason",
        reasonValue: "Breakout with retest",
        emotion: "Mindset",
        emotionValue: "Calm",
        commitment: "Daily commitment",
        streak: "Streak",
        streakValue: "12 days",
        points: "Points",
        pointsValue: "340",
        tasks: "Today's tasks",
        taskList: ["Review trading plan", "Define risk size", "Review one trade"],
      },
    },
    problem: {
      title: "Why progress stalls",
      sub: "For many traders progress stops not from lack of information, but from undocumented decisions, repeated mistakes, emotional entries, and abandoning review after a short while.",
      cards: [
        { t: "Forgotten reasoning", d: "You take the trade, then later can't recall why you made that decision." },
        { t: "Emotional trading", d: "Fear, greed and revenge drive the decision more than the plan does." },
        { t: "No consistency", d: "Journaling and learning start strong, then stop after a few days." },
      ],
    },
    solution: {
      title: "Four pillars behind your progress",
      cards: [
        { t: "An easy trade journal", d: "Log the asset or pair, trade type, entry reason, exit plan, result, emotions, and attach a chart screenshot." },
        { t: "Structured review", d: "Revisit past trades, spot repeated mistakes, measure plan adherence, and see your growth over time." },
        { t: "Balanced daily tasks", d: "Trading, risk management, learning, health, sleep, focus, and avoiding revenge trading." },
        { t: "Consistency & motivation", d: "Points, badges and streaks for sticking to habits, with future challenges and contests." },
      ],
    },
    how: {
      title: "How it works",
      sub: "Four clear steps you repeat every day.",
      steps: [
        { t: "Log the trade", d: "Enter the essentials in a few minutes and add a chart image or short note." },
        { t: "Review your decision", d: "See what you followed and what needs improvement." },
        { t: "Finish your daily routine", d: "Complete trading, mindset and health tasks, and record what you did." },
        { t: "Collect points and grow", d: "Keep the streak alive, unlock levels and badges, and get ready for contests at launch." },
      ],
    },
    tasks: {
      title: "Daily tasks",
      sub: "Daily tasks don't guarantee profits, but they help you build the behaviours that support decision quality.",
      done: "Mark as done",
      doneState: "Done",
      progress: "Today's commitment rate",
      items: [
        "Review the trading plan before the session",
        "Define risk size before entering",
        "No trades outside the plan",
        "Stop after a set number of trades",
        "Avoid revenge trading after losses",
        "Review one trade at the end of the day",
        "Read a book or useful educational content",
        "Walk, exercise, or take a mental break",
        "Sleep well and wake at a reasonable time",
      ],
    },
    points: {
      title: "Points, contests and prizes",
      sub: "Points come from consistency and habit quality — not from how much you profit.",
      head: { a: "Behaviour", b: "Illustrative outcome" },
      rows: [
        ["Logging a complete trade", "Daily points"],
        ["Completing today's routine", "Streak increase"],
        ["Weekly review", "Progress badge"],
        ["Maintaining consistency", "Unlock levels or challenges"],
        ["Meeting contest conditions", "Entry into contests and prizes"],
      ],
      disclaimer: "Points reward consistency and habit quality; they are not a guarantee of profit or of winning. Contest and prize terms will be announced officially at launch.",
    },
    form: {
      title: "Be among the first inside the platform",
      sub: "Leave your details now to reserve your spot on the waitlist. We'll message you the moment we launch so you're first in line for launch offers.",
      first: "First name",
      last: "Last name",
      phone: "Phone number",
      country: "Country code",
      submit: "Reserve my early spot",
      loading: "Sending…",
      success: "You're on the waitlist. We'll notify you as soon as the platform launches.",
      again: "Register someone else",
      privacy: "We'll use your details only to send the launch notification and related offers. We will not sell or share your data with unrelated parties.",
      errFirst: "Please enter your first name (at least 2 characters).",
      errLast: "Please enter your last name (at least 2 characters).",
      errPhone: "Invalid phone number. Enter a valid number without the country code.",
      errGeneric: "We couldn't complete your registration. Please try again.",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { q: "Does the platform give trading signals?", a: "No. It helps with documentation, review and discipline — it is not a signals service." },
        { q: "Does it guarantee profits?", a: "No. There are no profit guarantees. The goal is better decision quality, habits and risk management." },
        { q: "When does it launch?", a: "Everyone on the waitlist gets a notification as soon as we're ready to launch." },
        { q: "How do points work?", a: "Points come from logging trades, completing tasks and reviewing consistently. Contest terms will be announced at launch." },
        { q: "Is my data safe?", a: "At this stage we collect only your name and phone number for the launch notification. A final database isn't connected yet, and we'll publish actual data-protection details at launch." },
      ],
    },
    closing: {
      title: "Don't wait until you're disciplined to start. Document one day, then repeat it.",
      cta: "Reserve my waitlist spot",
    },
    footer: {
      desc: "A platform for journaling trades, reviewing decisions, and building lasting daily discipline.",
      privacy: "Privacy policy",
      terms: "Terms & conditions",
      disclaimer: "All content is educational and organisational; it is not financial advice or an investment recommendation.",
      rights: "All rights reserved.",
    },
    switchTo: "العربية",
  },
} as const;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof dict)["ar"]; dir: "rtl" | "ltr" };

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "ar") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const t = dict[lang] as unknown as (typeof dict)["ar"];
  return (
    <LangContext.Provider value={{ lang, setLang, t, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </LangContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
