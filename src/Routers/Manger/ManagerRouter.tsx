
import ManagerAuth from "./ManagerAuth";
import ManagerLogin from "../../Section/Manager/auth/login/ManagerLogin";
import MangerSignup from "../../Section/Manager/auth/Signup/Signup";
import MangerForgot from "../../Section/Manager/auth/forgot/Forgot";
import MangerReset from "../../Section/Manager/auth/Reset/MangerReset";
import MangerOtp from "../../Section/Manager/auth/Otp/MangerOtp";
import Layout from "../../Section/Manager/Layout";
import Dashboard from "../../Section/Manager/Dashboard/Dashboard";
import Location from "../../Section/Manager/Location/Location";
import AddLocation from "../../Section/Manager/Location/AddLocation";
import VenderDetails from "../../Section/Manager/vender/Details";
import Venders from "../../Section/Manager/vender/Vender";


const ManagerRouter = () => {
  

  return [
    {
      path: "/manager/login",
      element: (
        <>
          <ManagerLogin />
        </>
      ),
    },

    {
      path: "/manager/signup",
      element: (
      
          <MangerSignup />
     
      ),
    },
    {
      path: "/manager/forgotPassword",
      element: (
       
          <MangerForgot />
      
      ),
    },
    {
      path: "/manager/reset",
      element: (
     
          <MangerReset />
       
      ),
    },
    {
      path: "/manager/otp",
      element: (
     
          <MangerOtp />
      
      ),
    },
    {
      path: "/manager",
      element: (
        <ManagerAuth>
          <Layout />
        </ManagerAuth>
      ),
      children:[{
        path: "/manager",
        element: (
       
            <Dashboard />
        
        ),
      },
      {
        path: "location",
        element: (
         
            <Location />
      
        ),
      },
      {
        path: "addlocation",
        element: (
         
            <AddLocation />
         
        ),
      },
      {
        path: "Venders",
        element:(<Venders />),  
        
      },
      {
        path: "VenderDetails",
        element:(   <VenderDetails />),  
      
      },
    ]
    },
  ];
};

export default ManagerRouter;
