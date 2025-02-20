import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useLocalStorageState<T>(
  intialState: T,
  key: string
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : intialState;
    } catch (error) {
      console.error("Error parsing state from local storage: ", error);
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}
