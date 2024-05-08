import { createSlice } from "@reduxjs/toolkit";
import { Api } from '../api/api';

const generateSlice = (sliceName, apiUrl) => {
    const api = new Api(apiUrl);

    const slice = createSlice({
        name: sliceName,
        initialState: {
            list: [],
        },
        reducers: {
            setItems: (state, action) => {
                state.list = action.payload;
            },
            addItem: (state, action) => {
                state.list.push(action.payload);
            },
            editItem: (state, action) => {
                const { id, data } = action.payload;
                const itemIndex = state.list.findIndex((item) => item.id === id);
                if (itemIndex !== -1) {
                    state.list[itemIndex] = { ...state.list[itemIndex], ...data };
                }
            },
            removeItem: (state, action) => {
                const id = action.payload;
                state.list = state.list.filter((item) => item.id !== id);
            },
        },
    });

    const { setItems, addItem, editItem, removeItem } = slice.actions;

    const fetchItems = () => async (dispatch) => {
        const data = await api.getList();
        dispatch(setItems(data));
    };

    const createItem = (data) => async (dispatch) => {
        const newItem = await api.create(data);
        dispatch(addItem(newItem));
    };

    const updateItem = (id, data) => async (dispatch) => {
        const updatedItem = await api.update(id, data);
        dispatch(editItem({ id, data: updatedItem }));
    };

    const deleteItem = (id) => async (dispatch) => {
        await api.delete(id);
        dispatch(removeItem(id));
    };

    return {
        ...slice,
        fetchItems,
        createItem,
        updateItem,
        deleteItem,
    };
};

export default generateSlice;