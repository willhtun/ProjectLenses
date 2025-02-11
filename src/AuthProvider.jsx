import React, { createContext, useContext, useState } from "react";
import { Buffer } from "buffer";
import axios from 'axios';
import config from '../configuration/prod.json';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userPassword, setUserPassword] = useState(null);
  const login = async(username, password) => {
    let encodedUserPassword = Buffer.from(username + ":" + password).toString('base64')
    let res = await axios.post(config.lensesBackendUrl + "/v1/authenticate", null, {
      headers: {
        'Authorization': encodedUserPassword
      }
    })

    if (res.status === 200) {
      setUserPassword(encodedUserPassword);
      return true
    } else {
      return false
    }
  };
  const logout = () => {
    setUserPassword(null);
  };
  const getUserPassword = () => {
    return userPassword
  }
  const isAuthenticated = !!userPassword;
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getUserPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};