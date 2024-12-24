import React, { useEffect, useState } from "react";

import style from "./cars.module.css";
import axios from "axios";
import Header from "../header/Header";
import Car from "./Car";

const Cars = () => {
  axios.defaults.withCredentials = true
  const [cars, setCars] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);  

  const [showForm, setShowForm] = useState(false);
  const [picture, setPicture] = useState("");
  const [typeCar, setTypeCar] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [kilometer, setKilometer] = useState("");
  const [test, setTest] = useState(false);
  const [dateTest, setDateTest] = useState("");
  const [MOT, setMOT] = useState(false);
  const [dateMOT, setDateMOT] = useState("");

  const handleTestChange = () => setTest((prevState) => !prevState);
  const handleMOTChange = () => setMOT((prevState) => !prevState);

  const carData = {
    picture,
    typeCar,
    model,
    color,
    carNumber,
    kilometer,
    test,
    dateTest,
    MOT,
    dateMOT,
  };

  const getCars = async () => {
    try {

      const response = await axios.get("http://localhost:3000/cars");

      console.log('rrrrrrrrrrr' ,response.data);
      
      setCars(response.data);
      setErrorMessage("");
      setIsError(false);


    } catch (error) {
      console.error(error);
      setIsError(true);
      setErrorMessage(error.response?.data?.message || "An unknown error occurred");


    }
  };

  useEffect(() => {
    getCars();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carData = {
      picture,
      typeCar,
      model,
      color,
      carNumber,
      kilometer,
      test,
      dateTest,
      MOT,
      dateMOT,
    };
  
    console.log("Car data to submit:", carData); 
    try {
   
      const response = await axios.post("http://localhost:3000/cars", carData);
      console.log("Response from server:", response.data);
      setCars((prevCars) => [...prevCars, response.data]);
      getCars();
      setShowForm(false); // Hide form after submitting
      setErrorMessage("");
      setIsError(false);


    } catch (error) {
      console.error("Error submitting car data:", error.response?.data);
      setIsError(true);
      setErrorMessage(error.response?.data?.message || "An unknown error occurred");


    }

  };



  return (
    <>
      <Header outUser setCars/>
      
      <div className={style.container}>
        <h1>Your Cars</h1>
        {isError && <p className={style.error}>{errorMessage}</p>}

        <div className={style.searchContainer}>
          <input
            type="text"
            placeholder="Search for a car..."
            className={style.input}
          />
          <i className={`bi bi-search ${style.searchIcon}`}></i>
        </div>
        <button className={style.addButton} onClick={() => setShowForm(true)}>
          Add a Car
        </button>
        <div className={style.carsList}>
          <div className={style.carsList}>
            {cars.map((car, index) => {
              return (
                <Car getCars={()=>getCars()}
                  key={index}
                  picture={car.picture}
                  typeCar={car.typeCar}
                  model={car.model}
                  color={car.color}
                  carNumber={car.carNumber}
                  kilometer={car.kilometer}
                  test={car.test}
                  MOT={car.MOT}
                />
              )
            })}
          </div>
        </div>

        {showForm && (
          <form className={style.form} onSubmit={handleSubmit}>
            <h2>Add New Car</h2>
            <div className={style.inputGroup}>
              <input
                className={style.input}
                placeholder="Car picture URL"
                onChange={(e) => setPicture(e.target.value)}
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="carType" className={style.label}>
                Car Type
              </label>
              <select
                id="carType"
                className={style.input}
                value={typeCar}
                onChange={(e) => setTypeCar(e.target.value)}
              >
                <option value="">Select car type</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Coupe">Coupe</option>
                <option value="Convertible">Convertible</option>
                <option value="Truck">Truck</option>
                <option value="Van">Van</option>
              </select>
            </div>
            <div className={style.inputGroup}>
              <input
                className={style.input}
                placeholder="Car model"
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div className={style.inputGroup}>
              <input
                className={style.input}
                placeholder="Car color"
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className={style.inputGroup}>
              <input
                className={style.input}
                placeholder="Car number"
                onChange={(e) => setCarNumber(e.target.value)}
              />
            </div>
            <div className={style.inputGroup}>
              <input
                className={style.input}
                placeholder="Kilometers"
                onChange={(e) => setKilometer(e.target.value)}
              />
            </div>

            <div className={style.checkboxGroup}>
              <label>
                <input
                  type="checkbox"
                  checked={test}
                  onChange={handleTestChange}
                />
                Technical Inspection Passed
              </label>
              {test && (
                <input
                  className={style.input}
                  placeholder="Date of inspection"
                  type="date"
                  onChange={(e) => setDateTest(e.target.value)}
                />
              )}
            </div>

            <div className={style.checkboxGroup}>
              <label>
                <input
                  type="checkbox"
                  checked={MOT}
                  onChange={handleMOTChange}
                />
                MOT Passed
              </label>
              {MOT && (
                <input
                  className={style.input}
                  placeholder="MOT Date"
                  type="date"
                  onChange={(e) => setDateMOT(e.target.value)}
                />
              )}
            </div>

            <button type="submit" className={style.submitButton}>
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Cars;
