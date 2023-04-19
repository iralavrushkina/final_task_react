import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCamera,
    faCodeBranch,
    faEnvelope,
    faLocationDot,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../hook";
import UserTab from "./UserTab";

const UserInfo: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const users = useAppSelector((state) => state.users.list);

    const user = users.find((user) => user.id == id);
    const userData = [
        {
            id: "1",
            icon: (
                <FontAwesomeIcon
                    icon={faEnvelope}
                    size="xl"
                    style={{ color: "#3fabfd" }}
                />
            ),
            title: user?.email,
            subtitle: "Email",
        },
        {
            id: "2",
            icon: (
                <FontAwesomeIcon
                    icon={faPhone}
                    size="xl"
                    style={{ color: "#3fabfd" }}
                />
            ),
            title: user?.phone,
            subtitle: "Mobile",
        },
        {
            id: "3",
            icon: (
                <FontAwesomeIcon
                    icon={faLocationDot}
                    size="xl"
                    style={{ color: "#3fabfd" }}
                />
            ),
            title: user?.address?.city,
            subtitle: "Work",
        },
        {
            id: "4",
            icon: (
                <FontAwesomeIcon
                    icon={faCamera}
                    size="xl"
                    style={{ color: "#3fabfd" }}
                />
            ),
            title: user?.website,
            subtitle: " Social Channnels",
        },
        {
            id: "5",
            icon: (
                <FontAwesomeIcon
                    icon={faCodeBranch}
                    size="xl"
                    style={{ color: "#3fabfd" }}
                />
            ),
            title: user?.company?.bs,
            subtitle: "Segments",
        },
    ];

    return (
        <>
            <UserTab />
            <ul className="userinfo">
                {userData.map((item) => (
                    <li key={item.id} {...item} className="userinfo__item">
                        <div>{item?.icon}</div>
                        <p className="userinfo__text">
                            <span className="userinfo__title">
                                {item?.title}
                            </span>
                            <span className="userinfo__subtitle">
                                {item?.subtitle}
                            </span>
                        </p>
                    </li>
                ))}
            </ul>

            <button className="userinfo__btn_back" onClick={goBack}>
                Go back
            </button>
        </>
    );
};
export default UserInfo;
