"use client";

import { ComponentRef, forwardRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

const Accordion = forwardRef<ComponentRef<typeof AccordionPrimitive.Root>, AccordionProps>(
  ({ onValueChange, ...props }, ref) => {
    return (
      <AccordionPrimitive.Root
        {...props}
        ref={ref}
        onValueChange={(value: string | string[]) => {
          if (onValueChange) {
            (onValueChange as (value: string | string[]) => void)(value);
          }
        }}
      />
    );
  },
);
Accordion.displayName = "Accordion";

// Permit tracking the AccordionItem opened and the related image the
type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>;

const AccordionItem = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border-b border-green-100 px-4 transition-colors duration-300 data-[state=open]:bg-green-300",
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 gap-2 py-4 text-xl items-center font-opensans transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}>
      <p className="line-clamp-2 text-start flex flex-1">{children}</p>
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down text-pretty text-lg"
    {...props}>
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
