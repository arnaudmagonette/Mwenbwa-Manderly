import * as React from "react";
import MapWrapper from "./map";
import EditP from "./edit-Profile";

function Index() {
    return (
        <main>
            <div>
                <MapWrapper />
                <EditP />
            </div>
        </main>
    );
}

export default Index;
