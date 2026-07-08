import { useSearchParams } from "react-router-dom";
import { emptyText } from "../../../utils/helpers";
import { useEffect, useState } from "react";

const initFilters = {
  search: "",
  price: "",
  experience: "",
  size: "",
  nbr_proposals: "",
  sort: "",
  category_id: "",
};

function useBrowseProjectsFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(initFilters);

  // * get filters from url query params
  useEffect(() => {
    let nbr_proposals = "";
    let price = "";

    let nbrProposalsMin = searchParams.get("nbr_proposals_min") || "";
    let nbrProposalsMax = searchParams.get("nbr_proposals_max") || "";

    if (nbrProposalsMin && nbrProposalsMax) {
      nbr_proposals = `${nbrProposalsMin}-${nbrProposalsMax}`;
    } else if (nbrProposalsMin) {
      nbr_proposals = `${nbrProposalsMin}+`;
    }

    let budgetMin = searchParams.get("budget_min") || "";
    let budgetMax = searchParams.get("budget_max") || "";

    if (budgetMin && budgetMax) {
      price = `${budgetMin}-${budgetMax}`;
    } else if (budgetMin) {
      price = `${budgetMin}+`;
    }

    setFilters({
      search: searchParams.get("search") || "",
      category_id: searchParams.get("category_id") || "",
      sort: searchParams.get("sort") || "",
      experience: searchParams.get("experience") || "",
      size: searchParams.get("size") || "",
      nbr_proposals,
      price,
    });
  }, []);

  const handleInputsChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = async () => {
    const params = new URLSearchParams();
    if (!emptyText(filters.search)) {
      params.set("search", filters.search);
    }
    if (!emptyText(filters.category_id)) {
      params.set("category_id", filters.category_id);
    }
    if (!emptyText(filters.sort)) {
      params.set("sort", filters.sort);
    }
    if (!emptyText(filters.experience)) {
      params.set("experience", filters.experience);
    }
    if (!emptyText(filters.size)) {
      params.set("size", filters.size);
    }
    if (!emptyText(filters.nbr_proposals)) {
      if (filters.nbr_proposals.includes("-")) {
        let [min, max] = filters.nbr_proposals.split("-");
        params.set("nbr_proposals_min", min);
        params.set("nbr_proposals_max", max);
      } else if (filters.nbr_proposals.includes("+")) {
        let min = filters.nbr_proposals.replace("+", "");
        params.set("nbr_proposals_min", min);
      }
    }
    if (!emptyText(filters.price)) {
      if (filters.price.includes("-")) {
        let [min, max] = filters.price.split("-");
        params.set("budget_min", min);
        params.set("budget_max", max);
      } else if (filters.price.includes("+")) {
        let min = filters.price.replace("+", "");
        params.set("budget_min", min);
      }
    }
    setSearchParams(params);
  };

  // * clear all filters
  const handleClearAllFilters = () => {
    setFilters(initFilters);
    setSearchParams({});
  };

  return {
    filters,
    searchParams,
    handleApplyFilters,
    handleClearAllFilters,
    handleInputsChange
  };
}

export default useBrowseProjectsFilters;
