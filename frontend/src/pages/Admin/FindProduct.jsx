import React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const FindProduct = () => {
  const [productid, setProductid] = useState();
  const [formdata, setFormdata] = useState();
  const [found, setFound] = useState(false);
  const [remove, setRemove] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatecom, setUpdatecom] = useState(false);

  const handleclick = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/product/admin/getproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productid),
    });
    const data = await res.json();
    if (data.success === false) {
      console.log(data.message);
      setFound(false);
      return;
    }
    setFormdata(data.product);
    setFound(true);
  };

  const handleupdate = async (e) => {
    const res = await fetch("/api/product/admin/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productid),
    });
    const data = await res.json();
    if (data.success === false) {
        console.log(data.message)
      return;
    }
    setFormdata(data.user);
    setUpdatecom(true);
  };
  const handledeleteclick = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/product/admin/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productid),
    });
    const data = await res.json();
    if (data.success === false) {
      return;
    }
    setFound(false);
    setRemove(true);
  };
  return (
    <div className="pt-28 h-screen mb-20">
      <div className="">
        <form className=" flex p-3 bg-red-200 rounded-full items-center justify-between max-w-lg mx-auto ">
          <input
            type="text"
            placeholder="Enter the Id of the Product"
            className="bg-transparent focus:outline-none "
            id="id"
            onChange={(e) => {
              setProductid({ ...productid, [e.target.id]: e.target.value });
            }}
          />
          <button onClick={handleclick}>
            <FaSearch className="text-red-600 "></FaSearch>
          </button>
        </form>
        <div className="pt-4">
          {remove && (
            <p className="text-red-500 font-semibold text-5xl text-center">
              Product deleted Successfully!!!!
            </p>
          )}
          {updatecom && (
            <p className="text-green-500 font-semibold text-5xl text-center">
              Product Updated Successfully!!!!
            </p>
          )}
          {found && formdata && (
            <div className="text-center flex flex-col gap-4">
              <p className="text-green-500 text-2xl font-semibold">
                Product Found Successfully!!!!!!!!
              </p>
              <p className="text-red-500 text-5xl font-semibold underline">
                Product Details
              </p>
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-center p-8 bg-red-100 mx-auto rounded-lg">
                <img
                  src={formdata?.avatar}
                  alt="profile image"
                  className="w-44 h-60 rounded-lg no-repeat center object-cover"
                />
                <div className=" flex flex-col gap-4">
                  <div className="flex flex-col  items-center gap-4">
                    <div className="flex flex-row gap-2 items-center">
                      <label>Name:</label>
                      <input
                        type="text"
                        placeholder="Name"
                        className="bg-white p-2 rounded-lg focus:outline-none sm:w-48"
                        id="name"
                        defaultValue={formdata.name}
                        onChange={(e) => {
                          setProductid({
                            ...productid,
                            [e.target.id]: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <label> Price:</label>

                      <input
                        type="text"
                        placeholder="Price"
                        className="bg-white p-2 rounded-lg focus:outline-none sm:w-48"
                        id="price"
                        defaultValue={formdata.price}
                        onChange={(e) => {
                          setProductid({
                            ...productid,
                            [e.target.id]: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <label>Category:</label>
                      <input
                        type="text"
                        placeholder="Category"
                        className="bg-white p-2 rounded-lg focus:outline-none sm:w-48"
                        id="category"
                        defaultValue={formdata.category}
                        onChange={(e) => {
                          setProductid({
                            ...productid,
                            [e.target.id]: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <label>Stock</label>
                      <input
                        type="text"
                        placeholder="Stock"
                        className="bg-white p-2 rounded-lg focus:outline-none sm:w-48"
                        id="stock"
                        defaultValue={formdata.stock}
                        onChange={(e) => {
                          setProductid({
                            ...productid,
                            [e.target.id]: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <label>Ratings:</label>
                      <input
                        type="text"
                        placeholder="Ratings"
                        className="bg-white p-2 rounded-lg focus:outline-none sm:w-48"
                        id="ratings"
                        defaultValue={formdata.ratings}
                        onChange={(e) => {
                          setProductid({
                            ...productid,
                            [e.target.id]: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                      className={`p-3 bg-green-500 rounded-lg text-white text-xl font-semibold hover:opacity-90 ${
                        formdata.role === "admin" || update ? "hidden" : "flex"
                      }`}
                      type="button"
                      onClick={handleupdate}
                    >
                      Update Product
                    </button>
                    <button
                      className={`p-3 bg-red-500 rounded-lg text-white text-xl font-semibold hover:opacity-90 ${
                        formdata.role === "admin" ? "hidden" : "flex"
                      }`}
                      type="button"
                      onClick={handledeleteclick}
                    >
                      Delete Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindProduct;
