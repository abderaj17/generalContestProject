import React from 'react'

const Data = () => {
   const fetchDataWithThen =()=>{
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => console.error('Error fetching data:', error));
   }
   async function fetchDataWithAsync() {
    try{
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      const data = await response.json();
    }    catch(error){
      console.error('Error fetching data:', error);
    }
   }
   fetchDataWithAsync();
  return (
    <div>
        <h1>Hii there</h1>
    </div>
  )
}

export default Data