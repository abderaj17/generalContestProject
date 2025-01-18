import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import { searchCoins, sortCoins } from '../redux/coinSlice';

function SearchSort() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    dispatch(searchCoins(query));
  };

  const handleSort = (key, order) => {
    dispatch(sortCoins({ key, order }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => handleSort('market_cap', 'asc')}>Sort by Market Cap Asc</button>
      <button onClick={() => handleSort('market_cap', 'desc')}>Sort by Market Cap Desc</button>
    </div>
  );
}

export default SearchSort;