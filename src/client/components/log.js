/* eslint-disable react/button-has-type */
import React, {Component} from "react";
import axios from "axios";
import SignUp from "./sign-up";
import SignIn from "./sign-in";

export default class Login extends Component {
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

        axios
            .post(
                "/user/login",
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
            .then((response) => {
                if (response.data.logged_in) {
                    this.props.handleSuccessfulAuth(response.data);
                }
            })
            .catch((error) => {
                console.log("login error", error);
            });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div>
                    {" "}
                    <h1 className="has-text-centered is-size-1 has-margin-top-30">
                        {" Welcome to Mwembwa"}
                    </h1>
                </div>
                <div className="container notification is-four-fifths has-margin-top-50">
                    <div className="columns is-size-3">
                        <SignUp />

                        <SignIn />
                    </div>{" "}
                </div>{" "}
            </div>
        );
    }
}
