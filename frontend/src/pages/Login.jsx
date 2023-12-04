import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const Login = () => {
  const [formdata, setFormdata] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("catcherr", error);
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="p-10 pt-20">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-red-500"></div>
        </div>
      )}
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
      {error && (<p className="text-red-500">{error}</p>)}
    </div>
  );
};

export default Login;
