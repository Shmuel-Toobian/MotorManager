import React from "react";
import style from "./car.module.css"; 
import axios from "axios"; 


const Car = ({ picture, typeCar, model, color, carNumber, kilometer, test, MOT, getCars }) => {

  const deleteCar = async(req, res)=>{
    try {  
      console.log(carNumber)    
      const response = await axios.delete(`http://localhost:3000/cars/${carNumber}`);
      getCars()
      console.log(res);
    } catch (error) {
      
    }
  }
  return (
    <div className={style.carItem}>
      <img src={picture} alt={`${typeCar} ${model}`} className={style.carImage} />
      <div>
        <h3>{typeCar} - {model}</h3>
        <p>Color: {color}</p>
        <p>Kilometers: {kilometer}</p>
        <p>Car Number: {carNumber}</p>
        <p>Technical Inspection: {test ? "Passed" : "Not Passed"}</p>     
        <p>MOT: {MOT ? "Passed" : "Not Passed"}</p>
      </div>
      <button onClick={deleteCar} className={style.delete}>Delete Car</button>
    </div>
  );
};

export default Car;