import { useSelector } from "react-redux";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from "./pages/Success";
import "./Styles.css";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:category" element={<ProductList />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/products" element={<ProductList />}></Route>
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/success" element={<Success />}></Route>
    </Routes>
  );
}

export default App;
