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
    const handleOutsideClick = (event) => {
      if (
        activeFilter &&
        dropdownRefs.current[activeFilter] &&
        !dropdownRefs.current[activeFilter].contains(event.target)
      ) {
        setActiveFilter(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [activeFilter]);

  const toggleFilter = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  const selectOption = (filterName, option) => {
    const formattedOption =
      filterName === "price"
        ? `до ${option}$`
        : filterName === "propertySize"
        ? `до ${option} sqm`
        : option;

    setFilterInputs((prev) => ({
      ...prev,
      [filterName]: formattedOption,
    }));
    setActiveFilter(null);

    onFiltersChange({ ...filterInputs, [filterName]: formattedOption });
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
            value={filterInputs[filter.name]}
            onClick={() => toggleFilter(filter.name)}
            readOnly
          />
          {activeFilter === filter.name && (
            <ul className="dropdown">
              {filter.options.map((option, i) => (
                <li key={i} onClick={() => selectOption(filter.name, option)}>
                  {filterName === "price"
                    ? `до ${option}$`
                    : filterName === "propertySize"
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