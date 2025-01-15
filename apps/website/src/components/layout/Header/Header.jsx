import React, { useState, useEffect } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    // Set active link based on the current path
    setActiveLink(window.location.pathname);
  }, []);

  const handleSetActive = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="w-full  bg-transparent z-50 relative m-auto flex justify-center">
      <header
        className={`fixed z-30 top-2 min-w-screen header mx-auto w-screen bg-white rounded-full shadow-md ${
          isMobileMenuOpen && "rounded-none"
        }`}
      >
        <div className="flex justify-between items-center px-5 py-3">
          {/* Logo */}
          <a className="flex items-center" href="/">
            <img src="/images/logo.svg" alt="logo" className="h-10" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            {[
              { href: "/", label: "Home" },
              { href: "/demo", label: "Demo" },
              { href: "/blog", label: "Blog" },
              { href: "/contact", label: "Contact Us" },
              { href: "/careers", label: "Careers" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => handleSetActive(href)}
                className={`text-gray-600 SpaceGrotesk font-medium ${
                  activeLink === href
                    ? "font-semibold text-[#3a2363] text-glow shadow-2xl"
                    : ""
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-align-justify"
            >
              <path d="M3 12h18" />
              <path d="M3 18h18" />
              <path d="M3 6h18" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white shadow-lg">
            <ul className="flex flex-col space-y-4 px-5 py-3">
              {[
                { href: "/", label: "Home" },
                { href: "/demo", label: "Demo" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact Us" },
                { href: "/careers", label: "Careers" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => {
                      handleSetActive(href);
                      setIsMobileMenuOpen(false); // Close menu after selecting a link
                    }}
                    className={`text-gray-600 font-SpaceGrotesk font-medium block ${
                      activeLink === href ? "text-[#3a2363] text-glow font-semibold" : ""
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </div>
  );
};

export default Header;
