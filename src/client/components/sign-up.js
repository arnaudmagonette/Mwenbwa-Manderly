import React, {Component} from "react";
import axios from "axios";

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            password2: "",
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
            <div className="column is-half has-padding-right-100">
                <div> {"Sign Up "} </div>{" "}
                <div className="field">
                    <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                        <label className="label has-padding-top-40">
                            {" "}
                            {" Username "}{" "}
                        </label>{" "}
                        <input
                            className="input"
                            type={"text"}
                            name={"username"}
                            placeholder={"Choose your username"}
                            value={this.state.username}
                            onChange={this.handleChange}
                            required
                        />
                        <label className="label has-padding-top-40">
                            {" "}
                            {"Email"}{" "}
                        </label>{" "}
                        <input
                            className="input"
                            type={"email"}
                            name={"email"}
                            placeholder={"Type your email"}
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                        <label className="label label has-padding-top-20">
                            {" "}
                            {"Password"}{" "}
                        </label>{" "}
                        <input
                            className="input is-success"
                            type={"password"}
                            name={"password"}
                            placeholder={"Password"}
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />
                        <label className="label has-padding-top-20">
                            {" "}
                            {" Confirm your password "}{" "}
                        </label>{" "}
                        <input
                            className="input is-success"
                            type={"password"}
                            name={"Confirm password"}
                            placeholder={"Confirme your password"}
                            value={this.state.password2}
                            onChange={this.handleChange}
                            required
                        />
                        <div className="control has-padding-top-40">
                            <button
                                className="button is-primary is-medium center"
                                type={"button"}>
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
