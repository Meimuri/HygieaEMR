import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { handleLocalStorageLogin } from "./redux/reducers/login";

import Notification from "./common/components/Notification";
import LoginForm from "./features/login/components/LoginForm";
import Main from "./features/main/components/Main";

const App = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.login);

    useEffect(() => {
        dispatch(handleLocalStorageLogin());
    }, [dispatch]);

    return (
        <div>
            <Notification />
            {!user ? <LoginForm /> : <Main />}
        </div>
    );
};

export default App;
