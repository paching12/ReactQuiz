import { useCallback } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Función para obtener el valor del localStorage
  const getStoredValue = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  // Función para guardar el valor en localStorage
  const setStoredValue = useCallback(
    (value: T): void => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  // Función para eliminar el valor del localStorage
  const removeStoredValue = useCallback((): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  return { getStoredValue, setStoredValue, removeStoredValue };
};
