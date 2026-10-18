import { clientWork, profile, projects, stack } from "@/content/site";
import { StackExplorer } from "@/components/StackExplorer";
import { ContactForm } from "@/components/ContactForm";

const container = "mx-auto w-full max-w-5xl px-4 sm:px-6";

function host(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

export default function Home() {
  return (
    <>
      <header className={`${container} flex items-center justify-between py-6`}>
        <a href="#top" className="font-display text-lg font-semibold">
          {profile.name}
        </a>
        <nav aria-label="Sections" className="flex gap-5 text-sm text-muted">
          <a href="#projects" className="hover:text-ink">Projects</a>
          <a href="#clients" className="hover:text-ink">Client work</a>
          <a href="#contact" className="hover:text-ink">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className={`${container} pb-16 pt-12 sm:pt-20`}>
          <h1 className="max-w-3xl text-5xl font-semibold sm:text-7xl">
            I build the whole thing, from the button to the database.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="rounded-md bg-accent px-5 py-2.5 font-semibold text-accent-ink"
            >
              Start a conversation
            </a>
            <a
              href={profile.github}
              className="rounded-md border border-rule px-5 py-2.5 font-semibold hover:border-accent"
            >
              View GitHub
            </a>
            <span className="text-sm text-muted">{profile.location}</span>
          </div>
        </section>

        <section aria-labelledby="stack-heading" className="border-y border-rule bg-surface py-16">
          <div className={container}>
            <h2 id="stack-heading" className="text-3xl font-semibold sm:text-4xl">
              Where I work in the stack
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Pick a layer to see the tools I use there and where you can see the work.
            </p>
            <div className="mt-10">
              <StackExplorer layers={stack} />
            </div>
          </div>
        </section>

        <section id="projects" aria-labelledby="projects-heading" className={`${container} py-16`}>
          <h2 id="projects-heading" className="text-3xl font-semibold sm:text-4xl">
            Projects
          </h2>
          <ul className="mt-8 divide-y divide-rule border-y border-rule">
            {projects.map((p) => (
              <li key={p.name} className="grid gap-3 py-6 md:grid-cols-[1fr_2fr] md:gap-8">
                <div>
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <p
                    className={[
                      "mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      p.status === "Live" ? "bg-accent text-accent-ink" : "bg-accent-wash text-ink",
                    ].join(" ")}
                  >
                    {p.status}
                  </p>
                </div>
                <div>
                  <p className="max-w-prose">{p.description}</p>
                  <p className="mt-2 text-sm text-muted">{p.stack.join(", ")}</p>
                  {(p.repo || p.demo) && (
                    <p className="mt-3 flex gap-4 text-sm font-semibold">
                      {p.demo && <a href={p.demo} className="text-accent underline-offset-4 hover:underline">Live demo</a>}
                      {p.repo && <a href={p.repo} className="text-accent underline-offset-4 hover:underline">Source code</a>}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="clients" aria-labelledby="clients-heading" className={`${container} pb-16`}>
          <h2 id="clients-heading" className="text-3xl font-semibold sm:text-4xl">
            Client work
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Stores and sites I&apos;ve built or maintained for clients on Shopify and WordPress.
          </p>
          <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
            {clientWork.map((c) => (
              <li key={c.url} className="border-b border-rule">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-baseline justify-between gap-4 py-4 hover:text-accent"
                >
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-sm text-muted">{host(c.url)}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" aria-labelledby="contact-heading" className="border-t border-rule bg-surface py-16">
          <div className={`${container} grid gap-10 md:grid-cols-[1fr_1.4fr]`}>
            <div>
              <h2 id="contact-heading" className="text-3xl font-semibold sm:text-4xl">
                Let&apos;s talk
              </h2>
              <p className="mt-3 text-muted">
                Hiring for a full-stack role, or need something built? Send a message or email me
                at{" "}
                <a href={`mailto:${profile.email}`} className="text-accent underline underline-offset-4">
                  {profile.email}
                </a>
                .
              </p>
              {profile.bookingUrl && (
                <a
                  href={profile.bookingUrl}
                  className="mt-6 inline-block rounded-md border border-rule px-5 py-2.5 font-semibold hover:border-accent"
                >
                  Book a call
                </a>
              )}
            </div>
            <ContactForm fallbackEmail={profile.email} />
          </div>
        </section>
      </main>

      <footer className={`${container} flex flex-wrap justify-between gap-4 py-8 text-sm text-muted`}>
        <p>© 2026 {profile.name}</p>
        <p className="flex gap-4">
          <a href={profile.github} className="hover:text-ink">GitHub</a>
          {profile.linkedin && <a href={profile.linkedin} className="hover:text-ink">LinkedIn</a>}
        </p>
      </footer>
    </>
  );
}
