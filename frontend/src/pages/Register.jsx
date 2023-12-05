import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../redux/user/userSlice";

const Register = () => {
  const [formdata, setFormdata] = useState({});
  const [password, showPassword] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const togglepassword = () => {
    showPassword(!password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(registerStart());
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(registerFailure(data.message));
        return;
      }
      navigate("/login");
      dispatch(registerSuccess());
    } catch (error) {
      console.log("catcherr", error);
    }
  };

  return (
    <div className="pt-20 p-10">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-red-500"></div>
        </div>
      )}
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
          <div className="relative">
            <input
              type={password ? "password" : "text"}
              placeholder="Password"
              className="border p-3 rounded-lg pr-10 w-[245px] sm:w-[460px]"
              id="password"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={togglepassword}
              className="absolute top-1/2 right-2 transform -translate-y-1/2"
            >
              {password ? "👁️" : "🙈"}
            </button>
          </div>
          {/* Dropdown for user/admin selection */}
          <select
            id="role"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          >
            <option>Select Role</option>
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
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Register;
