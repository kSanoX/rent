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

        const initialInputs = {};
        data.forEach((filter) => {
          initialInputs[filter.name] = "";
        });
        setFilterInputs(initialInputs);
      } catch (err) {
        console.error("Err to loading filters:", err);
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
    let newFilterInputs = { ...filterInputs };
  
    if (filterName === "price" || filterName === "propertySize") {
      if (option === "") {
        newFilterInputs[filterName] = { min: null, max: null };
      } else {
        const [min, max] = option.split(" - ").map(Number);
        newFilterInputs[filterName] = { min, max };
      }
    }

    if (option === "") {
      delete newFilterInputs[filterName];
    } else if (filterName === "price" || filterName === "propertySize") {
      const [min, max] = option.split(" - ").map(Number);
      newFilterInputs[filterName] = { min, max };
    } else {
      newFilterInputs[filterName] = option;
    }
  
      setFilterInputs(newFilterInputs);
      setActiveFilter(null);
      onFiltersChange(newFilterInputs);
  };  

  const getFilterOptions = (filter) => {
    if (!filter.options) return [];
  
    // Проверка: являются ли опции диапазонами (с min и max)
    if (typeof filter.options[0] === "object" && filter.options[0] !== null && "min" in filter.options[0]) {
      return filter.options.map(option => `${option.min} - ${option.max}`);
    }
  
    // Иначе просто возвращаем как есть (строки, годы и т.п.)
    return filter.options;
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
            alt={filter.name}
          />
          <input
            type="text"
            placeholder={filter.name}
            value={
              filterInputs[filter.name]
                ? filter.name === "price" || filter.name === "propertySize"
                  ? `${filterInputs[filter.name].min} - ${filterInputs[filter.name].max}`
                  : filterInputs[filter.name]
                : ""
            }
            onClick={() => toggleFilter(filter.name)}
            readOnly
          />

          <button onClick={() => selectOption(filter.name, "")} style={{ fontSize: "30px", color: "white"}}>×</button>

          {activeFilter === filter.name && (
            <ul className="dropdown">
              {getFilterOptions(filter).map((option, i) => (
                <li key={i} onClick={() => selectOption(filter.name, option)}>
                  {option}
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
