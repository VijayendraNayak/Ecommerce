import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const AdminProduct = () => {
  const [length, setLength] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch("/api/product/admin/getallcount");
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      const len = data.length;
-      setLength(len);
    };
    fetchdata();
  }, []);

  const numberAnimation = useSpring({
    from: { number: 0 },
    to: { number: length },
    config: { duration: 1000 },
  });

  const handleonroleclick = async () => {
    navigate("/admin/findproduct");
  };
  const handleonfindclick = async () => {
    navigate("/admin/findproduct");
  };
  const handleondeleteclick = async () => {
    navigate("/admin/findproduct");
  };
  return (
    <div className="pt-24">
      <div className="flex flex-col">
        <div className="flex justify-center items-center py-40 gap-4">
          <animated.span className="text-8xl text-white bg-red-500 rounded-full p-8">
            {numberAnimation.number.to((val) => Math.floor(val))}
          </animated.span>
          <p className="text-6xl font-bold text-red-500">Number of Products</p>
        </div>
        <div className="text-red-500 text-5xl font-semibold flex justify-center underline pb-20">
          Functions
        </div>
        <div className="flex gap-4 justify-between px-12">
          <button
            className="bg-red-500 text-2xl font-semibold text-white p-4 rounded-full hover:opacity-75 hover:scale-105"
            onClick={handleonfindclick}
          >
            Find an Product
          </button>
          <button
            className="bg-red-500 text-2xl font-semibold text-white p-4 rounded-full hover:opacity-75 hover:scale-105"
            onClick={handleonroleclick}
          >
            Update a Product
          </button>
          <button
            className="bg-red-500 text-2xl font-semibold text-white p-4 rounded-full hover:opacity-75 hover:scale-105"
            onClick={handleondeleteclick}
          >
            Delete a Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
