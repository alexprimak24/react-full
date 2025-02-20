import { useEffect } from "react";

export function useKey(key: string, action: () => void) {
  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };

    document.addEventListener("keydown", callback);
    //SO REMEMBER TO ADD CLEANUP FUNCTIONS IN SUCH CASES
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [action, key]);
}
