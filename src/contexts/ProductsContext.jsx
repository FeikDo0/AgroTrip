import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const fetchProducts = async () => {
    setLoadingProducts(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Ошибка загрузки продукции:", error.message);
    } else {
      setProducts(data || []);
    }

    setLoadingProducts(false);
  };

  const addProduct = async (newProduct) => {
    const { data, error } = await supabase
      .from("products")
      .insert([newProduct])
      .select();

    if (error) {
      console.error("Ошибка добавления продукции:", error.message);
      return null;
    }

    setProducts((prev) => [data[0], ...prev]);
    return data[0];
  };

  const updateProduct = async (productId, updatedProduct) => {
    const { data, error } = await supabase
      .from("products")
      .update(updatedProduct)
      .eq("id", productId)
      .select();

    if (error) {
      console.error("Ошибка редактирования продукции:", error.message);
      return null;
    }

    setProducts((prev) =>
      prev.map((product) => (product.id === productId ? data[0] : product))
    );

    return data[0];
  };

  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm("Удалить эту продукцию?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      console.error("Ошибка удаления продукции:", error.message);
      return;
    }

    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        loadingProducts,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}