import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { handleLogout } from "../../redux/reducers/login";

const Menu = () => {
    const dispatch = useDispatch();

    const onClickLogout = async () => {
        dispatch(handleLogout());
    };

    const padding = {
        paddingRight: 5,
    };

    return (
        <div>
            <Link style={padding} to="/">
                Home
            </Link>
            <Link style={padding} to="/patient">
                Patient
            </Link>
            <Link onClick={onClickLogout}>Sign out</Link>
        </div>
    );
};

export default Menu;
