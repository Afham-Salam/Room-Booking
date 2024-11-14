import * as jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const navigate=useNavigate()
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;
  const decoded = jwtDecode(token);
  return decoded.role;
};  

export const logout = () => {
  localStorage.removeItem("token");
  navigate("/")
  
};
