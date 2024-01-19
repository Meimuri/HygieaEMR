import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { handleLogin } from "../../../store/reducers/login";
import schema from "../schema/";

const LoginForm = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
    });

    const onSubmit = async (credentials) => {
        dispatch(handleLogin(credentials));
    };

    return (
        <>
            <h1>HygieaEMR</h1>
            <h3>Sign in to start your session</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username</label>
                    <br />
                    <input {...register("username")} />
                    <p>{errors.username?.message}</p>
                </div>
                <div>
                    <label>Password</label>
                    <br />
                    <input {...register("password")} />
                    <p>{errors.password?.message}</p>
                </div>

                <input type="submit" />
            </form>
        </>
    );
};

export default LoginForm;
