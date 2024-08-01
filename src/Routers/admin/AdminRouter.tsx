
import AdminAuth from "./AdminAth";
import AdminLogin from "../../Section/Admin/Login";
import AdminDashboard from "../../Section/Admin/Dashboard";
import Layout from "../../Section/Admin/Layout";
import UserManagement from "../../Section/Admin/UserManagement";
import EventType from "../../Section/Admin/EventType";
import VenderType from "../../Section/Admin/Vender/VenderType";
import Manager from "../../Section/Admin/Manager";
import ViewLocation from "../../Section/Admin/Manager/ViewLocation";
import Venders from "../../Section/Admin/Vender";
import ViewVender from "../../Section/Admin/Vender/ViewVender";
import NotFound from "../../components/NotFound/NotFound";




const AdminRouter = () => {


  return [
    {
      path: "/adminlogin",
      element: (
       
          <AdminLogin />
 
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/admin",
      element: (
        <AdminAuth>
          <Layout />
        </AdminAuth>
      ),
      children:[
        {
          path: "/admin",
          element: (
          
              <AdminDashboard />
          
          ),
        },
        {
          path: "usermanagment",
          element: (
         
              <UserManagement />
           
          ),
        },
        {
          path: "eventtype",
          element: (
       
              <EventType />
          
          ),
        },
        {
          path: "vendertype",
          element: (
    
              <VenderType />
        
          ),
        },
        {
          path: "manager",
          element: (
          
              <Manager />
           
          ),
        },
        {
          path: "viewLocation",
          element: (
          
              <ViewLocation />
           
          ),
        },

        {
          path: "vender",
          element: (
          
              <Venders />
           
          ),
        },
        {
          path: "viewVenders",
          element: (
          
              <ViewVender />
           
          ),
        }
      ]
    },
  ];
};

export default AdminRouter;
