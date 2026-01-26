'use client';

import Link from 'next/link';
import { FAQ } from '@/utils/faq';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import { Title } from '../Title';

export default function QandAStrategy() {
  return (
    <section className="w-full flex justify-center py-12 px-4 bg-[#c6f0d0] text-[#203649]">
      <div className="flex flex-col w-full max-w-3xl p-6 md:p-8 gap-10 sm:gap-16">
        <Title id="faq" text="Questions fréquentes" />

        <Accordion type="single" collapsible className="w-full">
          {FAQ.slice(0, 5).map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent className="text-gray-700">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-center w-full">
          <Link href="/app/faq">
            <Button variant="link" className="text-[#203649] text-base">
              Voir toutes les questions
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
