import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getBaseQuery = function ()  {
  const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
  })

  return baseQuery;
};