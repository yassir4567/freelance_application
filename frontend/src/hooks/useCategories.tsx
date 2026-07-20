import { useEffect, useState } from "react";
import { categoryApi } from "../api/categories/categoryApi";
import type { Category } from "../types/category.types";

export type CategoryHookType = {
  categories: Category[];
  isLoading: boolean;
  error: string;
};

function useCategories(): CategoryHookType {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect((): void => {
    const loadCategories = async (): Promise<void> => {
      setIsLoading(true);
      const result = await categoryApi.getCategories<Category[]>();
      setIsLoading(false);

      if (!result.success) {
        setError(result.message || "Error in fetching categories");
        return;
      }

      setCategories(result.data ?? []);
    };
    loadCategories();
  }, []);

  return { categories, isLoading, error };
}

export default useCategories;
