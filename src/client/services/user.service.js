import axios from "axios";

const API_URL = "http://localhost/api/";

class UserService {
    getAllUsers() {
        return axios.get(`${API_URL}allUsers`);
    }

    refreshUser(id) {
        return axios.post(`${API_URL}getUser`, {
            id,
        });
    }
}

export default new UserService();
