import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Home from "./layout/Home.tsx";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route index element={<Home />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={route} />
    </StrictMode>
  </Provider>
);
