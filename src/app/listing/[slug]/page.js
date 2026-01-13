import { notFound } from "next/navigation";
import { properties } from "@/data/properties";
import PropertyDetailsClient from "./PropertyDetailsClient";

// ✅ Generate static params for SSG
export async function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

// Auto-detect domain for Open Graph URLs
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://yourdomain.com"
    : "http://localhost:3000";

// ✅ Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params; // 👈 must await
  const property = properties.find((p) => p.slug === slug);

  if (!property) {
    return {
      title: "Property Not Found | Real Estate Hub",
      description: "The property you’re looking for could not be found.",
    };
  }

  return {
    title: `${property.title} | Real Estate Hub`,
    description: `${property.beds} Beds • ${property.baths} Baths • ${property.sqft.toLocaleString()} sq ft - ${property.description.slice(
      0,
      120
    )}...`,
    openGraph: {
      title: property.title,
      description: property.description,
      url: `${BASE_URL}/listing/${property.slug}`,
      images: property.images?.length
        ? property.images.map((img) => ({
            url: img.startsWith("http") ? img : `${BASE_URL}${img}`,
            width: 1200,
            height: 630,
          }))
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description: property.description,
      images: property.images?.length
        ? property.images.map((img) =>
            img.startsWith("http") ? img : `${BASE_URL}${img}`
          )
        : [],
    },
  };
}

// ✅ Property details page component
export default async function PropertyDetailsPage({ params }) {
  const { slug } = await params; // 👈 same fix here
  const property = properties.find((p) => p.slug === slug);

  if (!property) return notFound();

  return <PropertyDetailsClient property={property} />;
}
