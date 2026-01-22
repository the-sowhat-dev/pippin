'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { LexendFont } from '@/utils/fonts';
import { LeadCard } from '../screening/LeadCard';
import { UseMutationResult } from '@tanstack/react-query';
import { LeadDetailsSheet } from '../screening/LeadDetailsSheet';
import { ProCommercialOfferLeadResponse, ProCommercialOfferResponse } from 'sowhat-types';

interface OfferSectionProps {
  title: string;
  subtitle: string;
  leads: ProCommercialOfferLeadResponse[];
  archiveMutation: UseMutationResult<ProCommercialOfferResponse, Error, {
    offerId: string;
  }, unknown>;
  color: 'green' | 'blue' | 'red' | 'gray';
}

export const OfferSection = ({ title, subtitle, leads, archiveMutation, color }: OfferSectionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Check scroll buttons on mount and when leads change
  useEffect(() => {
    const timer = setTimeout(checkScrollButtons, 100);
    return () => clearTimeout(timer);
  }, [leads.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Card width + gap
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const colorClasses = {
    green: 'text-green-800',
    blue: 'text-blue-800',
    red: 'text-red-800',
    gray: 'text-gray-800',
  };

  const showArchiveButton = color !== 'gray'; // Don't show archive button for already archived leads

  return (
    <section>
      <h2 className={`${LexendFont.className} text-2xl mb-2 ${colorClasses[color]}`}>{title}</h2>
      <p className="text-sm text-gray-500 mb-4">{subtitle}</p>

      {leads.length === 0 ? (
        <p className="text-gray-500 italic">Aucune offre dans cette catégorie.</p>
      ) : (
        <div className="relative group/section">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all opacity-0 group-hover/section:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollButtons}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {leads.map((offeredLead) => (
              <LeadCard
                key={offeredLead.lead.userId}
                lead={offeredLead.lead}
                offer={offeredLead.offer}
                onArchive={
                  showArchiveButton
                    ? () => archiveMutation.mutate({ offerId: offeredLead.offer.id })
                    : undefined
                }
                isArchiving={archiveMutation.isPending}
                onDetail={<LeadDetailsSheet
                  leadId={offeredLead.lead.userId}
                  trigger={
                    <button className="cursor-pointer text-sm flex-1 flex text-green-600 hover:text-green-800 font-medium transition-opacity items-center gap-1">
                      Voir le détail <span aria-hidden="true">&rarr;</span>
                    </button>
                  }
                />}
              />
            ))}
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all opacity-0 group-hover/section:opacity-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}