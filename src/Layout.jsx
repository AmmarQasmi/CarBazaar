import React from 'react';
import Header from './Components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow p-4 bg-gray-100 mt-16 sm:mt-24 md:mt-10 lg:mt-6 xl:mt-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
