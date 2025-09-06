// components/SessionSkeleton.tsx
const SessionSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-4 animate-pulse space-y-3"
        >
          <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          <div className="flex justify-between items-center mt-4">
            <div className="h-8 w-16 bg-gray-300 rounded-full"></div>
            <div className="h-8 w-24 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionSkeleton;
