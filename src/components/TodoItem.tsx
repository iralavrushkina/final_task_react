import { UseAppDispatch } from "../hook";
import { deleteTodo, toggleStatus } from "../store/todosSlice";
import { Todo } from "../type";

const TodoItem: React.FC<Todo> = ({ id, title, completed }) => {
    const dispatch = UseAppDispatch();
    const changeStatus = () => dispatch(toggleStatus(id));
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
export default TodoItem;
