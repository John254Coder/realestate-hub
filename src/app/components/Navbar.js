"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Scroll shadow + auto-close
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Listings", path: "/listing" }, // ✅ updated
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${
        scrolled
          ? "bg-primary/90 shadow-lg backdrop-blur-md"
          : "bg-transparent shadow-none backdrop-blur-0"
      }`}
    >
      <div className="px-4 mx-auto md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold transition-transform text-secondary hover:scale-105"
          >
            RealEstate<span className="text-accent">Hub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="items-center hidden space-x-8 md:flex">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <div key={link.path} className="relative group">
                  <Link
                    href={link.path}
                    className={`transition-colors duration-300 ${
                      isActive
                        ? "text-accent font-semibold"
                        : "hover:text-accent text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-accent rounded transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/listing" // ✅ updated
              className="px-4 py-2 font-semibold text-white transition rounded-lg bg-secondary hover:scale-105"
            >
              View Listings
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="relative flex flex-col items-center justify-center w-8 h-8 focus:outline-none"
            >
              <span
                className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
                  isOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white my-1 transition-opacity duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={`border-t md:hidden border-neutral-light/20 ${
              scrolled
                ? "bg-primary/90 backdrop-blur-md"
                : "bg-black/70 backdrop-blur-sm"
            }`}
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {links.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`transition-colors duration-300 ${
                      isActive
                        ? "text-accent font-semibold"
                        : "hover:text-accent text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/listing" // ✅ updated
                className="px-4 py-2 font-semibold text-center text-white transition rounded-lg bg-secondary hover:bg-secondary/90 hover:scale-105"
              >
                View Listings
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
