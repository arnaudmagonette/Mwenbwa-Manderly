import axios from "axios";

const API_URL = "https://mwenbwa.herokuapp.com/api/";

class UserService {
    getAllUsers() {
        return axios.get(`${API_URL}allUsers`);
    }

    refreshUser(id) {
        return axios.post(`${API_URL}getUser`, {
            id,
        });
    }

    deleteUserAndTrees(username) {
        return axios.post(`${API_URL}deleteUserAndTrees`, {
            username,
        });
    }
}

export default new UserService();
