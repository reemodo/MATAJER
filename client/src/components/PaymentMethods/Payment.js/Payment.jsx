import React, { useState } from 'react'
import './payment.css'
import PaymentDialog from '../../paymentDialog/PaymentDialog';
const Payment = ({finalPrice,setFinalPrice}) => {
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
        <PaymentDialog finalPrice setFinalPrice  handleClickOpen={handleClickOpen} handleClose={handleClose}/>
      )}
      <button onClick={handleClickOpen} >CASH</button>
      <button onClick={handleClickOpen}>VISA</button>
    </div>
  )
}

export default Payment