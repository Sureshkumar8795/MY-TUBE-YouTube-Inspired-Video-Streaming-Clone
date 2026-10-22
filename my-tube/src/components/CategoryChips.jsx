import React from 'react';

export default function CategoryChips({
  categories,
  selectedCategory,
  onSelectCategory
}) {
  return (
    <div className="category-bar-wrapper">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
