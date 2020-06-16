import * as React from "react";
import MapWrapper from "./map";
import LeaderBoard from "./leaderboard";
import Gamelog from "./gamelog";
import EditProfile from "./edit-profile";
import Login from "./login";
const {useState} = React;
import AuthService from "../services/auth.service";
import Navigation from "./navigation";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Redirect,
} from "react-router-dom";

import "./index.less";

const handleLogout = setUser => () => {
    setUser(null);
    AuthService.logout();
};

export const paths = {
    LeaderBoard: "/leader-board",
    Gamelog: "/game-log",
    EditProfile: "/edit-profile",
};

function Index() {
    const [user, setUser] = useState(AuthService.getCurrentUser());

    if (user) {
        return (
            <main>
                <Router>
                    <div className={"map"}>
                        <MapWrapper />
                    </div>
                    {/* <Redirect from={"/"} exact to={paths.LeaderBoard} /> */}
                    <div className={"test"}>
                        <Switch>
                            <Route path={paths.LeaderBoard}>
                                <LeaderBoard />
                            </Route>
                            <Route path={paths.Gamelog}>
                                <Gamelog />
                            </Route>
                            <Route path={paths.EditProfile}>
                                <EditProfile />
                            </Route>
                        </Switch>
                        <Navigation handleLogout={handleLogout(setUser)} />
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
