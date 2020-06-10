/* eslint-disable react/button-has-type */
import React, {Component} from "react";
import SignUp from "./sign-up";
import SignIn from "./sign-in";

export default class Login extends Component {
    render() {
        return (
            <div>
                <div>
                    {" "}
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
                        <SignUp />

                        <SignIn />
                    </div>
                </div>
            </div>
        );
    }
}
