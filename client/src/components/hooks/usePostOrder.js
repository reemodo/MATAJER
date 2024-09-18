import { useCallback, useState } from "react";
import { usePostOrderMutation } from "../api/getProducts.api"; // Adjust path if necessary
import customerData from "../../constants/demoData";

export const usePostOrders = () => {
  const [pendingAddOrder, setPendingEvent] = useState(false);
  const [isErrorPostOrder, setIsErrorEvent] = useState(false);
  const [postOrder] = usePostOrderMutation();
  const [order, setOrder] = useState();

  const postOrders = useCallback(
    async ({ selectedItems, discountAmount, paymentFinalPrice }) => {
      setPendingEvent(true);
      setIsErrorEvent(false);

      // Build the order object using customerData and provided params
      const orderData = {
        ...customerData, // Include the customer data
        discount: discountAmount,
        ordernumber: `ORD${Math.floor(Math.random() * 100000)}`, // Generate order number
        salestax: 8, // Assuming 8% sales tax
        price: paymentFinalPrice,
        paymentmethod: "credit_card", // Default to credit card, can be dynamic
        paymentdate: new Date().toISOString().split('T')[0], // Current date
        note: "Please ship fast", // Placeholder note
        products: selectedItems.map(item => ({
          productid: item.productid,
          barcode: item.barcode,
          productname: item.productname,
          quantityordered: item.quantityordered,
          unitprice: item.unitprice,
          discount: item.discount || 0,
          supplierid: item.supplierid,
          selectedcolor: item.selectedcolor,
          selectedsize: item.selectedsize,
          price: item.price,
          orderdate: new Date().toISOString().split('T')[0],
          status: "in_stock",
          expirydate: item.expirydate || "2025-09-08",
          type: item.type || "regular"
        })),
      };

      try {
        const response = await postOrder(orderData); // Post the built order
        if (response.data.orderId) {
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error adding order:", error); // Better error logging
        setIsErrorEvent(true);
        throw error; // Re-throw the error for custom handling
      } finally {
        setPendingEvent(false);
      }
    },
    [postOrder, pendingAddOrder]
  );

  return { isLoading: pendingAddOrder, error: isErrorPostOrder, postOrders };
};


