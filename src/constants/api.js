import axios from "axios";
import store from '../store';
const baseURL = "https://movienew.cybersoft.edu.vn/api/";
const TokenCyberSoft = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgMjUiLCJIZXRIYW5TdHJpbmciOiIxNS8wNS8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODQxMDg4MDAwMDAiLCJuYmYiOjE2NjY3MTcyMDAsImV4cCI6MTY4NDI1NjQwMH0.vdVVhPEIB7ZV9oEaVDyxq430wfBgJgeYqiM5JTcdwqo";

const api = axios.create({
    baseURL,
    headers:{
        TokenCyberSoft,
    },
});
api.interceptors.request.use((config) =>{
    const { accessToken} = store.getState().auth.user || {};
    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) =>{
        return response.data.content;
    },
    (error) =>{
        return Promise.reject(error.response?.data.content);
    }
);
export default api;