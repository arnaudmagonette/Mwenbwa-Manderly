/* eslint-disable react/button-has-type */
import React from "react";

import AuthService from "../services/auth.service";
import {validateAll} from "indicative/validator";

export default class EditP extends React.Component {
    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();
        this.state = {
            email: user.email,
            id: user._id,
            leaves: user.leaves,
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

        // take the input data from state
        const data = this.state;
        const rules = {
            id: "required",
            password: "required|string|min:6|confirmed",
        };

        const messages = {
            required: " This {{ field }} is required.",
            "password.confirmed": "The password does not match",
        };

        validateAll(data, rules, messages)
            .then(() => {
                console.log("Validation Ok");

                AuthService.resetPassword(
                    this.state.password,
                    this.state.id,
                ).then(() => {
                    console.log("Reset Ok");
                });
            })
            .catch(errors => {
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
            <div
                className={
                    "has-padding-top-5 has-text-black subtitle is-5 has-text-centered has-text-weight-bold"
                }>
                <p>{"CHANGE YOUR PASSWORD"}</p>
                <div className={"has-margin-top-40"}>
                    <form onSubmit={this.handleSubmit}>
                        <div className={"field"}>
                            <div className={"control"}>
                                <input
                                    className={"input is-success"}
                                    type={"password"}
                                    name={"password"}
                                    placeholder={"Password"}
                                    onChange={this.handleChange}
                                    required
                                />
                                <input
                                    className={
                                        "input is-success has-margin-top-10"
                                    }
                                    type={"text"}
                                    name={"password_confirmation"}
                                    onChange={this.handleChange}
                                    placeholder={"Confirm password"}
                                    required
                                />
                                <input
                                    type={"hidden"}
                                    name={"id"}
                                    value={this.state.id}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className={"columns  has-margin-top-10"}>
                            <div className={"column has-text-centered"}>
                                <button
                                    className={
                                        "button is-primary  is-outlined has-margin-bottom-5 "
                                    }
                                    type={"submit"}>
                                    {"Edit password"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
