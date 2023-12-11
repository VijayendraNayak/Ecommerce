import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import Adminroute from "./components/Privateroute";
import AdminHeader from "./components/Header/AdminHeader";
import AdminHome from "./pages/Admin/AdminHome";
import AdminProduct from "./pages/Admin/AdminProduct";
import AdminProfile from "./pages/Admin/AdminProfile";
import AdminUser from "./pages/Admin/AdminUser";
import AdminOrder from "./pages/Admin/AdminOrder";

function MainApp() {
  const location = useLocation();
  const isAdminRoute = location.pathname.includes("admin");
  console.log(isAdminRoute)
  console.log(location.pathname)

  return (
    <div>
      {isAdminRoute ? <AdminHeader /> : <Header />}
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
          <Route path="admin/home" element={<AdminHome />} />
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
