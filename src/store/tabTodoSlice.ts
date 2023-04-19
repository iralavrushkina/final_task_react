import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Todo, todoState } from "../type";
import { placeholder } from "../urls";

export const fetchUserTodos = createAsyncThunk<
    Todo[],
    string | undefined,
    { rejectValue: string }
>("app/fetchUserTodos", async (id, { rejectWithValue }) => {
    const response = await fetch(
        new URL(`/users/${id}/todos?_limit=10`, placeholder)
    );

    if (!response.ok) {
        return rejectWithValue("Server Error!");
    }
    const data = await response.json();

    return data;
});

export const toggleState = createAsyncThunk<
    Todo,
    string,
    { rejectValue: string; state: { todos: todoState } }
>("app/toggleState", async function (id, { rejectWithValue, getState }) {
    const todo = getState().todos.list.find((todo) => todo.id === id);
    if (todo) {
        const response = await fetch(
            new URL(`/users/todos?id=${id}`, placeholder),
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                }),
            }
        );

        if (!response.ok) {
            return rejectWithValue("Can't toggle status. Server error.");
        }
        return (await response.json()) as Todo;
    }
    return rejectWithValue("No such todo");
});
export const deleteTodo = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>("app/deleteTodo", async (id, { rejectWithValue }) => {
    const response = await fetch(
        new URL(`/users/todos?id=${id}`, placeholder),
        {
            method: "DELETE",
        }
    );
    if (!response.ok) {
        return rejectWithValue("Can't delete task!");
    }

    return id;
});

const initialState: todoState = {
    list: [],
    loading: false,
    error: null,
};

const tabTodoSlice = createSlice({
    name: "usertodos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserTodos.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.list = state.list.filter(
                    (todo) => todo.id !== action.payload
                );
            })
            .addCase(toggleState.fulfilled, (state, action) => {
                const toggledTodo = state.list.find(
                    (todo) => todo.id === action.payload.id
                );
                if (toggledTodo) {
                    toggledTodo.completed = !toggledTodo.completed;
                }
            });
    },
});
export default tabTodoSlice.reducer;
