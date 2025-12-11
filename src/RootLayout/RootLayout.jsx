import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const RootLayout = () => {
    return (
      <div>
        <Navbar></Navbar>
        <div className='min-h-screen'>
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    );
};

export default RootLayout;