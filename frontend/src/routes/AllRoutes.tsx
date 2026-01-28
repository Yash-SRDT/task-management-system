import Login from "../pages/auth/LoginPage";
import SelectRole from "../pages/auth/SelectRole";
import Signup from "../pages/auth/SignupPage";
import ProtectedRoute from "./ProtectedRoute";
import RootLayout from "./RootLayout";

const routes = [
  {
    path: "/register",
    element: <Signup />,
  },
  { path: "/login", element: <Login /> },
  // { path: "/select-role", element: <SelectRole /> },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            path: "/employee",
            element: "Employee page",
          },
        ],
      },
    ],
  },
];

export default routes;
