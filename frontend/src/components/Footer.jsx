import React from "react";
import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black text-white flex flex-col lg:flex-row justify-between px-20 mt-20">
      <div className="flex flex-col gap-2 p-6 items-center">
        <p className="font-semibold text-xl">Download our app on</p>
        <div className="flex flex-col w-40">
          <img
            className="h-16"
            src="https://imgs.search.brave.com/8bZRSYQlxbSaUf98uKUU4cmT0AUE7eVVs-Yd926_J5k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/YTkwMmRiZjdmOTY5/NTFjODI5MjI4NzUu/cG5n"
            alt="Playstore"
          />
          <img
            className="p-2"
            src="https://imgs.search.brave.com/3h6FqKpDTRP4yepYALOnG_2MDAgH_Hlpcdh2RK37pHg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8z/LzNjL0Rvd25sb2Fk/X29uX3RoZV9BcHBf/U3RvcmVfQmFkZ2Uu/c3Zn.svg"
            alt="Appstore"
          />
        </div>
      </div>
      <div className="p-6 flex flex-col gap-4 items-center">
        <p className="text-6xl font-bold text-red-500">Ecommerce</p>
        <p>Keep buying and growing...</p>
        <p>&copy; All rights reserved @ Ecommerce</p>
      </div>

      <div className="p-6 flex flex-col gap-4 items-center ">
        <p className="font-semibold text-xl">Follow us on</p>
        <Link
          className="flex items-center gap-2 font-semibold"
          to="youtube.com"
        >
          <FaYoutube className="text-red-500"></FaYoutube> Youtube
        </Link>
        <Link
          className="flex items-center gap-2 font-semibold"
          to="instagram.com"
        >
          <FaInstagram className="text-pink-500"></FaInstagram> Instagram
        </Link>
        <Link
          className="flex items-center gap-2 font-semibold"
          to="facebook.com"
        >
          <FaFacebook className="text-blue-500"></FaFacebook> Facebook
        </Link>
      </div>
    </div>
  );
};

export default Footer;
