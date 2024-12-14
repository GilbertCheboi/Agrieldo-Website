import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-amber-500">Agrieldo</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-amber-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-amber-500">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/features" className="hover:text-amber-500">
              Features
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-amber-500">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
