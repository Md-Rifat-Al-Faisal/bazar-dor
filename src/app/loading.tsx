export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-64 bg-gray-200 rounded-2xl mb-12"></div>
      <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}