import React from 'react';

const Discount = ({ totalSum, inputDiscountValue, inputPercentageValue, onDiscountChange, onPercentageChange }) => (
  <div className="DiscountDiv">
    <p>Discount:</p>
    <div className="DiscountSplitting">
      <p>N</p>
      <input
        type="number"
        value={inputDiscountValue || ''}
        onChange={onDiscountChange}
      />
      <p>%</p>
      <input
        type="number"
        value={inputPercentageValue || ''}
        onChange={onPercentageChange}
      />
    </div>
  </div>
);

export default Discount;
