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
import DeleteProfile from "./delete-profile";

const handleLogout = setUserCo => () => {
    setUserCo(null);
    AuthService.logout();
};

export const paths = {
    LeaderBoard: "/leader-board",
    Gamelog: "/game-log",
    DeleteProfile: "/delete-profile",
    Rules: "/rules",
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
                    <Redirect from={"/"} exact to={paths.Rules} />
                    <div
                        className={
                            "container-component has-padding-left-30 has-padding-right-30 has-padding-top-30 hero is-fullheight"
                        }>
                        <div
                            className={"notification has-padding-20"}
                            style={{overflow: "scroll"}}>
                            <Profile />
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
                                <Route path={paths.DeleteProfile}>
                                    <DeleteProfile />
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
