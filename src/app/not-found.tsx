import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="max-w-md w-full p-8 rounded-lg bg-card text-card-foreground shadow">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="mb-6">The page you are looking for could not be found.</p>
        <Link
          href="/"
          className="inline-block px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
        >
          Go to home
        </Link>
      </div>
    </div>
  );
}
