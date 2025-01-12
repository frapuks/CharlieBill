import { Route } from "react-router-dom";
import { Account, Dashboard, Home, Login } from "../Pages";

const Router = [
  { id: 1, mainPath: "*", mainElement: <Home /> },
  { id: 2, mainPath: "/", mainElement: <Home /> },
  { id: 3, mainPath: "/Login", mainElement: <Login /> },
  { id: 4, mainPath: "/dashboard", mainElement: <Dashboard /> },
  { id: 5, mainPath: "/Account", mainElement: <Account /> },
];

const mainRoutes = Router.map(({ id, mainPath, mainElement }) => (
  <Route key={id} path={mainPath} element={mainElement} />
));

export { Router, mainRoutes };
