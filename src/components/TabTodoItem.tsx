import { UseAppDispatch } from "../hook";
import { deleteTodo, toggleState } from "../store/tabTodoSlice";
import { Todo } from "../type";

const TabTodoItem: React.FC<Todo> = ({ id, title, completed }) => {
    const dispatch = UseAppDispatch();
    const changeStatus = () => dispatch(toggleState(id));
    const delTodo = () => dispatch(deleteTodo(id));

    return (
        <li className="todolist__item">
            <input
                className="checkbox"
                type="checkbox"
                checked={completed}
                onChange={changeStatus}
            />
            <span className="todolist__title">{title}</span>
            <button className="btn__del" onClick={delTodo}></button>
        </li>
    );
};
export default TabTodoItem;
