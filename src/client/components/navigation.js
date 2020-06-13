/* eslint-disable react/button-has-type */
import React from "react";

const Navigation = props => (
    <div>
        <nav>
            <a href={"#"}>{"Leaderboard"}</a>
            <a href={"#"}>{"Game Log"}</a>
            <a href={"#"}>{"Profil"}</a>
            <button onClick={props.handleLogout}>{"Disconnect"}</button>
        </nav>
    </div>
);

export default Navigation;
