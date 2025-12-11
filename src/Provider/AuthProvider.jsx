import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  const updateUser = (updateData) =>
    updateProfile(auth.currentUser, updateData);
  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const handleGoogleSignIn = () => signInWithPopup(auth, googleProvider);
  const logOut = () => signOut(auth);

  console.log(user);

  useEffect(() => {
    if (!user) return;
    axios 
      .get(`http://localhost:5000/users/role/${user?.email}`)
      .then((res) => {
        console.log(res.data.role);
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // console.log(currentUser);
    });
    return unsubscribe;
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    signIn,
    handleGoogleSignIn,
    logOut,
    loading,
    setLoading,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
