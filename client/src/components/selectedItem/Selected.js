import React, { useState } from "react";
import "./selected.css";
import FormDialog from "../dialog/Dialog"; // Ensure path is correct

function SelectedItemsContainer({
  selectedItems,
  handleOpenDialog,
  deleteItem,
  itemsDiscount,
}) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="tableContainer">
      <table className="selectedItemsTable">
        <thead>
          <tr>
            <th>Delete</th>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>

            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((item) => (
            <tr key={item.productid}>
              <td className="deleteContainer">
                <button onClick={() => deleteItem(item.productid)}>X</button>
              </td>
              <td className="idContainer">{item.productid}</td>
              <td className="idContainer">{item.productname}</td>
              <td className="categoryContainer">{item.category}</td>
              <td
                className="priceContainer"
                onClick={() => handleOpenDialog(item)}
              >
                {item.price}
              </td>

              <td
                className="qtyContainer"
                onClick={() => handleOpenDialog(item)}
              >
                {item.qty}
              </td>
              <td className="totalContainer">
                {item.qty ? item.price * item.qty : 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SelectedItemsContainer;
