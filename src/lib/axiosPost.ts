import axios from "axios";

const instance = axios.create({
    baseURL: "https://api-for-testing-gujp.onrender.com/api/posts",
    headers:{
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use (
    config => {
        const cookies = document.cookie
        .split(";")
        .reduce((acc, cookie) => {
            const [key, value] = cookie.split("=")
            acc[key] = value;
            return acc;
        }, {} as Record<string,string>);

        const token = localStorage.getItem("token") ?? cookies["token"];

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default instance;