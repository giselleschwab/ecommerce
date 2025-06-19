export function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden animate-pulse w-full max-w-xs">
      <div className="relative h-40 bg-gray-200" />
      <div className="p-3 flex flex-col justify-between h-full">
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-300 rounded w-full" />
          <div className="h-3 bg-gray-300 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-1/3 mt-2" />
        </div>
        <div className="mt-3 h-5 bg-gray-300 rounded w-1/2" />
      </div>
    </div>
  );
}
