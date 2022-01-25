import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import cities from '../lib/city.list.json';

const SearchBox = ({ placeholder }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const clearQuery = () => setQuery('');

    Router.events.on('routeChangeComplete', clearQuery);

    return () => {
      Router.events.off('routeChangeComplete', clearQuery);
    };
  }, []);

  const onChange = (e) => {
    const { value } = e.target;

    setQuery(value);

    const matchingCities = [];

    if (value.length > 3) {
      for (const city of cities) {
        if (matchingCities.length >= 5) {
          break;
        }

        const match = city.name.toLowerCase().startsWith(value.toLowerCase());

        if (match) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/\s/g, '-')}-${city.id}`,
          };

          matchingCities.push(cityData);
        }
      }
    }

    setResults(matchingCities);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={query}
        placeholder={placeholder || ''}
        onChange={onChange}
      />

      {query.length > 3 && (
        <ul>
          {results.length > 0 ? (
            results.map((city) => (
              <li key={city.id}>
                <Link href={`/location/${city.slug}`}>
                  <a>
                    {city.name}
                    {city.state && `, ${city.state}`}{' '}
                    <span>({city.country})</span>
                  </a>
                </Link>
              </li>
            ))
          ) : (
            <li className="search__no-results">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
