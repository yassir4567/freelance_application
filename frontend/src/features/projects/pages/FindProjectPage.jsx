import FreelancerProjectCard from "../components/FreelancerProjectCard";
import FreelancerProjectsFilter from "../components/FreelancerProjectsFilter";
import FreelancerProjectsHeaderFilter from "../components/FreelancerProjectsHeaderFilter";
import Search from "../../../shared/ui/Search";
import styles from "../styles/FindProjectPage.module.css";
import { useEffect, useState } from "react";
import { getCategories } from "../../../api/categories/getCategories";
import { getProjects } from "../../../api/projects/getProjects";
import { emptyText } from "../../../utils/helpers";
import { useSearchParams } from "react-router-dom";

function FindProjectPage() {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: "",
    price: "",
    experience: "",
    size: "",
    nbr_proposals: "",
    sort: "",
    category_id: "",
  });

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

  // * load categories from API
  useEffect(() => {
    const loadCategories = async () => {
      const result = await getCategories();
      setCategories(result.data);
    };
    loadCategories();
  }, []);

  const handleInputsChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // * apply filters
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

  // * send get projects request
  useEffect(() => {
    const loadProjects = async () => {
      const result = await getProjects(searchParams.toString());
      setProjects(result.data);
    };
    loadProjects();
  }, [searchParams]);

  // * clear all filters
  const handleClearAllFilters = () => {
    setFilters({
      search: "",
      price: "",
      experience: "",
      size: "",
      nbr_proposals: "",
      sort: "",
      category_id: "",
    });
    setSearchParams({});
  };

  return (
    <div className={styles.findProjectPage}>
      <h1 className="pageTitle">Browse all projects</h1>
      <div className={styles.searchBox}>
        <div className={styles.search}>
          <Search value={filters.search} onChange={handleInputsChange} />
        </div>
        <button className={styles.clearAll} onClick={handleApplyFilters}>
          Apply filters
        </button>
        <button className={styles.clearAll} onClick={handleClearAllFilters}>
          Clear all
        </button>
      </div>

      <div className={styles.main}>
        <div className={styles.filters}>
          <FreelancerProjectsFilter
            filters={filters}
            onChange={handleInputsChange}
          />
        </div>
        <div className={styles.projectsSection}>
          <div className={styles.headerFilter}>
            <FreelancerProjectsHeaderFilter
              filters={filters}
              onChange={handleInputsChange}
              categories={categories}
            />
          </div>

          <div className={styles.projects}>
            {projects.length > 0 ? (
              projects.map((project) => (
                <FreelancerProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className={styles.empty}>No projects found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindProjectPage;
