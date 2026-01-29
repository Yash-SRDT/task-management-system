import Login from "../pages/auth/LoginPage";
import Signup from "../pages/auth/SignupPage";
import PrivateRoute from "./PrivateRoute";
import RootLayout from "../layout/RootLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import AdminTasksPage from "../pages/tasks/AdminTasksPage";

const routes = [
  {
    path: "/register",
    element: <Signup />,
  },
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "/tasks",
            element: <AdminTasksPage />,
          },
        ],
      },
    ],
  },
];

export default routes;
