import React from 'react';
import { SearchX } from 'lucide-react';

export default function EmptyState({ searchQuery, onReset }) {
  return (
    <div className="empty-state">
      <div className="empty-icon-circle">
        <SearchX size={40} />
      </div>
      <h2 className="empty-title">No results found</h2>
      <p className="empty-subtitle">
        We couldn't find any videos matching "<strong>{searchQuery}</strong>". Try different keywords or reset your filters.
      </p>
      <button className="reset-search-btn" onClick={onReset}>
        Reset Search
      </button>
    </div>
  );
}
