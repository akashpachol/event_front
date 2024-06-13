import React from 'react';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserRouters from './user/UserRouter';
import VenderRouter from './vender/VenderRouter';
import ManagerRouter from './Manger/ManagerRouter';
import AdminRouter from './admin/AdminRouter';


const Routes: React.FC = () => {
    const userRoutes = UserRouters();
    const venderRoutes = VenderRouter();
    const managerRoutes = ManagerRouter();
    const adminRoutes = AdminRouter();
    const combinedRoutes: RouteObject[] = [...userRoutes, ...venderRoutes,...managerRoutes,...adminRoutes];
  const router = createBrowserRouter(combinedRoutes);

  return <RouterProvider router={router} />;
};

export default Routes;
