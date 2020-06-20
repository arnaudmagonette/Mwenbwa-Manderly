import React, {useState} from "react";
import AuthService from "../services/auth.service";
import TreeService from "../services/tree.service";
import LeafIcon from "./leaf-icon";
import Gravatar from "react-circle-gravatar";
import TreeIcon from "./tree-icon";
import {Scrollbars} from "react-custom-scrollbars";

const connectedUser = AuthService.getCurrentUser();

function LeaderBoard(props) {
    return (
        <div
            className={
                "notification has-margin-30 column is-three-quarters-mobile"
            }>
            <Scrollbars autoHeight autoHeightMin={700}>
                <div
                    className={
                        "has-text-centered has-text-black subtitle is-5"
                    }>
                    <Gravatar
                        email={`${connectedUser.email} `}
                        mask={"circle"}
                        size={100}
                    />
                    <div className={"has-padding-bottom-10 has-padding-top-10"}>
                        <p>
                            {`${connectedUser.leaves} `} <LeafIcon />
                        </p>
                    </div>
                    <p>
                        {"124 "}
                        {<TreeIcon />}
                    </p>
                </div>
                <div className={"has-padding-top-5 has-text-centered"}>
                    <p
                        className={
                            "has-margin-bottom-10 has-text-black subtitle is-5 has-text-weight-bold"
                        }>
                        {"PLAYER SCORE"}
                    </p>
                    <table
                        className={
                            "table is-striped  is-hoverable is-fullwidth"
                        }>
                        <thead>
                            <tr>
                                <th>{"Avatar"}</th>
                                <th>{"User"}</th>
                                <th>{"Score"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.users.map(user => (
                                <tr key={user._id}>
                                    <td>
                                        <Gravatar
                                            email={`${user.email} `}
                                            size={30}
                                        />
                                    </td>
                                    <td>{user.username}</td>
                                    <td>
                                        {user.leaves}
                                        <LeafIcon />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={"has-padding-top-10 has-text-centered"}>
                    <p
                        className={
                            "has-margin-bottom-10 has-text-black subtitle is-5 has-text-weight-bold"
                        }>
                        {"PLAYER'S TREES"}
                    </p>
                    <table
                        className={
                            "table table  is-striped  is-hoverable is-fullwidth"
                        }>
                        <thead>
                            <tr>
                                <th>{"Avatar"}</th>
                                <th>{"User"}</th>
                                <th>{"Trees"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.users.map(user => {
                                const [test, setTest] = useState([]);
                                TreeService.howManyTrees(user.username).then(
                                    res => {
                                        setTest(res);
                                    },
                                );
                                return (
                                    <tr key={user._id}>
                                        <td>
                                            <Gravatar
                                                email={`${user.email} `}
                                                size={30}
                                            />
                                        </td>
                                        <td>{user.username}</td>
                                        <td>
                                            {`${test} `}
                                            <TreeIcon />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Scrollbars>
        </div>
    );
}

export default LeaderBoard;
