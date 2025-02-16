import React, { useState, useEffect } from "react";
import Select from "react-select";
import locationImg from "../../../images/icons/filters/location.svg";
import propertyTypeImg from "../../../images/icons/filters/propertyType.svg";
import pricingRangeImg from "../../../images/icons/filters/pricingRange.svg";
import buildYearImg from "../../../images/icons/filters/buildYear.svg";
import "./properitesFilters.scss";

const FiltersForProperties = ({ onFiltersChange }) => {
  const [filterInputs, setFilterInputs] = useState({});
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/filters");
        const data = await response.json();
        setFilterData(data);

        // Инициализируем фильтры
        const initialInputs = {};
        data.forEach((filter) => {
          initialInputs[filter.name] = null;
        });
        setFilterInputs(initialInputs);
      } catch (err) {
        console.error("Ошибка загрузки фильтров:", err);
      }
    };

    fetchFilters();
  }, []);

  const selectOption = (filterName, selectedOption) => {
    const newFilterInputs = {
      ...filterInputs,
      [filterName]: selectedOption,
    };
    setFilterInputs(newFilterInputs);
    onFiltersChange(newFilterInputs);
  };

  const getFilterOptions = (filter) => {
    switch (filter.name) {
      case "price":
        return filter.priceOptions.map((option) => ({
          value: `${option.min}-${option.max}`,
          label: `${option.min} - ${option.max}`,
        }));
      case "propertySize":
        return filter.sizeOptions.map((option) => ({
          value: option,
          label: option,
        }));
      case "location":
        return filter.locationOptions.map((option) => ({
          value: option,
          label: option,
        }));
      case "type":
        return filter.typeOptions.map((option) => ({
          value: option,
          label: option,
        }));
      case "buildYear":
        return filter.yearOptions.map((option) => ({
          value: option,
          label: option,
        }));
      default:
        return [];
    }
  };

  return (
    <div className="filters-for__properties">
      {filterData.map((filter, index) => (
        <div className="filter__item" key={index}>
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
          <Select
            options={getFilterOptions(filter)}
            value={filterInputs[filter.name]}
            onChange={(selectedOption) => selectOption(filter.name, selectedOption)}
            placeholder={filter.name}
            isClearable
          />
        </div>
      ))}
    </div>
  );
};

export default FiltersForProperties;
