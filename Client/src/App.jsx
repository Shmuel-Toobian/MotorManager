
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Components/Login'
import SignUp from './Components/SignUp'

import { userContext } from './Context/userContext'
import { useState } from 'react'
import Cars from './Components/Cars/Cars'
import Home from './Pages/Home/Home'

function App() {

  const [user, setUser] = useState('')

  return (
    <>
    <userContext.Provider value={{user, setUser}}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<Home/>}/>
      <Route path='/signup' element= {<SignUp/>}/>
      <Route path='/login' element= {<Login/>}/>
      <Route path='/cars' element= {<Cars/>}/>
    </Routes>

    </BrowserRouter>
    </userContext.Provider>
    
 
    </>
  )
}

export default App
