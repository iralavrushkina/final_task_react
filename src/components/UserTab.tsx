import { useState } from "react";
import { UseAppDispatch } from "../hook";

import AlbumList from "./AlbumList";
import { useParams } from "react-router-dom";
import { fetchUserAlbums } from "../store/tabAlbumsSlice";
import { fetchUserPosts } from "../store/tabPostSlice";
import { fetchUserTodos } from "../store/tabTodoSlice";
import TabTodoList from "./TabTodoList";
import TabPostList from "./TabPostList";

const UserTab: React.FC = () => {
    const [toggleState, setToggleState] = useState(1);
    const { id } = useParams();
    const dispatch = UseAppDispatch();
    const toggleTab = (index: number) => {
        setToggleState(index);
    };
    return (
        <div className="container__tabs">
            <div className="tabs">
                <div
                    onClick={() => {
                        toggleTab(1);
                        dispatch(fetchUserAlbums(id));
                    }}
                    className={
                        toggleState === 1
                            ? "tabs__item active-tab"
                            : "tabs__item"
                    }
                >
                    Albums
                </div>

                <div
                    onClick={() => {
                        toggleTab(2);
                        dispatch(fetchUserPosts(id));
                    }}
                    className={
                        toggleState === 2
                            ? "tabs__item active-tab"
                            : "tabs__item"
                    }
                >
                    Posts
                </div>
                <div
                    onClick={() => {
                        toggleTab(3);
                        dispatch(fetchUserTodos(id));
                    }}
                    className={
                        toggleState === 3
                            ? "tabs__item active-tab"
                            : "tabs__item"
                    }
                >
                    Todos
                </div>
            </div>
            <div className="content">
                <div
                    className={
                        toggleState === 1
                            ? "content__text active-content"
                            : "content__text"
                    }
                >
                    <AlbumList />
                </div>
                <div
                    className={
                        toggleState === 2
                            ? "content__text active-content"
                            : "content__text"
                    }
                >
                    <TabPostList />
                </div>
                <div
                    className={
                        toggleState === 3
                            ? "content__text active-content"
                            : "content__text"
                    }
                >
                    <TabTodoList />
                </div>
            </div>
        </div>
    );
};
export default UserTab;
