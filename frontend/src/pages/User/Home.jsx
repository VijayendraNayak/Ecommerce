import React, { useEffect, useState, Fragment, useRef } from "react";
import { MdOutlineMouse } from "react-icons/md";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [hasEffectRun, setHasEffectRun] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const featuredProductsRef = useRef(null);

  useEffect(() => {
    if (!hasEffectRun) {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          setError(false);
          const res = await fetch("/api/product/getallproducts");
          const result = await res.json();

          if (result.success === true) {
            // Introduce a delay of 2000 milliseconds (2 seconds)
            setTimeout(() => {
              setLoading(false);
              setError(false);
              setProducts(result.product);
            }, 1000);
          } else {
            setLoading(false);
            setError(true);
          }
        } catch (error) {
          setLoading(false);
          setError(true);
          console.error("Error fetching products:", error);
        }
      };

      fetchProducts();
      setHasEffectRun(true);
    }
  }, [hasEffectRun]);

  const scrollToFeaturedProducts = () => {
    featuredProductsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Fragment>
      <Header loading={loading}/>
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-red-500"></div>
        </div>
      )}
      <div className="flex flex-col items-center p-6 pt-32 gap-10 ">
        <div>
          <p className="text-red-500 font-bold lg:text-6xl text-4xl ">
            Welcome to
          </p>
          <p className="text-red-500 font-bold lg:text-6xl text-4xl ">
            Ecommerce
          </p>
        </div>
        <p className="text-red-300 font-semibold lg:text-4xl text-2xl ">
          FIND AMAZING PRODUCTS
        </p>
        <button
          className="flex items-center bg-red-200 p-2 rounded-lg px-10 border-2 border-red-500 hover:scale-110"
          onClick={scrollToFeaturedProducts}
        >
          Scroll <MdOutlineMouse />
        </button>
      </div>

      <div className="flex flex-col gap-4" ref={featuredProductsRef}>
        <p className="text-center text-5xl font-semibold underline pt-10">
          Featured Products
        </p>
        <div className="p-6 flex flex-wrap justify-around gap-6">
          {products &&
            products.slice(0, 7).map((product) => (
              <div
                key={product._id}
                className="border-2  justify-center flex flex-col rounded-lg border-red-500 w-64 h-96 hover:scale-110 hover:border-yellow-500 transition-transform duration-500"
              >
                <img
                  className="rounded-lg w-full h-48 p-1"
                  src={product.images[0]}
                  alt="shirt"
                />
                <div className="p-2">
                <p className="font-semibold">Name:{product.name}</p>
                <p className="font-semibold">Price:{product.price}</p>
                <p className="font-semibold">Category:{product.category}</p>
                <p className="font-semibold">Ratings:{product.ratings}</p>
                <p className="font-semibold">Stock:{product.stock}</p>
                </div>
                <button className="p-2 mx-auto bg-red-500 text-white rounded-lg font-semibold">More details</button>
              </div>
            ))}
        </div>
      </div>
      <Link to="/search" className="flex justify-center">
        <button className="bg-green-500 text-white font-semibold  p-3 rounded-lg text-xl">View more products...</button>
      </Link>
    </Fragment>
  );
};

export default Home;
