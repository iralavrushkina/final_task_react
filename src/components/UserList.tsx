import { Link } from "react-router-dom";
import { useAppSelector } from "../hook";
import UserListForm from "./UserListForm";

const UserList: React.FC = () => {
    const users = useAppSelector((state) => state.users.list);

    return (
        <>
            <UserListForm />
            <ol className="userlist">
                {users.map((user) => (
                    <li key={user.id} {...user} className="userlist__item">
                        <Link
                            className="userlist__item_link"
                            to={`/userList/${user.id}`}
                        >
                            <span className="userlist__name">{user.name}</span>
                            <span>({user.username})</span>
                        </Link>
                    </li>
                ))}
            </ol>
        </>
    );
};
export default UserList;
