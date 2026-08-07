import { useSearchParams } from "react-router-dom";

export const useSearchParamState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParam = (key, value, { resetPage = true } = {}) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    if (resetPage) {
      next.delete("page");
    }
    setSearchParams(next);
  };

  const clearParams = () => setSearchParams({});

  return { searchParams, setParam, clearParams };
};
