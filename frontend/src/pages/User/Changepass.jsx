import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Changepass = () => {
  const [showpassword, setShowpassword] = useState(false);
  const [showpassword1, setShowpassword1] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({});
  const navigate = useNavigate();

  const togglepass = () => {
    setShowpassword(!showpassword);
  };
  const togglepass1 = () => {
    setShowpassword1(!showpassword1);
  };
  const handleonchange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  console.log(formdata);

  const handlechangepass = async (e) => {
    e.preventDefault();
    try {
      console.log("here");
      setLoading(true);
      setError(null);
      const res = await fetch("/api/user/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setError(false);
      setLoading(false);
      setFormdata(data.user);
      navigate("/profile");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="pt-28 px-10">
      <p className="pb-10 text-center text-5xl font-semibold text-red-500">
        Change Password
      </p>
      <div className="flex flex-col justify-center border-2 border-red-500 max-w-lg mx-auto rounded-lg bg-red-50">
        <form className="flex flex-col gap-4 p-6">
          <div className="relative ">
            <input
              type={showpassword ? "text" : "password"}
              placeholder="Enter your old password here"
              id="oldpass"
              className=" p-3 border rounded-lg w-full"
              onChange={handleonchange}
            />
            <button
              type="button"
              onClick={togglepass}
              className="absolute top-1/4 right-2"
            >
              {!showpassword ? "👁️" : "🙈"}
            </button>
          </div>
          <div className="relative">
            <input
              type={showpassword1 ? "text" : "password"}
              placeholder="Enter your new password here"
              id="newpass"
              className="p-3 border rounded-lg w-full"
              onChange={handleonchange}
            />
            <button
              type="button"
              onClick={togglepass1}
              className="absolute top-1/4 right-2"
            >
              {!showpassword1 ? "👁️" : "🙈"}
            </button>
          </div>
          <button
            className="bg-green-500 text-center font-semibold p-3 text-white text-xl rounded-lg"
            onClick={handlechangepass}
          >
            {loading ? "Loading..." : "Update password"}
          </button>
        </form>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Changepass;
