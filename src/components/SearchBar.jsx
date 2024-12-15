'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [placeholder, setPlaceholder] = useState("");
    const [query, setQuery] = useState("");

    const onChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch(query);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    useEffect(() => {
        let currentPlaceholder = "";
        "Let's go on an adventure...".split("").forEach((char, i) => {
            setTimeout(() => {
                currentPlaceholder = currentPlaceholder + char;
                setPlaceholder(currentPlaceholder);
            }, 75 * i);
        });
    }, []);

    return (
        <label className="relative block h-10 mb-3">
            <input
                className="p-2 bg-transparent w-full border border-white/50 rounded-lg hover:border hover:border-white/100 transition-all duration-700 outline-none text-sm sm:text-base"
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={handleKeyPress}
                type="text"
                aria-label="Search"
            />
            <MagnifyingGlassIcon
                className="absolute top-2 right-2 w-6 h-6 cursor-pointer"
                onClick={handleSearch}
            />
        </label>
    );
}