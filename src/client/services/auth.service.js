import axios from "axios";

const API_URL = "http://localhost/api/auth/";

class AuthService {
    login(email, password) {
        return axios
            .post(`${API_URL}signin`, {
                email,
                password,
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    resetPassword(id, password) {
        return axios.post(`${API_URL}resetPassword`, {
            id,
            password,
        });
    }

    register(username, email, password, color) {
        return axios.post(`${API_URL}signup`, {
            username,
            email,
            password,
            color,
            roles: ["user"],
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();
