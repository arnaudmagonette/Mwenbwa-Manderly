import * as React from "react";
import MapWrapper from "./map.js";
import HelloWorld from "./hello.js";

function Index() {
    return (
        <main>
            <div>
                <MapWrapper />
            </div>
            <div>
                <HelloWorld />
            </div>
        </main>
    );
}

export default Index;
