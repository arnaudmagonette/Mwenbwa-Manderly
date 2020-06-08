/* eslint-disable react/button-has-type */
import React, {Component} from "react";
import axios from "axios";
import {validateAll} from "indicative/validator";

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
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
        event.preventDefault();
        console.log(this.state);

        // take the input data from state
        const data = this.state;
        const rules = {
            username: "required|string|min:8",
            email: "required|string",
            password: "required|string|min:6|confirmed",
        };

        const messages = {
            required: " This {{ field }} is required.",
            "email.email": "The email is invalid",
            "password.confirmed": "The password does not match",
        };

        validateAll(data, rules, messages)
            .then(() => {
                console.log("success");
            })
            .catch(errors => {
                console.log(errors);
                const formattedErrors = {};
                errors.forEach(error => {
                    formattedErrors[error.field] = error.message;
                });
                this.setState({
                    errors: formattedErrors,
                });
            });

        axios
            .post(
                "/register",
                {
                    user: {
                        username: this.state.username,
                        email: this.state.email,
                        password: this.state.password,
                    },
                },
                {
                    withCredentials: true,
                },
            )
            .then(response => {
                if (response.data.logged_in) {
                    this.props.handleSuccessfulAuth(response.data);
                }
            })
            .catch(error => {
                console.log("login error", error);
            });
        event.preventDefault();
    }

    render() {
        return (
            <div className={"column is-half has-padding-right-100"}>
                <div> {"Sign Up "} </div>{" "}
                <div className={"field"}>
                    <form onSubmit={this.handleSubmit}>
                        <label className={"label has-padding-top-40"}>
                            {" "}
                            {" Username "}{" "}
                        </label>{" "}
                        <input
                            className={"input"}
                            type={"text"}
                            name={"username"}
                            placeholder={"Choose your username"}
                            onChange={this.handleChange}
                        />{" "}
                        <label className={"label has-padding-top-40"}>
                            {" "}
                            {"Email"}{" "}
                        </label>{" "}
                        <input
                            className={"input"}
                            type={"email"}
                            name={"email"}
                            placeholder={"Type your email"}
                            value={this.state.email}
                            onChange={this.handleChange}
                        />{" "}
                        <label className={"label label has-padding-top-20"}>
                            {" "}
                            {"Password"}{" "}
                        </label>{" "}
                        <input
                            className={"input is-success"}
                            type={"password"}
                            name={"password"}
                            placeholder={"Password"}
                            onChange={this.handleChange}
                        />{" "}
                        <label className={"label has-padding-top-20"}>
                            {" "}
                            {" Confirm your password "}{" "}
                        </label>{" "}
                        <input
                            className={"input is-success"}
                            type={"text"}
                            name={"password_confirmation"}
                            onChange={this.handleChange}
                            placeholder={"Confirm password"}
                        />
                        <div className={"control has-padding-top-40"}>
                            <button
                                className={"button is-primary is-medium center"}
                                type={"submit"}>
                                {" "}
                                {"Sign up"}{" "}
                            </button>{" "}
                        </div>{" "}
                    </form>{" "}
                </div>{" "}
            </div>
        );
    }
}
