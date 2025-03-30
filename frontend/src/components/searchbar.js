import React, { useEffect, useState } from "react";
import "../styles/searchbar.css";
import profileIcon from "../assets/profile_image_icon.png";

const SearchModal = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Static search results defined inside the component
    const searchResults = [
        { name: "Mark Larsen", detail: "Friend", type: "user" },
        { name: "Garden BBQ", detail: "Event", type: "event" },
        { name: "Meggie Luck", detail: "Mutual friends: 20", type: "user" },
        { name: "Burger Place No. 10", detail: "Restaurant", type: "restaurant" }
    ];

    // Filter search results based on user input
    const filteredResults = searchResults.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Close modal on Escape key press
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="search-modal-overlay" onClick={onClose}>
            <div className="search-modal" onClick={(e) => e.stopPropagation()}>
                {/* Search Input */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Type in search"
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="close-btn" onClick={onClose}>✖</button>
                </div>

                {/* Search Results */}
                <div className="search-results">
                    {filteredResults.length > 0 ? (
                        filteredResults.map((item, index) => (
                            <div className="result-item" key={index}>
                                {item.type === "user" ? (
                                    <img src={profileIcon} alt="User" className="avatar" />
                                ) : (
                                    <div className={`icon ${item.type}`}></div>
                                )}
                                <div className="result-text">
                                    <span className="name">{item.name}</span>
                                    <span className="detail">{item.detail}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-results">No results found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
