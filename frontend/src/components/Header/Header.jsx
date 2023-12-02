import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ loading }) => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    // If not loading, adjust the visibility of the navbar based on scroll direction
    if (!loading) {
      setIsNavVisible(currentScrollPos < prevScrollPos || currentScrollPos < 100);
    }
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, loading]);

  return (
    <header
      className={`bg-red-100 fixed top-0 left-0 w-full z-10 transition-transform duration-300 transform ${
        isNavVisible ? "translateY(0)" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between p-3 max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-red-300">E</span>
            <span className="text-red-500">commerce</span>
          </h1>
        </Link>

        {/* Toggle button for small screens */}
        <button
          className="sm:hidden text-red-700 focus:outline-none"
          onClick={() => setIsNavVisible(!isNavVisible)}
        >
          ☰
        </button>

        {/* Navbar for medium and above screens */}
        <ul
          className={`flex gap-6 sm:flex lg:items-center ${
            isNavVisible ? "flex" : "hidden"
          }`}
        >
          <Link to="/">
            <li className="hover:underline text-red-700">Home</li>
          </Link>
          <Link to="/product">
            <li className="hover:underline text-red-700">Products</li>
          </Link>
          <Link to="/about">
            <li className="hover:underline text-red-700">About</li>
          </Link>
          <Link to="/contact">
            <li className="hover:underline text-red-700">Contact</li>
          </Link>
          <Link to="/login">
            <li className="hover:underline text-red-700">Sign in</li>
          </Link>
        </ul>

        {/* Search form */}
        <form className="bg-red-200 rounded-lg items-center px-3 hidden sm:flex">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-20 sm:w-48"
          />
          <FaSearch className="text-red-600"></FaSearch>
        </form>
      </div>
    </header>
  );
};

export default Header;
