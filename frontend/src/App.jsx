import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import About from "./pages/User/About";
import Home from "./pages/User/Home";
import Profile from "./pages/User/Profile";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Contact from "./pages/User/Contact";
import Product from "./pages/User/Product";
import Changepass from "./pages/User/Changepass";
import Privateroute from "./components/Privateroute";
import Adminroute from "./components/Adminroute";
import AdminHeader from "./components/Header/AdminHeader";
import AdminHome from "./pages/Admin/AdminHome";
import AdminProduct from "./pages/Admin/AdminProduct";
import AdminProfile from "./pages/Admin/AdminProfile";
import AdminUser from "./pages/Admin/AdminUser";
import AdminOrder from "./pages/Admin/AdminOrder";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "./redux/user/userSlice";

function MainApp() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Check if the user is an admin before dispatching signout action
      if (currentUser && currentUser.role === "admin") {
        dispatch(signoutSuccess());
        const confirmationMessage = "Are you sure you want to leave?";
        event.returnValue = confirmationMessage; // Standard for most browsers
        return confirmationMessage; // For some older browsers
      }
    };

    // Add the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentUser, dispatch]);
  return (
    <div>
      {currentUser && currentUser.role === "admin" ? (
        <AdminHeader />
      ) : (
        <Header />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route element={<Privateroute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="changepassword" element={<Changepass />} />
        </Route>
        <Route path="contact" element={<Contact />} />
        <Route path="product" element={<Product />} />
        <Route element={<Adminroute />}>
          <Route path="admin" element={<AdminHome />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/profile" element={<AdminProfile />} />
          <Route path="admin/user" element={<AdminUser />} />
          <Route path="admin/order" element={<AdminOrder />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}
