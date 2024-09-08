import React, { useState } from "react";
import "./selected.css";
import FormDialog from "../dialog/Dialog";

function SelectedItemsContainer({
  selectedItems,
  updateQuantity,
  deleteItem,
  updatePrice,
}) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
  };

  const handleUpdateQuantity = (newQty) => {
    if (selectedItem) {
      updateQuantity(selectedItem.id, newQty);
    }
    setSelectedItem(null);
  };

  const handleUpdatePrice = (newPrice) => {
    if (selectedItem) {
      updatePrice(selectedItem.id, newPrice);
    }
    setSelectedItem(null);
  };

  return (
    <div className="tableContainer">
      <table className="selectedItemsTable">
        <thead>
          <tr>
            <th>Delete</th>
            <th>ID</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((item) => (
            <tr key={item.id}>
              <td className="deleteContainer">
                <button onClick={() => deleteItem(item.id)}>X</button>
              </td>
              <td className="idContainer">
                <div>{item.id}</div>
              </td>
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
                <div>{item.qty}</div>
              </td>
              <td className="totalContainer">{item.price * item.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedItem && (
        <FormDialog
          open={!!selectedItem}
          initialQty={selectedItem.qty}
          initialPrice={selectedItem.price}
          onClose={() => setSelectedItem(null)}
          saveQuantity={handleUpdateQuantity}
          savePrice={handleUpdatePrice}
        />
      )}
    </div>
  );
}

export default SelectedItemsContainer;
