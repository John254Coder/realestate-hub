"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// Single Property Slide
function FeaturedPropertySlide({ property }) {
  return (
    <div className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[380px] bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition duration-300">
      <Link href={`/listing/${property.slug}`} className="block h-full">
        <div className="relative w-full h-56 overflow-hidden sm:h-64 md:h-72">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
          />
          <span className="absolute px-3 py-1 text-xs font-semibold text-white rounded-full shadow-md top-4 left-4 bg-accent">
            Featured
          </span>
        </div>
        <div className="p-4 sm:p-6">
          <h3 className="mb-1 text-lg font-semibold text-primary sm:text-xl">
            {property.title}
          </h3>
          <p className="mb-3 text-sm text-text-muted sm:text-base">{property.location}</p>
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-secondary sm:text-lg">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(property.price)}
            </span>

            <span className="px-3 py-1 text-sm rounded-full bg-primary/5 text-primary">
              {property.status === "sale" ? "For Sale" : "For Rent"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

// Continuous Marquee Carousel with pause on hover
export default function FeaturedPropertiesMarquee({ featuredProperties }) {
  const slides = [...featuredProperties, ...featuredProperties]; // duplicate for seamless loop
  const containerRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth / 2; // half, because we duplicated
    const duration = scrollWidth / 40; // adjust speed: 50px/sec

    controls.start({
      x: [0, -scrollWidth],
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: duration,
      },
    });
  }, [controls, slides]);

  // ✅ Pause on hover
  const handleMouseEnter = () => {
    controls.stop(); // stop scrolling
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth / 2;
    const duration = scrollWidth / 40;

    controls.start({
      x: [0, -scrollWidth],
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: duration,
      },
    });
  };

  return (
    <section className="relative z-20 px-4 py-20 overflow-hidden sm:px-6 md:px-20 bg-neutral-100 rounded-t-3xl">
      <h2 className="mb-12 text-2xl font-bold text-center sm:text-3xl md:text-3xl text-primary">
        Featured Properties
      </h2>
      <motion.div
        ref={containerRef}
        className="flex gap-6"
        animate={controls}
        style={{ display: "flex", whiteSpace: "nowrap" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {slides.map((property, i) => (
          <FeaturedPropertySlide key={`${property.slug}-${i}`} property={property} />
        ))}
      </motion.div>
    </section>
  );
}
