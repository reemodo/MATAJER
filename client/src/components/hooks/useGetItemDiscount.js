import { useCallback, useState } from "react";
import { useLazyGetSelectedItemDiscountQuery } from "../api/getProducts.api"; // Adjust path if necessary

export const useGetItemDiscounts = () => {
  const [pendingGetEvent, setPendingEvent] = useState(false);
  const [isErrorGetEvent, setIsErrorEvent] = useState(false);
  const [getSelectedItemDiscount] = useLazyGetSelectedItemDiscountQuery();

  const fetchItemDiscounts = useCallback(
    async (id) => {
      setPendingEvent(true);
      setIsErrorEvent(false);

      try {
        const { data } = await getSelectedItemDiscount(id); // Use unwrap() if you're using RTK Query
        // Return the data if the request is successful
        return data // Return empty array if no data
      } catch (error) {
        console.error("Error fetching item discounts:", error); // Improved error logging
        setIsErrorEvent(true);
        throw error; // Re-throw the error for custom handling
      } finally {
        setPendingEvent(false);
      }
    },
    [getSelectedItemDiscount] // Only include getSelectedItemDiscount
  );

  return { isLoading: pendingGetEvent, error: isErrorGetEvent, fetchItemDiscounts };
};
