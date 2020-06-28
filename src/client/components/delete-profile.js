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
            // const trees = res.data.filter(el => el.owner === userArray);
            // console.log(trees.values);
            const iterator = res.data.values();
            const trees = [];
            for (const elements of iterator) {
                trees.push(elements.owner);
            }
            for (let i = 0; i <= trees.length; i++) {
                if (JSON.stringify(trees[i]) === JSON.stringify(userArray)) {
                    trees[i] = [];
                    treeService.deleteUserTrees();
                    console.log(trees[i]);
                    console.log(trees);
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
