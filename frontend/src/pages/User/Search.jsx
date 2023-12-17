import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [searchproducts, setSearchproducts] = useState(0);
  const [sidebardata, setSidebardata] = useState({
    name: "",
    category: "all",
    price: "all",
    ratings: "all",
    sort: "created_at",
    order: "desc",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const URLParams = new URLSearchParams();
    URLParams.set("category", sidebardata.category);
    URLParams.set("price", sidebardata.price);
    URLParams.set("ratings", sidebardata.ratings);
    const searchQuery = URLParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch("/api/product/getallproducts");
        const result = await res.json();

        if (result.success === true) {
          setLoading(false);
          setError(false);
          setProducts(result.product);
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

  const handleViewMoreClick = () => {
    // Increase the visible products by, for example, 9 more
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 8);
  };

  const handleChange = (e) => {
    setSidebardata({ ...sidebardata, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const namefromurl = urlParams.get("name");
    const categoryfromurl = urlParams.get("category");
    const ratingsfromurl = urlParams.get("ratings");
    const pricefromurl = urlParams.get("price");

    if (namefromurl || categoryfromurl || ratingsfromurl || pricefromurl) {
      setSidebardata({
        category: categoryfromurl || "all",
        name: namefromurl || " ",
        ratings: ratingsfromurl || "all",
        price: pricefromurl || "all",
      });
    }

    const searchdata = async () => {
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/product/get?${searchQuery}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setProducts(data.products);
      console.log(products);
    };
    searchdata();
  }, [location.search]);

  return (
    <div className="pt-28 flex gap-2">
      <div className="w-3/12 flex flex-col gap-4">
        <p className="text-2xl text-red-500 text-center font-semibold pb-8">
          Filters
        </p>
        <div className="flex flex-col gap-4 justify center px-4">
          <div className="flex flex-col">
            <label className="font-semibold"> Select category:</label>
            <select
              id="category"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="Home and Kitchen">Home and Kitchen</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Sports and Outdoors">Sports and Outdoors</option>
              <option value="Beauty and Personal">Beauty and Personal</option>
              <option value="Skincare">Skincare</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold"> Select Ratings:</label>

            <select
              id="ratings"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="1">above 1</option>
              <option value="2">above 2</option>
              <option value="3">above 3</option>
              <option value="4">above 4</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold"> Select Price range:</label>
            <select
              id="price"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="500">Below 500</option>
              <option value="1000">500-1k</option>
              <option value="2000">1k-2k</option>
              <option value="3000">2k-3k</option>
              <option value="5000">3k-5k</option>
              <option value="10000">5k-10k</option>
              <option value="10000">above 10k</option>
            </select>
          </div>
          <button
            className="bg-red-500 font-semibold text-xl text-white p-3 rounded-lg"
            onClick={handleSubmit}
          >
            Apply changes
          </button>
        </div>
      </div>
      <div className="w-8/12">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-red-500"></div>
          </div>
        )}
        <p className="text-5xl text-red-500 font-bold text-center">Products</p>
        <div className="p-6 flex flex-wrap justify-around gap-6">
          {products.slice(0, visibleProducts).map((product) => (
            <div
              key={product._id}
              className="border-2  justify-center flex flex-col rounded-lg border-red-500 w-60 h-96 hover:scale-110 hover:border-yellow-500 transition-transform duration-500"
            >
              <img
                className="rounded-lg w-full h-48 p-1"
                src={product.images[0]}
                alt="shirt"
              />
              <div className="p-2">
                <p className="font-semibold">Name: {product.name}</p>
                <p className="font-semibold">Price: {product.price}</p>
                <p className="font-semibold">Category: {product.category}</p>
                <p className="font-semibold">Ratings: {product.ratings}</p>
                <p className="font-semibold">Stock: {product.stock}</p>
              </div>
              <button className="p-2 mx-auto bg-red-500 text-white rounded-lg font-semibold">
                More details
              </button>
            </div>
          ))}
        </div>
        {products.length > visibleProducts && (
          <button
            onClick={handleViewMoreClick}
            className="bg-green-500 text-white font-semibold p-3 rounded-lg text-xl mx-auto mt-6 flex justify-center"
          >
            View More
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
