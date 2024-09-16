import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./dialog.css";

export default function FormDialog({ open, initialQty, initialPrice, onClose, saveQuantityAndPrice }) {
  const [quantity, setQuantity] = useState(initialQty);
  const [price, setPrice] = useState(initialPrice);

  React.useEffect(() => {
    setQuantity(initialQty);
  }, [initialQty]);

  React.useEffect(() => {
    setPrice(initialPrice);
  }, [initialPrice]);

  const handleSave = () => {
    saveQuantityAndPrice(Number(quantity), Number(price));
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSave(); // Call the search function when Enter is pressed
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Price"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onKeyDown={handleKeyDown} 
        />
        <TextField
          margin="dense"
          label="Quantity"
          type="number"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          onKeyDown={handleKeyDown} 
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}


