/* eslint-disable react/button-has-type */
/* eslint-disable array-callback-return */
import React from "react";
import treeService from "../services/tree.service";
import authService from "../services/auth.service";

export default class DeleteProfile extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        treeService.getAllTrees().then(res => {
            const userConnected = authService.getCurrentUser();
            const userArray = [userConnected.username];
            console.log(res.data);
            console.log(Array.isArray(res.data));
            for (let i = 0; i < res.data.length; i++) {
                if (
                    res.data[i].owner !== [] &&
                    JSON.stringify(res.data[i].owner) ===
                        JSON.stringify(userArray)
                ) {
                    //res.data[i].owner = [];
                    console.log(res.data[i]._id);
                    console.log(res.data[i].owner);
                    treeService.deleteUserTrees(res.data[i].owner);
                }
            }
        });
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
