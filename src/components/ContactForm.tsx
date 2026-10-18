"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

const field =
  "mt-1 w-full rounded-md border border-rule bg-surface px-3 py-2 text-ink placeholder:text-muted focus:border-accent focus:outline-none";

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    setStatus({ kind: "sending" });
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        form.reset();
        setStatus({ kind: "sent" });
      } else if (data.errors) {
        setErrors(data.errors);
        setStatus({ kind: "idle" });
      } else {
        setStatus({ kind: "error", message: data.error ?? "Something went wrong." });
      }
    } catch {
      setStatus({
        kind: "error",
        message: `Couldn't reach the server. Email me at ${fallbackEmail} instead.`,
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <p role="status" className="rounded-lg bg-accent-wash p-5">
        Message sent. I&apos;ll reply within a day or two.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          Name
          <input name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} />
          {errors.name && <span className="mt-1 block font-normal text-red-600 dark:text-red-400">{errors.name}</span>}
        </label>
        <label className="block text-sm font-semibold">
          Email
          <input name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} />
          {errors.email && <span className="mt-1 block font-normal text-red-600 dark:text-red-400">{errors.email}</span>}
        </label>
      </div>
      <label className="block text-sm font-semibold">
        What are you working on?
        <textarea name="message" rows={5} className={field} aria-invalid={!!errors.message} />
        {errors.message && <span className="mt-1 block font-normal text-red-600 dark:text-red-400">{errors.message}</span>}
      </label>
      {/* Honeypot, hidden from people and assistive tech */}
      <div aria-hidden="true" className="hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="rounded-md bg-accent px-5 py-2.5 font-semibold text-accent-ink disabled:opacity-60"
        >
          {status.kind === "sending" ? "Sending…" : "Send message"}
        </button>
        {status.kind === "error" && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
