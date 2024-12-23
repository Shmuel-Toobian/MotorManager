import React from "react";
import style from "./header.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({outUser, setCars}) => {




  const deleteCookie = async () => {
    try {
      // הוסף את withCredentials: true כדי לשלוח את ה-cookie
      const response = await axios.post('http://localhost:3000/user/logout', {}, { withCredentials: true });
      console.log(response.data);  // הצגת התגובה שהתקבלה מהשרת
    } catch (error) {
      console.log('Error logging out:', error);
    }
  }
  
  const navigate = useNavigate();
  return (
    <header className={style.header}>
      <div className={style.navs}>
        <nav className={style.navItem} onClick={() => navigate("/login")}>
          Login
        </nav>
        <nav className={style.navItem} onClick={() => navigate("/signup")}>
          Signup
        </nav>
      </div>

      <div>
        {outUser && (
          <nav className={style.navOut} onClick={() => { 
            deleteCookie(); 
            navigate("/"); 
            // setCars([])
        }}>
            Signout
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
