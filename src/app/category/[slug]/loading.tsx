export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-20">
      <div className="h-24 bg-gray-200 animate-pulse rounded-2xl mb-8"></div>
      <div className="flex justify-between mb-6">
        <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-8 w-40 bg-gray-200 animate-pulse rounded"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-40 animate-pulse flex flex-col justify-between">
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}