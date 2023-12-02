import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formdata, setFormdata] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  console.log(formdata);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        return;
      }
      navigate("/");
    } catch (error) {
      console.log("catcherr", error);
    }
  };

  return (
    <div className="pt-20">
      <p className="text-5xl text-center font-semibold text-red-500 ">Login </p>
      <div className="flex flex-col mx-auto max-w-lg border-2 p-6 border-red-500 gap-4 bg-red-100 rounded-lg mt-12">
        <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />
        </form>
        <button
          className="bg-red-500 text-white p-3 rounded-lg font-semibold text-xl"
          onClick={handleSubmit}
        >
          Login
        </button>
        <div className="flex justify-end">
          <Link to="/register">
            <span className="text-green-500 font-bold cursor-pointer">
              New User?
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
