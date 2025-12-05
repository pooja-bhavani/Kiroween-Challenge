import { useState, FormEvent } from 'react';
import './SearchInput.css';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <form className="search-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query..."
        className="search-field"
      />
      <button type="submit" className="search-button" disabled={!query.trim()}>
        🔍 SEARCH
      </button>
    </form>
  );
}
