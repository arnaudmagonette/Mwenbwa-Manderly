import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost/api/";

class UserService {
    getAllUsers() {
        return axios.get(`${API_URL}allUsers`);
    }

    getUserBoard() {
        return axios.get(`${API_URL}user`, {headers: authHeader()});
    }
}

export default new UserService();
