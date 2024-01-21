import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { handleLocalStorageLogin } from "./redux/reducers/login";

import Notification from "./common/components/Notification";
import LoginForm from "./features/login/components/LoginForm";
import Main from "./features/main/components/Main";

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(handleLocalStorageLogin());
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Notification />
            {!user ? <LoginForm /> : <Main />}
        </div>
    );
};

export default App;
