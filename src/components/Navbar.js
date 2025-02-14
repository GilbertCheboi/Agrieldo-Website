import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("accessToken"));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for authentication change events
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem("accessToken"));
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

    // Dispatch event to update navbar immediately
    window.dispatchEvent(new Event("authChanged"));

    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-amber-500">Agrieldo</h1>
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="text-amber-500 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <ul className={`lg:flex space-x-4 ${isOpen ? "block" : "hidden"} lg:block list-none`}>
          {!isAuthenticated ? (
            <>
              <li><Link to="/" className="hover:text-amber-500">Home</Link></li>
              <li><Link to="/about" className="hover:text-amber-500">About Us</Link></li>
              <li><Link to="/features" className="hover:text-amber-500">Features</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500">Contact</Link></li>
              <li><Link to="/login" className="hover:text-amber-500">Login</Link></li>
              <li><Link to="/signup" className="hover:text-amber-500">Sign-up</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/dashboard" className="hover:text-amber-500">Dashboard</Link></li>
              <li><Link to="/feed-management" className="hover:text-amber-500">Feed Management</Link></li>
              <li><Link to="/auction" className="hover:text-amber-500">Market/Auction</Link></li>

              
              

              {/* Account Dropdown with Fix */}
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
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-600">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings" className="block px-4 py-2 hover:bg-gray-600">
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
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
