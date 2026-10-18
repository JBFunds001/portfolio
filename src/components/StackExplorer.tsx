"use client";

import { useState } from "react";
import type { StackLayer } from "@/content/site";

export function StackExplorer({ layers }: { layers: StackLayer[] }) {
  const [activeId, setActiveId] = useState(layers[0]?.id);
  const active = layers.find((l) => l.id === activeId) ?? layers[0];

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
      <div
        role="group"
        aria-label="Layers of the stack I work across"
        className="flex flex-col gap-2"
      >
        {layers.map((layer, i) => {
          const isActive = layer.id === active.id;
          return (
            <button
              key={layer.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveId(layer.id)}
              style={{ marginInlineStart: `${i * 1.25}rem` }}
              className={[
                "group flex items-baseline justify-between rounded-lg border px-5 py-4 text-left",
                "transition-colors duration-200",
                isActive
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-rule bg-surface text-ink hover:border-accent",
              ].join(" ")}
            >
              <span className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {layer.name}
              </span>
              <span
                className={[
                  "text-sm",
                  isActive ? "text-accent-ink/80" : "text-muted",
                ].join(" ")}
              >
                {layer.tools.length} tools
              </span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="md:pl-4">
        <h3 className="text-2xl font-semibold">{active.name}</h3>
        <p className="mt-2 max-w-prose text-muted">{active.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${active.name} tools`}>
          {active.tools.map((tool) => (
            <li
              key={tool}
              className="rounded-full bg-accent-wash px-3 py-1 text-sm text-ink"
            >
              {tool}
            </li>
          ))}
        </ul>
        <p className="mt-5 border-l-2 border-accent pl-4 text-sm">
          <span className="font-semibold">Where you can see it: </span>
          {active.proof}
        </p>
      </div>
    </div>
  );
}
