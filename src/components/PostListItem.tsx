import { Post } from "../type";

const PostListItem: React.FC<Post> = ({ id, title, body }) => {
    return (
        <li>
            <h3 className="postlist__title">{title}</h3>
            <p className="postlist__text">{body}</p>
        </li>
    );
};
export default PostListItem;
