import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import Home from "./pages/Home";
import Mainlayout from "./layout/MainLayout";
import { useAppStore } from "./lib/zustand";

export default function App() {
  const admin = useAppStore((state) => state.admin);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes admin={admin}>
          <Mainlayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: admin ? <Navigate to={"/"} /> : <Login />,
    },
  ]);

  return <RouterProvider router={routes} />;
}
