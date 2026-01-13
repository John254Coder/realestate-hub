"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { faqs } from "@/data/faqs";
import FAQItem from "./FAQItem";

export default function HomeFAQPreview() {
  const [openFAQ, setOpenFAQ] = useState(null);

  // Only show General category, max 3 for preview
  const generalFAQs = faqs
    .filter((faq) => faq.category === "General")
    .slice(0, 3);

  // Parent motion variants for staggered fade-up
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // stagger each FAQ by 0.15s
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto space-y-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {generalFAQs.map((faq) => (
        <motion.div key={faq.id} variants={itemVariants}>
          <FAQItem
            faq={faq}
            isOpen={openFAQ === faq.id}
            onToggle={() =>
              setOpenFAQ(openFAQ === faq.id ? null : faq.id)
            }
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
