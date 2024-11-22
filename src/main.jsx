import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Layout from './Layout';
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import Home from './Components/Home.jsx';
import About from './Components/About.jsx';
import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';
import SellWithUs from './Components/SellWithUs.jsx';
import Feeds from './Components/Feeds.jsx';
import PartnerWithUs from './Components/PartnerWithUs.jsx';
import JoinUs from './Components/JoinUs.jsx';
import AdvancedSearch from './Components/AdvancedSearch.jsx';
import BrowseCars from './Components/BrowseCars.jsx';
import Contact from './Components/Contact.jsx';
import ProtectedRoute from './Components/ProtectedRoute';  // Import the ProtectedRoute
import Maintenance from './Components/Maintenance.jsx';
import InsuranceOptions from './Components/InsuranceOptions.jsx';
import ProfilePage from './Components/ProfilePage.jsx';
import AdminLogin from './Components/AdminLogin.jsx';
import AdminPage from './Components/AdminPage.jsx';
import Purchase from './Components/Purchase.jsx';
import RegisterVehicle from './Components/RegisterVehicle.jsx';

// Simulate authentication status
const isAuthenticated = true; // Set this to true if the user is authenticated

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="About" element={<About />} />
      <Route path="Login" element={<Login />} />
      <Route path="AdminLogin" element={<AdminLogin />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="Maintenance" element={<Maintenance />} />
      <Route path="seller" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={SellWithUs} />} />
      <Route path="feed" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={Feeds} />} />
      <Route path="partner" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={PartnerWithUs} />} />
      <Route path="join" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={JoinUs} />} />
      <Route path="InsuranceOptions" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={InsuranceOptions} />} />
      <Route path="AdvanceSearch" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdvancedSearch} />} />
      <Route path="profilepage" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={ProfilePage} />} />
      <Route path="adminpage" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdminPage} />} />
      <Route path="purchase" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={Purchase} />} />
      <Route path="Browse" element={<BrowseCars />} />
      <Route path="Contact" element={<Contact />} />
      <Route path="register" element={<RegisterVehicle />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
