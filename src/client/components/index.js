import * as React from "react";
import MapWrapper from "./map";
import LeaderBoard from "./leaderboard";
import Gamelog from "./gamelog";
import EditP from "./edit-profile";
import Login from "./login";
const {useState, useEffect} = React;
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import Navigation from "./navigation";
import "./index.less";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Profile from "./profile";

const handleLogout = setUser => () => {
    setUser(null);
    AuthService.logout();
};

export const paths = {
    LeaderBoard: "/leader-board",
    Gamelog: "/game-log",
    EditProfile: "/edit-profile",
};

const getAllUsers = setUsers => {
    UserService.getAllUsers().then(res => {
        setUsers(res.data);
    });
};

function Index() {
    const [users, setUsers] = useState([]);
    const [userCo, setUserCo] = useState(AuthService.getCurrentUser());

    useEffect(() => {
        getAllUsers(setUsers);
    }, []);

    if (userCo) {
        return (
            <main>
                <Router>
                    <div className={"map"}>
                        <MapWrapper />
                    </div>
                    <div
                        className={
                            "container-component has-padding-30 hero is-fullheight"
                        }>
                        <div className={"notification"}>
                            <Profile />
                            <Switch>
                                <Route path={paths.LeaderBoard}>
                                    <LeaderBoard users={users} />
                                </Route>
                                <Route path={paths.Gamelog}>
                                    <Gamelog />
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
