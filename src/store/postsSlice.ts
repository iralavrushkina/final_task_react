import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Post, postState } from "../type";
import { placeholder } from "../urls";
import fetchPOST from "../fetchPOST";
import { FormValues } from "../type";

export const fetchPosts = createAsyncThunk<
    Post[],
    string,
    { rejectValue: string }
>("app/fetchPosts", async (limit, { rejectWithValue }) => {
    const response = await fetch(
        new URL(`/posts?_limit=${limit}`, placeholder)
    );
    if (!response.ok) {
        return rejectWithValue("Server Error!");
    }
    const data = await response.json();

    return data;
});
export const addNewPost = createAsyncThunk<
    Post,
    FormValues,
    { rejectValue: string }
>("app/addNewPost", async function (data, { rejectWithValue }) {
    const post = {
        title: data.title,
        body: data.body,
    };

    const response = await fetchPOST(post, "/posts", placeholder);

    if (!response.ok) {
        return rejectWithValue("Can't add post!");
    }

    return (await response.json()) as Post;
});

const initialState: postState = {
    list: [],
    loading: false,
    error: null,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(addNewPost.pending, (state) => {
                state.error = null;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.list.push(action.payload);
            });
    },
});
export default postsSlice.reducer;
