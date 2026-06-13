"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface AccordionItemData {
  id: string
  title: string
  paragraphs: string[]
}

const accordionData: AccordionItemData[] = [
  {
    id: "product-info",
    title: "Product Information",
    paragraphs: [
      "Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.",
      "Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.",
    ],
  },
  {
    id: "shipping-details",
    title: "Shipping Details",
    paragraphs: [
      "We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days, while express shipping ensures delivery within 1-2 business days.",
      "All orders are carefully packaged and fully insured. Track your shipment in real-time through our dedicated tracking portal.",
    ],
  },
  {
    id: "return-policy",
    title: "Return Policy",
    paragraphs: [
      "We stand behind our products with a comprehensive 30-day return policy. If you're not completely satisfied, simply return the item in its original condition.",
      "Our hassle-free return process includes free return shipping and full refunds processed within 48 hours of receiving the returned item.",
    ],
  },
]

export function FAQAccordion({ defaultValue }: { defaultValue?: string }) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultValue}
      className="w-full rounded-xl border border-border bg-card px-5 text-card-foreground shadow-sm"
    >
      {accordionData.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-foreground">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">
            <div className="space-y-4">
              {item.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
