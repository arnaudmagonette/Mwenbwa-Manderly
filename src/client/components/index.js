import * as React from "react";
import MapWrapper from "./map";
import LeaderBoard from "./leaderboard";
import Gamelog from "./gamelog";
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

const handleLogout = setUser => () => {
    setUser(null);
    AuthService.logout();
};

export const paths = {
    LeaderBoard: "/leader-board",
    Gamelog: "/game-log",
};

function Index() {
    const [user, setUser] = useState(AuthService.getCurrentUser());

    if (user) {
        return (
            <main>
                <Router>
                    <MapWrapper />
                    {/* <Redirect from={"/"} exact to={paths.LeaderBoard} /> */}
                    <Switch>
                        <Route path={paths.LeaderBoard}>
                            <LeaderBoard />
                        </Route>
                        <Route path={paths.Gamelog}>
                            <Gamelog />
                        </Route>
                    </Switch>
                    <Navigation handleLogout={handleLogout(setUser)} />
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
