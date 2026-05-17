import ReactDOM from "react-dom/client";

import App from "./App";

import { AuthProvider } from "./contexts/AuthContext";
import { LocationsProvider } from "./contexts/LocationsContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ProductsProvider } from "./contexts/ProductsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <LocationsProvider>
      <FavoritesProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </FavoritesProvider>
    </LocationsProvider>
  </AuthProvider>
);