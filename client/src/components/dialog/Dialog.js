import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./dialog.css";

export default function FormDialog({
  open,
  initialQty,
  initialPrice,
  onClose,
  saveQuantity,
  savePrice,
}) {
  const [quantity, setQuantity] = React.useState(initialQty);
  const [price, setPrice] = React.useState(initialPrice);

  React.useEffect(() => {
    setQuantity(initialQty);
  }, [initialQty]);

  React.useEffect(() => {
    setPrice(initialPrice);
  }, [initialPrice]);

  const handleSave = () => {
    saveQuantity(Number(quantity));
    savePrice(Number(price));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update</DialogTitle>
      <DialogContent className="dialogContent">
        <p>Price</p>
        <TextField
          autoFocus
          margin="dense"
          id="price"
          name="price"
          label="price"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <p>quantity</p>
        <TextField
          autoFocus
          margin="dense"
          id="quantity"
          name="quantity"
          label="quantity"
          type="number"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
