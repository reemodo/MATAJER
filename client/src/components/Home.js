import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Item from './item/Item';
import Selected from './selectedItem/Selected';
import Payment from './PaymentMethods/Payment.js/Payment';
import { useGetItems } from './hooks/useGetItems';
import Modal from './modal/Modal'; // Import the Modal component
import FormDialog from './dialog/Dialog';
export function Home(props) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [inputPercentageValue, setInputPercentageValue] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [totalPrice,setTotalPrice]= useState(0)
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputDiscountValue, setInputDiscountValue] = useState()
  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };
  const { isLoading, error, fetchItems } = useGetItems();
  
  // Handle search and open the modal
  const handleSearch = async () => {
    try {
      const data = await fetchItems(inputValue); // Fetch items using search input
      if (!isLoading && data && data.length >1) {
        setSearchResults(data); // Set search results
        setModalOpen(true); // Open the modal
      }
      else if (!isLoading && data && data.length ==1) {
        const existItem = selectedItems.find((item)=>data[0].productid === item.productid)
        setSelectedItems([...selectedItems,data[0]]); // Set search results
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
  

  // Handle item selection from modal
  const handleSelectItem = (item) => {
    setSelectedItems([...selectedItems, item]);
    setModalOpen(false); // Close the modal after selecting an item
  };
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputDiscountValue(value); // Update the discount value
  
    // Calculate the percentage discount based on the total sum
    const discountValue = parseFloat(value) || 0;
    const percentage = ((discountValue / totalSum) * 100).toFixed(2);
    setInputPercentageValue(percentage);
  };
  const handleInputPercentageChange = (event) => {
    const percentage = event.target.value;
    setInputPercentageValue(percentage);
  
    // Calculate the discount amount based on the percentage
    const percentageValue = parseFloat(percentage) || 0;
    const discountAmount = ((totalSum * percentageValue) / 100).toFixed(2);
    setInputDiscountValue(discountAmount);
  };

  // Handle delete, update price and quantity
  const handleDelete = (id) => {
    const updatedItems = selectedItems.filter((item) => item.productid !== id);
    setSelectedItems(updatedItems);
  };

  const updateQuantityAndPrice = (productid, newQty, newPrice) => {
    setSelectedItems((items) =>
      items.map((item) =>
        item.productid === productid
          ? { ...item, qty: newQty, price: newPrice }
          : item
      )
    );
    setOpenDialog(false); // Close the dialog
  };

  // Calculating total sum and unique categories (memoized for performance)
  const totalSum = useMemo(() => {
    return selectedItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.qty;
    }, 0).toFixed(2);
  }, [selectedItems]);

  const uniqueCategories = useMemo(() => {
    return new Set(selectedItems.map((item) => item.category)).size;
  }, [selectedItems]);

  const discountAmount = useMemo(() => {
    // Ensure inputPercentageValue is a number and handle cases where it might not be defined
    const percentageValue = parseFloat(inputPercentageValue) || 0;
    const total = parseFloat(totalSum) || 0;
    return ((total * percentageValue) / 100).toFixed(2);
  }, [totalSum, inputPercentageValue]);

  // Calculating the discounted price (based on inputValue)
  const discountedPrice = useMemo(() => {
    // Ensure inputValue is a number and handle cases where it might not be defined
    const discountAmount = parseFloat(inputDiscountValue) || 0;
    const total = parseFloat(totalSum) || 0;
    return (total - discountAmount).toFixed(2);
  }, [totalSum, inputDiscountValue]);

  
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Call the search function when Enter is pressed
    }
  };

  return (
    <div className="mainContainer">
      <div className="sellingContainer">
        <div className="searchingDiv">
          <input
            className="searchItem"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown} 
          />
          
          <button className="searchButton" onClick={handleSearch}>Search</button>
        </div>

       <Selected
          selectedItems={selectedItems}
          deleteItem={handleDelete}
          handleOpenDialog={handleOpenDialog}
        />
      {selectedItem && (
        <FormDialog
          open={openDialog}
          initialQty={selectedItem.qty}
          initialPrice={selectedItem.price}
          onClose={handleCloseDialog}
          saveQuantityAndPrice={(qty, price) =>
            updateQuantityAndPrice(selectedItem.productid, qty, price)
          }
        />
      )}

       

        <div className="sumAndPaymentContainer">
          <div className="finalSum">
            <p>num of category : {uniqueCategories}</p>
            <p>sum : {totalSum}</p>
            <div className="DiscountDiv">
              <p>Discount : </p>
              <div className="DiscountSplitting">
                <p>N</p>
                <input
                  type="number"
                  value={totalSum}
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
            <p>Discount Amount : {discountAmount}</p>
            <p>Price after Discount : {discountedPrice}</p>
          </div>
          <div className="paymentDiv">
            <Payment
              finalPrice={discountedPrice}
            />
          </div>
        </div>
      </div>
      <div className="itemsContainer">
        {selectedItems.map((item) => (
          <Item key={[item.productid]} id={item.productid} name={item.productname} />
        ))}
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        items={searchResults}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}
