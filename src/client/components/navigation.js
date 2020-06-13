/* eslint-disable react/button-has-type */
import React from "react";
import {Link} from "react-router-dom";
import {paths} from "./index";

const Navigation = props => (
    <div>
        <nav>
            <Link to={paths.LeaderBoard}>{"Leaderboard"}</Link>
            <Link to={paths.Gamelog}>{"Game Log"}</Link>
            <button onClick={props.handleLogout}>{"Disconnect"}</button>
        </nav>
    </div>
);

export default Navigation;
