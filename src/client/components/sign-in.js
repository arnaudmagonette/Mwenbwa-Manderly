/* eslint-disable react/button-has-type */
import React, {Component} from "react";

import AuthService from "../services/auth.service";

export default class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            loginErrors: "",
            hasAgreed: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        console.log("Ok");

        AuthService.login(this.state.email, this.state.password).then(
            () => {
                window.location.reload();
            },
            error => {
                const inputEmail = document.querySelector("#idEmail");
                const inputPass = document.querySelector("#idPass");

                console.log("login error", error);
                if (error.response.status === 401) {
                    document.querySelector("#Wrong").innerHTML =
                        "This password is incorrect";
                    inputEmail.style.borderColor = "green";
                    inputPass.style.borderColor = "red";
                } else {
                    document.querySelector("#Wrong").innerHTML =
                        "This email doesn't exist";
                    inputEmail.style.borderColor = "red";
                }
            },
        );

        event.preventDefault();
    }
    render() {
        return (
            <div className={"column is-half has-padding-right-100 "}>
                <div> {"Sign In "} </div>
                <div className={"field "}>
                    <form onSubmit={this.handleSubmit}>
                        {/*  Partie Email   */}
                        <label className={"label has-padding-top-40"}>
                            {"Email"}
                        </label>
                        <input
                            id={"idEmail"}
                            className={"input"}
                            type={"email"}
                            name={"email"}
                            placeholder={"Email"}
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                        {/*  Partie Mdp   */}
                        <label className={"label has-padding-top-20"}>
                            {"Password"}
                        </label>
                        <input
                            id={"idPass"}
                            className={"input"}
                            type={"password"}
                            name={"password"}
                            placeholder={"Password"}
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />
                        <div
                            className={"has-text-danger is-size-6"}
                            id={"Wrong"}
                        />
                        <div className={"control has-padding-top-40"}>
                            <button
                                className={"button is-link is-medium center"}
                                type={"submit"}>
                                {"Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
