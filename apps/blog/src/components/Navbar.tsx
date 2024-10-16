import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-pink-600 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-lg font-bold text-white">Blog</div>
        <div className="hidden space-x-4 md:flex">
          <a href="#" className="text-white hover:text-blue-300">
            Home
          </a>
          <a href="#" className="text-white hover:text-blue-300">
            About
          </a>
          <a href="#" className="text-white hover:text-blue-300">
            Insights
          </a>
          <a href="#" className="text-white hover:text-blue-300">
            Contact
          </a>
        </div>
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            {/* Icon for mobile menu can be added here */}
            &#9776;
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
