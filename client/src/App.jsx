import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { handleLocalStorageLogin } from "./store/reducers/login";
import LoginForm from "./modules/Login/components/LoginForm";
import Home from "./modules/Home/Home";

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login);

    useEffect(() => {
        dispatch(handleLocalStorageLogin());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {!user && <LoginForm />}
            {user && <Home />}
        </div>
    );
};

export default App;
