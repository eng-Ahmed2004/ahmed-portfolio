"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/i18n/I18nProvider";

export default function NotFound() {
  const { dict } = useI18n();

  return (
    <main className="container-page grid min-h-dvh place-items-center py-24 text-center">
      <div>
        <p dir="ltr" className="text-gradient text-7xl font-semibold sm:text-8xl">
          404
        </p>
        <h1 className="heading-display mt-6 text-3xl text-fg sm:text-4xl">{dict.notFound.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-fg-muted">{dict.notFound.text}</p>
        <div className="mt-9">
          <Button href="/">
            {dict.notFound.back}
            <ArrowRight
              aria-hidden="true"
              strokeWidth={1.8}
              className="size-[1.1rem] rtl:-scale-x-100"
            />
          </Button>
        </div>
      </div>
    </main>
  );
}
