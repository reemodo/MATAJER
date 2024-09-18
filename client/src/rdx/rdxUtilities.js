import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getBaseQuery = function () {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://172.20.10.3:3000/",
  });

  return baseQuery;
};
