"use client";

import Image from "next/image";
import Link from "next/link"; // ✅ Added
import { motion } from "framer-motion";
import {
  Target,
  HeartHandshake,
  ShieldCheck,
  Building2,
  Users,
  Trophy,
  Award,
  Rocket,
} from "lucide-react";

export default function AboutPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const milestones = [
    {
      year: "2015",
      title: "Founded RealEstateHub",
      text: "Started as a small real estate consultancy in Nairobi with a passion for connecting people to homes.",
      icon: <Building2 className="w-6 h-6 text-secondary" />,
    },
    {
      year: "2017",
      title: "First 100 Clients",
      text: "Celebrated helping over 100 families find their dream homes within just two years.",
      icon: <Users className="w-6 h-6 text-secondary" />,
    },
    {
      year: "2019",
      title: "Expanded Nationwide",
      text: "Opened offices in Mombasa and Kisumu to serve a wider audience across Kenya.",
      icon: <Rocket className="w-6 h-6 text-secondary" />,
    },
    {
      year: "2021",
      title: "Digital Innovation",
      text: "Launched our online platform with virtual tours and digital booking features.",
      icon: <Award className="w-6 h-6 text-secondary" />,
    },
    {
      year: "2023",
      title: "Trusted Market Leader",
      text: "Recognized among the top real estate agencies in Kenya with a reputation for transparency.",
      icon: <Trophy className="w-6 h-6 text-secondary" />,
    },
  ];

  return (
    <main className="flex flex-col">
     <section className="relative h-[60vh] flex items-center justify-center text-center text-white overflow-hidden">
      
     {/*Hero Background Image with cinematic effect */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/about-bg.avif"
          alt="Luxury properties"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Overlay with fade-in delay */}
      <motion.div
        className="absolute inset-0 bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      />

      {/* Animated Content */}
      <motion.div
        className="relative z-10 px-4"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          About RealEstateHub
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-light">
          Connecting people to their dream homes with trust, innovation, and
          professionalism.
        </p>
      </motion.div>
    </section>

      {/* Who We Are */}
      <section className="px-6 py-20 bg-white md:px-20">
        <motion.h2
          className="mb-10 text-3xl font-bold text-center text-primary"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          Who We Are
        </motion.h2>

        <motion.p
          className="max-w-3xl mx-auto mb-16 text-center text-text-muted"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          RealEstateHub is a leading real estate agency in Kenya, focused on
          helping families and investors discover premium properties. With a
          strong reputation for transparency, integrity, and customer-first
          service, we make property transactions smooth and stress-free.
        </motion.p>

        {/* Mission + Values */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: <Target className="w-10 h-10 text-secondary" />,
              title: "Our Mission",
              text: "Simplify property buying, selling, and renting while delivering exceptional value to our clients.",
            },
            {
              icon: <HeartHandshake className="w-10 h-10 text-secondary" />,
              title: "Our Values",
              text: "Integrity, transparency, and customer satisfaction are at the heart of everything we do.",
            },
            {
              icon: <ShieldCheck className="w-10 h-10 text-secondary" />,
              title: "Our Promise",
              text: "We go above and beyond to match you with the right property that fits your lifestyle and goals.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-8 text-center transition shadow-md bg-neutral-light rounded-2xl hover:shadow-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <div className="flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-primary">
                {item.title}
              </h3>
              <p className="text-text-muted">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-6 py-20 bg-neutral-light md:px-20">
        <motion.h2
          className="mb-16 text-3xl font-bold text-center text-primary"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          Our Journey Since 2015
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Subtle vertical line for mobile */}
          <div className="absolute top-0 block w-px h-full -translate-x-1/2 left-1/2 bg-secondary/20 md:hidden" />

          {/* Stronger animated vertical line for md+ */}
          <motion.div
            className="absolute top-0 hidden w-1 origin-top -translate-x-1/2 left-1/2 bg-secondary/30 md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ height: "100%" }}
          />

          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                className={`relative mb-12 flex flex-col items-center md:flex-row w-full ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
                initial={{
                  opacity: 0,
                  x: isLeft ? -80 : 80,
                  y: 40,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              >
                {/* Timeline marker */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 mb-4 bg-white border-2 rounded-full shadow-md border-secondary md:absolute md:mb-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 md:left-1/2">
                  {m.icon}
                  <span className="absolute inline-flex w-full h-full rounded-full bg-secondary/20 animate-ping" />
                </div>

                {/* Card */}
                <div
                  className={`relative w-full md:w-1/2 px-6 py-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition ${
                    isLeft ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
                  }`}
                >
                  <h3 className="text-xl font-semibold text-primary">
                    {m.year} – {m.title}
                  </h3>
                  <p className="mt-2 text-text-muted">{m.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Team Section */}
      {/* ... unchanged ... */}

      {/* CTA Section */}
      <section className="relative flex flex-col items-center justify-center px-6 py-32 overflow-hidden text-center text-white md:px-20">
        <motion.div
          className="absolute inset-0"
          style={{ y: 0 }}
          initial={{ y: 0 }}
          whileInView={{ y: -80 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/cta-bg.jpg"
            alt="Luxury Home Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-primary/80 to-secondary/70" />
        </motion.div>

        <motion.h2
          className="relative mb-6 text-4xl font-extrabold md:text-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          Ready to Find Your Dream Home?
        </motion.h2>

        <motion.p
          className="relative max-w-2xl mx-auto mb-10 text-lg text-neutral-light md:text-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Whether you’re buying, selling, or renting,{" "}
          <span className="font-semibold text-accent">RealEstateHub</span> is
          here to guide you every step of the way.
        </motion.p>

        <motion.div
          className="relative flex flex-col gap-4 sm:flex-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/listings"
            className="px-8 py-4 font-semibold text-white transition rounded-full shadow-lg bg-accent hover:bg-accent/90 hover:scale-105"
          >
            View Listings
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 font-semibold transition bg-white rounded-full shadow-lg text-primary hover:bg-neutral-light hover:scale-105"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
