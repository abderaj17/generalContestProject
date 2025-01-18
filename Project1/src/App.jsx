import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCoins } from './redux/coinSlice';
import SearchSort from './components/SearchSort';
import Table from './components/Table';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const status = useSelector((state)=> state.coins.status);

  useEffect(()=>{
    if(status === 'idle'){
      dispatch(fetchCoins());
    }
  }, [status, dispatch]);
  return (
    <div>
      <h1>Cryptocurrency Prices</h1>
   <SearchSort />
   <Table />
    </div>
  )
}

export default App