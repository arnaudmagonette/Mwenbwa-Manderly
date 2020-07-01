import * as React from "react";
const {useState, useEffect} = React;
import MapWrapper from "./map";
import Login from "./login";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import "./index.less";
import SideBar from "./side-bar";

const getAllUsers = setUsers => {
    UserService.getAllUsers().then(res => {
        setUsers(res.data);
    });
};

const refeshUserStorage = userCo => {
    UserService.refreshUser(userCo._id).then(res => {
        localStorage.setItem("user", JSON.stringify(res.data));
    });
};

function Index() {
    const [users, setUsers] = useState([]);
    const [userCo, setUserCo] = useState(AuthService.getCurrentUser());

    useEffect(() => {
        getAllUsers(setUsers);
        if (userCo) {
            refeshUserStorage(userCo);
        }

        const interval = setInterval(() => {
            setUserCo(AuthService.getCurrentUser());
        }, 900000);
        return () => clearInterval(interval);
    }, []);

    if (userCo) {
        return (
            <main>
                <div className={"sidebar"}>
                    <SideBar
                        userCo={userCo}
                        setUserCo={setUserCo}
                        users={users}
                    />
                </div>
                <div className={"map"}>
                    <MapWrapper userCo={userCo} />
                </div>
            </main>
        );
    }
    return (
        <main>
            <Login />
        </main>
    );
}

export default Index;
