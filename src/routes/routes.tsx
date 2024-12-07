import { createBrowserRouter, Outlet } from "react-router";
import App from "../App";
import Welcome from "../pages/welcome/welcome";
import PokemonList from "../pages/pokemon-list.tsx/pkoemon-list";
import PokemonDetails from "../pages/pokemon-details/pokemon-details";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <Welcome />,
      },
      {
        path: "list",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <PokemonList />,
          },
          {
            path: "details/:id",
            element: <PokemonDetails />,
          },
        ],
      },
    ],
  },
]);

export default router;
