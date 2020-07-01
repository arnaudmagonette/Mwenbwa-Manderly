/* eslint-disable react/button-has-type */
/* eslint-disable array-callback-return */
import React from "react";
import authService from "../services/auth.service";
import userService from "../services/user.service";

export default class DeleteProfile extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        const userConnected = authService.getCurrentUser();
        // treeService.deleteUserAndTrees(res.id);
        console.log(userConnected.username);
        userService.deleteUserAndTrees(userConnected.username);
        authService.logout();
        window.location.reload();
    }
    render() {
        return (
            <div className={"columns  has-margin-top-10"}>
                <div className={"column has-text-centered"}>
                    <button
                        name={"test"}
                        onClick={this.handleClick}
                        type={"submit"}
                        className={
                            "button is-primary  is-outlined has-margin-bottom-5 "
                        }>
                        {"Delete Profile"}
                    </button>
                </div>
            </div>
        );
    }
}
