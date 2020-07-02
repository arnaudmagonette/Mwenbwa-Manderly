import * as React from "react";
const {useState, useEffect} = React;
import MapWrapper from "./map";
import LeaderBoard from "./leaderboard";
import Gamelog from "./gamelog";
import Rules from "./rules";
import EditP from "./edit-profile";
import Login from "./login";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import Navigation from "./navigation";
import "./index.less";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
} from "react-router-dom";
import Profile from "./profile";

const handleLogout = setUserCo => () => {
    setUserCo(null);
    AuthService.logout();
};

export const paths = {
    LeaderBoard: "/leader-board",
    Gamelog: "/game-log",
    Rules: "/rules",
    EditProfile: "/edit-profile",
};

const getAllUsers = setUsers => {
    UserService.getAllUsers().then(res => {
        setUsers(res.data);
    });
};

// const refeshUserStorage = (userCo) => {
//     UserService.refreshUser(userCo._id).then((res) => {
//         localStorage.setItem("user", JSON.stringify(res.data));
//     });
// };

function Index() {
    const [users, setUsers] = useState([]);
    const [userCo, setUserCo] = useState(AuthService.getCurrentUser());

    useEffect(() => {
        getAllUsers(setUsers);
        // refeshUserStorage(userCo);

        const interval = setInterval(() => {
            setUserCo(AuthService.getCurrentUser());
        }, 900000);
        return () => clearInterval(interval);
    }, []);

    if (userCo) {
        return (
            <main>
                <Router>
                    <div className={"map"}>
                        <MapWrapper userCo={userCo} />
                    </div>
                    <Redirect from={"/"} exact to={paths.Rules} />
                    <div
                        className={
                            "container-component has-padding-left-30 has-padding-right-30 has-padding-top-30 hero is-fullheight"
                        }>
                        <div
                            className={"notification has-padding-20"}
                            style={{overflow: "scroll"}}>
                            <Profile userCo={userCo} />
                            <Switch>
                                <Route
                                    className={" hero is-fullheight"}
                                    path={paths.LeaderBoard}>
                                    <LeaderBoard users={users} />
                                </Route>
                                <Route path={paths.Gamelog}>
                                    <Gamelog />
                                </Route>
                                <Route path={paths.Rules}>
                                    <Rules />
                                </Route>
                                <Route path={paths.EditP}>
                                    <EditP />
                                </Route>
                            </Switch>
                        </div>
                        <Navigation handleLogout={handleLogout(setUserCo)} />
                    </div>
                </Router>
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
