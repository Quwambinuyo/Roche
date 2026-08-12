import { useEffect, useState } from "react";

const PEXELS_URL = "https://api.pexels.com/v1/search";
const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export const usePexelsImages = (query, perPage = 100) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      query,
      per_page: perPage,
      orientation: "square",
    });

    fetch(`${PEXELS_URL}?${params}`, {
      headers: { Authorization: API_KEY },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Pexels error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setImages(data.photos || []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query, perPage]);

  return { images, loading, error };
};
