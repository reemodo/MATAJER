import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./paymentdialog.css";

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
    setPaymentAmount(amount);
    handleOnSubmit(amount);
    handleClose();
  };

  // Handle input change
  const handleInputChange = (event) => {
    setAmount(Number(event.target.value));
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
          <div className="bankNotes-Container">
            <div className="bankNotes-Div">
              <img
                onClick={() => setAmount((prevCount) => prevCount + 200)}
                className="sh-200"
                src="/200sh.jpg"
              />
              <img
                onClick={() => setAmount((prevCount) => prevCount + 100)}
                className="sh-100"
                src="/100sh.jpeg"
              />
              <img
                onClick={() => setAmount((prevCount) => prevCount + 50)}
                className="sh-50"
                src="/50sh.jpg"
              />
              <img
                onClick={() => setAmount((prevCount) => prevCount + 20)}
                className="sh-20"
                src="/20sh.jpg"
              />
            </div>
            <div className="smallBankNotes-Div">
              <img
                onClick={() => setAmount((prevCount) => prevCount + 10)}
                className="sh-10"
                src="/10sh.webp"
              />
              <img
                onClick={() => setAmount((prevCount) => prevCount + 5)}
                className="sh-5"
                src="/5sh.jpg"
              />
              <img
                onClick={() => setAmount((prevCount) => prevCount + 2)}
                className="sh-2"
                src="/2sh.jpg"
              />
              <img
                onClick={() => setAmount((prevCount) => prevCount + 1)}
                className="sh-1"
                src="/1sh.jpg"
              />
              <img
                onClick={() => setAmount((prevCount) => prevCount + 0.5)}
                className="sh-0.5"
                src="/0.5sh.png"
              />
              <img
                onClick={() => setAmount((prevCount) => prevCount + 0.1)}
                className="sh-0.1"
                src="/0.1sh.jpg"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
