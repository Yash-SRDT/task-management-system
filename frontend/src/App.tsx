import { useEffect, type FC } from "react";
import routes from "./routes/AllRoutes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store/store";
import { fetchLoggedInUser } from "./store/auth/login-slice";

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchLoggedInUser());
    }
  }, [dispatch]);

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default App;
