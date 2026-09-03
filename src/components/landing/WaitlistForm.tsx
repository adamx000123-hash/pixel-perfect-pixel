import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";
import { countryCodes, isValidName, isValidPhone, submitWaitlist } from "@/lib/waitlist";

type Errors = { firstName?: string; lastName?: string; phone?: string; form?: string };

export function WaitlistForm() {
  const { t, dir } = useI18n();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+212");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;

    const next: Errors = {};
    if (!isValidName(firstName)) next.firstName = t.form.errFirst;
    if (!isValidName(lastName)) next.lastName = t.form.errLast;
    if (!isValidPhone(phone)) next.phone = t.form.errPhone;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    const result = await submitWaitlist({ firstName, lastName, countryCode, phone });
    setLoading(false);
    if (result.ok) {
      setSuccess(true);
      setFirstName("");
      setLastName("");
      setPhone("");
    } else {
      setErrors({ form: t.form.errGeneric });
    }
  }

  return (
    <section id="waitlist" className="px-4 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-gold">{t.form.title}</span>
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t.form.sub}</p>
        </div>

        <div className="glass glow-gold mt-10 rounded-3xl p-6 sm:p-8">
          {success ? (
            <div className="py-6 text-center" role="status" aria-live="polite">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                <CheckCircle2 className="size-7" />
              </span>
              <p className="mt-5 text-base leading-relaxed font-medium">{t.form.success}</p>
              <Button variant="glass" className="mt-6" onClick={() => setSuccess(false)}>
                {t.form.again}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t.form.first}</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    className="h-11 bg-secondary/40"
                    autoComplete="given-name"
                  />
                  {errors.firstName && (
                    <p id="firstName-error" className="flex items-center gap-1.5 text-xs text-destructive">
                      <AlertCircle className="size-3.5" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">{t.form.last}</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    className="h-11 bg-secondary/40"
                    autoComplete="family-name"
                  />
                  {errors.lastName && (
                    <p id="lastName-error" className="flex items-center gap-1.5 text-xs text-destructive">
                      <AlertCircle className="size-3.5" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t.form.phone}</Label>
                <div className="flex gap-2" dir={dir}>
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger
                      className="h-11 w-32 shrink-0 bg-secondary/40"
                      aria-label={t.form.country}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          <span dir="ltr">{c.code}</span> · {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className="h-11 flex-1 bg-secondary/40"
                    autoComplete="tel-national"
                    placeholder="600000000"
                  />
                </div>
                {errors.phone && (
                  <p id="phone-error" className="flex items-center gap-1.5 text-xs text-destructive">
                    <AlertCircle className="size-3.5" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {errors.form && (
                <p className="flex items-center gap-1.5 text-xs text-destructive" role="alert">
                  <AlertCircle className="size-3.5" />
                  {errors.form}
                </p>
              )}

              <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
                {loading && <Loader2 className="animate-spin" />}
                {loading ? t.form.loading : t.form.submit}
              </Button>

              <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />
                {t.form.privacy}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
