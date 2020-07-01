/* eslint-disable react/button-has-type */
import React from "react";
const {useState} = React;
import {Marker as LeafletMarker, Popup} from "react-leaflet";
import * as Leaflet from "leaflet";
import {iconUrl} from "./icon";
import LeafIcon from "./leaf-icon";
import TreeService from "../services/tree.service";
import AuthService from "../services/auth.service";
import LogService from "../services/log.service";
import UserService from "../services/user.service";
import Gravatar from "react-circle-gravatar";

const myIcon = (color = "#037318") =>
    Leaflet.icon({
        iconUrl: iconUrl(color),
        iconSize: [30, 30],
        iconAnchor: [25, 15],
        popupAnchor: [0, -20],
    });

const handelBuyTree = (a, b) => {
    TreeService.buyTree(a, b);

    LogService.postLog(
        AuthService.getCurrentUser()._id,
        AuthService.getCurrentUser().username,
        AuthService.getCurrentUser().email,
        "Buy a tree",
    );
};

const handelReBuyTree = (idTree, idUser, latTree, lonTree) => {
    TreeService.reBuyTree(idTree, idUser, latTree, lonTree);

    LogService.postLog(
        AuthService.getCurrentUser()._id,
        AuthService.getCurrentUser().username,
        AuthService.getCurrentUser().email,
        "Rebuy the tree",
    );
};

const handelLockTree = (idTree, idUser, latTree, lonTree) => {
    TreeService.lockTree(idTree, idUser, latTree, lonTree);

    LogService.postLog(
        AuthService.getCurrentUser()._id,
        AuthService.getCurrentUser().username,
        AuthService.getCurrentUser().email,
        "Lock the tree",
    );
};

const refeshUserStorage = userCo => {
    UserService.refreshUser(userCo._id).then(res => {
        localStorage.setItem("user", JSON.stringify(res.data));
    });
};

const Marker = props => {
    const [userCo] = useState(props.userCo);
    const [valueComment, setValueComment] = useState("");

    function handleSubmit(event) {
        TreeService.addComment(props.id, props.userCo.username, valueComment);

        event.preventDefault();
    }

    function handleChange(event) {
        setValueComment(event.target.value);
    }

    return (
        <LeafletMarker
            position={props.position}
            icon={myIcon(props.owner.color)}>
            <Popup>
                <div>
                    <p>{`Name : ${props.name}`}</p>
                </div>
                <div>
                    <p>
                        {`Owner : `}
                        <Gravatar
                            email={props.owner.email}
                            mask={"circle"}
                            size={30}
                        />{" "}
                        {props.owner.username}
                    </p>
                </div>
                <div>
                    <p>
                        {`Value : ${props.leaves}`}
                        <LeafIcon />
                    </p>
                    {!props.lock && props.owner.username === "For sale" && (
                        <button
                            onClick={() => {
                                handelBuyTree(
                                    props.id,
                                    userCo._id,
                                    refeshUserStorage(userCo),
                                    location.reload(),
                                );
                            }}>
                            {"Buy"}
                        </button>
                    )}
                    {!props.lock &&
                        !(props.userCo._id === props.owner._id) &&
                        !(props.owner.username === "For sale") && (
                            <button
                                onClick={() => {
                                    handelReBuyTree(
                                        props.id,
                                        userCo._id,
                                        props.position[0], // lat
                                        props.position[1], // lon
                                        location.reload(),
                                    );
                                }}>
                                {"Rebuy"}
                            </button>
                        )}
                    {!props.lock && props.userCo._id === props.owner._id && (
                        <button
                            onClick={() => {
                                handelLockTree(
                                    props.id,
                                    userCo._id,
                                    props.position[0], // lat
                                    props.position[1], // lon
                                    location.reload(),
                                );
                            }}>
                            {"Lock"}
                        </button>
                    )}
                    {props.lock && <p>{"is locked"}</p>}
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>{"Purchase History"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{"User"}</td>
                            </tr>
                            {props.allOwners.map((owner, index) => {
                                const keyOwner = index + 1;
                                return (
                                    <tr key={keyOwner}>
                                        <td>{owner}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>{"Comments"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{"User"}</td>
                                <td>{"Comment"}</td>
                            </tr>
                            {props.comments.map(comment => (
                                <tr key={comment._id}>
                                    <td>{comment.name}</td>
                                    <td>{comment.comment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={valueComment}
                        onChange={handleChange}
                        placeholder={"Write your comment..."}
                    />
                    <button type={"submit"}>{"Send"}</button>
                </form>
                <div>
                    <a href={"#"}>{"Wiki link"}</a>
                </div>
            </Popup>
        </LeafletMarker>
    );
};

export default Marker;
