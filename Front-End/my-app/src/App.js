import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import FavoritePage from "./FavoritePage";
import CartPage from "./CartPage";
import ItemPage from "./ItemPage";
import AuthorizationForm from "./AuthorizationForm";
import RegistrationForm from "./RegistrationForm";
import { useState } from "react";

const breadcrumbNameMap = {
  "/": "Головна",
  "/favorite": "Вибране",
  "/cart": "Кошик",
};

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/authorization" ||
    location.pathname === "/registration";

  const [cartItemCount, setCartItemCount] = useState(0);

  return (
    <div className="container">
      {!isAuthPage && (
        <Header
          cartItemCount={cartItemCount}
          setCartItemCount={setCartItemCount}
        />
      )}
      <Routes>
        <Route path="/authorization" element={<AuthorizationForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route
          path="/"
          element={
            <HomePage
              cartItemCount={cartItemCount}
              setCartItemCount={setCartItemCount}
            />
          }
        />
        <Route
          path="/favorite"
          element={
            <FavoritePage
              cartItemCount={cartItemCount}
              setCartItemCount={setCartItemCount}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItemCount={cartItemCount}
              setCartItemCount={setCartItemCount}
            />
          }
        />
        <Route
          path="/:itemId"
          element={
            <ItemPage
              breadcrumbNameMap={breadcrumbNameMap}
              cartItemCount={cartItemCount}
              setCartItemCount={setCartItemCount}
            />
          }
        />
      </Routes>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
