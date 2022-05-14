import { useState, useEffect } from "react";

function useLocalStorage(key, value = null) {
  const initialValue = localStorage.getItem(key) || value;

  const [item, setItem] = useState(initialValue);

  useEffect(function setKeyInLocalStorage() {

    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, item);
    }
  }, [key, item]);

  return [item, setItem];
}

export default useLocalStorage;