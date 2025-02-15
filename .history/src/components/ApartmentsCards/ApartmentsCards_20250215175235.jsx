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
    if (filters && Object.keys(filters).length > 0) {
        applyFilters(apartmentCards, filters);
    } else {
        setFilteredCards(apartmentCards); // Если фильтры пустые, возвращаем все квартиры
    }
}, [filters, apartmentCards]);
  

    useEffect(() => {
        console.log("Filters:", filters); // Логируем фильтры
        console.log("Apartment Cards:", apartmentCards); // Логируем данные о квартирах
        if (filters && apartmentCards.length > 0) {
            applyFilters(apartmentCards, filters);
        }
    }, [filters, apartmentCards]);
    

    const applyFilters = (apartments = [], filters = {}) => {
        if (!filters || Object.keys(filters).length === 0) {
            return apartments; // Если фильтры пустые, возвращаем все квартиры
        }
    
        return apartments.filter((apartment) => {
            return Object.keys(filters).every((key) => {
                const filterValue = filters[key];
                const apartmentValue = apartment[key];
    
                if (key === "price") {
                    // Логика фильтрации по диапазону цен
                    const { min, max } = filterValue;
                    return apartmentValue >= min && apartmentValue <= max;
                }
    
                if (typeof apartmentValue === 'string') {
                    return apartmentValue.toLowerCase().includes(filterValue.toLowerCase());
                }
    
                if (typeof apartmentValue === 'number') {
                    return apartmentValue <= Number(filterValue);
                }
    
                return true;
            });
        });
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