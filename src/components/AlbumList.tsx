import { useAppSelector } from "../hook";

const AlbumList: React.FC = () => {
    const albums = useAppSelector((state) => state.useralbums.list);
    return (
        <ul>
            {albums.map((album) => (
                <li key={album.id} {...album} className="todolist__item">
                    <span>{album.title}</span>
                </li>
            ))}
        </ul>
    );
};
export default AlbumList;
