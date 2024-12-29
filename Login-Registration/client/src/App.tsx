import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter,Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import './styles/general.css'
import Registration from "./component/Registration";


const App: React.FC = () => {
  
 
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/registration" element={<Registration/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
