/* eslint-disable react/jsx-max-depth */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
import React, {Component} from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
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
        axios
            .post("/user/login", {
                email: this.state.email,
                password: this.state.password,
            })
            .then(response => {
                const token = response.data.token;
                //   response.headers.token = `${token}`;
                const cookies = new Cookies();
                cookies.set("token", token, {path: "/"});
                console.log(cookies.get("token"));
                // window.location.replace("/hello");
            })
            .catch(error => {
                console.log(error);
            });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div>
                    <h1
                        className={
                            "has-text-centered is-size-1 has-margin-top-30"
                        }>
                        {" Welcome to Mwembwa"}
                    </h1>
                </div>
                <div
                    className={
                        "container notification is-four-fifths has-margin-top-50"
                    }>
                    <div className={"columns is-size-3"}>
                        <div className={"column is-half has-padding-right-100"}>
                            <div> {"Sign Up"} </div>
                            <div className={"field"}>
                                <form>
                                    <label
                                        className={"label has-padding-top-40"}>
                                        {"Username"}
                                    </label>
                                    <input
                                        className={"input is-success"}
                                        type={"email"}
                                        placeholder={"Type your username"}
                                    />
                                </form>
                                <label className={"label has-padding-top-20"}>
                                    {"Email"}
                                </label>
                                <input
                                    className={"input"}
                                    type={"email"}
                                    placeholder={"Type your email"}
                                />
                                <label
                                    className={
                                        "label label has-padding-top-20"
                                    }>
                                    {"Password"}
                                </label>
                                <input
                                    className={"input is-success"}
                                    type={"password"}
                                    placeholder={"Type your password"}
                                />
                                <label className={"label has-padding-top-20"}>
                                    {"Confirm your password"}
                                </label>
                                <input
                                    className={"input is-success"}
                                    type={"Confirm your password"}
                                    placeholder={"Confirm your password"}
                                />
                                <div className={"control has-padding-top-40"}>
                                    <button
                                        className={
                                            "button is-primary is-medium"
                                        }>
                                        {"Submit"}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className={"column is-half has-padding-right-100 "}>
                            <div> {"Sign In"} </div>
                            <div className={"field"}>
                                <form onSubmit={this.handleSubmit}>
                                    {/*  Partie Email   */}
                                    <label
                                        className={"label has-padding-top-40"}>
                                        {"Email"}
                                    </label>
                                    <input
                                        className={"input"}
                                        type={"email"}
                                        name={"email"}
                                        placeholder={"Email"}
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    {/*  Partie Mdp   */}
                                    <label
                                        className={
                                            "label label has-padding-top-20"
                                        }>
                                        {"Password"}
                                    </label>
                                    <input
                                        className={"input is-success"}
                                        type={"password"}
                                        name={"password"}
                                        placeholder={"Password"}
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <div
                                        className={
                                            "control has-padding-top-40"
                                        }>
                                        <button
                                            className={
                                                "button is-link is-medium center"
                                            }
                                            type={"submit"}>
                                            {"Login"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type={"text"}
                        name={"username"}
                        placeholder={"Username"}
                        value={this.state.username}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type={"email"}
                        name={"email"}
                        placeholder={"Email"}
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type={"password"}
                        name={"password"}
                        placeholder={"Password"}
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                    <button type={"submit"}> {"Login"} </button>
                </form>
            </div>
        );
    }
}
