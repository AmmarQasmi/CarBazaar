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
import PartnerWithUs from './Components/PartnerWithUs.jsx';
import JoinUs from './Components/JoinUs.jsx';
import FinanceOptions from './Components/FinanceOptions.jsx';
import AdvancedSearch from './Components/AdvancedSearch.jsx';
import BrowseCars from './Components/BrowseCars.jsx';
import Contact from './Components/Contact.jsx';
import ProtectedRoute from './Components/ProtectedRoute';  // Import the ProtectedRoute

// Simulate authentication status
const isAuthenticated = false; // Set this to true if the user is authenticated

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="Home" element={<Home />} />
      <Route path="About" element={<About />} />
      <Route path="Login" element={<Login />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="seller" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={SellWithUs} />} />
      <Route path="partner" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={PartnerWithUs} />} />
      <Route path="join" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={JoinUs} />} />
      <Route path="FinanceOption" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={FinanceOptions} />} />
      <Route path="AdvanceSearch" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AdvancedSearch} />} />
      <Route path="Browse" element={<BrowseCars />} />
      <Route path="Contact" element={<Contact />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
