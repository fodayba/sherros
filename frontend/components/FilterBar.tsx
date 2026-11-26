import React from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  totalResults
}) => {
  return (
    <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 sticky top-24 z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Categories scrollable pill list */}
        <div className="w-full md:w-auto overflow-x-auto flex items-center space-x-1.5 pb-1 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onFilterChange({ ...filters, category: cat.id })}
              className={`px-3.5 py-1.5 text-xs font-bold uppercase rounded-full whitespace-nowrap transition ${
                filters.category === cat.id
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Quick Filters: Sale, New, Sort */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-end space-x-2 text-xs">
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onFilterChange({ ...filters, onlySale: !filters.onlySale })}
              className={`px-3 py-1.5 rounded-lg border font-bold uppercase transition ${
                filters.onlySale 
                  ? 'bg-[#ff4646] text-white border-[#ff4646]' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-black'
              }`}
            >
              Sale Only
            </button>

            <button
              onClick={() => onFilterChange({ ...filters, onlyNew: !filters.onlyNew })}
              className={`px-3 py-1.5 rounded-lg border font-bold uppercase transition ${
                filters.onlyNew 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-black'
              }`}
            >
              New In
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
            <select
              value={filters.sort}
              onChange={(e) => onFilterChange({ ...filters, sort: e.target.value as any })}
              className="bg-gray-100 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>

          <span className="text-gray-400 hidden lg:inline-block">|</span>
          <span className="text-gray-500 font-medium hidden lg:inline-block">
            {totalResults} styles found
          </span>
        </div>
      </div>
    </div>
  );
};
