import React, { useState } from "react";
import Payment from "../PaymentMethods/Payment.js/Payment";
import Discount from "./Discount";

const SumAndPayment = ({
  uniqueCategories,
  totalSum,
  discountAmount,
  discountedPrice,
  finalPrice,
  inputDiscountValue,
  inputPercentageValue,
  onInputChange,
  onInputPercentageChange,
  selectedItems,
}) => {
  const [PaymentAmount, setPaymentAmount] = useState(0);
  return (
    <div className="sumAndPaymentContainer">
      <div className="finalSum">
        <p>num of category: {uniqueCategories}</p>
        <p>sum: {totalSum}</p>
        <Discount
          totalSum={totalSum}
          inputDiscountValue={inputDiscountValue}
          inputPercentageValue={inputPercentageValue}
          onDiscountChange={onInputChange}
          onPercentageChange={onInputPercentageChange}
        />
        <p>Discount Amount: {discountAmount}</p>
        <p>Price after Discount: {discountedPrice - PaymentAmount}</p>
      </div>
      <div className="paymentDiv">
        <Payment
          PaymentAmount={PaymentAmount}
          setPaymentAmount={setPaymentAmount}
          selectedItems={selectedItems}
        />
      </div>
    </div>
  );
};
export default SumAndPayment;
