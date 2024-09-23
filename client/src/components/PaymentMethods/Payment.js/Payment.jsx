import React, { useState } from 'react'
import './payment.css'
import PaymentDialog from '../../paymentDialog/PaymentDialog';
import { usePostOrders } from '../../hooks/usePostOrder';
import { useCallback } from 'react';

const Payment = ({selectedItems, discountAmount , PaymentAmount,
  setPaymentAmount,}) => {
  const [open, setOpen] = React.useState(false);
  const { isLoading1, error1, postOrders } = usePostOrders();

  const handleOnSubmit = useCallback(async (amount) => {
    try {
      if(amount - PaymentAmount  <= 0){

        const response = await postOrders({selectedItems, discountAmount, PaymentAmount});
        if (response) {
          // Handle multiple search results
          alert("order add")
        } else{
          alert("Field to add order")
          }
      }
      
      
    } catch (error) {
      console.error('Error add order items:', error);
    }
  }, [postOrders, selectedItems]);

  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className='paymentContainer'>
      {open==true && (
        <PaymentDialog
        handleClose={handleClose}
        PaymentAmount={PaymentAmount}
        setPaymentAmount={setPaymentAmount}
        handleOnSubmit={handleOnSubmit}
      />)}
      <button onClick={handleClickOpen} >CASH</button>
      <button onClick={handleClickOpen}>VISA</button>
    </div>
  )
}

export default Payment