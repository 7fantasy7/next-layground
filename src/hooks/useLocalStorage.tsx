// Custom hook
'use client';

import {useCallback, useState} from "react";

function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  // stable link, same on every re-render
  const setValue = useCallback((value: any) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;


// Usage:
// const [storedValue, setValue] = useLocalStorage('name', 'defaultValue');
