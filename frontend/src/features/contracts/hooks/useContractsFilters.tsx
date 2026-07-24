import { useSearchParams } from "react-router-dom";

type useContractsFiltersReturn = {
  searchParams: URLSearchParams;
  handleInputsChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleClearFilters: () => void;
  filterValues: Record<string, string>;
};

function useContractsFilters(): useContractsFiltersReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const status = searchParams.get("status") || "";

  const handleInputsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;

    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      if (value && value.trim() !== "") {
        nextParams.set(name, value);
      } else {
        nextParams.delete(name);
      }
      return nextParams;
    });
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  const filterValues = {
    search: search,
    sort: sort,
    status: status,
  };

  return { searchParams, handleInputsChange, handleClearFilters, filterValues };
}

export default useContractsFilters;
