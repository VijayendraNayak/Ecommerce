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
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<Login/>}/>
        <Route path="/sign-up" element={<Register/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/product" element={<Product/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}