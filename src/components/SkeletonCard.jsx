import React from 'react'

function SkeletonCard() {
  return (
    <div className="relative w-56 shrink-0 bg-surface2 rounded-xl overflow-hidden">
      {/* image area */}
      <div className="w-full h-48 bg-border animate-pulse" />
      
      {/* content area */}
      <div className="px-4 py-3 space-y-2">
        {/* title bar */}
        <div className="h-3 bg-border rounded animate-pulse w-4/5" />
        {/* genre and rating row */}
        <div className="flex justify-between items-center">
          <div className="h-2.5 bg-border rounded animate-pulse w-1/2" />
          <div className="h-2.5 bg-border rounded animate-pulse w-8" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard