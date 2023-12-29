import { useEffect, useState } from "react";

function useDebounce(value: string, delay: number) {
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    if (!value.trim()) {
      delay = 0;
    }
    const handleTimeOut = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => clearTimeout(handleTimeOut);
  }, [value]);
  return debounce;
}
export default useDebounce;
