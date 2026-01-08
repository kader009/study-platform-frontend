import React from 'react';

export default function TutorMaterialTableSkeleton() {
  const rows = new Array(6).fill(0);
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto" />
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full bg-white rounded-lg shadow">
          <div className="p-4">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-1 h-6 bg-gray-200 rounded" />
              <div className="col-span-3 h-6 bg-gray-200 rounded" />
              <div className="col-span-4 h-6 bg-gray-200 rounded" />
              <div className="col-span-4 h-6 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="divide-y">
            {rows.map((_, idx) => (
              <div className="p-4" key={idx}>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1 h-5 bg-gray-200 rounded" />
                  <div className="col-span-3 h-5 bg-gray-200 rounded" />
                  <div className="col-span-4 h-5 bg-gray-200 rounded" />
                  <div className="col-span-4 h-5 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
