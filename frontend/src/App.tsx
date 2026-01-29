import { type FC } from "react";
import routes from "./routes/AllRoutes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App: FC = () => {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default App;
