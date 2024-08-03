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
import EditLocation from "../../Section/Manager/Location/EditLocation";
import ViewLocation from "../../Section/Manager/Location/ViewLocation";
import ManagerSettings from "../../Section/Manager/Settings";
import UserbookingHistory from "../../Section/Manager/UserbookingHistory";
import UserBookingDetails from "../../Section/Manager/UserbookingHistory/UserBookingDetails";
import VenderBooking from "../../Section/Manager/UserbookingHistory/VenderBooking";
import Offer from "../../Section/Manager/Offer";
import NotFound from "../../components/NotFound/NotFound";
import Chat from "../../Section/Manager/chat";
import Wallet from "../../Section/Manager/Wallet";


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
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/manager/signup",
      element: <MangerSignup />,
    },
    {
      path: "/manager/forgotPassword",
      element: <MangerForgot />,
    },
    {
      path: "/manager/reset",
      element: <MangerReset />,
    },
    {
      path: "/manager/otp",
      element: <MangerOtp />,
    },
    {
      path: "/manager",
      element: (
        <ManagerAuth>
          <Layout />
        </ManagerAuth>
      ),
      children: [
        {
          path: "/manager",
          element: <Dashboard />,
        },
        {
          path: "location",
          element: <Location />,
        },
        {
          path: "addlocation",
          element: <AddLocation />,
        },
        {
          path: "editlocation",
          element: <EditLocation />,
        },
        {
          path: "viewlocation",
          element: <ViewLocation />,
        },
        {
          path: "Venders",
          element: <Venders />,
        },
        {
          path: "settings",
          element: <ManagerSettings />,
        },
        {
          path: "VenderDetails",
          element: <VenderDetails />,
        },
        {
          path: "UserbookingHistory",
          element: <UserbookingHistory />,
        },
        {
          path: "UserBookingDetails",
          element: <UserBookingDetails />,
        },
        {
          path: "VenderBooking",
          element: <VenderBooking />,
        },
        {
          path: "offer",
          element: <Offer />,
        },

      

        {
          path: "wallet",
          element:( <Wallet/>),  
        
        },
        {
          path: "chat",
          element:(   <Chat />),  
        
        },
      ],
    },
  ];
};

export default ManagerRouter;
