import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { registerUser, loginUser } from "../Services/productService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const saveAuth = (jwt, userData) => {
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(jwt);
    setUser(userData);
  };

  const register = async (username, email, password) => {
    try {
      const res = await registerUser(username, email, password);
      saveAuth(res.data.jwt, res.data.user);
      toast.success("Account created successfully 🎉");
      return true;
    } catch (err) {
      const message =
        err.response?.data?.error?.message || "Something went wrong during registration";
      toast.error(message);
      return false;
    }
  };

  const login = async (identifier, password) => {
    try {
      const res = await loginUser(identifier, password);
      saveAuth(res.data.jwt, res.data.user);
      toast.success(`Welcome back, ${res.data.user.username} 👋`);
      return true;
    } catch (err) {
      const message =
        err.response?.data?.error?.message || "Wrong credentials, please try again.";
      toast.error(message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully 👋");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
