import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, type FormEvent } from "react";
import { Loader2, LogOut, RefreshCw, ShieldCheck, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminLogin, adminLogout, getSignups, type Signup } from "@/lib/admin.functions";

export const Route = createFileRoute("/legend-admin-7f42c9")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "لوحة التحكم | LEGEND" },
      { name: "description", content: "لوحة تحكم خاصة لعرض تسجيلات قائمة الانتظار." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "لوحة التحكم | LEGEND" },
      { property: "og:description", content: "لوحة تحكم خاصة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const login = useServerFn(adminLogin);
  const logout = useServerFn(adminLogout);
  const list = useServerFn(getSignups);

  const [unlocked, setUnlocked] = useState(false);
  const [rows, setRows] = useState<Signup[]>([]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await list();
      setUnlocked(res.unlocked);
      setRows(res.rows);
    } catch {
      setError("تعذر تحميل البيانات");
    }
    setLoading(false);
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login({ data: { password } });
    if (res.ok) {
      setPassword("");
      await load();
    } else {
      setError("كلمة السر غير صحيحة");
      setLoading(false);
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background px-4 py-16 text-foreground">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <img
            src="/favicon.png"
            alt="LEGEND"
            className="size-10 object-contain"
            style={{ filter: "invert(1) sepia(1) saturate(3) hue-rotate(5deg) brightness(0.9)" }}
          />
          <div>
            <h1 className="text-2xl font-bold">لوحة التحكم</h1>
            <p className="text-sm text-muted-foreground">تسجيلات قائمة الانتظار</p>
          </div>
        </div>

        {!unlocked ? (
          <form onSubmit={onSubmit} className="glass mx-auto max-w-sm space-y-4 rounded-2xl p-6">
            <div className="space-y-2">
              <Label htmlFor="pw">كلمة السر</Label>
              <Input
                id="pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 bg-secondary/40"
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading && <Loader2 className="animate-spin" />}
              دخول
            </Button>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-accent" /> صفحة خاصة — رابط سري
            </p>
          </form>
        ) : (
          <div className="glass rounded-2xl p-4 sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="size-4 text-accent" /> عدد المسجّلين: {rows.length}
              </p>
              <div className="flex gap-2">
                <Button variant="glass" size="sm" onClick={() => void load()} disabled={loading}>
                  <RefreshCw className={loading ? "animate-spin" : ""} /> تحديث
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={async () => {
                    await logout();
                    setUnlocked(false);
                    setRows([]);
                  }}
                >
                  <LogOut /> خروج
                </Button>
              </div>
            </div>

            {rows.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">لا توجد تسجيلات بعد.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                  <thead className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <th className="p-3 font-medium">الاسم الشخصي</th>
                      <th className="p-3 font-medium">الاسم العائلي</th>
                      <th className="p-3 font-medium">رقم الهاتف</th>
                      <th className="p-3 font-medium">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.id} className="border-b border-border/50">
                        <td className="p-3">{r.first_name}</td>
                        <td className="p-3">{r.last_name}</td>
                        <td className="p-3" dir="ltr">
                          <a href={`https://wa.me/${r.full_phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                            {r.full_phone}
                          </a>
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {new Date(r.created_at).toLocaleString("ar-MA")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
