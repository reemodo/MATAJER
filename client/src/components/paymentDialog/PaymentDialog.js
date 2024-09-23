import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function PaymentDialog({
  handleClose,
  PaymentAmount,
  setPaymentAmount,
  handleOnSubmit,
}) {
  const [amount, setAmount] = useState(0);

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount)) {
      setPaymentAmount(numericAmount);
      handleOnSubmit(numericAmount);
      handleClose();
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <React.Fragment>
      <Dialog
        open={true}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Payment</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the amount to pay.</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            value={amount}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
