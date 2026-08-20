import React from 'react'

function ProfilePageSkeleton() {
   return (
    <div className="min-h-screen bg-bg text-text font-outfit px-4 md:px-8 py-12 max-w-6xl mx-auto">
      {/* Back button placeholder */}
      <div className="h-4 w-16 bg-surface2 rounded animate-pulse mb-4" />

      {/* Header panel skeleton */}
      <div className="relative bg-surface2 border border-border rounded-2xl overflow-hidden p-6 md:p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left w-full sm:w-auto">
            <div className="h-28 w-28 rounded-full bg-surface animate-pulse shrink-0" />
            <div className="space-y-3 w-full sm:w-auto">
              <div className="h-6 w-40 bg-surface rounded animate-pulse mx-auto sm:mx-0" />
              <div className="h-3 w-28 bg-surface rounded animate-pulse mx-auto sm:mx-0" />
            </div>
          </div>
          <div className="flex gap-4 bg-surface/60 border border-border/60 px-6 py-4 rounded-xl">
            <div className="h-10 w-14 bg-surface2 rounded animate-pulse" />
            <div className="w-px bg-border my-1" />
            <div className="h-10 w-14 bg-surface2 rounded animate-pulse" />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border/40 flex items-center justify-between">
          <div className="flex gap-6">
            <div className="h-3 w-16 bg-surface rounded animate-pulse" />
            <div className="h-3 w-16 bg-surface rounded animate-pulse" />
          </div>
          <div className="h-9 w-32 bg-surface rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-5 w-32 bg-surface2 rounded animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-surface2 rounded-xl border border-border h-48 animate-pulse"
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-5 w-28 bg-surface2 rounded animate-pulse" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-surface2 rounded-xl border border-border h-24 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePageSkeleton