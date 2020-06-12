import * as React from "react";
import MapWrapper from "./map";
import LeaderBoard from "./leaderboard";
import Gamelog from "./gamelog";

function Index() {
    return (
        <main>
            <MapWrapper />
            <LeaderBoard />
            <Gamelog />
        </main>
    );
}

export default Index;
