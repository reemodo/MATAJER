import { useState } from "react";
import "./App.css";
import Item from "./components/item/Item";
import Selected from "./components/selectedItem/Selected";
import { Input } from "@mui/material";
import Payment from "./components/PaymentMethods/Payment.js/Payment";

const items = [
  "something",
  "something",
  "something",
  "something",
  "something",
  "something",
  "something",
  "something",
  "something",
  "something",
  "something",
  "something",
];

const itemsList = items.map((item) => <Item name={item} />);

function App() {
  const [selectedItems, setSelectedItems] = useState([
    { id: 1, category: "Bread", price: 13.9, qty: 2 },
    { id: 2, category: "Milk", price: 10.5, qty: 2 },
    { id: 3, category: "Bread", price: 13.9, qty: 1 },
    { id: 4, category: "Fruits", price: 7.5, qty: 3 },
    { id: 5, category: "Bread", price: 13.9, qty: 1 },
    { id: 6, category: "Vegetables", price: 5.0, qty: 4 },
    { id: 7, category: "Vegetables", price: 5.0, qty: 4 },
    { id: 8, category: "Vegetables", price: 5.0, qty: 4 },
    { id: 9, category: "Vegetables", price: 5.0, qty: 4 },
    { id: 10, category: "Vegetables", price: 5.0, qty: 4 },
    { id: 11, category: "Vegetables", price: 5.0, qty: 4 },
    { id: 12, category: "Vegetables", price: 5.0, qty: 4 },
  ]);

  const [inputValue, setInputValue] = useState(0);
  const [inputPercentageValue, setInputPercentageValue] = useState(0);
  const [discountedPrice, setdiscountedPrice] = useState(0);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setInputPercentageValue(
      ((event.target.value / formattedSum) * 100).toFixed(2)
    );
    setdiscountedPrice((totalSum - inputValue).toFixed(2));
  };

  const handleInputPercentageChange = (event) => {
    setInputPercentageValue(event.target.value);
    setInputValue(((formattedSum * event.target.value) / 100).toFixed(2));
    setdiscountedPrice((totalSum - inputValue).toFixed(2));
  };

  const handleDelete = (id) => {
    const updatedItems = selectedItems.filter((item) => item.id !== id);
    setSelectedItems(updatedItems);
  };

  const handleUpdateQuantity = (id, newQty) => {
    const updatedItems = selectedItems.map((item) =>
      item.id === id ? { ...item, qty: newQty } : item
    );
    setSelectedItems(updatedItems);
  };

  const handleUpdatePrice = (id, newPrice) => {
    const updatedItems = selectedItems.map((item) =>
      item.id === id ? { ...item, price: newPrice } : item
    );
    setSelectedItems(updatedItems);
  };

  const uniqueCategories = new Set(selectedItems.map((item) => item.category));
  const numberOfUniqueCategories = uniqueCategories.size;
  const totalSum = selectedItems.reduce((accumulator, item) => {
    return accumulator + item.price * item.qty;
  }, 0);
  const formattedSum = totalSum.toFixed(2);
  const discountedPriceValue = (totalSum - inputValue).toFixed(2);
  return (
    <div className="mainContainer">
      <div className="sellingContainer">
        <div className="searchingDiv">
          <input className="searchItem" />
          <button className="searchButton">Search</button>
        </div>
        <Selected
          selectedItems={selectedItems}
          deleteItem={handleDelete}
          updateQuantity={handleUpdateQuantity}
          updatePrice={handleUpdatePrice}
        />
        <div className="sumAndPaymentContainer">
          <div className="finalSum">
            <p>num of category : {numberOfUniqueCategories}</p>
            <p>sum : {formattedSum}</p>
            <div className="DiscountDiv">
              <p>Discount : </p>
              <div className="DiscountSplitting">
                <p>N</p>
                <input
                  type="number"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <p>%</p>
                <input
                  type="number"
                  value={inputPercentageValue}
                  onChange={handleInputPercentageChange}
                />
              </div>
            </div>
            <p>Price after Discount : {discountedPriceValue}</p>
          </div>
          <div className="paymentDiv">
            <Payment
              finalPrice={discountedPriceValue}
              setFinalPrice={setdiscountedPrice}
            />
          </div>
        </div>
      </div>
      <div className="itemsContainer">{itemsList}</div>
    </div>
  );
}

export default App;
