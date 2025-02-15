import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FiltersForProperties = () => {
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    price: '',
    propertySize: '',
    buildYear: '',
    type: ''
  });

  useEffect(() => {
    // Получаем фильтры с сервера
    axios.get('http://localhost:5000/api/filters')
      .then((response) => {
        setFilters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching filters:', error);
      });
  }, []);

  const handleFilterChange = (e, filterName) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterName]: e.target.value
    });
  };

  return (
    <div className="filters-container">
      {filters.map((filter) => {
        const { name, options } = filter;
        if (!options || options.length === 0) return null;

        return (
          <div key={name} className="filter">
            <label>{name}</label>
            <select
              value={selectedFilters[name] || ''} // Убедитесь, что value всегда инициализировано
              onChange={(e) => handleFilterChange(e, name)}
            >
              <option value="">Select {name}</option>
              {options.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default FiltersForProperties;
