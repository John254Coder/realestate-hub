"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { properties } from "@/data/properties";

export default function ListingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const queryFilter = searchParams.get("filter");
    if (queryFilter === "sale" || queryFilter === "rent") {
      setFilter(queryFilter);
    } else {
      setFilter("all");
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (filter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [filter, router]);

  const filteredProperties = properties.filter((p) => {
    const matchesStatus = filter === "all" ? true : p.status === filter;

    const searchLocation = searchParams.get("location")?.toLowerCase() || "";
    const searchType = searchParams.get("type")?.toLowerCase() || "";
    const searchPrice = parseInt(searchParams.get("price")) || null;

    const matchesLocation = searchLocation
      ? p.location.toLowerCase().includes(searchLocation)
      : true;

    const matchesType = searchType
      ? p.propertyType.toLowerCase() === searchType
      : true;

    const matchesPrice = searchPrice ? p.price <= searchPrice : true;

    return matchesStatus && matchesLocation && matchesType && matchesPrice;
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const formatPrice = (price) =>
    typeof price === "number"
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(price)
      : price;

  return (
    <main className="min-h-screen bg-neutral-100">
      {/* Hero */}
      <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] flex flex-col items-center justify-center text-center text-white overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/hero-listing.jpg"
            alt="Luxury Homes"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        <motion.div
          className="relative z-10 px-4 sm:px-6 md:px-20"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h1
            className="mb-4 text-3xl font-bold sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            Find Your Dream Home
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto mb-6 text-lg sm:text-xl text-neutral-light"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
          >
            Explore premium properties across Kenya – for sale or rent.
          </motion.p>

          <motion.a
            href="#listings"
            className="relative inline-block px-6 py-3 overflow-hidden text-lg font-medium text-white rounded-full shadow-lg bg-secondary"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
            whileHover={{
              scale: 1.08,
              y: -4,
              boxShadow:
                "0 8px 25px rgba(0,0,0,0.25), 0 0 20px rgba(255,255,255,0.15)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View Listings</span>
            <motion.span
              className="absolute inset-0 bg-white/10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>
      </section>

      {/* Filter & Grid */}
      <section id="listings" className="px-4 py-12 sm:px-6 md:px-20">
        <div className="flex flex-col justify-center gap-4 mb-12 sm:flex-row">
          {["all", "sale", "rent"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              aria-pressed={filter === type}
              className={`px-5 py-2 rounded-lg font-medium transition w-full sm:w-auto ${
                filter === type
                  ? "bg-secondary text-white shadow-md scale-105"
                  : "bg-white text-text-dark hover:bg-neutral-200"
              }`}
            >
              {type === "all" ? "All" : type === "sale" ? "For Sale" : "For Rent"}
            </button>
          ))}
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid items-stretch grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property, i) => (
              <motion.div
                key={property.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="h-full"
              >
                <Link
                  href={`/listing/${property.slug}`}
                  className="relative flex flex-col h-full overflow-hidden transition bg-white shadow-md rounded-2xl hover:shadow-xl"
                >
                  {property.featured && (
                    <span className="absolute z-10 px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded top-3 left-3">
                      Featured
                    </span>
                  )}

                  <KeenCarousel images={property.images} title={property.title} />

                  <div className="flex flex-col flex-grow p-4 sm:p-6">
                    <h3 className="mb-2 text-lg font-semibold sm:text-xl text-primary">
                      {property.title}
                    </h3>
                    <p className="mb-2 text-sm text-text-muted">{property.location}</p>
                    <p className="mb-4 text-base font-bold text-secondary">
                      {formatPrice(property.price)}
                    </p>
                    <div className="flex flex-wrap justify-between gap-2 text-sm text-text-muted">
                      <span>🛏 {property.beds} Beds</span>
                      <span>🚿 {property.baths} Baths</span>
                      <span>📐 {property.size}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {property.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs font-medium bg-gray-200 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center mt-8 space-y-4 text-center">
            <p className="text-text-muted">No properties available for this filter.</p>
            <button
              onClick={() => {
                setFilter("all");
                router.replace("/listing", { scroll: false }); // ✅ Clears all filters
              }}
              className="px-4 py-2 text-sm font-medium text-white rounded-md bg-secondary hover:bg-secondary/90"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

function KeenCarousel({ images, title }) {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      renderMode: "performance",
      drag: true,
      slides: { perView: 1 },
      duration: 1200,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div
      ref={sliderRef}
      className="relative w-full h-56 overflow-hidden keen-slider sm:h-64 md:h-72 rounded-t-2xl group"
    >
      {images.map((img, idx) => (
        <div
          key={idx}
          className="relative w-full h-full overflow-hidden keen-slider__slide"
        >
          <Image
            src={img}
            alt={`${title} - ${idx + 1}`}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-0 bg-black/40 group-hover:opacity-100">
            <button className="px-5 py-2 text-white transition bg-blue-600 rounded-full shadow-lg hover:bg-blue-700">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
