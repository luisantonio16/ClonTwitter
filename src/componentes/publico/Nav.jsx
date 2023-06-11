import React from "react";
import { NavLink } from "react-router-dom";

function Nav(){
    return(
        <>
         <nav className="nav"> 
            <div className="nav-logo">
                <h2>Hodiee</h2>
            </div>
            <div className="nav-buttons">
                <NavLink className= "nav-items " to="/login">
                    <i className="fa-solid fa-user"></i>
                    <span>Iniciar Seccion</span>
                </NavLink>
                <NavLink className= "nav-items " to="/registrarse">
                    <i className="fa-solid fa-users"></i>
                    <span >Registrarse</span>
                </NavLink>
            </div>
         </nav> 
        </>
    );    
}

export default Nav;