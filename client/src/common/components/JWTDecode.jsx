import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { handleLogout } from "../../redux/reducers/login";

const JWTDecode = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedEMRUser");
        const access = JSON.parse(loggedUserJSON);

        if (access) {
            const decodedToken = jwtDecode(access.token);
            const currentTime = Date.now().valueOf() / 1000;
            if (decodedToken.exp < currentTime) {
                dispatch(handleLogout()).then(async () => {
                    navigate("/");
                });
            }
            console.log("checking access");
        }
    });
};

export default JWTDecode;
