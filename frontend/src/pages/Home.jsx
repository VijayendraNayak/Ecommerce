import React, { useEffect, useState, Fragment } from "react";
import { MdOutlineMouse } from "react-icons/md";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [hasEffectRun, setHasEffectRun] = useState(false);

  useEffect(() => {
    if (!hasEffectRun) {
      const fetchProducts = async () => {
        try {
          const res = await fetch("/api/product/getallproducts");
          const result = await res.json();

          if (result.success === true) {
            setProducts(result.product); // Assuming products is an array in the result
          } else {
            // Handle the case when success is not true
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          // Handle the error
        }
      };

      fetchProducts();
      setHasEffectRun(true);
    }
  }, [hasEffectRun]);

  return (
    <Fragment>
      <div className="flex flex-col items-center p-6 pt-10 gap-10 ">
        <p className="text-red-500 font-bold text-6xl ">Welcome to Ecommerce</p>
        <p className="text-red-300 font-semibold text-4xl ">
          FIND AMAZING PRODUCTS
        </p>
        <button className="flex items-center bg-red-200 p-2 rounded-lg px-10 border-2 border-red-500 hover:scale-110">
          Scroll <MdOutlineMouse />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-center font-semibold underline pt-10">
          Featured Products
        </p>
        <div className=" p-6 flex flex-wrap px-32 justify-around ">
          {products &&
            products.map((product) => (
              <div
                key={product._id}
                className="border-2 rounded-lg border-red-500 w-60 h-96"
              >
                <img className="rounded-lg w-full h-48" src={product.images[0]} alt="shirt"  />
                <p>Name:{product.name}</p>
                <p>Stock:{product.stock}</p>

              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
