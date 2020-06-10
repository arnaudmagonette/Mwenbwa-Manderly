/* eslint-disable react/button-has-type */
import React, {Component} from "react";
import axios from "axios";

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
        const {email, password} = this.state;
        console.log("Ok");

        axios
            .post(
                "api/auth/signin",
                {
                    user: {
                        email,
                        password,
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
            <div className={"column is-half has-padding-right-100 "}>
                <div> {"Sign In "} </div>
                <div className={"field "}>
                    <form onSubmit={this.handleSubmit}>
                        {/*  Partie Email   */}
                        <label className={"label has-padding-top-40"}>
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
                        <label className={"label label has-padding-top-20"}>
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
