import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const LocationsContext = createContext();

export function LocationsProvider({ children }) {
  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(true);

  const fetchLocations = async () => {
    setLoadingLocations(true);

    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Ошибка загрузки локаций:", error.message);
    } else {
      setLocations(data || []);
    }

    setLoadingLocations(false);
  };

  const addLocation = async (newLocation) => {
    const { data, error } = await supabase
      .from("locations")
      .insert([newLocation])
      .select();

    if (error) {
      console.error("Ошибка добавления локации:", error.message);
      return null;
    }

    setLocations((prev) => [data[0], ...prev]);
    return data[0];
  };

  const updateLocation = async (locationId, updatedLocation) => {
    const { data, error } = await supabase
      .from("locations")
      .update(updatedLocation)
      .eq("id", locationId)
      .select();

    if (error) {
      console.error("Ошибка редактирования локации:", error.message);
      return null;
    }

    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === locationId ? data[0] : loc
      )
    );

    return data[0];
  };

  const deleteLocation = async (locationId) => {
    const confirmDelete = window.confirm(
      "Удалить этот объект?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("locations")
      .delete()
      .eq("id", locationId);

    if (error) {
      console.error("Ошибка удаления локации:", error.message);
      return;
    }

    setLocations((prev) =>
      prev.filter((loc) => loc.id !== locationId)
    );
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <LocationsContext.Provider
      value={{
        locations,
        setLocations,
        loadingLocations,
        fetchLocations,
        addLocation,
        updateLocation,
        deleteLocation,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
}

export function useLocations() {
  return useContext(LocationsContext);
}