"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { BedDouble, Bath, Ruler, Tag } from "lucide-react"; // install if needed

export default function PropertyDetailsClient({ property }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  // Hero carousel state (auto-play)
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Lightbox carousel
  const [lightboxRef, lightboxApi] = useEmblaCarousel({ loop: true });

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    setTimeout(() => {
      if (lightboxApi) lightboxApi.scrollTo(index, false);
    }, 50);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) =>
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [property.images.length]);

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (Demo)");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <main className="overflow-x-hidden bg-neutral-50">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[80vh] lg:min-h-[90vh]">
        {/* Background Carousel */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={property.images[selectedIndex]}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              onClick={() => openLightbox(selectedIndex)}
            >
              <Image
                src={property.images[selectedIndex]}
                alt={property.title}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnails */}
        <div className="absolute w-full max-w-6xl px-4 -translate-x-1/2 bottom-6 sm:bottom-10 left-1/2">
          <div className="flex justify-center gap-2 overflow-x-auto">
            {property.images.map((img, idx) => (
              <button
                key={img}
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                  selectedIndex === idx
                    ? "border-secondary ring-2 ring-secondary"
                    : "border-transparent"
                }`}
              >
                <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Hero Overlay Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute px-4 text-center text-white -translate-x-1/2 left-1/2 bottom-28 sm:bottom-36 max-w-[90%] sm:max-w-2xl"
        >
          {property.featured && (
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-block px-4 py-1 mb-4 text-xs font-semibold text-white uppercase rounded-full shadow-lg sm:text-sm bg-accent"
            >
              Featured
            </motion.span>
          )}
          <h1 className="mb-3 text-3xl font-bold leading-snug sm:text-5xl lg:text-6xl drop-shadow-lg">
            {property.title}
          </h1>
          <p className="mb-2 text-base font-medium sm:text-lg drop-shadow">{property.location}</p>
          <p className="text-2xl font-bold sm:text-3xl lg:text-4xl text-secondary drop-shadow-lg">
            {formatPrice(property.price)}
          </p>
        </motion.div>
      </section>

      {/* DETAILS SECTION */}
      <section className="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 mb-10 text-center sm:grid-cols-4">
          {[
            { label: "Beds", value: property.beds, icon: <BedDouble className="w-5 h-5 mx-auto mb-1" /> },
            { label: "Baths", value: property.baths, icon: <Bath className="w-5 h-5 mx-auto mb-1" /> },
            { label: "Size", value: property.size, icon: <Ruler className="w-5 h-5 mx-auto mb-1" /> },
            { label: "Price", value: formatPrice(property.price), icon: <Tag className="w-5 h-5 mx-auto mb-1" /> },
          ].map((stat, idx) => (
            <motion.div key={idx} whileHover={{ y: -4 }} className="p-4 transition bg-white shadow-md rounded-xl">
              {stat.icon}
              <p className="text-lg font-semibold">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Amenities */}
        {property.amenities?.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold">Amenities</h2>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {property.amenities.map((amenity, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-100 rounded-lg shadow-sm"
                >
                  {amenity}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Description */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Property Description</h2>
          <p className="leading-relaxed text-gray-700">
            {showMore ? property.description : property.description.slice(0, 300) + "..."}
          </p>
          {property.description.length > 300 && (
            <button onClick={() => setShowMore(!showMore)} className="mt-3 font-semibold text-secondary hover:underline">
              {showMore ? "Show Less" : "Read More"}
            </button>
          )}
        </div>

        {/* Map */}
        {property.mapUrl && (
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold">Location</h2>
            <div className="w-full overflow-hidden rounded-lg shadow-md aspect-video">
              <iframe
                src={property.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        )}

        {/* Contact Form */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Contact Agent</h2>
          <form onSubmit={handleSubmit} className="grid gap-6 p-6 bg-white shadow-md rounded-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 text-white rounded-lg shadow-lg bg-secondary hover:bg-secondary/90"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </section>

      {/* LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setLightboxOpen(false);
            }}
          >
            <div className="relative w-full h-full max-w-5xl">
              <div className="flex h-full" ref={lightboxRef}>
                {property.images.map((img) => (
                  <div key={img} className="relative flex-[0_0_100%] w-full h-full">
                    <Image src={img} alt={property.title} fill className="object-contain" />
                  </div>
                ))}
              </div>
              <div className="absolute font-semibold text-white transform -translate-x-1/2 top-4 left-1/2">
                {activeIndex + 1} / {property.images.length}
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute text-3xl font-bold text-white top-4 right-4 hover:text-secondary"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
