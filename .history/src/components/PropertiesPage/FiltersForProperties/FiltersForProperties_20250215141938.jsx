import React, { useState, useEffect, useRef } from "react";
import locationImg from "../../../images/icons/filters/location.svg";
import propertyTypeImg from "../../../images/icons/filters/propertyType.svg";
import pricingRangeImg from "../../../images/icons/filters/pricingRange.svg";
import buildYearImg from "../../../images/icons/filters/buildYear.svg";
import "./properitesFilters.scss";

const FiltersForProperties = ({ onFiltersChange }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterInputs, setFilterInputs] = useState({});
  const [filterData, setFilterData] = useState([]);
  const dropdownRefs = useRef({});

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/filters");
        const data = await response.json();
        setFilterData(data);

        // Инициализируем фильтры
        const initialInputs = {};
        data.forEach((filter) => {
          initialInputs[filter.name] = "";
        });
        setFilterInputs(initialInputs);
      } catch (err) {
        console.error("Ошибка загрузки фильтров:", err);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    // Обновляем родительский компонент только после рендера
    if (Object.keys(filterInputs).length > 0) {
      onFiltersChange(filterInputs);
    }
  }, [filterInputs, onFiltersChange]);

  const toggleFilter = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  const handleInputChange = (filterName, value) => {
    setFilterInputs((prev) => {
      const updatedFilters = { ...prev, [filterName]: value };
      return updatedFilters;
    });
  };

  const selectOption = (filterName, option) => {
    const formattedOption =
      filterName === "price" || filterName === "propertySize"
        ? parseInt(option, 10) || option
        : option;

    setFilterInputs((prev) => {
      const updatedFilters = { ...prev, [filterName]: formattedOption };
      return updatedFilters;
    });

    setActiveFilter(null);
  };

  return (
    <div className="filters-for__properties">
      {filterData.map((filter, index) => (
        <div
          className="filter__item"
          key={index}
          ref={(el) => (dropdownRefs.current[filter.name] = el)}
        >
          <img
            src={
              filter.name === "location"
                ? locationImg
                : filter.name === "type"
                ? propertyTypeImg
                : filter.name === "price"
                ? pricingRangeImg
                : buildYearImg
            }
            alt=""
          />
          <input
            type="text"
            placeholder={filter.name}
            value={
              filter.name === "price"
                ? `до ${filterInputs[filter.name] ?? ""}$`
                : filter.name === "propertySize"
                ? `до ${filterInputs[filter.name] ?? ""} sqm`
                : filterInputs[filter.name] ?? ""
            }
            onClick={() => toggleFilter(filter.name)}
            onChange={(e) => handleInputChange(filter.name, e.target.value)}
          />

          {activeFilter === filter.name && (
            <ul className="dropdown">
              {filter.options.map((option, i) => (
                <li key={i} onClick={() => selectOption(filter.name, option)}>
                  {filter.name === "price"
                    ? `до ${option}$`
                    : filter.name === "propertySize"
                    ? `до ${option} sqm`
                    : option}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default FiltersForProperties;
