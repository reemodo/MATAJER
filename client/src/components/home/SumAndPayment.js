import React from "react";
import Payment from "../PaymentMethods/Payment.js/Payment";
import Discount from "./Discount";

const SumAndPayment = ({
  uniqueCategories,
  totalSum,
  discountAmount,
  discountedPrice,
  paymentFinalPrice,
  inputDiscountValue,
  inputPercentageValue,
  onInputChange,
  onInputPercentageChange,
}) => (
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
      <p>Price after Discount: {discountedPrice}</p>
    </div>
    <div className="paymentDiv">
      <Payment finalPrice={paymentFinalPrice} />
    </div>
  </div>
);

export default SumAndPayment;
