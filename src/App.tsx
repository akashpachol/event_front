import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./Section/user/Login";
import Otp from "./Section/user//Otp";
import Signup from "./Section/user/Signup/Signup";
import Forgot from "./Section/user/forgot/Forgot";
const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotPassword" element={<Forgot />} />
      <Route path="/otp" element={<Otp />} />


    </Routes>
  </BrowserRouter>
);

export default App;
