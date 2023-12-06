import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { updateStart, updateFailure, updateSuccess } from "../Redux/User/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {use}

const Profile = () => {
  const [formdata, setFormdata] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Set the form data with initial values when currentUser changes
    setFormdata({
      name: currentUser?.name || "",  // Use optional chaining here
      email: currentUser?.email || "",
    });
  }, [currentUser]);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        return;
      }
      dispatch(updateSuccess());
      navigate("/login")
    } catch (error) {
      console.log("catcherr", error);
    }
  };

  return (
    <div className="flex pt-28">
      <div className="flex-1 p-10 ">
        <div className="flex gap-4 items-center ">
          <div className="">
            <img
              src={currentUser?.avatar}  // Use optional chaining here
              alt="profile image"
              className="w-44 h-56 rounded-lg"
            />
          </div>
          <div className=" flex flex-col gap-4">
            <form className="flex flex-col gap-4 w-80">
              <input
                type="text"
                placeholder="Username"
                className="border p-3 rounded-lg"
                id="name"
                value={formdata?.name || ""}  // Use optional chaining here
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-3 rounded-lg"
                id="email"
                value={formdata?.email || ""}  // Use optional chaining here
                onChange={handleChange}
              />
            </form>
            <button
              className="bg-green-500 text-white p-3 rounded-lg font-semibold text-xl"
              onClick={handleSubmit}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1">My orders</div>
    </div>
  );
};

export default Profile;