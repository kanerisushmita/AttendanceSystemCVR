import React from "react";
import { useNavigate } from "react-router-dom";


const AuthRoute = ({ Element, Role, endpoint }) => {
  const navigate = useNavigate()
  try {
    const authenticated  = JSON.parse(sessionStorage.getItem("user")).role === Role;
    return authenticated ? <Element/> : window.location.href = "/"+endpoint;
  }
  catch {
    window.location.href = "/"+endpoint;
  }

};

export default AuthRoute;