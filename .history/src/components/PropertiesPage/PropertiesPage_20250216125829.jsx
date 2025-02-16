import React, { useState } from 'react';
import Header from '../HomePage/Header/Header';
import FeaturedTitle from '../FeaturedTitle';
import ApartmentsCards from '../ApartmentsCards/ApartmentsCards';
import './propertiesPage.scss';
import searchIcon from "../../images/icons/searchIcon.svg";
import FiltersForProperties from "./FiltersForProperties/FiltersForProperties";
import ClientMessageForm from './ClientMessageForm/ClientMessageForm';
import Fuse from "fuse.js"; // Импортируем библиотеку Fuse.js

function PropertiesPage () {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Функция для изменения фильтров
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Массив всех доступных карточек (предположим, что у вас есть такой массив)
  const allProperties = [
    { title: "Beautiful Apartment", description: "A beautiful city apartment", bedroomCount: 2, bathroomCount: 1, type: "Apartment", price: 500 },
    { title: "Luxury House", description: "A spacious luxury home", bedroomCount: 4, bathroomCount: 3, type: "House", price: 1000 },
    { title: "Modern Studio", description: "A cozy modern studio", bedroomCount: 1, bathroomCount: 1, type: "Studio", price: 300 },
    // Дополнительные карточки
  ];

  // Инициализация Fuse.js для поиска по карточкам
  const fuse = new Fuse(allProperties, {
    keys: ["title", "description", "bedroomCount", "bathroomCount", "type", "price"], // Указываем поля для поиска
    threshold: 0.3, // Порог для нечёткого поиска
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Обновляем стейт с текстом поиска
  };

  const handleSearchSubmit = () => {
    const results = fuse.search(searchQuery).map(({ item }) => item); // Получаем отфильтрованные карточки
    setFilteredProperties(results); // Обновляем состояние с отфильтрованными карточками
  };

  return (
    <div className="properties-container">
      <Header />
      <div className="properties-content__wrapper">
        <div className="table-of-content">
          <h1>Find Your Dream Property</h1>
          <p>Welcome to Estatein, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and <br /> a chance to redefine your life. With categories to suit every dreamer, your journey </p>
        </div>
        <div className="filter-table">
          <div className="outline">
            <div className="find__properties">
              <input
                type="text"
                placeholder="Search For A Property"
                value={searchQuery}
                onChange={handleSearchChange} // Обновляем текст при каждом изменении
              />
              <button
                className="find__properties btn"
                onClick={handleSearchSubmit} // Фильтруем при нажатии на кнопку
              >
                <img src={searchIcon} alt="" />
                Find Properties
              </button>
            </div>
          </div>
          <div className="outline-for__filters">
            {/* Передаем handleFiltersChange для обновления состояния фильтров */}
            <FiltersForProperties onFiltersChange={handleFiltersChange} />
          </div>
        </div>
        <div className="properties__cards">
          <FeaturedTitle
            showButton={false}
            title="Discover a World of Possibilities"
            text="Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home"
          />

          {/* Передаем текущие отфильтрованные карточки в ApartmentsCards */}
          <ApartmentsCards properties={filteredProperties.length > 0 ? filteredProperties : allProperties} />
        </div>
        <FeaturedTitle
          showButton={false}
          title="Let's Make it Happen"
          text="Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Don't wait; let's embark on this exciting journey together"
        />
        <ClientMessageForm />
      </div>
    </div>
  );
}

export default PropertiesPage;
