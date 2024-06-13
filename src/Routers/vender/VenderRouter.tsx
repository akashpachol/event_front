
import VenderLoginPage from "../../Section/vender/auth/login/VenderLoginPage";
import VenderSignup from "../../Section/vender/auth/Signup/VenderSignup";
import VenderForgot from "../../Section/vender/auth/forgot/VenderForgot";
import VenderReset from "../../Section/vender/auth/Reset/VenderReset";
import VenderOtp from "../../Section/vender/auth/Otp/VenderOtp";
import Dashboard from "../../Section/vender/Dashborad/Dashboard";
import VenderAuth from "./VenderAth";
import Layout from "../../Section/vender/Layout";
import Venders from "../../Section/vender/Venders/Venders";
import AddVenders from "../../Section/vender/Venders/AddVenders";

const VenderRouter = () => {

  return [

 
    {
      path: "/vender/login",
      element: (
          <VenderLoginPage />
      ),
    },

    {
      path: "/vender/signup",
      element: (
          <VenderSignup />
      ),
    },
    {
      path: "/vender/forgotPassword",
      element: (
          <VenderForgot />
      ),
    },
    {
      path: "/vender/reset",
      element: (
          <VenderReset />
      ),
    },

    {
      path: "/vender/otp",
      element: (
          <VenderOtp />
      ),
    },

    {
      path: "/vender",
      element: (
        <VenderAuth>
          <Layout />
        </VenderAuth>
      ),
      children:[{
        path: "/vender",
        element: (
            <Dashboard />
        
        ),
      },
      {
        path: "venders",
        element: (
         
            <Venders />
      
        ),
      },
      {
        path: "addvenders",
        element: (
         
            <AddVenders />
         
        ),
      }
    ]}
  ];
};

export default VenderRouter;
