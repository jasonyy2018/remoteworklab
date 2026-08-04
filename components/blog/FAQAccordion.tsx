'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="my-10 rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-xs">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-3">
        <HelpCircle className="h-5 w-5 text-teal-600" />
        <h2 className="text-lg font-bold text-slate-900">常见问题解答 (FAQ)</h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="flex w-full items-center justify-between p-4 text-left font-semibold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-teal-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 bg-slate-50/80 p-4 text-xs leading-relaxed text-slate-600">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
