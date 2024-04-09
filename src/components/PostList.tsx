import { useAppSelector } from "../hook";
import PostForm from "./PostListForm";
import PostListItem from "./PostListItem";

const PostList: React.FC = () => {
    const posts = useAppSelector((state) => state.posts.list);

    return (
        <>
            <PostForm />
            <ul>
                {posts.map((post) => (
                    <PostListItem key={post.id} {...post} />
                ))}
            </ul>
        </>
    );
};

export default PostList;
