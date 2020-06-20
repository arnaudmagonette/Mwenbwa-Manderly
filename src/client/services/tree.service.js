import axios from "axios";

const API_URL = "https://mwenbwa.herokuapp.com/api/";

class TreeService {
    getAllTrees() {
        return axios.get(`${API_URL}allTrees`);
    }

    buyTree(idTree, idUser) {
        return axios
            .post(`${API_URL}buyTree`, {
                idTree,
                idUser,
            })
            .then(response => response.data);
    }

    howManyTrees(owner) {
        return axios
            .post(`${API_URL}howManyTrees`, {
                owner,
            })
            .then(res => res.data);
    }
}

export default new TreeService();
