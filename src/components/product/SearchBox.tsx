// SearchBox.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';

interface SearchBoxProps {
    onSearch: (query: string) => void; // Function to handle the search query
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(query); // Execute the search based on the current query
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search products by name..."
                value={query}
                onChange={handleChange}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBox;
