import * as React from "react";
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
  finalPrice,
  setFinalPrice,
  handleOnSubmit
}) {
  const [amount, setAmount] = useState(finalPrice || 0); // Initialize state for TextField value

  // Handle TextField change
  const handleAmountChange = (event) => {
    setAmount(event.target.value); // Update the state with the TextField value
  };

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    handleOnSubmit(amount); // Call the provided function with the amount value
    handleClose(); // Close the dialog
  };

  return (
    <React.Fragment>
      <Dialog
        open={true}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit, // Use handleSubmit for form submission
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
            value={amount} // Bind state to the TextField
            onChange={handleAmountChange} // Handle change in input
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
