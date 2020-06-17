import axios from "axios";

const API_URL = "http://localhost/api/";

class TreeService {
    getAllTrees() {
        return axios.get(`${API_URL}allTrees`);
    }
}

export default new TreeService();
