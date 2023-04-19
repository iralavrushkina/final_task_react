import { useAppSelector } from "../hook";

import PostListItem from "./PostListItem";

const TabPostList: React.FC = () => {
    const posts = useAppSelector((state) => state.userPost.list);

    return (
        <ul>
            {posts.map((post) => (
                <PostListItem key={post.id} {...post} />
            ))}
        </ul>
    );
};

export default TabPostList;
