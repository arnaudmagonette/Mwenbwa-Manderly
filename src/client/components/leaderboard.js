import React from "react";
import AuthService from "../services/auth.service";
import LeafIcon from "./leaf-icon";
import AvatarIcon from "./avatar-icon";
import TreeIcon from "./tree-icon";

const connectedUser = AuthService.getCurrentUser();

const LeaderBoard = () => (
    <div>
        <div>
            <p>{`Welcome, ${connectedUser.username}`}</p>
        </div>
        <div>
            <AvatarIcon />
            <p>
                {`${connectedUser.leaves} `} <LeafIcon />
            </p>
            <p>
                {"53 trees"} <TreeIcon />
            </p>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>{"Player Score"}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{"Avatar"}</td>
                        <td>{"User"}</td>
                        <td>{"Score"}</td>
                    </tr>
                    <tr>
                        <td>
                            <AvatarIcon />
                        </td>
                        <td>{"Pierre"}</td>
                        <td>
                            {"1347 "}
                            <LeafIcon />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <AvatarIcon />
                        </td>
                        <td>{"Henry"}</td>
                        <td>
                            {"1340 "}
                            <LeafIcon />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <AvatarIcon />
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
        <div>
            <table>
                <thead>
                    <tr>
                        <th>{"Trees"}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{"Avatar"}</td>
                        <td>{"User"}</td>
                        <td>{"Trees"}</td>
                    </tr>
                    <tr>
                        <td>
                            <AvatarIcon />
                        </td>
                        <td>{"Pierre"}</td>
                        <td>
                            {"5435 "}
                            <TreeIcon />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <AvatarIcon />
                        </td>
                        <td>{"Henry"}</td>
                        <td>
                            {"5121 "}
                            <TreeIcon />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <AvatarIcon />
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
    </div>
);

export default LeaderBoard;
