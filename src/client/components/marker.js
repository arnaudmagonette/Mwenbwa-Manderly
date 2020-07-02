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
import "./index.less";

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
            <Popup minWidth={"400"}>
                <div
                    className={
                        "has-text-centered is-size-4	has-text-weight-semibold"
                    }>
                    <p>{`${props.name}`}</p>
                </div>
                <div className={"has-text-weight-semibold has-text-centered"}>
                    <Gravatar
                        email={props.owner.email}
                        mask={"circle"}
                        size={50}
                    />{" "}
                    <div className={"has-padding-bottom-2 has-padding-top-2"}>
                        {`${props.owner.username}  `}
                    </div>
                    {`${props.leaves}`}
                    <LeafIcon />
                </div>
                <div className={"has-text-centered"}>
                    {props.owner.username === "For sale" && (
                        <button
                            className={
                                "button is-small is-rounded has-margin-10  is-success"
                            }
                            onClick={() => {
                                handelBuyTree(
                                    props.id,
                                    userCo._id,
                                    refeshUserStorage(userCo),
                                    location.reload(),
                                );
                            }}>
                            {"I buy !"}
                        </button>
                    )}
                    {!(props.userCo._id === props.owner._id) &&
                        !(props.owner.username === "For sale") && (
                            <button
                                className={
                                    "button is-small is-rounded has-margin-10  is-success"
                                }
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
                    {props.userCo._id === props.owner._id && (
                        <button
                            className={
                                "button is-small is-rounded has-margin-10 is-danger"
                            }
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
                </div>
                <div>
                    <p
                        className={
                            "has-text-centered is-size-6 has-text-weight-bold"
                        }>
                        {"PURCHASE HISTORY"}
                    </p>
                    <div id={"popupScroll"}>
                        <table
                            className={
                                "table is-striped has-text-centered is-hoverable is-fullwidth"
                            }>
                            <thead>
                                <tr>
                                    <th className={"has-text-centered"}>
                                        {"User"}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.allOwners.map((owner, index) => {
                                    const keyOwner = index + 1;
                                    return (
                                        <tr key={keyOwner}>
                                            <td
                                                className={
                                                    "has-text-weight-semibold has-text-link"
                                                }>
                                                {owner}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <p
                        className={
                            "has-text-centered is-size-6 has-text-weight-bold"
                        }>
                        {"COMMENTS"}
                    </p>

                    <div id={"popupScroll"}>
                        <table
                            width={"100%"}
                            className={
                                "table is-striped  is-hoverable is-fullwidth"
                            }>
                            <thead>
                                <tr>
                                    <th>{"Username"}</th>
                                    <th>{"Comments"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.comments.map(comment => (
                                    <tr key={comment._id}>
                                        <td
                                            className={
                                                "has-text-weight-semibold has-text-link"
                                            }>
                                            {comment.name}
                                        </td>
                                        <td
                                            className={
                                                "has-text-weight-semibold "
                                            }>
                                            {comment.comment}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={"has-padding-top-10"}>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            rows={"1"}
                            className={
                                "textarea is-small is-focused has-fixed-area"
                            }
                            value={valueComment}
                            onChange={handleChange}
                            placeholder={"Write your comment..."}
                        />
                        <div className={"buttons is-right"}>
                            <button
                                className={
                                    "button is-primary is-small has-margin-top-10"
                                }
                                type={"submit"}>
                                {"Send"}
                            </button>
                        </div>
                    </form>
                </div>
                <p>
                    <a className={"has-text-weight-bold is-size-9"} href={"#"}>
                        {"Wiki link"}
                    </a>
                </p>
            </Popup>
        </LeafletMarker>
    );
};

export default Marker;
