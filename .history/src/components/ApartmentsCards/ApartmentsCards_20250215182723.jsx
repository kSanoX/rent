import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./apartmentsCards.scss";
import PageListing from "../PageListing";
import bedroom from "../../images/icons/bedroom.svg";
import bathroom from "../../images/icons/bathroom.svg";
import villa from "../../images/icons/villa.svg";

function ApartmentsCards({ filters }) {
    const [apartmentCards, setApartmentCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        // Get cards in API
        const fetchApartmentCards = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cards');
                setApartmentCards(response.data);
                setFilteredCards(response.data);
            } catch (err) {
                console.error('Error fetching apartment cards', err);
            }
        };

        fetchApartmentCards();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            const filtered = apartmentCards.filter(card => {
                const { price, propertySize, location, type, buildYear } = card;
                const { price: priceFilter, propertySize: sizeFilter, location: locationFilter, type: typeFilter, buildYear: yearFilter } = filters;
        
                // Проверка диапазона для цены
                const priceInRange = 
                    !priceFilter || 
                    (priceFilter.min === undefined || priceFilter.max === undefined || 
                    (price >= priceFilter.min && price <= priceFilter.max));
        
                // Проверка для других фильтров
                const sizeInRange = sizeFilter === "" || propertySize === sizeFilter;
                const locationMatches = locationFilter === "" || location === locationFilter;
                const typeMatches = typeFilter === "" || type === typeFilter;
                const yearMatches = yearFilter === "" || buildYear === yearFilter;
        
                return priceInRange && sizeInRange && locationMatches && typeMatches && yearMatches;
            });
        
            setFilteredCards(filtered);
        };
        
        
    
        applyFilters();
    }, [filters, apartmentCards]);  // Срабатывает каждый раз, когда фильтры или карточки меняются
    
      

    const normalizeValue = (value) => {
        if (value && typeof value === "string") {
            const numericValue = value.replace(/[^\d]/g, "");
            return numericValue ? parseInt(numericValue, 10) : 0;
        } else if (typeof value === "number") {
            return value;
        }
        return 0;
    };

    const compareValue = (cardValue, filterValue, unit) => {
        if (!cardValue || !filterValue) return false;

        let normalizedCardValue = normalizeValue(cardValue);
        const rangeRegex = /(\d+)\s?-\s?(\d+)/;

        // Обработка диапазонов (например, цен или площади)
        if (filterValue.match(rangeRegex)) {
            const matches = filterValue.match(rangeRegex);
            const minValue = normalizeValue(matches[1]);
            const maxValue = normalizeValue(matches[2]);

            return normalizedCardValue >= minValue && normalizedCardValue <= maxValue;
        }

        return false;
    };

    const cardsPerPage = 3;
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
    const currentCards = filteredCards.slice(
        (currentPage - 1) * cardsPerPage,
        currentPage * cardsPerPage
    );

    return (
        <div className="featured__container">
            <div className="featured__cards-container">
                {filteredCards.length === 0 ? (
                    <p>No apartments match the filters</p>
                ) : (
                    currentCards.map((card) => (
                        <div key={card._id} className="featured__item">
                            <img src={`http://localhost:5000${card.image}`} alt={card.title} />
                            <h2 className='card__title'>{card.title}</h2>
                            <div className="featured__item-title">
                                <p>{card.description}</p>
                            </div>
                            <div className="featured__item-info">
                                <div className="bedroom">
                                    <img src={bedroom} alt="bedroom" />
                                    {card.bedroomCount} Bedrooms
                                </div>
                                <div className="bathroom">
                                    <img src={bathroom} alt="bathroom" />
                                    {card.bathroomCount} Bathrooms
                                </div>
                                <div className="villa">
                                    <img src={villa} alt="villa" />
                                    {card.type}
                                </div>
                            </div>
                            <p>Price</p>
                            <div className="featured__item-price">
                                <span>{card.price}$</span>
                                <button
                                    className="browse__properties-btn"
                                    onClick={() => navigate(`/property-details/${card._id}`)}
                                >
                                    View Property Details
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <PageListing
                filteredCards={filteredCards}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default ApartmentsCards;
