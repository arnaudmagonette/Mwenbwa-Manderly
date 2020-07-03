/* eslint-disable react/button-has-type */
import React from "react";
import {Link} from "react-router-dom";
import {paths} from "./side-bar";

const Navigation = props => (
    <div className={"pb-4"}>
        <div className={"buttons  is-centered"}>
            <Link to={paths.LeaderBoard}>
                <button
                    className={
                        "button is-rounded is-primary has-text-weight-bold has-text-white "
                    }>
                    {"Leaderboard"}
                </button>
            </Link>

            <Link to={paths.Gamelog}>
                <button
                    className={
                        "button is-rounded is-primary has-text-weight-bold has-text-white"
                    }>
                    {"Game Log"}
                </button>
            </Link>
            <Link to={paths.DeleteProfile}>
                <button
                    className={
                        "button is-rounded  is-primary has-text-weight-bold has-text-white"
                    }>
                    {"Delete Profile"}
                </button>
            </Link>
            <Link to={paths.Rules}>
                <button
                    className={
                        "button is-rounded  is-primary has-text-weight-bold has-text-white"
                    }>
                    {"Rules"}
                </button>
            </Link>
            <Link to={paths.EditProfile}>
                <button
                    className={
                        "button is-rounded  is-primary has-text-weight-bold has-text-white"
                    }>
                    {"Edit Profile"}
                </button>
            </Link>
        </div>
        <div className={"buttons are-medium is-centered has-margin-bottom-1"}>
            <button
                className={"button is-rounded is-danger"}
                onClick={props.handleLogout}>
                {"Disconnect"}
                <i className={"fas fa-times"} />
            </button>
        </div>
    </div>
);

export default Navigation;
