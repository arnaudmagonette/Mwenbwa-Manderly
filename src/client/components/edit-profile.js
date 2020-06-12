/* eslint-disable react/button-has-type */
import React from "react";
import axios from "axios";

export default class EditP extends React.Component {
    constructor() {
        super();

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    checkLoginStatus() {
        axios
            .get("http://localhost:3001/logged_in", {withCredentials: true})
            .then(response => {
                if (
                    response.data.logged_in &&
                    this.state.loggedInStatus === "NOT_LOGGED_IN"
                ) {
                    this.setState({
                        loggedInStatus: "LOGGED_IN",
                        user: response.data.user,
                    });
                } else if (
                    !response.data.logged_in &
                    (this.state.loggedInStatus === "LOGGED_IN")
                ) {
                    this.setState({
                        loggedInStatus: "NOT_LOGGED_IN",
                        user: {},
                    });
                }
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    handleLogout() {
        this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
        });
    }

    handleLogin(data) {
        this.setState({
            loggedInStatus: "LOGGED_IN",
            user: data.user,
        });
    }

    render() {
        return (
            <div className={"notification column is-one-third"}>
                <div>
                    <p>{"Avatar"}</p>
                    <p>{"Nombre de feuilles"}</p>
                    <p>{"Nombre d'arbres"}</p>
                </div>
                <div className={"has-padding-top-30"}>
                    <p>{"Edit Profile"}</p>
                    <div className={"has-margin-top-40"}>
                        {"Avatar"}
                        <button className={"button is-primary"} type={"submit"}>
                            {"Change avatar"}
                        </button>
                        <form>
                            <div className={"field"}>
                                <div className={"control"}>
                                    <input
                                        className={"input has-margin-top-40"}
                                        type={"password"}
                                        placeholder={"Old password"}
                                    />
                                    <input
                                        className={"input  has-margin-top-10"}
                                        type={"password"}
                                        placeholder={"New Password"}
                                    />
                                    <input
                                        className={"input  has-margin-top-10"}
                                        type={"password"}
                                        placeholder={"Confirm new password"}
                                    />
                                    <input
                                        className={"input  has-margin-top-10"}
                                        type={"text"}
                                        placeholder={"Text input"}
                                    />
                                </div>
                            </div>
                            <div className={"columns  has-margin-top-10"}>
                                <div className={"column is-half"}>
                                    <button
                                        className={"button is-primary"}
                                        type={"submit"}>
                                        {"Cancel"}
                                    </button>
                                </div>
                                <div className={"column"}>
                                    <button
                                        className={"button is-primary normal"}
                                        type={"submit"}>
                                        {"Edit"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
