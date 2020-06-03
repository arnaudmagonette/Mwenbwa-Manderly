/* becodeorg/mwenbwa
 *
 * /src/client/components/index.js - Index Component
 *
 * coded by Guillaume Boeur
 * started at 28/05/2020
 */

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
