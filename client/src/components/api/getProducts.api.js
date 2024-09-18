import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from "../../rdx/rdxUtilities"; // Ensure this function is correctly implemented

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: getBaseQuery(), // This should return the fetchBaseQuery configuration
  endpoints: (builder) => ({
    getSelectedItems: builder.query({
      query: (inputValue) => ({
        url: `/products?inputValue=${inputValue}`, // Ensure this is the correct endpoint
        method: 'GET',
      }),
      
    }),
    getSelectedItemDiscount: builder.query({
      query: (productId) => ({
        url: `/discounts/product/${productId}`, // Ensure this is the correct endpoint
        method: 'GET',
      }),
      
    }),
  }),
});

export const { useGetSelectedItemsQuery, useLazyGetSelectedItemsQuery, useLazyGetSelectedItemDiscountQuery } = productsApi;