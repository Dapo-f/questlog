import React from "react";

function SkeletonHeroBanner() {
  return (
    <div className="relative w-full h-120 bg-cover bg-center flex items-end bg-surface2 animate-pulse">
      <div className="content relative z-10 p-10">
        <div className="h-6 bg-border rounded animate-pulse w-4/5 mb-3" />
        <div className="flex items-center gap-3 mb-3">
          <div className="h-3 bg-border rounded animate-pulse w-5" />
          <div className="h-3 bg-border rounded animate-pulse w-8" />
          <div className="h-3 bg-border rounded animate-pulse w-1/2" />
        </div>
        <div className="buttons flex gap-3">
            <div className="h-11.25  bg-border rounded animate-pulse w-41.5"></div>
            <div className="h-11.25  bg-border rounded animate-pulse w-41.5"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonHeroBanner;
