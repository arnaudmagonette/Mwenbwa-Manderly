/* eslint-disable no-console */
/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable react/button-has-type */

import React, {Component} from "react";
import {validateAll} from "indicative/validator";
import {CirclePicker} from "react-color";

import AuthService from "../services/auth.service";
import LogService from "../services/log.service";

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
            hasAgreed: false,
            color: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePass = this.handlePass.bind(this);
    }

    handleChangeComplete = color => {
        // eslint-disable-next-line unicorn/no-abusive-eslint-disable
        // eslint-disable-next-line unicorn/no-abusive-eslint-disable
        this.setState({color: color.hex}); /* eslint-disable-line */
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handlePass() {
        const {password, password_confirmation} = this.state;
        // perform all neccassary validations
        const passC1 = document.querySelector("#WrongPass");
        const passC2 = document.querySelector("#CharMin");
        const value = document.querySelector("#valueLength").value;
        const inputValue = document.querySelector("#valueLength");
        const inputValue2 = document.querySelector("#valueLength2");

        if (value.length < 8) {
            const lessChar = "Your password needs at least 8 characters";
            passC2.innerHTML = lessChar;
            passC2.classList.add("has-text-danger", "is-size-6");
            inputValue.style.borderColor = "red";
        } else {
            passC2.innerHTML = "";
            inputValue.style.borderColor = "green";
        }

        if (password !== password_confirmation) {
            const wrongPass = "Password doesn't match !";
            inputValue2.style.borderColor = "red";
            passC1.innerHTML = wrongPass;
            passC1.classList.add("has-text-danger", "is-size-6");
        } else {
            const goodPass = "Password does match !";
            inputValue2.style.borderColor = "green";
            passC1.innerHTML = goodPass;
            passC1.classList.remove("has-text-danger", "is-size-6");
            passC1.classList.add("has-text-primary", "is-size-6");
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);

        // take the input data from state
        const data = this.state;
        const rules = {
            username: "required|string|min:4",
            email: "required|string",
            password: "required|string|min:8|confirmed",
            color: "required|string",
        };

        const messages = {
            required: " This {{ field }} is required.",
            "email.email": "The email is invalid",
            "password.confirmed": "The password does not match",
        };

        validateAll(data, rules, messages)
            .then(() => {
                console.log("Validation Ok");

                AuthService.register(
                    this.state.username,
                    this.state.email,
                    this.state.password,
                    this.state.color,
                )
                    .then(() => {
                        console.log("Register Ok");
                    })
                    .then(() => {
                        AuthService.login(
                            this.state.email,
                            this.state.password,
                        ).then(() => {
                            window.location.reload().then(() => {
                                LogService.postLog(
                                    AuthService.getCurrentUser().id,
                                    AuthService.getCurrentUser().username,
                                    AuthService.getCurrentUser().email,
                                    "Sign Up",
                                );
                            });
                        });
                    })
                    .catch(error => {
                        console.log("login error", error);
                        const emailUsed = document.querySelector("#emailUsed");
                        const usernameUsed = document.querySelector(
                            "#usernameUsed",
                        );

                        if (
                            error.response.data.message ===
                            "Failed! Email is already in use!"
                        ) {
                            emailUsed.innerHTML = "Email already used !";
                        } else {
                            emailUsed.innerHTML = "";
                        }

                        if (
                            error.response.data.message ===
                            "Failed! Username is already in use!"
                        ) {
                            usernameUsed.innerHTML = "Username already used !";
                        } else {
                            usernameUsed.innerHTML = "";
                        }
                    });
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

        event.preventDefault();
    }

    render() {
        return (
            <div className={"column is-half has-padding-right-100"}>
                <div> {"Sign Up "} </div>
                <div className={"field"}>
                    <form onSubmit={this.handleSubmit}>
                        <label
                            id={"labelUsername"}
                            className={"label has-padding-top-40"}>
                            {" Username "}
                        </label>
                        <input
                            className={"input"}
                            type={"text"}
                            name={"username"}
                            placeholder={"Choose your username"}
                            onChange={this.handleChange}
                            required
                        />
                        <div
                            className={"has-text-danger is-size-6"}
                            id={"usernameUsed"}
                        />
                        <label
                            id={"labelEmail"}
                            className={"label has-padding-top-20"}>
                            {"Email"}
                        </label>
                        <input
                            className={"input"}
                            type={"email"}
                            name={"email"}
                            placeholder={"Type your email"}
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                        <div
                            className={"has-text-danger is-size-6"}
                            id={"emailUsed"}
                        />
                        <label className={"label label has-padding-top-20"}>
                            {"Password"}
                        </label>
                        <input
                            id={"valueLength"}
                            className={"input"}
                            type={"password"}
                            name={"password"}
                            onKeyUp={this.handlePass}
                            placeholder={"Password"}
                            onChange={this.handleChange}
                            required
                        />
                        <label className={"label has-padding-top-20"}>
                            {" Confirm your password "}
                        </label>
                        <input
                            id={"valueLength2"}
                            className={"input"}
                            type={"password"}
                            name={"password_confirmation"}
                            onKeyUp={this.handlePass}
                            onChange={this.handleChange}
                            placeholder={"Confirm password"}
                            required
                        />
                        <div id={"WrongPass"} />
                        <div id={"CharMin"} />
                        <label className={"label has-padding-top-20"}>
                            {" Choose the color of your tree "}
                        </label>
                        <CirclePicker
                            color={this.state.color}
                            onChangeComplete={this.handleChangeComplete}
                        />
                        <div className={"control has-padding-top-40"}>
                            <button
                                className={"button is-primary is-medium center"}
                                type={"submit"}>
                                {"Sign up"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
