import React, { useState, useEffect } from "react";
import FilterBox from "react-filter-box";
import "react-filter-box/lib/react-filter-box.css";

const FiltersForProperties = ({ onFiltersChange }) => {
  const [filterQuery, setFilterQuery] = useState("");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/filters");
        const data = await response.json();
        setFilterData(data);
      } catch (err) {
        console.error("Ошибка загрузки фильтров:", err);
      }
    };

    fetchFilters();
  }, []);

  const handleFilterChange = (query) => {
    setFilterQuery(query);
    onFiltersChange(query);
  };

  const getFilterOptions = () => {
    const options = [
      { columnField: "location", type: "text" },
      { columnField: "type", type: "text" },
      { columnField: "price", type: "number" },
      { columnField: "propertySize", type: "number" },
      { columnField: "buildYear", type: "number" },
    ];
    return options;
  };

  return (
    <div className="filters-for__properties">
      <FilterBox
        query={filterQuery}
        onChange={handleFilterChange}
        options={getFilterOptions()}
        autoCompleteEnable={true}
      />
    </div>
  );
};

export default FiltersForProperties;
