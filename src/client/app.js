/* eslint-disable no-unused-vars */
/* becodeorg/mwenbwa
 *
 * /src/client/app.js - Client entry point
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

import * as React from "react";
import ReactDOM from "react-dom";
// import HelloWorld from "./components/hello";

import Index from "./components/index";
import EditP from "./components/edit-profile";

ReactDOM.render(<Index />, document.querySelector("#app"));
