import * as React from "react";
import MapWrapper from "./map";
import LeaderBoard from "./leaderboard";
import Gamelog from "./gamelog";
import Login from "./login";
const {useState} = React;
import AuthService from "../services/auth.service";
import Navigation from "./navigation";

const handleLogout = setUser => () => {
    setUser(null);
    AuthService.logout();
};

function Index() {
    const [user, setUser] = useState(AuthService.getCurrentUser());

    if (user) {
        return (
            <main>
                <MapWrapper />
                <LeaderBoard />
                <Gamelog />
                <Navigation handleLogout={handleLogout(setUser)} />
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
