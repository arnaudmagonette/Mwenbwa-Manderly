import * as React from "react";

// npm install bulma et npm i bulma-spacing

const LogIn = () => (
    <div>
        <div>
            <div>
                <h1 className="has-text-centered is-size-1 has-margin-top-30">
                    Welcome to Mwembwa{" "}
                </h1>{" "}
            </div>{" "}
            <div className="container notification is-four-fifths has-margin-top-50">
                <div className="columns is-size-3">
                    <div className="column is-half has-padding-right-100">
                        <div> Sign Up </div>{" "}
                        <div className="field">
                            {/* <label className="label has-padding-top-40">
                                {" "}
                                Name{" "}
                            </label>{" "}
                            <input
                                className="input"
                                type="text"
                                placeholder="Type your name"
                            /> */}
                            <label className="label has-padding-top-40">
                                {" "}
                                Username{" "}
                            </label>{" "}
                            <input
                                className="input is-success"
                                type="email"
                                placeholder="Type your username"
                            />
                            <label className="label has-padding-top-20">
                                {" "}
                                Email{" "}
                            </label>{" "}
                            <input
                                className="input"
                                type="email"
                                placeholder="Type your email"
                            />
                            <label className="label label has-padding-top-20">
                                Password{" "}
                            </label>{" "}
                            <input
                                className="input is-success"
                                type="password"
                                placeholder="Type your password"
                            />
                            <label className="label has-padding-top-20">
                                Confirm your password{" "}
                            </label>{" "}
                            <input
                                className="input is-success"
                                type="Confirm your password"
                                placeholder="Confirm your password"
                            />{" "}
                            <div class="control has-padding-top-40">
                                <button class="button is-primary is-medium">
                                    Submit
                                </button>
                            </div>
                        </div>{" "}
                    </div>{" "}
                    <div className="column is-half has-padding-right-100 ">
                        <div> Sign In </div>{" "}
                        <div className="field ">
                            <label className="label has-padding-top-40">
                                {" "}
                                Username{" "}
                            </label>{" "}
                            <input
                                className="input is-success"
                                type="email"
                                placeholder="Type your username"
                            />
                            <label className="label label has-padding-top-20">
                                Password{" "}
                            </label>{" "}
                            <input
                                className="input is-success"
                                type="password"
                                placeholder="Type your password"
                            />
                            <div class="control has-padding-top-40">
                                <button class="button is-link is-medium center">
                                    Log in
                                </button>
                            </div>
                        </div>{" "}
                    </div>{" "}
                </div>{" "}
            </div>{" "}
        </div>{" "}
    </div>
);

export default LogIn;
