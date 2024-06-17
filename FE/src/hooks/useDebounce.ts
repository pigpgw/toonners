import { useState, useEffect } from "react";

const useDebounce = (search:string, delay:number):string => {
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(search);
    }, delay);
    return () => clearTimeout(handler);
  }, [search, delay]);

  return debounced;
};

export default useDebounce;
