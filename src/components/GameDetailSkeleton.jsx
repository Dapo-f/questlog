function GameDetailSkeleton() {
  return (
    <div>
      {/* Banner skeleton */}
      <div className="w-full h-[40vh] md:h-[50vh] bg-surface2 animate-pulse" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_18rem] gap-8 px-6 md:px-12 py-6 md:py-10">
        {/* MAIN COLUMN */}
        <div className="min-w-0 space-y-8">
          {/* About */}
          <div>
            <div className="h-5 w-24 bg-surface2 rounded animate-pulse mb-4" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-surface2 rounded animate-pulse" />
              <div className="h-3 w-full bg-surface2 rounded animate-pulse" />
              <div className="h-3 w-2/3 bg-surface2 rounded animate-pulse" />
            </div>
          </div>

          {/* Trailer */}
          <div>
            <div className="h-5 w-20 bg-surface2 rounded animate-pulse mb-4" />
            <div className="w-full aspect-video bg-surface2 rounded-xl animate-pulse" />
          </div>

          {/* Screenshots */}
          <div>
            <div className="h-5 w-28 bg-surface2 rounded animate-pulse mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-video bg-surface2 rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Where to buy */}
          <div>
            <div className="h-5 w-32 bg-surface2 rounded animate-pulse mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-surface2 rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <div className="h-5 w-24 bg-surface2 rounded animate-pulse mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-surface2 rounded-xl h-24 animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ASIDE */}
        <div className="min-w-0 space-y-6">
          <div className="h-16 bg-surface2 rounded-2xl animate-pulse" />
          <div className="bg-surface2 rounded-2xl p-6 space-y-4 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-surface rounded" />
            ))}
          </div>
          <div>
            <div className="h-5 w-32 bg-surface2 rounded animate-pulse mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-surface2 rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetailSkeleton;