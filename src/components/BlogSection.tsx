import { Card, CardContent } from '@/components/ui/card';
import { blogPosts } from '@/data/blogData';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogSection() {
  return (
    <section className="py-6">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          Latest Blogs & Resources
        </h1>
        <p className="text-center text-gray-600 mb-8  text-sm">
          Discover practical tips, expert insights, and the latest updates on
          learning
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="hover:shadow-xl transition-shadow duration-300 rounded-xl p-0 overflow-hidden"
            >
              <div className="p-4 pb-0">
                <div className="overflow-hidden rounded-md">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={400}
                    className="w-full object-cover"
                  />
                </div>
              </div>
              <CardContent className="p-4 pt-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                <Link href={`${post.slug}`} target="_blank">
                  <span className="text-blue-600 hover:underline font-medium">
                    Read more →
                  </span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
