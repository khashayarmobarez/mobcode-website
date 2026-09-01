"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(false);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError(true);
        return;
      }
      router.push("/admin/orders");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-background px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-line bg-surface p-8 text-center shadow-[0_0_80px_-24px_var(--accent-glow)]"
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          passkadeh
        </p>
        <h1 className="mt-3 font-display text-2xl font-bold">ورود مدیر</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="رمز عبور"
          autoFocus
          className="mt-6 w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
        />
        {error && (
          <p className="mt-3 text-sm text-red-500">رمز عبور نادرست است.</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-accent py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? "…" : "ورود"}
        </button>
      </form>
    </main>
  );
}