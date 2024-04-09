import { Routes, Route } from 'react-router-dom'
import PostList from '../components/PostList'
import TodoList from '../components/TodoList'
import UserList from '../components/UserList'
import Layout from '../components/Layout'
import UserInfo from '../components/UserInfo'

const Navigation = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="postlist" element={<PostList />}></Route>
					<Route path="todoList" element={<TodoList />}></Route>
					<Route path="userList" element={<UserList />}></Route>
					<Route path="userList/:id" element={<UserInfo />}></Route>
				</Route>
			</Routes>
		</>
	)
}

export default Navigation
