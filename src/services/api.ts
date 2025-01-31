import axios from "axios";
const API_URL = "http://localhost:3001/auth";

export const loginUser = async (username:string, password:string) =>{
    const response = await axios.post(`${API_URL}/login`, {username, password});
    return response.data //expected Response {token, user}
}

export const fetchUserProfile = async(token: string) => {
    const response = await axios.get(`${API_URL}/user`, {
        headers:{
            Authorization: `Bearer ${token}`}
    });
    return response.data //expected Response {id, email, username, ...}
}