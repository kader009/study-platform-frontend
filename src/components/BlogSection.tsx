import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'How to Prepare for Online Tutoring',
    excerpt:
      'Discover the best tips for students to stay focused and make the most out of online sessions.',
    image: '/How to Prepare for Online Tutoring.webp',
    slug: 'https://tutorcruncher.com/blog/how-to-tutor-online-a-best-practice-guide',
  },
  {
    id: 2,
    title: 'Top 5 Skills Every Tutor Should Have',
    excerpt:
      'Explore the essential qualities of a successful tutor on Edunest platform.',
    image: '/Top 5 Skills Every Tutor Should Have.webp',
    slug: 'https://vnaya.com/blog/5-Skills-That-Online-Tutors-Should-Have%21',
  },
  {
    id: 3,
    title: 'How Edunest is Changing Online Education',
    excerpt:
      'Learn how Edunest is making education more accessible and effective.',
    image: '/How Edunest is Changing Online Learning in Bangladesh.webp',
    slug: 'https://online.umn.edu/story/how-online-education-shaping-future-workforce',
  },
];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="hover:shadow-xl transition-shadow duration-300 rounded-xl p-0"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={400}
                className="w-full object-cover rounded-t-xl"
              />
              <CardContent className="p-4 pt-0">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
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
