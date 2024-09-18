import { useCallback, useState } from "react";
import { useLazyGetSelectedItemsQuery } from "../api/getProducts.api"; // Adjust path if necessary

export const useGetItems = () => {
  const [pendingGetEvent, setPendingEvent] = useState(false);
  const [isErrorGetEvent, setIsErrorEvent] = useState(false);
  const [getSelectedItems] = useLazyGetSelectedItemsQuery();
  const fetchItems = useCallback(
    async (inputValue) => {
      setPendingEvent(true);
      setIsErrorEvent(false);

      try {
        const itemData = await getSelectedItems(inputValue); // `unwrap()` handles errors properly
        
        return itemData.data?.map(item => ({
          ...item,
          qty: 1
        }));// Return the data if the request is successful
      } catch (error) {
        console.error("Error fetching items:", error); // Better error logging
        setIsErrorEvent(true);
        throw error; // Re-throw the error for custom handling
      } finally {
        setPendingEvent(false);
      }
    },
    [getSelectedItems,pendingGetEvent]
  );

  return { isLoading: pendingGetEvent, error: isErrorGetEvent, fetchItems };
};