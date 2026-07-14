import { useSearchParams } from "react-router-dom";
import { emptyText } from "../../../utils/helpers";
import { useEffect, useState } from "react";

export type BrowseProjectsObjectFilters = {
  search: string;
  price: string;
  experience: string;
  size: string;
  nbr_proposals: string;
  sort: string;
  category_id: string;
};

export type BrowseProjectsFilters = {
  filters: BrowseProjectsObjectFilters;
  searchParams: URLSearchParams;
  handleApplyFilters: () => Promise<void>;
  handleClearAllFilters: () => void;
  handleInputsChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
};

const initFilters = {
  search: "",
  price: "",
  experience: "",
  size: "",
  nbr_proposals: "",
  sort: "",
  category_id: "",
};

function useBrowseProjectsFilters(): BrowseProjectsFilters {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] =
    useState<BrowseProjectsObjectFilters>(initFilters);

  // * get filters from url query params
  useEffect((): void => {
    let nbr_proposals: string = "";
    let price: string = "";

    let nbrProposalsMin: string = searchParams.get("nbr_proposals_min") || "";
    let nbrProposalsMax: string = searchParams.get("nbr_proposals_max") || "";

    if (nbrProposalsMin && nbrProposalsMax) {
      nbr_proposals = `${nbrProposalsMin}-${nbrProposalsMax}`;
    } else if (nbrProposalsMin) {
      nbr_proposals = `${nbrProposalsMin}+`;
    }

    let budgetMin: string = searchParams.get("budget_min") || "";
    let budgetMax: string = searchParams.get("budget_max") || "";

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

  const handleInputsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;

    setFilters(
      (prev: BrowseProjectsObjectFilters): BrowseProjectsObjectFilters => ({
        ...prev,
        [name]: value,
      }),
    );
  };

  const handleApplyFilters = async (): Promise<void> => {
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
        if (min) params.set("nbr_proposals_min", min);
        if (max) params.set("nbr_proposals_max", max);
      } else if (filters.nbr_proposals.includes("+")) {
        let min = filters.nbr_proposals.replace("+", "");
        params.set("nbr_proposals_min", min);
      }
    }
    if (!emptyText(filters.price)) {
      if (filters.price.includes("-")) {
        let [min, max] = filters.price.split("-");
        if (min) params.set("budget_min", min);
        if (max) params.set("budget_max", max);
      } else if (filters.price.includes("+")) {
        let min = filters.price.replace("+", "");
        params.set("budget_min", min);
      }
    }
    setSearchParams(params);
  };

  // * clear all filters
  const handleClearAllFilters = (): void => {
    setFilters(initFilters);
    setSearchParams({});
  };

  return {
    filters,
    searchParams,
    handleApplyFilters,
    handleClearAllFilters,
    handleInputsChange,
  };
}

export default useBrowseProjectsFilters;
