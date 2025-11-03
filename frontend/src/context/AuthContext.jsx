import { useState, createContext, useContext } from "react";
import { loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const signIn = async (userData) => {
    try {
      const res = await loginRequest(userData);
      setUser(res.data); 
      setIsAuthenticated(true);
      return true; 
    } catch (err) {
      setErrors(err.response?.data?.message || "Error al iniciar sesión");
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
