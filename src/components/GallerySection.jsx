"use client";
import { useState } from 'react';
import Image from 'next/image';

const galleryImages = [
  '/image (8).webp',
  '/image (1).webp',
  '/image (2).webp',
  '/image (3).webp',
  '/image (4).webp',
  '/image (5).webp',
  '/image (6).webp',
  '/image (7).webp',
];

function GallerySection() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(src)}
              className="relative block overflow-hidden rounded shadow-sm focus:outline-none"
            >
              <Image
                src={src}
                alt={`Gallery image ${idx + 1}`}
                width={400}
                height={300}
                className="object-cover w-full h-48 hover:scale-105 transition-transform duration-300"
              />
            </button>
          ))}
        </div>

        {/* Modal Overlay */}
        {selected && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold"
              onClick={() => setSelected(null)}
            >
              &times;
            </button>
            <div className="max-w-3xl max-h-[80vh] p-4">
              <Image
                src={selected}
                alt="Selected image"
                width={800}
                height={600}
                className="object-cover w-full h-full rounded"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


export default GallerySection;