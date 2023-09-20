import React, { useState, useEffect } from "react";
import axios from "axios";

function StocksPage() {
  //original list before using state
  // const stocksList = [{ id: 1, name: "Apple", symbol: "AAPL", price: "85.00" }]; 
  const [stocksList, setStocksList] = useState([]);

  useEffect(() => {
    axios
    .get("http://localhost:8000/stocks/all")
    .then((response) => {
      setStocksList([...response.data.stocks]);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  function createRow(item, index) {
    return (
      // <tr key={item.id}> //when the id would be better to use
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.symbol}</td>
        <td>{item.price}</td>
      </tr>
    );
  }

  return (
    <div className="main-content">
      <h1>Welcome Roei!</h1>
      <h2>showing your list of stocks below</h2>
      <table className="bg-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>name</th>
            <th>symbol</th>
            <th>current value</th>
          </tr>
        </thead>
        <tbody>{stocksList.map(createRow)}</tbody>
      </table>
    </div>
  );
}

export default StocksPage;
