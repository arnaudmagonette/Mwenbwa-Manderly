import React, {useState} from "react";
import TreeService from "../services/tree.service";
import LeafIcon from "./leaf-icon";
import Gravatar from "react-circle-gravatar";
import TreeIcon from "./tree-icon";

function LeaderBoard(props) {
    return (
        <div>
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
                    className={"table is-striped  is-hoverable is-fullwidth"}>
                    <thead>
                        <tr>
                            <th>{"Avatar"}</th>
                            <th>{"User"}</th>
                            <th>{"Trees"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.users.map(user => {
                            const [numberTrees, setNumberTrees] = useState([]);
                            TreeService.howManyTrees(user.username).then(
                                res => {
                                    setNumberTrees(res);
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
                                        {`${numberTrees} `}
                                        <TreeIcon />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LeaderBoard;
