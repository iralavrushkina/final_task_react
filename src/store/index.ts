import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import todosReducer from "./todosSlice";
import userPostReducer from "./tabPostSlice";
import usersReducer from "./usersSlice";
import albumsReducer from "./tabAlbumsSlice";
import userTodosReducer from "./tabTodoSlice";

const store = configureStore({
    reducer: {
        posts: postsReducer,
        todos: todosReducer,
        users: usersReducer,
        userPost: userPostReducer,
        useralbums: albumsReducer,
        usertodos: userTodosReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
