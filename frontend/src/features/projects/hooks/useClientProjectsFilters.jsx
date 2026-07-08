import { useSearchParams } from "react-router-dom";

function useClientProjectsFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const status = searchParams.get("status") || "";

  const handleInputsChange = (e) => {
    const { name, value } = e.target;

    const params = new URLSearchParams(searchParams);
    if (value && value.trim() !== "") {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  const inputValues = {
    search: search,
    status: status,
    sort: sort,
  };

  return { searchParams, inputValues, handleInputsChange, handleClearFilters };
}

export default useClientProjectsFilters;
