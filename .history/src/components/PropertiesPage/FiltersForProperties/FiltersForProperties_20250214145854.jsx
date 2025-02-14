import React, { useState, useEffect, useRef } from "react";
import locationImg from "../../../images/icons/filters/location.svg";
import propertyTypeImg from "../../../images/icons/filters/propertyType.svg";
import pricingRangeImg from "../../../images/icons/filters/pricingRange.svg";
import propertySizeImg from "../../../images/icons/filters/propertySize.svg";
import buildYearImg from "../../../images/icons/filters/buildYear.svg";
import arrowToBottomImg from "../../../images/icons/filters/arrow-to-bottom.svg";
import "./properitesFilters.scss";

const FiltersForProperties = ({ onFiltersChange }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterInputs, setFilterInputs] = useState({});
  const [searchResults, setSearchResults] = useState({});
  const [filterData, setFilterData] = useState([]); // Данные фильтров из БД
  const dropdownRefs = useRef({});

  // Загружаем данные фильтров из API
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/filters");
        const data = await response.json();
        setFilterData(data);

        // Инициализируем состояние фильтров
        const initialInputs = {};
        const initialResults = {};
        data.forEach((filter) => {
          initialInputs[filter.name] = "";
          initialResults[filter.name] = filter.options;
        });
        setFilterInputs(initialInputs);
        setSearchResults(initialResults);
      } catch (err) {
        console.error("Ошибка загрузки фильтров:", err);
      }
    };

    fetchFilters();
  }, []);

  // Закрытие выпадающего списка при клике вне
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

  // Открытие/закрытие выпадающего списка
  const toggleFilter = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  // Обработка изменений ввода
  const handleInputChange = (filterName, value) => {
    setFilterInputs((prev) => ({
      ...prev,
      [filterName]: value,
  }));

    const options = filterData.find((f) => f.name === filterName).options;
    const filtered = options.filter((option) =>
      option.toLowerCase().startsWith(value.toLowerCase())
    );

    setSearchResults((prev) => ({
      ...prev,
      [filterName]: filtered,
    }));

    // Отправляем данные о выбранных фильтрах в родительский компонент
    const updatedFilters = { ...filterInputs, [filterName]: value };
    onFiltersChange(updatedFilters); // Передаем выбранные фильтры в родительский компонент
  };

  // Выбор опции
  const selectOption = (filterName, option) => {
    setFilterInputs((prev) => ({
      ...prev,
      [filterName]: option,
    }));
    setActiveFilter(null);

    // Отправляем данные о выбранных фильтрах в родительский компонент
    const updatedFilters = { ...filterInputs, [filterName]: option };
    onFiltersChange(updatedFilters); // Передаем выбранные фильтры в родительский компонент
  };

  return (
    <div className="filters-for__properties">
      {filterData.map((filter, index) => (
        <div className="filter__item" key={index} ref={(el) => (dropdownRefs.current[filter.name] = el)}>
          <img
            src={
              filter.name === "location"
                ? locationImg
                : filter.name === "type"
                ? propertyTypeImg
                : filter.name === "pice"
                ? pricingRangeImg
                : filter.name === "propertySize"
                ? propertySizeImg
                : buildYearImg
            }
            alt=""
          />
          <input
            type="text"
            placeholder={filter.name}
            value={filterInputs[filter.name]}
            onClick={() => toggleFilter(filter.name)}
            onChange={(e) => handleInputChange(filter.name, e.target.value)}
          />
          {activeFilter === filter.name && searchResults[filter.name]?.length > 0 && (
            <ul className="dropdown">
              {searchResults[filter.name].map((option, i) => (
                <li
                  key={i}
                  onClick={() => selectOption(filter.name, option)}
                >
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
