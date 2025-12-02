import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile menu state

  return (
    <nav className="w-full flex justify-between items-center px-6 md:px-10 py-5 bg-neutral-900 text-white border-b border-neutral-700 sticky top-0 z-50">

      {/* Logo */}
      <Link to="/" className="text-xl font-serif tracking-tight">
        CODECLARITY
      </Link>

      {/* ----- DESKTOP MENU ----- */}
      <div className="hidden md:flex items-center gap-8 text-sm font-mono">
        <Link to="/" className="hover:text-gray-300 transition">Home</Link>
        <a href="#features" className="hover:text-gray-300 transition">Features</a>
        <Link to="/chat" className="hover:text-gray-300 transition">Try App</Link>
      </div>

      {/* ----- MOBILE MENU BUTTON ----- */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setOpen(!open)}
      >
        {open ? <FiX /> : <FiMenu />}
      </button>

      {/* ----- MOBILE DROPDOWN MENU ----- */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-neutral-900 border-b border-neutral-700 transform transition-all duration-300 overflow-hidden
          ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex flex-col p-6 gap-4 text-sm font-mono">

          <Link
            to="/"
            className="hover:text-gray-300 transition"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <a
            href="#features"
            className="hover:text-gray-300 transition"
            onClick={() => setOpen(false)}
          >
            Features
          </a>

          <Link
            to="/chat"
            className="hover:text-gray-300 transition"
            onClick={() => setOpen(false)}
          >
            Try App
          </Link>

        </div>
      </div>
    </nav>
  );
}