import axios from "axios";
const baseUrl = "http://localhost:3000/api/patients";

const generateToken = (auth) => {
    const token = `Bearer ${auth.token}`;
    const config = {
        headers: { Authorization: token },
    };
    return config;
};

const getAll = (auth) => {
    const config = generateToken(auth);
    const request = axios.get(baseUrl, config);
    return request.then((response) => response.data);
};

export default { getAll };
