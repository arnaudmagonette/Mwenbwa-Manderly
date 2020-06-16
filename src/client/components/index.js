import * as React from "react";
import MapWrapper from "./map";
import LeaderBoard from "./leaderboard";
import Gamelog from "./gamelog";
import Login from "./log";
const {useState} = React;

import AuthService from "../services/auth.service";

function Index() {
    const [user] = useState(AuthService.getCurrentUser);

    if (user) {
        return (
            <main>
                <MapWrapper />
                <LeaderBoard />
                <Gamelog />
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
