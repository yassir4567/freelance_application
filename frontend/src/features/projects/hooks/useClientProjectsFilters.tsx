import type React from "react";
import { useSearchParams } from "react-router-dom";

export type InputValuesType = {
  search: string;
  status: string;
  sort: string;
};

export type ClientProjectFilters = {
  searchParams: URLSearchParams;
  inputValues: InputValuesType;
  handleInputsChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleClearFilters: () => void;
};

function useClientProjectsFilters(): ClientProjectFilters {
  const [searchParams, setSearchParams] = useSearchParams();

  const search: string = searchParams.get("search") || "";
  const sort: string = searchParams.get("sort") || "";
  const status: string = searchParams.get("status") || "";

  const handleInputsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;

    const params = new URLSearchParams(searchParams);
    if (value && value.trim() !== "") {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    setSearchParams(params);
  };

  const handleClearFilters = (): void => {
    setSearchParams({});
  };

  const inputValues: InputValuesType = {
    search: search,
    status: status,
    sort: sort,
  };

  return { searchParams, inputValues, handleInputsChange, handleClearFilters };
}

export default useClientProjectsFilters;
