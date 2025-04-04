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
    let newFilterInputs = {
      ...filterInputs,
      [filterName]: option,
    };
  
    if (filterName === "price" || filterName === "propertySize") {
      if (option === "") {
        newFilterInputs[filterName] = { min: null, max: null };
      } else {
        const [min, max] = option.split(" - ").map(Number);
        newFilterInputs[filterName] = { min, max };
      }
    }
  
    if (newFilterInputs[filterName] !== filterInputs[filterName]) {
      setFilterInputs(newFilterInputs);
      setActiveFilter(null);
  
      onFiltersChange(newFilterInputs);
    }
  };  

  const getFilterOptions = (filter) => {
    switch (filter.name) {
      case "price":
        return filter.priceOptions.map(option => `${option.min} - ${option.max}`);
      case "propertySize":
        return filter.sizeOptions.map(option => `${option.min} - ${option.max}`);
      case "type":
        return filter.typeOptions;
      case "buildYear":
        return filter.yearOptions;
      case "location":
        return filter.locationOptions;
      default:
        return [];
    }
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
