import axios from "axios";

const API_URL = "https://mwenbwa.herokuapp.com/api/";

class LogService {
    getLogs() {
        return axios.get(`${API_URL}getLogs`);
    }

    postLog(playerId, playerUsername, playerEmail, action) {
        return axios
            .post(`${API_URL}postLog`, {
                playerId,
                playerUsername,
                playerEmail,
                action,
            })
            .then(res => res.data);
    }
}

export default new LogService();
