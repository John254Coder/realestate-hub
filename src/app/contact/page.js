"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // 🔗 Hook up EmailJS, Nodemailer, or backend API here
  };

  return (
    <main className="flex flex-col">
      {/* Hero Banner */}
      <section className="relative flex items-center justify-center h-[40vh] sm:h-[50vh] md:h-[60vh] text-center text-white overflow-hidden">
  <motion.div
    className="absolute inset-0"
    initial={{ scale: 1.2 }}
    animate={{ scale: 1 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
  >
    {/* ✅ Make sure parent has height */}
    <div className="relative w-full h-full">
      <Image
        src="/contact-bg.jpg"
        alt="Luxury interior"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
    </div>
  </motion.div>
  <motion.h1
    className="relative z-10 px-4 text-3xl font-extrabold sm:text-4xl md:text-6xl"
    initial="hidden"
    animate="visible"
    variants={fadeUp}
    transition={{ duration: 0.8 }}
  >
    Get in Touch
  </motion.h1>
      </section>


      {/* Contact Form Section */}
      <section className="px-4 py-16 bg-white sm:px-6 md:px-12 lg:px-20">
        <div className="grid max-w-6xl gap-12 mx-auto md:grid-cols-2">
          {/* Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-primary">
              We’d love to hear from you
            </h2>
            <p className="mb-6 text-text-muted">
              Whether you’re buying, selling, or just curious, our team is here
              to answer all your real estate questions.
            </p>
            <ul className="space-y-4 text-sm text-text-dark sm:text-base">
              <li>
                📍 <span className="font-semibold">Address:</span> 123 Luxury
                Ave, Nairobi
              </li>
              <li>
                📞 <span className="font-semibold">Phone:</span> +254 700 123
                456
              </li>
              <li>
                ✉️ <span className="font-semibold">Email:</span>{" "}
                info@realestatehub.com
              </li>
            </ul>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="p-6 shadow-lg sm:p-8 bg-neutral-light rounded-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-primary">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-primary">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-primary">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 font-semibold text-white transition rounded-lg shadow-lg bg-secondary hover:bg-secondary/90 hover:scale-105"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </section>

      {/* Map Embed */}
      <section className="w-full h-[300px] sm:h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.857173728969!2d36.8219!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10e8f4c2c3b7%3A0xabcdef123456!2sNairobi!5e0!3m2!1sen!2ske!4v123456789"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </section>
    </main>
  );
}
