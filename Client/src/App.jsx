// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/useContext";

import Footer from "./components/footer/Footer";
import Home from "./Pages/Home/Home";
import SignUp from "./components/signUp/SignUp"
import Cars from "./components/Cars/Cars";
import Header from "./components/header/Header";
import Login from "./components/login/Login";


function App() {
  return (
    <AuthProvider>
      <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cars" element={<Cars />} />
        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>

  );
}

export default App;
