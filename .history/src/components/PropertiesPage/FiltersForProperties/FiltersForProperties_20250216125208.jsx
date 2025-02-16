import React, { useState, useEffect, useRef } from "react";
import locationImg from "../../../images/icons/filters/location.svg";
import propertyTypeImg from "../../../images/icons/filters/propertyType.svg";
import pricingRangeImg from "../../../images/icons/filters/pricingRange.svg";
import buildYearImg from "../../../images/icons/filters/buildYear.svg";
import "./properitesFilters.scss";

const FiltersForProperties = ({ onFiltersChange, apartments }) => {  // apartments - данные о квартирах
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterInputs, setFilterInputs] = useState({});
  const [filteredApartments, setFilteredApartments] = useState(apartments);  // Состояние для фильтрованных квартир
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
    let newFilterInputs = {
      ...filterInputs,
      [filterName]: option,
    };

    // Обработка ценового диапазона и площади
    if (filterName === "price" || filterName === "propertySize") {
      const [min, max] = option.split(" - ").map(Number);
      newFilterInputs[filterName] = { min, max };  // Сохраняем как объект { min, max }
    }

    // Если новый фильтр отличается от старого, обновляем его
    if (newFilterInputs[filterName] !== filterInputs[filterName]) {
      setFilterInputs(newFilterInputs);
      setActiveFilter(null);

      // Отправляем обновленные фильтры в родительский компонент
      onFiltersChange(newFilterInputs);
      filterApartments(newFilterInputs); // Обновление фильтрованных квартир
    }
  };

  const handleInputChange = (filterName, value) => {
    setFilterInputs((prevInputs) => {
      const newInputs = {
        ...prevInputs,
        [filterName]: value,
      };
      filterApartments(newInputs);  // Обновляем фильтрованные квартиры
      return newInputs;
    });
  };

  const filterApartments = (filterInputs) => {
    let filtered = apartments;

    // Фильтрация по ценовому диапазону
    if (filterInputs.price) {
      const { min, max } = filterInputs.price;
      filtered = filtered.filter(
        (apartment) =>
          apartment.price >= min && apartment.price <= max
      );
    }

    // Фильтрация по площади
    if (filterInputs.propertySize) {
      const { min, max } = filterInputs.propertySize;
      filtered = filtered.filter(
        (apartment) =>
          apartment.size >= min && apartment.size <= max
      );
    }

    // Фильтрация по местоположению (если есть)
    if (filterInputs.location) {
      filtered = filtered.filter(
        (apartment) => apartment.location === filterInputs.location
      );
    }

    // Фильтрация по типу (если есть)
    if (filterInputs.type) {
      filtered = filtered.filter(
        (apartment) => apartment.type === filterInputs.type
      );
    }

    // Фильтрация по году постройки (если есть)
    if (filterInputs.buildYear) {
      filtered = filtered.filter(
        (apartment) => apartment.buildYear === filterInputs.buildYear
      );
    }

    setFilteredApartments(filtered);  // Обновление состояния с отфильтрованными квартирами
  };

  const getFilterOptions = (filter) => {
    switch (filter.name) {
      case "price":
        return filter.priceOptions ? filter.priceOptions.map((option) => `${option.min} - ${option.max}`) : [];
      case "propertySize":
        return filter.sizeOptions ? filter.sizeOptions.map(option => `${option.min} - ${option.max}`) : [];
      case "location":
        return filter.locationOptions || [];
      case "type":
        return filter.typeOptions || [];
      case "buildYear":
        return filter.yearOptions || [];
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
            value={filterInputs[filter.name] || ""}
            onChange={(e) => handleInputChange(filter.name, e.target.value)}  // Обработчик изменения для инпута
            onClick={() => toggleFilter(filter.name)}
          />

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

      {/* Отображение карточек */}
      <div className="filtered-apartments">
        {filteredApartments.map((apartment) => (
          <div key={apartment.id} className="apartment-card">
            <h3>{apartment.name}</h3>
            <p>Цена: {apartment.price} грн</p>
            <p>Площадь: {apartment.size} м²</p>
            <p>Локация: {apartment.location}</p>
            <p>Тип: {apartment.type}</p>
            <p>Год постройки: {apartment.buildYear}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiltersForProperties;
