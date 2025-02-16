import React, { useState } from 'react';
import Header from '../HomePage/Header/Header';
import FeaturedTitle from '../FeaturedTitle';
import ApartmentsCards from '../ApartmentsCards/ApartmentsCards';
import './propertiesPage.scss';
import searchIcon from "../../images/icons/searchIcon.svg";
import FiltersForProperties from "./FiltersForProperties/FiltersForProperties";
import ClientMessageForm from './ClientMessageForm/ClientMessageForm';

function PropertiesPage () {
  const [filters, setFilters] = useState({});
  
  // Функция для изменения фильтров
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
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
          </div>
          <div className="outline-for__filters">
            {/* Передаем handleFiltersChange для обновления состояния фильтров */}
            <FiltersForProperties onFiltersChange={handleFiltersChange} />
          </div>
        </div>     
        <div className="properties__cards">
          <FeaturedTitle showButton={false} title="Discover a World of Possibilities" text="Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home"/>
          
          {/* Передаем текущие фильтры в ApartmentsCards */}
          <ApartmentsCards filters={filters} />
        </div>
        <FeaturedTitle showButton={false} title="Let's Make it Happen" text="Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Don't wait; let's embark on this exciting journey together"></FeaturedTitle>
      <ClientMessageForm></ClientMessageForm>
      </div>
    </div>
  );
}

export default PropertiesPage;