import { NavLink, Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <>
            <header>
                <ul className="nav">
                    <li>
                        <NavLink className="nav__item" to="/postList">
                            PostList
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav__item" to="/todoList">
                            TodoList
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav__item" to="/userList">
                            UserList
                        </NavLink>
                    </li>
                </ul>
            </header>
            <main className="main">
                <Outlet />
            </main>
        </>
    );
};
export default Layout;
