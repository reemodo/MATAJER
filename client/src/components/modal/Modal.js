import React from 'react';
import './Modal.css'; // Add styles for your modal

const Modal = ({ isOpen, onClose, items, onSelectItem }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>Select an Item</h2>
        <ul className="modal-list">
          {items.map((item) => (
            <li key={item.productid}>
              <span>{item.productname}</span>
              <span>{item.price}</span>
              <button onClick={() => onSelectItem(item)}>Select</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
