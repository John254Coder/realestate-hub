"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { faqs } from "@/data/faqs";
import FAQItem from "../components/FAQItem";
import Image from "next/image";

export default function FAQPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFAQ, setOpenFAQ] = useState(null); // ✅ removed TypeScript <number | null>

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative flex items-center justify-center h-[40vh] sm:h-[50vh] md:h-[60vh] text-center text-white overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/faq-bg.webp"
            alt="FAQ background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </motion.div>
        <motion.h1
          className="relative z-10 px-4 text-3xl font-extrabold sm:text-4xl md:text-6xl"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          Frequently Asked Questions
        </motion.h1>
      </section>

      {/* FAQ Section */}
      <section className="flex-1 px-4 py-16 sm:px-6 md:px-12 lg:px-20 bg-neutral-light">
        {/* Categories filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                initial={false}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  backgroundColor: isActive ? "#0ea5e9" : "#ffffff",
                  color: isActive ? "#ffffff" : "#1f2937",
                  boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="px-4 py-2 text-sm font-medium rounded-full sm:text-base focus:outline-none"
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <FAQItem
                  faq={faq}
                  isOpen={openFAQ === faq.id}
                  onToggle={() =>
                    setOpenFAQ(openFAQ === faq.id ? null : faq.id)
                  }
                />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-text-muted">
              No FAQs found in this category.
            </p>
          )}
        </div>

        {/* CTA below FAQs */}
        <div className="mt-16 text-center">
          <p className="mb-4 text-sm text-text-muted sm:text-base">
            Didn’t find the answer you’re looking for?
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 font-semibold text-white transition rounded-full shadow-lg sm:px-8 bg-secondary hover:bg-secondary/90 hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
