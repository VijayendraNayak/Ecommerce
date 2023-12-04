import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ loading }) => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [navbar, setNavbar] = useState(false);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (!loading) {
      setIsNavVisible(
        currentScrollPos < prevScrollPos || currentScrollPos < 100
      );
    }
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setNavbar(false);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, loading]);

  const togglenavbar = () => {
    setNavbar(!navbar);
    console.log(navbar);
  };

  return (
    <header
      className={`bg-red-100 fixed top-0 left-0 w-full z-10 transition-transform duration-300 transform ${
        isNavVisible ? "translateY(0)" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between p-3 max-w-6xl w-full mx-auto">
        <Link to="/">
          <div className={`font-bold text-sm sm:text-xl sm:flex ${navbar? "hidden" :"flex"}`}>
            <span className="text-red-300">E</span>
            <span className="text-red-500">commerce</span>
          </div>
        </Link>
        <ul className={`lg:flex md:flex gap-6 lg:items-center `}>
          <Link to="/">
            <li className="hover:underline text-red-700 hidden sm:flex">
              Home
            </li>
          </Link>
          <Link to="/product">
            <li className="hover:underline text-red-700 hidden sm:flex">
              Products
            </li>
          </Link>
          <Link to="/about">
            <li className="hover:underline text-red-700 hidden sm:flex">
              About
            </li>
          </Link>
          <Link to="/contact">
            <li className="hover:underline text-red-700 hidden sm:flex">
              Contact
            </li>
          </Link>
          <Link to="/login">
            <li className="hover:underline text-red-700 hidden sm:flex">
              Sign in
            </li>
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
        <button
          className=" sm:hidden text-red-700 focus:outline-none"
          onClick={togglenavbar}
        >
          {navbar ? " " : "☰"}
        </button>
        {navbar && (
          <div className="w-full flex flex-col gap-6">
            <Link to="/">
              <h1 className="font-bold text-sm sm:text-xl sm:hidden">
                <span className="text-red-300">E</span>
                <span className="text-red-500">commerce</span>
              </h1>
            </Link>
            <ul className={`flex-col items-center gap-6 `}>
              <Link to="/">
                <li className="hover:underline text-red-700 sm:hidden">Home</li>
              </Link>
              <Link to="/product">
                <li className="hover:underline text-red-700 sm:hidden">
                  Products
                </li>
              </Link>
              <Link to="/about">
                <li className="hover:underline text-red-700 sm:hidden">
                  About
                </li>
              </Link>
              <Link to="/contact">
                <li className="hover:underline text-red-700 sm:hidden">
                  Contact
                </li>
              </Link>
              <Link to="/login">
                <li className="hover:underline text-red-700 sm:hidden">
                  Sign in
                </li>
              </Link>
            </ul>
            <form className=" flex px-3 bg-red-200 rounded-lg items-center justify-between sm:hidden">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent focus:outline-none sm:w-48"
              />
              <FaSearch className="text-red-600 "></FaSearch>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
