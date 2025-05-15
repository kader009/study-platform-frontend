'use client';
import { useState } from 'react';
import Image from 'next/image';

const galleryImages = [
  { src: '/image (8).webp', label: 'Student Lab' },
  { src: '/image (1).webp', label: 'Live Session' },
  { src: '/image (2).webp', label: 'Workshop' },
  { src: '/image (3).webp', label: 'Collaboration' },
  { src: '/image (4).webp', label: 'Guest Lecture' },
  { src: '/image (5).webp', label: 'Award Ceremony' },
  { src: '/image (6).webp', label: 'Bootcamp' },
  { src: '/image (7).webp', label: 'Hackathon' },
];

function GallerySection() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Our Gallery
        </h1>
        <p className="text-center mb-8">Explore the highlights and milestones that define our journey</p>

        {/* Masonry Layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {galleryImages.map(({ src, label }, idx) => (
            <div
              key={idx}
              className="relative w-full break-inside-avoid cursor-pointer group"
              onClick={() => setSelected({ src, label })}
            >
              <Image
                src={src}
                alt={`Gallery image ${idx + 1}`}
                width={400}
                height={300}
                className="object-cover w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                <span className="text-white text-lg font-semibold">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selected && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
              onClick={() => setSelected(null)}
            >
              &times;
            </button>
            <div className="max-w-3xl max-h-[80vh] p-4">
              <Image
                src={selected.src}
                alt={selected.label}
                width={800}
                height={600}
                className="object-contain w-full h-full rounded"
              />
              <p className="text-center text-white mt-2 text-lg font-medium">
                {selected.label}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default GallerySection;
