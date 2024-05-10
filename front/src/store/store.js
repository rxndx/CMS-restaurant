import { configureStore } from '@reduxjs/toolkit';
import generateSlice from '../store/reducer';
import {
    catalogMenuUrl,
    catalogUrl,
    countryUrl,
    foodUrl,
    menuUrl, productsUrl,
    reviewsUrl, stockUrl,
    tagsFoodUrl,
    tagsMenuUrl,
    tagsUrl
} from '../api/url';

export const menuSlice = generateSlice('menus', menuUrl);
export const tagSlice = generateSlice('tags', tagsUrl);
export const tagFoodSlice = generateSlice('tagsFood', tagsFoodUrl);
export const tagMenuSlice = generateSlice('tagsMenu', tagsMenuUrl);
export const countrySlice = generateSlice('country', countryUrl);
export const catalogSlice = generateSlice('catalog', catalogUrl);
export const catalogMenuSlice = generateSlice('catalogMenu', catalogMenuUrl);
export const foodSlice = generateSlice('dishes', foodUrl)
export const reviewSlice = generateSlice('reviews', reviewsUrl)
export const stockSlice = generateSlice('stock', stockUrl)
export const productsSlice = generateSlice('products', productsUrl)

export const store = configureStore({
    reducer: {
        menus: menuSlice.reducer,
        tags: tagSlice.reducer,
        tagsFood: tagFoodSlice.reducer,
        tagsMenu: tagMenuSlice.reducer,
        country: countrySlice.reducer,
        catalog: catalogSlice.reducer,
        catalogMenu: catalogMenuSlice.reducer,
        dishes: foodSlice.reducer,
        reviews: reviewSlice.reducer,
        stock: stockSlice.reducer,
        products: productsSlice.reducer
    },
});