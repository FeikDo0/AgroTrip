export function getFromStorage(key, defaultValue) {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : defaultValue;
  } catch (error) {
    console.error(`Ошибка чтения localStorage: ${key}`, error);
    return defaultValue;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Ошибка записи localStorage: ${key}`, error);
  }
}

export function removeFromStorage(key) {
  localStorage.removeItem(key);
}