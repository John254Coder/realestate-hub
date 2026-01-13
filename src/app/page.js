"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { properties } from "@/data/properties";
import { testimonials } from "@/data/testimonials";
import HomeFAQPreview from "./components/HomeFAQPreview";
import FeaturedPropertiesCarousel from "./components/FeaturedPropertiesCarousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

// 🔹 Animation Variant
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  const featured = properties.filter((p) => p.featured);

  // For testimonials carousel
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [Autoplay({ delay: 4000 })]
  );

  // 🔍 Search state
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  // Handle search button click
    const handleSearch = () => {
      const params = new URLSearchParams();

      if (location) params.append("location", location);
      if (type) params.append("type", type);
      if (price) params.append("price", price);

      // Redirect with applied filters
      router.push(`/listing?${params.toString()}`);
    };


  return (
    <main className="flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen overflow-hidden text-center text-white">
  {/* Background image with overlay */}
  <motion.div
    className="absolute inset-0"
    initial={{ scale: 1.2 }}
    animate={{ scale: 1 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
  >
    <Image
      src="/hero-bg.jpg"
      alt="Luxury property"
      fill
      priority
      className="object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
  </motion.div>

  {/* Content */}
  <motion.div
    className="relative z-10 max-w-6xl px-4 mx-auto sm:px-6 md:px-20"
    initial="hidden"
    animate="visible"
    variants={fadeUp}
    transition={{ duration: 0.8 }}
  >
    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-transparent sm:text-4xl md:text-6xl bg-clip-text bg-gradient-to-r from-accent to-secondary">
      Find Your Dream Home
    </h1>
    <p className="mb-6 text-sm sm:text-lg md:text-xl text-neutral-200">
      Premium properties for sale & rent
    </p>

    {/* 🔍 Search Card */}
    <div className="p-4 mb-6 shadow-lg bg-white/90 rounded-xl backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <input
          type="text"
          placeholder="Location (e.g., Nairobi)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-3 py-2 text-sm text-black rounded-lg sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 text-sm text-black rounded-lg sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          <option value="">Property Type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="villa">Villa</option>
        </select>
        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-3 py-2 text-sm text-black rounded-lg sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          <option value="">Price Range</option>
          <option value="100000">Below $100k</option>
          <option value="500000">$100k - $500k</option>
          <option value="500001">$500k+</option>
        </select>
        <button
          onClick={handleSearch}
          className="w-full px-5 py-2 text-sm font-semibold text-white transition rounded-lg sm:w-auto bg-secondary hover:bg-secondary/90"
        >
          Search
        </button>
      </div>
    </div>

    {/* CTA Buttons */}
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
      <Link
        href="/listing?filter=all"
        className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white transition rounded-full shadow-md bg-secondary hover:bg-secondary/90 hover:scale-105"
      >
        View Listings
      </Link>
      <Link
        href="/contact"
        className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold transition rounded-full shadow-md bg-accent text-primary hover:bg-accent/90 hover:scale-105"
      >
        Contact Us
      </Link>
    </div>
  </motion.div>
</section>


      {/* Featured Properties */}
      <section className="relative z-20 px-4 py-20 shadow-lg sm:px-6 md:px-20 bg-neutral-100 rounded-t-3xl">
        <FeaturedPropertiesCarousel featuredProperties={featured} />
      </section>

    

      {/* About Section */}
      <section className="px-4 py-20 bg-white sm:px-6 md:px-20">
        <div className="grid items-center max-w-6xl gap-12 mx-auto md:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl md:text-3xl text-primary">
              About Us
            </h2>
            <p className="mb-6 text-sm leading-relaxed sm:text-base md:text-lg text-text-muted">
              We are a trusted real estate agency dedicated to helping you buy,
              sell, or rent premium properties. Our team ensures a seamless
              experience with transparency and professionalism.
            </p>
            <Link
              href="/about"
              className="inline-block px-6 py-3 font-semibold text-white rounded-lg bg-secondary hover:bg-secondary/90"
            >
              Learn More
            </Link>
          </motion.div>

          <motion.div
            className="relative h-56 overflow-hidden shadow-md sm:h-64 md:h-72 rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="/about-home.jpg"
              alt="About us real estate"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-24 text-center sm:px-6 md:px-20 bg-neutral-100">
        <motion.h2
          className="mb-16 text-2xl font-bold sm:text-3xl md:text-3xl text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What Our Clients Say
        </motion.h2>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="box-border flex gap-4 pb-4 sm:gap-6 sm:pb-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                className="flex-shrink-0 w-full min-w-0 mb-6 sm:w-1/2 lg:w-1/3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <div className="flex flex-col items-center p-6 sm:p-8 min-h-[350px] bg-white shadow-md rounded-3xl transition hover:shadow-xl hover:scale-105 duration-500">
                  <div className="relative w-20 h-20 mb-4">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover border-4 rounded-full shadow-md border-secondary"
                    />
                  </div>
                  <p className="max-w-xs mb-4 text-sm italic sm:text-base md:text-lg text-text-muted">
                    “{t.review}”
                  </p>
                  <div className="flex justify-center mb-3 text-xl text-accent">
                    {"★".repeat(t.rating)}
                    {"☆".repeat(5 - t.rating)}
                  </div>
                  <span className="font-semibold text-primary">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-20 bg-white sm:px-6 md:px-20">
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="mb-12 text-2xl font-bold text-center sm:text-3xl md:text-3xl text-primary"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            Frequently Asked Questions
          </motion.h2>

          <HomeFAQPreview />

          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="inline-block w-full px-8 py-4 font-semibold text-white transition rounded-full shadow-lg bg-secondary hover:bg-secondary/90 hover:scale-105 sm:w-auto"
            >
              View All FAQs
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Contact Agent Section */}
      <section className="relative px-4 py-20 text-white bg-black sm:px-6 md:px-20">
        <motion.div
          className="max-w-2xl p-8 mx-auto border shadow-xl bg-black/60 backdrop-blur-lg rounded-3xl border-white/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 text-2xl font-bold text-center sm:text-3xl">
            Contact an Agent
          </h2>
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 text-white border rounded-lg bg-black/40 border-white/20 placeholder:text-neutral-400 focus:ring-2 focus:ring-secondary focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 text-white border rounded-lg bg-black/40 border-white/20 placeholder:text-neutral-400 focus:ring-2 focus:ring-secondary focus:outline-none"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-4 py-3 text-white border rounded-lg bg-black/40 border-white/20 placeholder:text-neutral-400 focus:ring-2 focus:ring-secondary focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 font-semibold text-white rounded-lg bg-secondary hover:bg-secondary/90"
            >
              Send Inquiry
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
