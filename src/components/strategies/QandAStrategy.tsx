"use client";

import Link from "next/link";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContentDangerousHtml,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { FAQ_INVSTORE_HIGHLIGHT } from "@/utils/faq";

export default function QandAStrategy() {
  return (
    <section className="w-full flex justify-center py-12 text-white mx-auto">
      <div className="flex flex-col w-full max-w-6xl p-6 md:p-8 gap-10 sm:gap-16">
        <Accordion type="single" collapsible className="w-full">
          {FAQ_INVSTORE_HIGHLIGHT.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContentDangerousHtml
                className="[&_p+p]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mt-2 [&_li+li]:mt-1"
                dangerouslySetInnerHTML={{ __html: item.answerHtml }}
              />
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-center w-full">
          <Link href="/app/faq">
            <Button variant="link" className="text-base">
              Voir toutes les questions
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
