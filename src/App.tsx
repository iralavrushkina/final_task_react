import "./App.css";
import "./Reset.css";
import { useEffect } from "react";
import { fetchPosts } from "./store/postsSlice";
import { fetchTodos } from "./store/todosSlice";
import { UseAppDispatch } from "./hook";
import Navigation from "./navigation/Navigation";
import { fetchUsers } from "./store/usersSlice";

function App() {
    const dispatch = UseAppDispatch();

    useEffect(() => {
        dispatch(fetchPosts("10"));
        dispatch(fetchTodos("10"));
        dispatch(fetchUsers());
    }, [dispatch]);

    return <Navigation />;
}

export default App;
