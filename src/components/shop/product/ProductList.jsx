"use client";

import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductList({products, className = "", filterConfig = null}){
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const content = (
        <>
            {filterConfig && (
                <div className="absolute -top-6 right-0 z-50">
                    <button
                        onClick={() => setIsFilterOpen((current) => !current)}
                        type="button"
                        className="capitalize px-5 py-2 border border-gray-300 rounded font-medium text-gray-700 bg-white hover:bg-gray-100 transition cursor-pointer shadow-sm"
                    >
                        <FontAwesomeIcon icon={faFilter} className="text-orange-400 mr-1"/>
                        Bộ lọc
                    </button>
                    <div className={`absolute top-full right-0 mt-2 z-50 bg-white p-5 w-64 shadow-xl rounded border border-gray-200 ${isFilterOpen ? "" : "hidden"}`}>
                        <div className="mb-4">
                            <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Thể loại</h3>
                            <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
                                <li>
                                    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                                        <input
                                            type="radio"
                                            name="filterCat"
                                            value=""
                                            onChange={filterConfig.onFilterChange}
                                            checked={filterConfig.selectedCategory === ""}
                                            className="accent-orange-500 w-4 h-4 cursor-pointer"
                                        />
                                        Tất cả
                                    </label>
                                </li>
                                {filterConfig.categories.map(cat => (
                                    <li key={`cat-${cat.id}`}>
                                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                                            <input
                                                type="radio"
                                                name="filterCat"
                                                value={cat.id}
                                                onChange={filterConfig.onFilterChange}
                                                checked={filterConfig.selectedCategory === String(cat.id)}
                                                className="accent-orange-500 w-4 h-4 cursor-pointer"
                                            />
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
                                        <input
                                            type="radio"
                                            name="filterBrand"
                                            value=""
                                            onChange={filterConfig.onFilterChange}
                                            checked={filterConfig.selectedBrand === ""}
                                            className="accent-orange-500 w-4 h-4 cursor-pointer"
                                        />
                                        Tất cả
                                    </label>
                                </li>
                                {filterConfig.brands.map(brand => (
                                    <li key={`brand-${brand.id}`}>
                                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                                            <input
                                                type="radio"
                                                name="filterBrand"
                                                value={brand.id}
                                                onChange={filterConfig.onFilterChange}
                                                checked={filterConfig.selectedBrand === String(brand.id)}
                                                className="accent-orange-500 w-4 h-4 cursor-pointer"
                                            />
                                            {brand.name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            {products.map(product=>(
                <ProductCard key={product.id} product={product}/>
            ))}
        </>
    );

    if (className) {
        return (
            <div className={`relative ${className}`}>
                {content}
            </div>
        );
    }

    return(
        <>
            {content}
        </>
    );
}
