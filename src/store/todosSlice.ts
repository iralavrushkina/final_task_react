import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Todo, todoState } from "../type";
import { placeholder } from "../urls";

export const fetchTodos = createAsyncThunk<
    Todo[],
    string,
    { rejectValue: string }
>("app/fetchtodos", async (limit, { rejectWithValue }) => {
    const response = await fetch(
        new URL(`/todos?_limit=${limit}`, placeholder)
    );

    if (!response.ok) {
        return rejectWithValue("Server Error!");
    }
    const data = await response.json();
    return data;
});

export const toggleStatus = createAsyncThunk<
    Todo,
    string,
    { rejectValue: string; state: { todos: todoState } }
>("app/toggleStatus", async function (id, { rejectWithValue, getState }) {
    const todo = getState().todos.list.find((todo) => todo.id === id);
    if (todo) {
        const response = await fetch(new URL(`/todos/${id}`, placeholder), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                completed: !todo.completed,
            }),
        });

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
    const response = await fetch(new URL(`/todos/${id}`, placeholder), {
        method: "DELETE",
    });
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

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.list = state.list.filter(
                    (todo) => todo.id !== action.payload
                );
            })
            .addCase(toggleStatus.fulfilled, (state, action) => {
                const toggledTodo = state.list.find(
                    (todo) => todo.id === action.payload.id
                );
                if (toggledTodo) {
                    toggledTodo.completed = !toggledTodo.completed;
                }
            });
    },
});
export default todosSlice.reducer;
