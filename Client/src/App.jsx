// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/useContext";

import Footer from "./components/footer/Footer";
import Home from "./Pages/Home/Home";
import SignUp from "./Components/SignUp/SignUp"
import Cars from "./Components/Cars/Cars";
import Header from "./Components/header/Header";
import Login from "./Components/Login/Login";


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
