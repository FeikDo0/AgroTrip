import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    return getFromStorage(key, defaultValue);
  });

  useEffect(() => {
    saveToStorage(key, value);
  }, [key, value]);

  return [value, setValue];
}