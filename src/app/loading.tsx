export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 pb-20 animate-pulse">
      <div className="h-72 bg-line rounded-3xl mb-12"></div>
      <div className="h-7 bg-line rounded w-48 mb-5"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-36 bg-line rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}