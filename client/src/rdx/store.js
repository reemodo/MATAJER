import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../components/api/getProducts.api'; // Ensure the path is correct

const setupStore = () => {
    return configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
};
const store = setupStore();
export default store;