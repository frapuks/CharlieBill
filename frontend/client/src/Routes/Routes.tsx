import { Route } from "react-router-dom";
import {
  Account,
  Dashboard,
  Login,
  Products,
  Product,
  Clients,
  Client,
} from "../Pages";

const Router = [
  { id: 1, mainPath: "*", mainElement: <Login /> },
  { id: 2, mainPath: "/", mainElement: <Login /> },
  { id: 3, mainPath: "/login", mainElement: <Login /> },
  { id: 4, mainPath: "/dashboard", mainElement: <Dashboard /> },
  { id: 5, mainPath: "/account", mainElement: <Account /> },
  { id: 6, mainPath: "/products", mainElement: <Products /> },
  { id: 7, mainPath: "/products/:productId", mainElement: <Product /> },
  { id: 8, mainPath: "/clients", mainElement: <Clients /> },
  { id: 9, mainPath: "/clients/:clientId", mainElement: <Client /> },
];

const mainRoutes = Router.map(({ id, mainPath, mainElement }) => (
  <Route key={id} path={mainPath} element={mainElement} />
));

export { Router, mainRoutes };
