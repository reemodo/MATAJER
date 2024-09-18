import React from "react";
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
}) {
  const [amount, setAmount] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setPaymentAmount(amount);
    handleClose();
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      component="form"
      onSubmit={handleSubmit}
    >
      <DialogTitle>Payment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the amount to proceed with payment.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          label="Amount"
          type="number"
          fullWidth
          variant="standard"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
