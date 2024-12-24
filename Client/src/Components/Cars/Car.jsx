// import React from "react";
// import style from "./car.module.css"; 
// import axios from "axios"; 


// const Car = ({ picture, typeCar, model, color, carNumber, kilometer, test, MOT, getCars }) => {

//   const deleteCar = async(req, res)=>{
//     try {  
//       const response = await axios.delete(`http://localhost:3000/cars/${carNumber}`);
//       getCars()
//       console.log(res);
//     } catch (error) {
//       console.log(error);
      
      
//     }
//   }

  
//   const updateCar = async(req, res)=>{
//     try {  
//       const response = await axios.put(`http://localhost:3000/cars/${carNumber}`);
//       getCars()
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return (
//     <div className={style.carItem}>
//       <img src={picture} alt={`${typeCar} ${model}`} className={style.carImage} />
//       <div>
//         <h3>{typeCar} - {model}</h3>
//         <p>Color: {color}</p>
//         <p>Kilometers: {kilometer}</p>
//         <p>Car Number: {carNumber}</p>
//         <p>Technical Inspection: {test ? "Passed" : "Not Passed"}</p>     
//         <p>MOT: {MOT ? "Passed" : "Not Passed"}</p>
//       </div>
//       <button onClick={deleteCar} className={style.delete}>Delete Car</button>
//       <button onClick={updateCar} className={style.delete}>Update Car</button>
//     </div>
//   );
// };

// export default Car;




// import React, { useState } from "react";
// import style from "./car.module.css"; 
// import axios from "axios"; 

// const Car = ({ picture, typeCar, model, color, carNumber, kilometer, test, MOT, getCars }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedData, setUpdatedData] = useState({
//     picture: "",
//     typeCar: "",
//     model: "",
//     color: "",
//     kilometer: "",
//     test: null,
//     MOT: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setUpdatedData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleUpdate = async () => {
//     const finalData = {
//       picture: updatedData.picture || picture,
//       typeCar: updatedData.typeCar || typeCar,
//       model: updatedData.model || model,
//       color: updatedData.color || color,
//       kilometer: updatedData.kilometer || kilometer,
//       test: updatedData.test === null ? test : updatedData.test,
//       MOT: updatedData.MOT === null ? MOT : updatedData.MOT,
//     };

//     try {
//       await axios.put(`http://localhost:3000/cars/${carNumber}`, finalData);
//       getCars();
//       setIsEditing(false); // Exit edit mode
//     } catch (error) {
//       console.error("Error updating car:", error);
//     }
//   };

//   return (
//     <div className={style.carItem}>
//       {isEditing ? (
//         <form className={style.form}>
//           <input name="picture" value={updatedData.picture} onChange={handleChange} placeholder="Picture URL" />
//           <input name="typeCar" value={updatedData.typeCar} onChange={handleChange} placeholder="Type" />
//           <input name="model" value={updatedData.model} onChange={handleChange} placeholder="Model" />
//           <input name="color" value={updatedData.color} onChange={handleChange} placeholder="Color" />
//           <input name="kilometer" value={updatedData.kilometer} onChange={handleChange} placeholder="Kilometer" />
//           <label>
//             <input
//               type="checkbox"
//               name="test"
//               checked={updatedData.test === null ? test : updatedData.test}
//               onChange={handleChange}
//             />
//             Test Passed
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="MOT"
//               checked={updatedData.MOT === null ? MOT : updatedData.MOT}
//               onChange={handleChange}
//             />
//             MOT Passed
//           </label>
//           <button type="button" onClick={handleUpdate}>
//             Save
//           </button>
//           <button type="button" onClick={() => setIsEditing(false)}>
//             Cancel
//           </button>
//         </form>
//       ) : (
//         <>
//           <img src={picture} alt={`${typeCar} ${model}`} className={style.carImage} />
//           <div>
//             <h3>{typeCar} - {model}</h3>
//             <p>Color: {color}</p>
//             <p>Kilometers: {kilometer}</p>
//             <p>Car Number: {carNumber}</p>
//             <p>Technical Inspection: {test ? "Passed" : "Not Passed"}</p>
//             <p>MOT: {MOT ? "Passed" : "Not Passed"}</p>
//           </div>
//           <button onClick={() => setIsEditing(true)} className={style.edit}>
//             Edit Car
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Car;



import React, { useState } from "react";
import style from "./car.module.css";
import axios from "axios";

const Car = ({ picture, typeCar, model, color, carNumber, kilometer, test, MOT, getCars }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    picture: "",
    typeCar: "",
    model: "",
    color: "",
    kilometer: "",
    test: null,
    MOT: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    const finalData = {
      picture: updatedData.picture || picture,
      typeCar: updatedData.typeCar || typeCar,
      model: updatedData.model || model,
      color: updatedData.color || color,
      kilometer: updatedData.kilometer || kilometer,
      test: updatedData.test === null ? test : updatedData.test,
      MOT: updatedData.MOT === null ? MOT : updatedData.MOT,
    };

    try {
      await axios.put(`http://localhost:3000/cars/${carNumber}`, finalData);
      getCars();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/cars/${carNumber}`);
      getCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className={`${style.carItem} ${isExpanded ? style.expanded : ""}`} onClick={() => setIsExpanded(!isExpanded)}>
      <img src={picture} alt={`${typeCar} ${model}`} className={style.carImage} />
      <div>
        <h3>{typeCar} - {model}</h3>
        <p>Car Number: {carNumber}</p>
        {isExpanded && (
          <>
            <p>Color: {color}</p>
            <p>Kilometers: {kilometer}</p>
            <p>Technical Inspection: {test ? "Passed" : "Not Passed"}</p>
            <p>MOT: {MOT ? "Passed" : "Not Passed"}</p>
            <button className={style.delete} onClick={(e) => { e.stopPropagation(); handleDelete(); }}>
              Delete
            </button>
            <button className={style.edit} onClick={(e) => { e.stopPropagation(); setIsEditing(!isEditing); }}>
              {isEditing ? "Cancel Edit" : "Edit Car"}
            </button>
            {isEditing && (
              <form className={style.form} onClick={(e) => e.stopPropagation()}>
                <input name="picture" value={updatedData.picture} onChange={handleChange} placeholder="Picture URL" />
                <input name="typeCar" value={updatedData.typeCar} onChange={handleChange} placeholder="Type" />
                <input name="model" value={updatedData.model} onChange={handleChange} placeholder="Model" />
                <input name="color" value={updatedData.color} onChange={handleChange} placeholder="Color" />
                <input name="kilometer" value={updatedData.kilometer} onChange={handleChange} placeholder="Kilometer" />
                <label>
                  <input type="checkbox" name="test" checked={updatedData.test === null ? test : updatedData.test} onChange={handleChange} />
                  Test Passed
                </label>
                <label>
                  <input type="checkbox" name="MOT" checked={updatedData.MOT === null ? MOT : updatedData.MOT} onChange={handleChange} />
                  MOT Passed
                </label>
                <button type="button" onClick={handleUpdate}>
                  Save
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Car;
