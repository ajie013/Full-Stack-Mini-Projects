import React from "react";
import './style/Navigation.css'
import { NavLink } from "react-router-dom";

const Navigation: React.FC = () =>{
    return(
        <>
           <nav className="navigation-bar">
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}>Home</NavLink></li>
                    <li><NavLink to="/categories" className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}>Categories</NavLink></li>
                    <li><NavLink to="/recipe" className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}>Recipe</NavLink></li>
                </ul>
           </nav>
        </>
    )
};

export default Navigation