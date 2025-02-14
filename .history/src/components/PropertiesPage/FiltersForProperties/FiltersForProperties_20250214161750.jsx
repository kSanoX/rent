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

  const handleInputChange = (filterName, value) => {
    setFilterInputs((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    onFiltersChange({ ...filterInputs, [filterName]: value });
  };

  const selectOption = (filterName, option) => {
    setFilterInputs((prev) => ({
      ...prev,
      [filterName]: option,
    }));
    setActiveFilter(null);
    onFiltersChange({ ...filterInputs, [filterName]: option });
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
          {filter.name === "price" || filter.name === "propertySize" ? (
            <input
              type="number"
              placeholder={`Введите ${filter.name}`}
              value={filterInputs[filter.name]}
              onChange={(e) =>
                handleInputChange(filter.name, e.target.value + "+")
              }
            />
          ) : (
            <>
              <input
                type="text"
                placeholder={filter.name}
                value={filterInputs[filter.name]}
                onClick={() => toggleFilter(filter.name)}
                onChange={(e) => handleInputChange(filter.name, e.target.value)}
              />
              {activeFilter === filter.name && (
                <ul className="dropdown">
                  {filter.options.map((option, i) => (
                    <li key={i} onClick={() => selectOption(filter.name, option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FiltersForProperties;
