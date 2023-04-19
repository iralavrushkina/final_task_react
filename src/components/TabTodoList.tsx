import { useAppSelector } from "../hook";
import TabTodoItem from "./TabTodoItem";

const TabTodoList: React.FC = () => {
    const todos = useAppSelector((state) => state.usertodos.list);
    return (
        <ol>
            {todos.map((todo) => (
                <TabTodoItem key={todo.id} {...todo} />
            ))}
        </ol>
    );
};
export default TabTodoList;
