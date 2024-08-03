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
import VenderSettings from "../../Section/vender/Settings";
import NotFound from "../../components/NotFound/NotFound";
import Chat from "../../Section/vender/chat";
import ManagerbookingHistory from "../../Section/vender/MangerbookingHistory";
import ManagerBookingDetails from "../../Section/vender/MangerbookingHistory/MangerBookingDetails";

const VenderRouter = () => {
  return [
    {
      path: "/vender/login",
      element: <VenderLoginPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },

    {
      path: "/vender/signup",
      element: <VenderSignup />,
    },
    {
      path: "/vender/forgotPassword",
      element: <VenderForgot />,
    },
    {
      path: "/vender/reset",
      element: <VenderReset />,
    },

    {
      path: "/vender/otp",
      element: <VenderOtp />,
    },

    {
      path: "/vender",
      element: (
        <VenderAuth>
          <Layout />
        </VenderAuth>
      ),
      children: [
        {
          path: "/vender",
          element: <Dashboard />,
        },
        {
          path: "venders",
          element: <Venders />,
        },

        {
          path: "managerbookingHistory",
          element: <ManagerbookingHistory />,
        },
        {
          path: "managerBookingDetails",
          element: <ManagerBookingDetails />,
        },
        {
          path: "settings",
          element: <VenderSettings />,
        },
        {
          path: "addvenders",
          element: <AddVenders />,
        },
        {
          path: "chat",
          element:(   <VenderAuth><Chat /></VenderAuth>),  
        
        },
      ],
    },
  ];
};

export default VenderRouter;
