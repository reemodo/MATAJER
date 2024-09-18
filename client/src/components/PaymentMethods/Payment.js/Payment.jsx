import React, { useState } from 'react'
import './payment.css'
import PaymentDialog from '../../paymentDialog/PaymentDialog';
const Payment = ({PaymentAmount, setPaymentAmount}) => {
  const [open, setOpen] = React.useState(false);

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
      />)}
      <button onClick={handleClickOpen} >CASH</button>
      <button onClick={handleClickOpen}>VISA</button>
    </div>
  )
}

export default Payment