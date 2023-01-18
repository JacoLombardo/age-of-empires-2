// 1. Import hook
import { createContext, useEffect, useState } from "react";
import { auth } from "../config";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// 2. Create Context / Store

export const AuthContext = createContext();

// 3. Create provider
export const AuthContextProvider = (props) => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const redirectTo = useNavigate();

  const register = async (email, password) => {
    console.log("email, password", email, password);
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log("userCredentials :>> ", userCredentials);
      redirectTo("/");

    } catch (error) {
      console.log("register error", error);
      setError(error.code);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      console.log("userCredentials :>> ", userCredentials);
      redirectTo("/");

    } catch (error) {
      console.log("login error", error);
      setError(error.code);
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
        redirectTo("/");
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkIfUserIsLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is logged in");
        setUser(user);
        setLoading(false);

      } else {
        console.log("user is NOT logged in");
        setUser(null);
        setLoading(true);
      }
    });
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  // 4. Move state and function

  return (
    <AuthContext.Provider value={{ user, setUser, register, login, logout, error, setError, loading }}>{props.children}</AuthContext.Provider>
  );
};
