import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../Components/Aside/Aside';

const DashboardLayout = () => {
    return (
      <div className='flex '>
        <aside className=''>
          <Aside></Aside>
        </aside>
        <main className='flex-1 p-4'>
          <Outlet></Outlet>
        </main>
      </div>
    );
};

export default DashboardLayout;