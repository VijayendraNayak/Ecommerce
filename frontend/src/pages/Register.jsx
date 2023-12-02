import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formdata, setFormdata] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  console.log(formdata)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        return
      }
      navigate("/login");
    } catch (error) {
      console.log("catcherr", error);
    }
  };

  return (
    <div className="pt-20">
      <p className="text-5xl text-center font-semibold text-red-500 ">
        Register
      </p>
      <div className="flex flex-col mx-auto max-w-lg border-2 p-6 border-red-500 gap-4 bg-red-100 rounded-lg mt-12">
        <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="border p-3 rounded-lg"
            id="name"
            onChange={handleChange}
          />
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
          {/* Dropdown for user/admin selection */}
          <select
            id="role"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          >
            <option >Select Role</option>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </form>
        <button
          className="bg-red-500 text-white p-3 rounded-lg font-semibold text-xl"
          onClick={handleSubmit}
        >
          Register
        </button>
        <div className="flex justify-end">
          <Link to="/login">
            <span className="text-green-500 font-bold cursor-pointer">
              Already Signed In?
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
