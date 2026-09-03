/**
 * Waitlist submission logic, kept separate from the UI so it can be pointed at a
 * real API / database / SMS service later without touching components.
 *
 * Current implementation: local (demo) only. No backend is connected yet.
 */

export type WaitlistEntry = {
  firstName: string;
  lastName: string;
  countryCode: string;
  phone: string;
};

export type WaitlistResult = { ok: true } | { ok: false; error: "generic" };

export const countryCodes = [
  { code: "+212", label: "MA", name: "المغرب / Morocco" },
  { code: "+966", label: "SA", name: "السعودية / Saudi Arabia" },
  { code: "+971", label: "AE", name: "الإمارات / UAE" },
  { code: "+20", label: "EG", name: "مصر / Egypt" },
  { code: "+213", label: "DZ", name: "الجزائر / Algeria" },
  { code: "+216", label: "TN", name: "تونس / Tunisia" },
  { code: "+965", label: "KW", name: "الكويت / Kuwait" },
  { code: "+974", label: "QA", name: "قطر / Qatar" },
  { code: "+973", label: "BH", name: "البحرين / Bahrain" },
  { code: "+968", label: "OM", name: "عُمان / Oman" },
  { code: "+962", label: "JO", name: "الأردن / Jordan" },
  { code: "+964", label: "IQ", name: "العراق / Iraq" },
  { code: "+961", label: "LB", name: "لبنان / Lebanon" },
  { code: "+90", label: "TR", name: "تركيا / Türkiye" },
  { code: "+33", label: "FR", name: "فرنسا / France" },
  { code: "+44", label: "GB", name: "بريطانيا / UK" },
  { code: "+1", label: "US", name: "أمريكا / USA" },
];

export function normalizePhone(raw: string): string {
  return raw.replace(/[^\d]/g, "").replace(/^0+/, "");
}

export function isValidPhone(raw: string): boolean {
  const digits = normalizePhone(raw);
  return digits.length >= 6 && digits.length <= 14;
}

export function isValidName(raw: string): boolean {
  return raw.trim().length >= 2;
}

export async function submitWaitlist(entry: WaitlistEntry): Promise<WaitlistResult> {
  try {
    // Integration point: replace with a real API call (server function, CRM, SMS/WhatsApp).
    await new Promise((resolve) => setTimeout(resolve, 900));
    const payload = {
      ...entry,
      phone: `${entry.countryCode}${normalizePhone(entry.phone)}`,
      createdAt: new Date().toISOString(),
    };
    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("waitlist_demo") ?? "[]");
      localStorage.setItem("waitlist_demo", JSON.stringify([...existing, payload]));
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "generic" };
  }
}
