"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-12 pb-6 mt-20 bg-primary text-neutral-light">
      <div className="grid grid-cols-1 gap-10 px-6 mx-auto max-w-7xl md:px-12 md:grid-cols-4">
        {/* Column 1: Contact Info */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-white">Contact Us</h3>
          <ul className="space-y-3 text-text-muted">
            <li className="flex items-center gap-2">
              <Phone size={18} /> <span>+254 700 123 456</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} /> <span>info@realestatehub.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} /> <span>Nairobi, Kenya</span>
            </li>
          </ul>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-white">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="transition hover:text-accent">Home</Link>
            </li>
            <li>
              <Link href="/listings" className="transition hover:text-accent">Listings</Link>
            </li>
            <li>
              <Link href="/about" className="transition hover:text-accent">About Us</Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-accent">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
              <Facebook className="transition hover:text-accent" />
            </Link>
            <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
              <Twitter className="transition hover:text-accent" />
            </Link>
            <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
              <Instagram className="transition hover:text-accent" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
              <Linkedin className="transition hover:text-accent" />
            </Link>
          </div>
        </div>

        {/* Column 4: Newsletter Signup */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-white">Newsletter</h3>
          <p className="mb-4 text-text-muted">
            Get the latest property listings & updates straight to your inbox.
          </p>
          <form
            action="https://formspree.io/f/{your-id}" // Replace with your Formspree or API
            method="POST"
            className="flex flex-col items-center gap-3 sm:flex-row"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 rounded-lg text-text-dark focus:outline-none"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white transition rounded-lg bg-secondary hover:bg-secondary/90 sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-6 mt-10 text-sm text-center border-t border-neutral-light/20 text-text-muted">
        © {new Date().getFullYear()} RealEstateHub. All rights reserved.
      </div>
    </footer>
  );
}
