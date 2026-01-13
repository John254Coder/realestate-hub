"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQItem({ faq, isOpen, onToggle }) {
  const ref = useRef(null);

  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  const handleToggle = () => {
    onToggle();
    if (!isOpen && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`border rounded-xl shadow-sm transition-all duration-300 ${
        isOpen ? "border-accent shadow-md" : "border-gray-200"
      }`}
      variants={item}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, backgroundColor: "#f3f4f6" }} // subtle hover
    >
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-${faq.id}`}
        className="flex items-center justify-between w-full px-6 py-4 text-lg font-medium text-left transition text-primary focus:outline-none rounded-xl"
      >
        {faq.question}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-accent" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            id={`faq-${faq.id}`}
            className="px-6 pb-4 overflow-hidden text-text-muted"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {faq.answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
