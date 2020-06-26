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
            console.log(res.data.length);
            const trees = [];
            for (let i = 0; i <= res.data.length; i++) {
                trees.push(res.data[i]);
            }
            const userConnected = authService.getCurrentUser();
            trees.map(tree => {
                if (tree.owner === userConnected.username) {
                    console.log("test");
                } else {
                    console.log("error");
                    console.log(userConnected.username);
                    console.log(tree.owner);
                }
            });
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
