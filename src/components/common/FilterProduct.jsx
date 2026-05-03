"use client"
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const FilterProduct = ({ categories, brands, selectedCategory, selectedBrand, handleFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={filterRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        type="button" className="capitalize px-5 py-2 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer">
        <FontAwesomeIcon icon={faFilter} className="text-orange-400 mr-2"/>Bộ lọc
      </button>
      
      <div className={`absolute top-0 right-full mr-2 z-50 bg-white p-5 w-64 shadow-xl rounded border border-gray-200 ${isOpen ? '' : 'hidden'}`} id="filterArea">
        <div className="mb-4">
          <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Thể loại</h3>
          <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
            <li>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                <input type="radio" name="filterCat" value="" onChange={(e) => { handleFilterChange(e); setIsOpen(false); }} checked={selectedCategory === ''} className="accent-orange-500 w-4 h-4 cursor-pointer" />
                Tất cả
              </label>
            </li>
            {categories && categories.map(cat => (
              <li key={`cat-${cat.id}`}>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                  <input type="radio" name="filterCat" value={cat.id} onChange={(e) => { handleFilterChange(e); setIsOpen(false); }} checked={selectedCategory === String(cat.id)} className="accent-orange-500 w-4 h-4 cursor-pointer" />
                  {cat.category_name || cat.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 mb-3 border-b pb-2 mt-4">Tác giả</h3>
          <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
            <li>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                <input type="radio" name="filterBrand" value="" onChange={(e) => { handleFilterChange(e); setIsOpen(false); }} checked={selectedBrand === ''} className="accent-orange-500 w-4 h-4 cursor-pointer" />
                Tất cả
              </label>
            </li>
            {brands && brands.map(b => (
              <li key={`brand-${b.id}`}>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                  <input type="radio" name="filterBrand" value={b.id} onChange={(e) => { handleFilterChange(e); setIsOpen(false); }} checked={selectedBrand === String(b.id)} className="accent-orange-500 w-4 h-4 cursor-pointer" />
                  {b.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
