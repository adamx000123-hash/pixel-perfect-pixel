import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

type AdminSession = { unlocked?: boolean };

function getSessionConfig() {
  return {
    password: process.env["SESSION_SECRET"]!,
    name: "legend-admin",
    maxAge: 60 * 60 * 24 * 7,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

function matches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export type Signup = {
  id: string;
  first_name: string;
  last_name: string;
  full_phone: string;
  created_at: string;
};

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"];
    if (!expected) throw new Error("ADMIN_PASSWORD is not set");
    if (!matches(data.password ?? "", expected)) return { ok: false as const };
    const session = await useSession<AdminSession>(getSessionConfig());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(getSessionConfig());
  await session.clear();
  return { ok: true as const };
});

export const getSignups = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<AdminSession>(getSessionConfig());
  if (!session.data.unlocked) return { unlocked: false as const, rows: [] as Signup[] };

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("waitlist_signups")
    .select("id, first_name, last_name, full_phone, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return { unlocked: true as const, rows: (data ?? []) as Signup[] };
});
