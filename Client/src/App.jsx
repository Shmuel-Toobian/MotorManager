// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/useContext";
import Login from "./components/Login";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./Pages/Home/Home";
import Signup from "./Components/SignUp";
import Cars from "./components/cars/Cars";

function App() {
  return (
    <AuthProvider>
      <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cars" element={<Cars />} />
        </Routes>
        <Footer/>

      </Router>
    </AuthProvider>
  );
}

export default App;
