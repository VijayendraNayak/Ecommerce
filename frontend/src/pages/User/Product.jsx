import { useEffect, useState, Fragment, useRef } from "react";
const Product = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
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
  }, []);

  return (
    <div className="pt-28">
      <p className="text-5xl text-red-500 font-bold text-center">Products</p>
      <div className="p-6 flex flex-wrap justify-around gap-6">
        {products &&
          products.map((product) => (
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
              <button className="p-2 mx-auto bg-red-500 text-white rounded-lg font-semibold">
                More details
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Product;
