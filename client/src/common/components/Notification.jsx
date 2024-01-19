import { useSelector } from "react-redux";

const Notification = () => {
    const { notification } = useSelector((state) => state.notification);

    return notification && <div style={{ color: "red" }}>{notification}</div>;
};

export default Notification;
