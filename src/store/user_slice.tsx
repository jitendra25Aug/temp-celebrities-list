import { createSlice } from "@reduxjs/toolkit";
import { celebrities } from "../data";


export type celebritiesDataType = {
    id: number,
    first: string,
    last: string,
    dob: string,
    gender: string,
    email: string,
    picture: string,
    country: string,
    description: string
}
export type initialUserStateType = {
    celebritiesData: Array<celebritiesDataType>,
    activeId: number | null,
}

const initialState: initialUserStateType = { celebritiesData: [...celebrities], activeId: null };

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        toggleList(state, action) {
            const id: number = action.payload.id;
            const newActiveId = id === state.activeId ? null : id;
            state.activeId = newActiveId;
        },
        updateUser(state, action) {
            const { id, age, country, description, gender, name } = action.payload;
            let currentUser = state.celebritiesData.find((item: celebritiesDataType) => item.id === id);
            if (currentUser) {
                const year = new Date().getFullYear() - age;
                const dob: any = currentUser?.dob.replace(/^.{4}/g, `${year}`);
                const [first, last] = name.split(" ");
                currentUser.dob = dob;
                currentUser.country = country;
                currentUser.description = description;
                currentUser.gender = gender;
                currentUser.first = first;
                currentUser.last = last;
            }
        },
        deleteUser(state, action) {
            const { id } = action.payload;
            state.celebritiesData = state.celebritiesData.filter((item)=>item.id !== id);
        }
    }
});

export const userSliceActions = userSlice.actions;
export default userSlice;