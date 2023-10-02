import React, { useState, useEffect } from "react";
import axios from "axios";
import { getConnectionToken } from "../utils/cookies";

function StocksPage() {
  const [stocksList, setStocksList] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(checkTokenAndGetStocks, [setStocksList]);

  function checkTokenAndGetStocks() {
    getConnectionToken().then((token) => {
      if (token === null) return;
      axios
        .get(`http://localhost:8000/stocks/all`, {
          headers: {
            "content-type": "application/json;charset=utf-8",
            "x-access-token": token,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setStocksList(
              response.data.stocks.map((stock, index) => {
                return { id: index+1, symbol: stock };
              })
            );
            setStocksList([...response.data.stocks]);
            setEmail(response.data.email);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

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
      <h1>Welcome {email}!</h1>
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
