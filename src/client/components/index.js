import * as React from "react";
import MapWrapper from "./map";
import LeaderBoard from "./leaderboard";

function Index() {
    return (
        <main>
            <div>
                <MapWrapper />
            </div>
            <div>
                <LeaderBoard />
            </div>
        </main>
    );
}

export default Index;
