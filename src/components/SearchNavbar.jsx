"use client";

import { FiSearch } from "react-icons/fi";

export default function SearchNavbar() {
  return (
    <div className="search__Navbar">
      <div className="search__books">
        <div className="search__input-wrapper">
          <input
            type="text"
            className="search__input"
            placeholder="Search for books"
          />

          <button type="button" className="search__button">
            <FiSearch />
          </button>
        </div>
      </div>
    </div>
  );
}