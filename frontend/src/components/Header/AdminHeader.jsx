import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminHeader = ({ loading }) => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [navbar, setNavbar] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

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
    <AdminHeader
      className={`bg-red-100 fixed top-0 left-0 w-full z-10 transition-transform duration-300 transform ${
        isNavVisible ? "translateY(0)" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between p-3 max-w-6xl w-full mx-auto items-center">
        <Link to="/admin/">
          <div
            className={`font-bold text-sm sm:text-xl sm:flex ${
              navbar ? "hidden" : "flex"
            }`}
          >
            <span className="text-red-300 text-3xl">E</span>
            <span className="text-red-500 text-3xl">commerce</span>
          </div>
        </Link>
        <ul className={`lg:flex md:flex gap-6 lg:items-center `}>
          <Link to="/admin/">
            <li className="hover:underline text-red-700 hidden sm:flex">
              Home
            </li>
          </Link>
          <Link to="/admin/users">
            <li className="hover:underline text-red-700 hidden sm:flex">
              Users
            </li>
          </Link>
          <Link to="/admin/products">
            <li className="hover:underline text-red-700 hidden sm:flex">
              Products
            </li>
          </Link>
          <Link to="/admin/orders">
            <li className="hover:underline text-red-700 hidden sm:flex">
              Orders
            </li>
          </Link>
          <Link to="/admin/profile">
            <li className="hover:underline text-red-700 hidden sm:flex">
               {currentUser.name}
            </li>
          </Link>
        </ul>
        {/* Search form */}
        <form className="bg-red-200 rounded-lg items-center p-3 hidden sm:flex">
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
            <Link to="/admin/">
              <h1 className="font-bold text-sm sm:text-xl sm:hidden">
                <span className="text-red-300">E</span>
                <span className="text-red-500">commerce</span>
              </h1>
            </Link>
            <ul className={`flex-col items-center gap-6 `}>
              <Link to="/admin/">
                <li className="hover:underline text-red-700 sm:hidden">Home</li>
              </Link>
              <Link to="/admin/users">
                <li className="hover:underline text-red-700 sm:hidden">
                  Users
                </li>
              </Link>
              <Link to="/admin/products">
                <li className="hover:underline text-red-700 sm:hidden">
                  Products
                </li>
              </Link>
              <Link to="/orders">
                <li className="hover:underline text-red-700 sm:hidden">
                  Orders
                </li>
              </Link>
              <Link to="/admin/profile">
                <li className="hover:underline text-red-700 sm:hidden">
                  {currentUser.name}
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
    </AdminHeader>
  );
};

export default AdminHeader;
