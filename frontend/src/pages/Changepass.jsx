import React, { useState } from "react";

const Changepass = () => {
  const [showpassword, setShowpassword] = useState(false);
  const [showpassword1, setShowpassword1] = useState(false);

  const togglepass = () => {
    setShowpassword(!showpassword);
  };
  const togglepass1 = () => {
    setShowpassword1(!showpassword1);
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
              type={showpassword?"text":"password"}
              placeholder="Enter your old password here"
              id="oldpass"
              className=" p-3 border rounded-lg w-full"
            />
            <button type="button" onClick={togglepass} className="absolute top-1/4 right-2">{!showpassword ?"👁️":"🙈" }</button>
          </div>
          <div className="relative">
            <input
              type={showpassword1?"text":"password"}
              placeholder="Enter your new password here"
              id="newpass"
              className="p-3 border rounded-lg w-full"
            />
            <button type="button" onClick={togglepass1} className="absolute top-1/4 right-2">{!showpassword1 ?"👁️":"🙈" }</button>
          </div>
          <button className="bg-green-500 text-center font-semibold p-3 text-white text-xl rounded-lg">
            Update password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Changepass;
