/* becodeorg/mwenbwa
 *
 * /src/client/app.js - Client entry point
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

import * as React from "react";
import ReactDOM from "react-dom";

import HelloWorld from "./components/hello";
import MapWrapper from "./components/map";

ReactDOM.render(<HelloWorld />, document.querySelector("#app"));
ReactDOM.render(<MapWrapper />, document.querySelector("#map"));
