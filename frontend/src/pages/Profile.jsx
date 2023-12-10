import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import {
  updateStart,
  updateFailure,
  updateSuccess,
  signoutStart,
  signoutSuccess,
  signoutFailure,
} from "../Redux/User/userSlice";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {app} from "../firebase"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { FcPrevious } from "react-icons/fc";

const Profile = () => {
  const [formdata, setFormdata] = useState({});
  const [file, setFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileref = useRef(null);

  useEffect(() => {
    // Set the form data with initial values when currentUser changes
    setFormdata({
      name: currentUser?.name || "", // Use optional chaining here
      email: currentUser?.email || "",
      avatar: currentUser?.avatar || "",
    });
  }, [currentUser]);

  useEffect(() => {
    if (file) {
      handlefileupload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handlefileupload=async(file)=>{
    const storage=getStorage(app);
    const filename=new Date().getTime()+file.name 
    const storageref=ref(storage,filename)
    const uploadTask=uploadBytesResumable(storageref,file)
    
    uploadTask.on(
      "state_changed",
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((DownloadURL) => {
          setFormdata({ ...formdata, avatar: DownloadURL });
        });
      }
    );
  }

  const handleSubmit = async (e) => {
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
      dispatch(updateSuccess(data.user));
      navigate("/");
    } catch (error) {
      dispatch(updateFailure(error));
    }
  };

  const handlelogout = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch("/api/user/logout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutFailure(data.message));
        return;
      }
      dispatch(signoutSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signoutFailure(error));
    }
  };

  return (
    <div className=" flex sm:flex-row flex-col pt-28">
      <div className="flex-1 p-10 ">
        <div className="flex flex-col lg:flex-row gap-4 items-center ">
          <div className="">
            <input
              className="hidden"
              accept="image/.*"
              type="file"
              ref={fileref}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <img
              src={formdata?.avatar} // Use optional chaining here
              alt="profile image"
              className="w-44 h-56 rounded-lg no-repeat center object-cover"
              onClick={() => fileref.current.click()}
            />
          </div>
          <div className=" flex flex-col gap-4">
            <form className="flex flex-col gap-4 w-80">
              <input
                type="text"
                placeholder="Username"
                className="border p-3 rounded-lg"
                id="name"
                value={formdata?.name || ""} // Use optional chaining here
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-3 rounded-lg"
                id="email"
                value={formdata?.email || ""} // Use optional chaining here
                onChange={handleChange}
              />
            </form>
            <button
              className="bg-green-500 text-white p-3 rounded-lg font-semibold text-xl"
              onClick={handleSubmit}
            >
              Update Profile
            </button>
            <button
              className="bg-red-500 text-white flex flex-row p-3 justify-center items-center gap-2 rounded-lg font-semibold text-xl"
              onClick={handlelogout}
            >
              <IoLogOutOutline /> Logout
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1">My orders</div>
    </div>
  );
};

export default Profile;
