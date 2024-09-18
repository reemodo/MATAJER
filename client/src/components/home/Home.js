import React, { useState, useMemo, useCallback } from 'react';
import Item from '../item/Item';
import Search from './Search';
import SumAndPayment from './SumAndPayment';
import SelectedItems from './SelectedItems';
import Modal from '../modal/Modal';
import { useGetItems } from '../hooks/useGetItems';
import { useGetItemDiscounts } from '../hooks/useGetItemDiscount';
const Home = ({}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputPercentageValue, setInputPercentageValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputDiscountValue, setInputDiscountValue] = useState('');
  const [itemsDiscount, setItemsDiscount] = useState({})
  const { isLoading, error, fetchItems } = useGetItems();
  const { isLoading1, error1, fetchItemDiscounts } = useGetItemDiscounts();

  const handleSelectItem = useCallback(async (item) => {
    try {
      // Fetch the item discounts
      const data = await fetchItemDiscounts(item.productid);
      
      // Update the discounts state
      if (data) {
        setItemsDiscount(prevDiscounts => ({
          ...prevDiscounts,
          [item.productid]: data
        }));
        
      }
      
      // Update the selected items state
      setSelectedItems(prevItems => {
        const itemExists = prevItems.find(selected => selected.productid === item.productid);
  
        if (itemExists) {
          // Item exists, so update its quantity
          return prevItems.map(i =>
            i.productid === item.productid ? { ...i, qty: i.qty + 1 } : i
          );
        } else {
          // Item does not exist, so add it
          return [...prevItems, { ...item, qty: 1 }];
        }
      });
  
      // Close the modal
      setModalOpen(false);
    } catch (error) {
      console.error('Error fetching item discounts:', error);
    }
  }, [fetchItemDiscounts]);
  

  const handleSearch = useCallback(async () => {
    try {
      const data = await fetchItems(inputValue);
      
      if (data.length > 1) {
        // Handle multiple search results
        setSearchResults(data);
        setModalOpen(true);
      } else if (data.length === 1) {
        // Handle single search result
        const item = data[0];
        const existsItem = selectedItems.find(i => i.productid === item.productid);
  
          // Fetch item discounts and update state
          handleSelectItem(item);
        }
        
      
      
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }, [fetchItems, inputValue, selectedItems, handleSelectItem]);
  



  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputDiscountValue(value);
    const percentage = ((parseFloat(value) || 0) / parseFloat(totalSum || 1) * 100).toFixed(2);
    setInputPercentageValue(percentage);
  };

  const handleInputPercentageChange = (event) => {
    const percentage = event.target.value;
    setInputPercentageValue(percentage);
    const discount = ((parseFloat(totalSum || 0) * parseFloat(percentage || 0)) / 100).toFixed(2);
    setInputDiscountValue(discount);
  };

  const handleDelete = (id) => {
    setSelectedItems(prevItems => prevItems.filter(item => item.productid !== id));
  };

  const updateQuantityAndPrice = (productid, newQty, newPrice) => {
    setSelectedItems(prevItems =>
      prevItems.map(item =>
        item.productid === productid ? { ...item, qty: newQty, price: newPrice } : item
      )
    );
    setOpenDialog(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const totalSum = useMemo(() => {
    return selectedItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  }, [selectedItems]);

  const uniqueCategories = useMemo(() => new Set(selectedItems.map(item => item.category)).size, [selectedItems]);

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
{selectedItems.length > 0 ? 
        <SelectedItems
          selectedItems={selectedItems}
          handleDelete={handleDelete}
          handleOpenDialog={item => {
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
        />: ""
        }
<SumAndPayment
  uniqueCategories={uniqueCategories}
  totalSum={totalSum}
  discountAmount={discountAmount}
  discountedPrice={discountedPrice}
  paymentFinalPrice={discountedPrice}
  inputDiscountValue={inputDiscountValue}
  inputPercentageValue={inputPercentageValue}
  onInputChange={handleInputChange}
  onInputPercentageChange={handleInputPercentageChange}
/>
      </div>

      <div className="itemsContainer">
      {selectedItems.length > 0 ? (
    selectedItems.map(item => (
      <Item key={item.productid} id={item.productid} name={item.productname} />
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
