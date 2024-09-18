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
    postOrder: builder.mutation({
      query: (newOrder) => ({
        url: `/orders`, // Ensure this is the correct endpoint
        method: 'POST',
        body: newOrder, // Send the new order in the request body
      }),
    }),
  }),
});

export const { useGetSelectedItemsQuery, useLazyGetSelectedItemsQuery, useLazyGetSelectedItemDiscountQuery, usePostOrderMutation } = productsApi;