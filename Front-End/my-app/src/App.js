import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import FavoritePage from "./FavoritePage";
import CartPage from "./CartPage";
import ItemPage from "./ItemPage";

const breadcrumbNameMap = {
  "/": "Головна",
  "/favorite": "Вибране",
  "/cart": "Кошик",
};

function App() {
  return (
    <div className="container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<HomePage breadcrumbNameMap={breadcrumbNameMap} />}
          ></Route>
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
        <Footer />
      </Router>
    </div>
  );
}

export default App;
