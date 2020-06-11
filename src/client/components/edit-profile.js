/* eslint-disable react/button-has-type */
import React from "react";

export default class EditP extends React.Component {
    render() {
        return (
            <div className={"notification column is-one-third"}>
                <div>
                    <p>{"Avatar"}</p>
                    <p>{"Nombre de feuilles"}</p>
                    <p>{"Nombre d'arbres"}</p>
                </div>
                <div className={"has-padding-top-30"}>
                    <p>{"Edit Profile"}</p>
                    <div className={"has-margin-top-40"}>
                        {"Avatar"}
                        <button className={"button is-primary"} type={"submit"}>
                            {"Change avatar"}
                        </button>
                        <form>
                            <div className={"field"}>
                                <div className={"control"}>
                                    <input
                                        className={"input has-margin-top-40"}
                                        type={"password"}
                                        placeholder={"Old password"}
                                    />
                                    <input
                                        className={"input  has-margin-top-10"}
                                        type={"password"}
                                        placeholder={"New Password"}
                                    />
                                    <input
                                        className={"input  has-margin-top-10"}
                                        type={"password"}
                                        placeholder={"Confirm new password"}
                                    />
                                    <input
                                        className={"input  has-margin-top-10"}
                                        type={"text"}
                                        placeholder={"Text input"}
                                    />
                                </div>
                            </div>
                            <div className={"columns  has-margin-top-10"}>
                                <div className={"column is-half"}>
                                    <button
                                        className={"button is-primary"}
                                        type={"submit"}>
                                        {"Cancel"}
                                    </button>
                                </div>
                                <div className={"column"}>
                                    <button
                                        className={"button is-primary normal"}
                                        type={"submit"}>
                                        {"Edit"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
