'use client';

import { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import Result from './Result'; // Assuming Result component is available
import ResultDisplayed from './ResultDisplayed';

export default function SearchEngine() {

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [resultSelected, setResultSelected] = useState(null);
    const containerRef = useRef(null);

    const onSearch = async (query) => {
        if (!query) return; // Don't trigger search if query is empty
        setLoading(true);
        setError(null);
        setShowResults(false); // Hide results initially while loading

        try {
            const response = await fetch(`/api/lookup?query=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch results');
            }
            const data = await response.json();
            if (data.length > 0) {
                setResults(data);
            } else {
                setError('No results found.');
                setResults([]);
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching results.');
            setResults([]);
        } finally {
            setLoading(false);
            setShowResults(true); // Show results with animation after data is fetched
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
                const scrollable = (scrollHeight > clientHeight);
                setIsAtTop(!scrollable || (scrollTop == 0));
                setIsAtBottom(!scrollable || (scrollTop + clientHeight == scrollHeight));
            }
        };

        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);

        return () => container.removeEventListener('scroll', handleScroll);

    }, []);

    const maskClass = `relative w-full max-h-96 overflow-y-scroll pr-1 ${
        !isAtTop && !isAtBottom ? 'mask-gradient' : (isAtTop && isAtBottom ? '' : (isAtTop ? 'mask-gradient-bottom' : 'mask-gradient-top'))
    }`;

    return (
        <>
            <div className="relative w-full sm:w-1/2">
                <SearchBar onSearch={onSearch} />
                {loading && <p className='my-5'>Loading...</p>}
                {error && <p className="text-red-500 my-5">{error}</p>}
                
                <div
                    className={`w-full transition-all duration-500 ease-in-out transform ${
                        showResults ? 'translate-y-5' : 'translate-y-0'
                    }`}
                >
                    <div className={maskClass} ref={containerRef}>
                        {showResults && results.map((result, index) => (
                            <Result key={index} {...result} delay={100 + index * 100} onSelect={() => setResultSelected(result)}/>
                        ))}
                    </div>
                </div>
            </div>
            {resultSelected != null && <ResultDisplayed {...resultSelected} onClose={() => setResultSelected(null)} />}
        </>
    );
}
