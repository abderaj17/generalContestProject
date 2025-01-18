import React from 'react';
import { useSelector } from 'react-redux';
import { selectError, selectFilteredData, selectStatus } from '../redux/coinSlice';
// import '..App.css/'
function Table() {
    const coins = useSelector(selectFilteredData); // Use the memoized selector
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
  
    if (status === 'loading') {
      return <p>Loading data...</p>;
    }
  
    if (status === 'failed') {
      return <p>Error loading data. Please try again later.</p>;
    }
  
    if (!coins || coins.length === 0) {
      return <p>No data available.</p>;
    }
  
    return (
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Current Price</th>
            <th>Total Volume</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td>
                <img src={coin.image} alt={coin.name} width="30" />
              </td>
              <td>{coin.name}</td>
              <td>{coin.symbol}</td>
              <td>${coin.current_price}</td>
              <td>${coin.total_volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  export default Table;