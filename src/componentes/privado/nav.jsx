import React from "react";

function Nav(){
    return(
        <>
         <nav className="nav"> 
            <div className="nav-logo">
                <h2>Hodiee</h2>
            </div>
            <div className="nav-buttons">
                <a href="#">
                    <i className="fa-solid fa-home"></i>
                    <span className="nav-items">Inicio</span>
                </a>
                <a href="#">
                    <i className="fa-solid fa-users"></i>
                    <span className="nav-items">Registrarse</span>
                </a>
                <a href="#">
                    <i className="fa-solid fa-users"></i>
                    <span className="nav-items">Registrarse</span>
                </a>
                <a href="#">
                    <i className="fa-solid fa-users"></i>
                    <span className="nav-items">Registrarse</span>
                </a>
            </div>
           
         </nav> 
        </>
    );    
}

export default Nav;