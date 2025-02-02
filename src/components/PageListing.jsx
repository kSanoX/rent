import React from 'react';
import "../App.scss";
import arrow from '../images/icons/arrow.svg';
import arrowWhite from '../images/icons/arrow-white.svg';

function PageListing({ filteredCards, currentPage, setCurrentPage, totalPages }) {
    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    return (
        <div className="page__listing">
            <p>
                <span>{currentPage}</span> of {totalPages}
            </p>
            <div className="page__listing-buttons">
                <button
                    className="left"
                    onClick={handlePrevClick}
                    disabled={currentPage === 1}
                >
                    <img src={arrow} alt="" />
                </button>
                <button
                    className="right"
                    onClick={handleNextClick}
                    disabled={currentPage === totalPages}
                >
                    <img src={arrowWhite} alt="" />
                </button>
            </div>
        </div>
    );
}

export default PageListing;
