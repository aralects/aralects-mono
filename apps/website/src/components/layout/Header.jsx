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
    <header
      className={`fixed left-2 right-2 top-2 z-50 flex items-center ${
        isMobileMenuOpen && "rounded-none"
      }`}
    >
      <div className="flex w-full items-center justify-between rounded-full bg-white/70 px-5 py-3 shadow-md backdrop-blur 2xl:container 2xl:mx-auto">
        {/* Logo */}
        <a className="flex items-center" href="/">
          <img src="/svg/logo.svg" alt="logo" className="h-10" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
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
              data-active={activeLink === href}
              onClick={() => handleSetActive(href)}
              className={`SpaceGrotesk hover:text-glow data-[active=true]:text-glow text-[#676767] transition-all hover:text-[#3a2363] data-[active=true]:font-medium data-[active=true]:text-[#3a2363]`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-[#676767] md:hidden"
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
        <nav className="bg-white shadow-lg md:hidden">
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
                  className={`font-SpaceGrotesk block font-medium text-[#676767] ${
                    activeLink === href
                      ? "text-glow font-semibold text-[#3a2363]"
                      : ""
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
  );
};

export default Header;
