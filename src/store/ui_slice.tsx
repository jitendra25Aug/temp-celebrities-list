import { createSlice } from "@reduxjs/toolkit";

export type initialStateType = {
    isEditable: boolean,
    searchInput: string,
    isModalOpen: boolean
}

const initialState: initialStateType = { isEditable: false, searchInput: '', isModalOpen: false };

const uiSlice = createSlice({
    name: 'uiSlice',
    initialState,
    reducers: {
        toggleEdit(state, action) {
            state.isEditable = action.payload;
        },
        setSearchInput(state, action){
            const { value } = action.payload;
            state.searchInput = value;
        },
        closeModal(state){
            state.isModalOpen = false;
        },
        openModal(state){
            state.isModalOpen = true;
        }
    }
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice;