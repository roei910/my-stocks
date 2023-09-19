import React from "react";
import axios from "axios";

function Body() {
  const stocksList = [{ id: 1, name: "Apple", symbol: "AAPL", price: "85.00" }];

  function createRow(item) {
    // axios
    //   .get("https://dog.ceo/api/breeds/image/random")
    //   .then(function (response) {
    //     // handle success
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .finally(function () {
    //     // always executed
    //   });
    return (
      <tr key={item.id}>
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
      <table className="bg-blue">
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

export default Body;
