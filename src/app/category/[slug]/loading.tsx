export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 pb-20 space-y-4 animate-pulse">
      <div className="h-24 bg-line rounded-3xl"></div>
      <div className="h-16 bg-line rounded-2xl"></div>
      <div className="h-4 w-40 bg-line rounded"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-surface border border-line rounded-2xl p-4 h-36 flex flex-col justify-between">
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-line rounded-xl"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-line rounded w-3/4"></div>
                <div className="h-3 bg-line rounded w-1/2"></div>
              </div>
            </div>
            <div className="h-6 bg-line rounded w-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}