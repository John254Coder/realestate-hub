import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions"; // ⬅️ Import global floating buttons

export const metadata = {
  title: "Real Estate Hub",
  description: "Luxury properties for sale & rent",
  metadataBase: new URL("https://yourdomain.com"), // ✅ Replace with your real domain
  openGraph: {
    title: "Real Estate Hub",
    description: "Luxury properties for sale & rent",
    url: "https://yourdomain.com",
    siteName: "Real Estate Hub",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg", // optional default OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Hub",
    description: "Luxury properties for sale & rent",
    images: ["https://yourdomain.com/og-image.jpg"],
  },
};

// ✅ New export for viewport
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans text-text-dark bg-neutral-white">
        <Navbar />
        {children}
        <Footer />
        <FloatingActions /> {/* ✅ Always visible on every page */}
      </body>
    </html>
  );
}
