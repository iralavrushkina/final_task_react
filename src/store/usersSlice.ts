import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, userState } from "../type";
import { placeholder } from "../urls";
import fetchPOST from "../fetchPOST";

export const addNewUser = createAsyncThunk<User, User, { rejectValue: string }>(
    "app/addNewUser",
    async function (text, { rejectWithValue }) {
        const user = {
            name: text.name,
            username: text.username,
        };

        const response = await fetchPOST(user, "/users", placeholder);

        if (!response.ok) {
            return rejectWithValue("Can't add user!");
        }

        return (await response.json()) as User;
    }
);

export const fetchUsers = createAsyncThunk<
    User[],
    undefined,
    { rejectValue: string }
>("app/fetchUsers", async (_, { rejectWithValue }) => {
    const response = await fetch(new URL("/users", placeholder));
    if (!response.ok) {
        return rejectWithValue("Server Error!");
    }
    const data = await response.json();

    return data;
});

const initialState: userState = {
    list: [],
    loading: false,
    error: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewUser.pending, (state) => {
                state.error = null;
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            });
    },
});
export default usersSlice.reducer;
