import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet, useNavigation } from "react-router";
import Footer from "../Components/Footer";
import Loading from "../Components/Loading";

const AuthLayout = () => {
  navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        {isLoading ? (
          <div className="min-h-screen flex justify-center items-center">
            <Loading></Loading>
          </div>
        ) : (
          <Outlet></Outlet>
        )}
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default AuthLayout;
