import React, { useState, useMemo, useCallback } from "react";
import Item from "../item/Item";
import Search from "./Search";
import SumAndPayment from "./SumAndPayment";
import SelectedItems from "./SelectedItems";
import Modal from "../modal/Modal";
import { useGetItems } from "../hooks/useGetItems";
import { useGetItemDiscounts } from "../hooks/useGetItemDiscount";

const Home = () => {
  const [selectedItems, setSelectedItems] = useState([]); // table items
  const [inputValue, setInputValue] = useState(""); // searchbar
  const [inputPercentageValue, setInputPercentageValue] = useState(""); //
  const [inputDiscountValue, setInputDiscountValue] = useState(""); //
  const [modalOpen, setModalOpen] = useState(false); // modal
  const [searchResults, setSearchResults] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemsDiscount, setItemsDiscount] = useState({});
  const { isLoading, error, fetchItems } = useGetItems();
  const { isLoading1, error1, fetchItemDiscounts } = useGetItemDiscounts();

  const handleSelectItem = useCallback(
    async (item) => {
      try {
        const data = await fetchItemDiscounts(item.productid);

        if (data.length> 1) {
          setItemsDiscount((prevDiscounts) => ({
            ...prevDiscounts,
            [item.productid]: data,
          }));
        }

        setSelectedItems((prevItems) => {
          const itemExists = prevItems.find(
            (selected) => selected.productid === item.productid
          );

          if (itemExists) {
            return prevItems.map((i) =>
              i.productid === item.productid ? { ...i, qty: i.qty + 1 } : i
            );
          } else {
            return [...prevItems, { ...item, qty: 1 }];
          }
        });

        setModalOpen(false);
      } catch (error) {
        console.error("Error fetching item discounts:", error);
      }
    },
    [fetchItemDiscounts]
  );

  const handleSearch = useCallback(async () => {
    try {
      const data = await fetchItems(inputValue);

      if (data.length > 1) {
        setSearchResults(data);
        setModalOpen(true);
      } else if (data.length === 1) {
        const item = data[0];
        handleSelectItem(item);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }, [fetchItems, inputValue, handleSelectItem]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputDiscountValue(value);

    const total = parseFloat(totalSum) || 0;
    const percentage = total
      ? ((parseFloat(value) / total) * 100).toFixed(2)
      : 0;

    setInputPercentageValue(percentage);
  };

  const handleInputPercentageChange = (event) => {
    const percentage = event.target.value;
    setInputPercentageValue(percentage);

    const total = parseFloat(totalSum) || 0;
    const discount = total
      ? ((total * parseFloat(percentage)) / 100).toFixed(2)
      : 0;

    setInputDiscountValue(discount);
  };

  const handleDelete = (id) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.productid !== id)
    );
  };

  const updateQuantityAndPrice = (productid, newQty, newPrice) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item.productid === productid
          ? { ...item, qty: newQty, price: newPrice }
          : item
      )
    );
    setOpenDialog(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const totalSum = useMemo(() => {
    return selectedItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }, [selectedItems]);

  const uniqueCategories = useMemo(
    () => new Set(selectedItems.map((item) => item.category)).size,
    [selectedItems]
  );

  const discountAmount = useMemo(() => {
    const percentageValue = parseFloat(inputPercentageValue) || 0;
    const total = parseFloat(totalSum) || 0;
    return ((total * percentageValue) / 100).toFixed(2);
  }, [totalSum, inputPercentageValue]);

  const discountedPrice = useMemo(() => {
    const discount = parseFloat(inputDiscountValue) || 0;
    const total = parseFloat(totalSum) || 0;
    return (total - discount).toFixed(2);
  }, [totalSum, inputDiscountValue]);

  return (
    <div className="mainContainer">
      <div className="sellingContainer">
        <Search
          inputValue={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
        />

        {selectedItems.length > 0 ? (
          <SelectedItems
            selectedItems={selectedItems}
            handleDelete={handleDelete}
            handleOpenDialog={(item) => {
              setSelectedItem(item);
              setOpenDialog(true);
            }}
            selectedItem={selectedItem}
            openDialog={openDialog}
            updateQuantityAndPrice={updateQuantityAndPrice}
            handleCloseDialog={() => {
              setOpenDialog(false);
              setSelectedItem(null);
            }}
            itemsDiscount={itemsDiscount}
          />
        ) : (
          ""
        )}
        <SumAndPayment
          uniqueCategories={uniqueCategories}
          totalSum={totalSum}
          discountAmount={discountAmount}
          discountedPrice={discountedPrice}
          FinalPrice={discountedPrice}
          inputDiscountValue={inputDiscountValue}
          inputPercentageValue={inputPercentageValue}
          onInputChange={handleInputChange}
          onInputPercentageChange={handleInputPercentageChange}
          selectedItems={selectedItems}
        />
      </div>

      <div className="itemsContainer">
        {selectedItems.length > 0 ? (
          selectedItems.map((item) => (
            <Item
              key={item.productid}
              id={item.productid}
              name={item.productname}
            />
          ))
        ) : (
          <p>No items selected</p>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        items={searchResults}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
};

export default Home;
