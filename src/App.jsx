import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import Locations from "./pages/Locations";
import AddLocation from "./pages/AddLocation";
import EditLocation from "./pages/EditLocation";
import LocationDetails from "./pages/LocationDetails";

import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/ProductDetails";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* LOCATIONS */}
        <Route path="/locations" element={<Locations />} />

        <Route
          path="/locations/:id"
          element={<LocationDetails />}
        />

        <Route
          path="/add"
          element={
            <AdminRoute>
              <AddLocation />
            </AdminRoute>
          }
        />

        <Route
          path="/edit-location/:id"
          element={
            <AdminRoute>
              <EditLocation />
            </AdminRoute>
          }
        />

        {/* PRODUCTS */}
        <Route path="/products" element={<Products />} />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/edit-product/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;