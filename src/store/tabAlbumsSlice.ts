import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Album, albumState } from "../type";
import { placeholder } from "../urls";

export const fetchUserAlbums = createAsyncThunk<
    Album[],
    string | undefined,
    { rejectValue: string }
>("app/fetchUserAlbums", async (id, { rejectWithValue }) => {
    const response = await fetch(
        new URL(`/users/${id}/albums?_limit=10`, placeholder)
    );
    if (!response.ok) {
        return rejectWithValue("Server Error!");
    }
    const data = await response.json();

    return data;
});
const initialState: albumState = {
    list: [],
    loading: false,
    error: null,
};
const tabAlbumsSlice = createSlice({
    name: "useralbums",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAlbums.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserAlbums.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            });
    },
});
export default tabAlbumsSlice.reducer;
