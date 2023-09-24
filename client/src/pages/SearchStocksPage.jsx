import React, { useState } from "react";
import axios from "axios";

const SearchStocksPage = () => {
  const [stocksList, setStocksList] = useState([]);

  function searchStock(event) {
    const searchValue = event.target[0].value;
    axios
      .get(`http://localhost:8000/stocks/name/${searchValue}`)
      .then((response) => {
        const stocksList = response.data.stocks;
        setStocksList([...stocksList]);
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  }

  return (
    <div className="main-content">
      <h1>Allowing you to search stocks and add them to your list</h1>
      <form onSubmit={searchStock}>
        <label>Search by stock name</label>
        <input type="search" id="searchInput" />
        <button type="submit" className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg></button>
      </form>
      {stocksList.length === 0 ? <h2>please enter a search term</h2> : <h2>your search result:</h2>}
      {stocksList.map((stk) => <p>{stk.name}, {stk.symbol}, {stk.price}</p>)}
    </div>
  );
};

export default SearchStocksPage;
