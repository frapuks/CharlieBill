import { Route } from "react-router-dom";
import { Account, Dashboard, Login, Products, Product } from "../Pages";

const Router = [
  { id: 1, mainPath: "*", mainElement: <Login /> },
  { id: 2, mainPath: "/", mainElement: <Login /> },
  { id: 3, mainPath: "/login", mainElement: <Login /> },
  { id: 4, mainPath: "/dashboard", mainElement: <Dashboard /> },
  { id: 5, mainPath: "/account", mainElement: <Account /> },
  { id: 5, mainPath: "/products", mainElement: <Products /> },
  { id: 5, mainPath: "/products/:productId", mainElement: <Product /> },
];

const mainRoutes = Router.map(({ id, mainPath, mainElement }) => (
  <Route key={id} path={mainPath} element={mainElement} />
));

export { Router, mainRoutes };
