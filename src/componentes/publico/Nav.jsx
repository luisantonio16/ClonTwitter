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
                <ul>
                    <li>
                        <NavLink className= "nav-items " to="/login">
                            <i className="fa-solid fa-user"></i>
                            <span >Iniciar Seccion</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className= "nav-items " to="/registrarse">
                            <i className="fa-solid fa-users"></i>
                            <span >Registrarse</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
         </nav> 
        </>
    );    
}

export default Nav;