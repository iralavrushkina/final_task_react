import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Post, postState } from "../type";
import { placeholder } from "../urls";

export const fetchUserPosts = createAsyncThunk<
    Post[],
    string | undefined,
    { rejectValue: string }
>("app/fetchUserPosts", async (id, { rejectWithValue }) => {
    const response = await fetch(new URL(`users/${id}/posts`, placeholder));
    if (!response.ok) {
        return rejectWithValue("Server Error!");
    }
    const data = await response.json();

    return data;
});

const initialState: postState = {
    list: [],
    loading: false,
    error: null,
};
const tabPostSlice = createSlice({
    name: "userPost",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            });
    },
});
export default tabPostSlice.reducer;
