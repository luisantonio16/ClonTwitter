import React, { useContext } from "react";
import authContext from "../contenidos/AuthProvider";

 const useAuth = ()=>{
    return useContext(authContext)
}

export default useAuth;