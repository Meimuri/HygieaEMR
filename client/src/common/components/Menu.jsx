import { Link } from "react-router-dom";

const Menu = () => {
    const onClickLogout = async (event) => {
        console.log(event);
    };

    const padding = {
        paddingRight: 5,
    };

    return (
        <div>
            <Link style={padding} to="/">
                Home
            </Link>
            <Link style={padding} to="/patients">
                Patient
            </Link>
            <Link style={padding} to="/patients">
                Patient
            </Link>
            <Link onClick={onClickLogout}>Sign out</Link>
        </div>
    );
};

export default Menu;
