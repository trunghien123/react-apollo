import axios, { AxiosInstance } from "axios";

const Axios: AxiosInstance = axios.create({
    headers: {
        "content-type": "application/json",
    },
});

export default Axios;