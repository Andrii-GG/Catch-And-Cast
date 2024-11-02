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

  return (
    <div className="container">
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/authorization" element={<AuthorizationForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route
          path="/"
          element={<HomePage breadcrumbNameMap={breadcrumbNameMap} />}
        />
        <Route
          path="/favorite"
          element={<FavoritePage breadcrumbNameMap={breadcrumbNameMap} />}
        />
        <Route
          path="/cart"
          element={<CartPage breadcrumbNameMap={breadcrumbNameMap} />}
        />
        <Route
          path="/:itemId"
          element={<ItemPage breadcrumbNameMap={breadcrumbNameMap} />}
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
