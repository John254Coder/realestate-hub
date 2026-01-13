"use client";

import { useState, useEffect, useRef } from "react";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaPlus } from "react-icons/fa";

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // ✅ Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const actions = [
    {
      href: "tel:+1234567890",
      icon: <FaPhoneAlt size={18} />,
      color: "bg-secondary",
      label: "Call Us",
    },
    {
      href: "https://wa.me/1234567890",
      icon: <FaWhatsapp size={20} />,
      color: "bg-green-500",
      label: "WhatsApp",
    },
    {
      href: "/contact",
      icon: <FaEnvelope size={18} />,
      color: "bg-accent",
      label: "Request Info",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed z-50 flex flex-col items-end space-y-3 bottom-6 right-6"
    >
      {/* Action Buttons (expand with animation) */}
      <div className="flex flex-col items-end space-y-3">
        {actions.map((action, idx) => (
          <a
            key={idx}
            href={action.href}
            target={action.href.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            aria-label={action.label}
            className={`
              flex items-center justify-center w-12 h-12 rounded-full shadow-lg text-white 
              transition-all duration-300 ease-in-out transform
              ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
              ${action.color}
            `}
            style={{ transitionDelay: `${idx * 100}ms` }} // staggered animation
          >
            {action.icon}
          </a>
        ))}
      </div>

      {/* Main Floating Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center text-white transition rounded-full shadow-xl w-14 h-14 bg-primary hover:scale-110"
        aria-label="More Options"
      >
        <FaPlus
          size={22}
          className={`transform transition-transform ${open ? "rotate-45" : ""}`}
        />
      </button>
    </div>
  );
}
