import React from 'react';
import Selected from '../selectedItem/Selected';
import FormDialog from '../dialog/Dialog';

const SelectedItems = ({ itemsDiscount, selectedItems, handleDelete, handleOpenDialog, selectedItem, openDialog, updateQuantityAndPrice, handleCloseDialog }) => (
  <>
    <Selected
      selectedItems={selectedItems}
      deleteItem={handleDelete}
      handleOpenDialog={handleOpenDialog}
      itemsDiscount={itemsDiscount}
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
  </>
);

export default SelectedItems;
