import React from "react";
import SkeletonCard from "./SkeletonCard";

function SkeletonCardCarousel() {
  return (
    <div className="mt-12">
      {/* fake title bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-4 w-20 md:w-32 bg-border rounded animate-pulse" />
        <div className="h-3 w-8 md:w-12 bg-border rounded animate-pulse" />
      </div>
      {/* fake cards row */}
      <div className="flex gap-4 py-3 overflow-x-auto md:overflow-hidden">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <SkeletonCard key={i} className="w-44 md:w-56 shrink-0" />
        ))}
      </div>
    </div>
  );
}

export default SkeletonCardCarousel;
