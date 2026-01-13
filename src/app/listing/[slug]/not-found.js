import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center bg-neutral-50">
      <h1 className="mb-6 text-6xl font-extrabold text-primary">404</h1>

      <h2 className="mb-4 text-2xl font-bold text-neutral">
        Oops! Property Not Found
      </h2>

      <p className="max-w-md mb-8 text-text-muted">
        The property you’re looking for doesn’t exist or may have been removed.
        You can return to the listings page to explore available properties.
      </p>

      <Link
        href="/listing"
        className="px-6 py-3 text-white transition rounded-lg bg-primary hover:bg-primary/90"
      >
        Back to Listings
      </Link>
    </section>
  );
}
