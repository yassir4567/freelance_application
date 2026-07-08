import { useEffect, useState } from "react";
import { categoryApi } from "../api/categories/categoryApi";

function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const result = await categoryApi.getCategories();
      setCategories(result.data);
    };
    loadCategories();
  }, []);

  return { categories };
}

export default useCategories;
