import React from "react";
import AuthService from "../services/auth.service";
import LeafIcon from "./leaf-icon";
import Gravatar from "react-circle-gravatar";
import TreeIcon from "./tree-icon";
import {Scrollbars} from "react-custom-scrollbars";

const connectedUser = AuthService.getCurrentUser();

const LeaderBoard = () => (
    <div
        className={
            "notification has-margin-30 column is-three-quarters-mobile "
        }>
        <Scrollbars style={{height: 480}}>
            <div className={"has-text-centered has-text-black subtitle is-5 "}>
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
                    className={"table is-striped  is-hoverable is-fullwidth"}>
                    <thead>
                        <tr>
                            <th>{"Avatar"}</th>
                            <th>{"User"}</th>
                            <th>{"Score"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Gravatar
                                    email={`${connectedUser.email} `}
                                    size={30}
                                />
                            </td>
                            <td>{"Pierre"}</td>
                            <td>
                                {"1347 "}
                                <LeafIcon />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Gravatar
                                    email={`${connectedUser.email} `}
                                    size={30}
                                />
                            </td>
                            <td>{"Henry"}</td>
                            <td>
                                {"1340 "}
                                <LeafIcon />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {" "}
                                <Gravatar
                                    email={"alan.louette@gmail.com"}
                                    size={30}
                                />
                            </td>
                            <td>{"David"}</td>
                            <td>
                                {"1299 "}
                                <LeafIcon />
                            </td>
                        </tr>
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
                        <tr>
                            <td>
                                <Gravatar
                                    email={"alan.louette@gmail.com"}
                                    size={30}
                                />
                            </td>
                            <td>{"Pierre"}</td>
                            <td>
                                {"5435 "}
                                <TreeIcon />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {" "}
                                <Gravatar
                                    email={`${connectedUser.email} `}
                                    size={30}
                                />
                            </td>
                            <td>{"Henry"}</td>
                            <td>
                                {"5121 "}
                                <TreeIcon />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {" "}
                                <Gravatar
                                    email={`${connectedUser.email} `}
                                    size={30}
                                />
                            </td>
                            <td>{"David"}</td>
                            <td>
                                {"4937 "}
                                <TreeIcon />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Scrollbars>
    </div>
);

export default LeaderBoard;
