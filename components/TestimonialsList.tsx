"use client";

import { useState } from "react";
import { type Testimonial } from "@/data/data";
import { ChevronRightIcon } from "@/lib/icons";
import { Stagger } from "./Motion";
import { TestimonialCard } from "./TestimonialCard";

interface TestimonialsListProps {
  items: Testimonial[];
  itemsPerPage?: number;
}

export function TestimonialsList({ items, itemsPerPage = 3 }: TestimonialsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
  };

  return (
    <div className="mt-[clamp(1.5rem,2.8vw,2.6rem)] w-full">
      <Stagger key={currentPage} className="grid gap-[clamp(1rem,2vw,2rem)] md:grid-cols-2 lg:grid-cols-3">
        {currentItems.map((testimonial) => (
          <TestimonialCard key={testimonial.name} {...testimonial} />
        ))}
      </Stagger>

      {totalPages > 1 && (
        <div className="mt-[clamp(2rem,3.8vw,3.5rem)] flex items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous page"
            className="grid size-[clamp(2.4rem,3.2vw,3rem)] place-items-center border border-[#d9cfc9] bg-white text-[#211b18] transition-all duration-300 hover:border-[#8a5230] hover:bg-[#8a5230] hover:text-white"
          >
            <ChevronRightIcon className="size-4 rotate-180" strokeWidth={2} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              className={`grid size-[clamp(2.4rem,3.2vw,3rem)] place-items-center font-(family-name:--font-ui) text-[clamp(0.9rem,1.1vw,1.05rem)] font-semibold transition-all duration-300 ${
                currentPage === page
                  ? "bg-[#8a5230] text-white shadow-sm"
                  : "border border-[#d9cfc9] bg-white text-[#211b18] hover:border-[#8a5230] hover:text-[#8a5230]"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next page"
            className="grid size-[clamp(2.4rem,3.2vw,3rem)] place-items-center border border-[#d9cfc9] bg-white text-[#211b18] transition-all duration-300 hover:border-[#8a5230] hover:bg-[#8a5230] hover:text-white"
          >
            <ChevronRightIcon className="size-4" strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  );
}
