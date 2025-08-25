import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Slider from "./ Sidebar";
import { Badge } from "@mui/material";
import { useCart } from "./CartContext";

const Navbar = () => {
  const [userType, setUserType] = useState(localStorage.getItem("user_type"));

  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );

  const { cartCount } = useCart();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem("accessToken"));
      setUserType(localStorage.getItem("user_type"));
    };

    window.addEventListener("authChanged", handleAuthChange);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  const isMechanizationAgent = userType === "4";

  return (
    <div>
      {" "}
      {/* Added parent div to contain both navbar and content */}
      <nav className="bg-gray-800 text-white py-4 fixed w-full top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-500">Agrieldo</h1>
          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-amber-500 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <ul
            className={`lg:flex space-x-4 ${
              isOpen ? "block" : "hidden"
            } lg:block list-none`}
          >
            {!isAuthenticated ? (
              <>
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
                <li className="relative list-none group">
                  <div className="relative">
                    <button
                      className="hover:text-amber-500 focus:outline-none"
                      tabIndex="0"
                    >
                      Inventory
                    </button>

                    <ul className="absolute invisible opacity-0 group-focus-within:visible group-focus-within:opacity-100 transition-opacity duration-150 bg-white text-gray-800 shadow-md rounded mt-2 z-10 w-40 list-none">
                      <li>
                        <Link
                          to="/drug-store"
                          className="block px-4 py-2 hover:bg-amber-100"
                        >
                          Drug Store
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/feed-store"
                          className="block px-4 py-2 hover:bg-amber-100"
                        >
                          Feed Store
                        </Link>
                      </li>
                    </ul>
                  </div>
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
                <ul className="flex gap-6 items-center list-none">
                  <li>
                    <Link to="/login" className="hover:text-amber-500">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="hover:text-amber-500">
                      Sign-up
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className="hover:text-amber-500 flex items-center gap-1"
                    >
                      <Badge badgeContent={cartCount} color="primary">
                        <ShoppingCartIcon fontSize="small" />
                      </Badge>
                      Cart
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-amber-500">
                    Home
                  </Link>
                </li>
                {!isMechanizationAgent && (
                  <>
                    <li>
                      <Link to="/inventory" className="hover:text-amber-500">
                        Inventory
                      </Link>
                    </li>
                    <li>
                      <Link to="/auction" className="hover:text-amber-500">
                        Market/Auction
                      </Link>
                    </li>
                  </>
                )}

                {isMechanizationAgent && (
                  <li>
                    <Link
                      to="/my-applications"
                      className="hover:text-amber-500"
                    >
                      My Applications
                    </Link>
                  </li>
                )}

                {/* Account Dropdown */}
                <li
                  className="relative"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <button className="hover:text-amber-500 focus:outline-none">
                    Account
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute bg-gray-700 text-white mt-2 py-2 rounded shadow-lg w-40">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-600"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 hover:bg-gray-600"
                        >
                          Settings
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
                {!isMechanizationAgent && (
                  <li>
                    <Link
                      to="/cart"
                      className="hover:text-amber-500 flex items-center gap-1"
                    >
                      <Badge badgeContent={cartCount} color="primary">
                        <ShoppingCartIcon fontSize="small" />
                      </Badge>
                      Cart
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </nav>
      <div className="flex">
        {isAuthenticated && <Slider />}
        <div className={`${isAuthenticated ? "ml-64" : ""} flex-1 pt-16`}>
          {/* Main content goes here */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
