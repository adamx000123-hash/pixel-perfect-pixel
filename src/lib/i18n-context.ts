import { createContext } from "react";

export type Lang = "ar" | "en";

export type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
  dir: "rtl" | "ltr";
};

export const LangContext = createContext<I18nCtx | null>(null);
