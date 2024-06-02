import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./Section/user/Login";
import AdminLogin from "./Section/Admin/Login";

import Otp from "./Section/user//Otp";
import Signup from "./Section/user/Signup/Signup";
import Forgot from "./Section/user/forgot/Forgot";
import Dashboard from "./Section/user/Dashboard";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Settings from "./Section/user/Settings";
import AdminDashboard from "./Section/Admin/Dashboard";
import Layout from "./Section/Admin/Layout";
import UserManagement from "./Section/Admin/UserManagement";
const App: React.FC = () => (

  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotPassword" element={<Forgot />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/adminlogin" element={<AdminLogin />} />


      <Route path="/admin" element={<Layout />} >
      <Route index element={<AdminDashboard />} />
      <Route path="usermanagment" element={<UserManagement />} />

      </Route>



    </Routes>
    <ToastContainer />
  </BrowserRouter>
);

export default App;
