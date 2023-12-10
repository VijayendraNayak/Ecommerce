import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Changepass from "./pages/Changepass";
import Privateroute from "./components/Privateroute";
import Adminroute from "./components/Adminroute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home route without the Header */}
        <Route path="/" element={<Home />} />

        {/* Routes with the Header */}
        <Route
          path="/*"
          element={
            <div>
              <Header />
              <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="about" element={<About />} />
                <Route element={<Privateroute/>}>
                <Route path="profile" element={<Profile />} />
                <Route path="changepassword" element={<Changepass />} />
                </Route>
                <Route element={<Adminroute/>}>
                
                </Route>
                <Route path="contact" element={<Contact />} />
                <Route path="product" element={<Product />} />
              </Routes>
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
