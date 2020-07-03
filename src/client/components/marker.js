/* eslint-disable no-unused-vars */
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
import {RotateSpinner} from "react-spinners-kit";
import "./index.less";

const myIcon = (color = "#037318") =>
    Leaflet.icon({
        iconUrl: iconUrl(color),
        iconSize: [30, 30],
        iconAnchor: [25, 15],
        popupAnchor: [0, -20],
    });

const handleBuyTree = (a, b, onSuccess) => {
    TreeService.buyTree(a, b).then(() => {
        LogService.postLog(
            AuthService.getCurrentUser()._id,
            AuthService.getCurrentUser().username,
            AuthService.getCurrentUser().email,
            "Buy a tree",
        );

        onSuccess();
    });

    location.reload();
};

const handleReBuyTree = (idTree, idUser, latTree, lonTree, onSuccess) => {
    TreeService.reBuyTree(idTree, idUser, latTree, lonTree).then(() => {
        LogService.postLog(
            AuthService.getCurrentUser()._id,
            AuthService.getCurrentUser().username,
            AuthService.getCurrentUser().email,
            "Rebuy the tree",
        );

        onSuccess();
    });

    // To do: Remove when backend returns 200 on success
    location.reload();
};

const handleLockTree = (idTree, idUser, latTree, lonTree, onSuccess) => {
    TreeService.lockTree(idTree, idUser, latTree, lonTree).then(() => {
        LogService.postLog(
            AuthService.getCurrentUser()._id,
            AuthService.getCurrentUser().username,
            AuthService.getCurrentUser().email,
            "Lock the tree",
        );

        onSuccess();
    });

    // To do: Remove when backend returns 200 on success
    location.reload();
};

const refeshUserStorage = userCo => {
    UserService.refreshUser(userCo._id).then(res => {
        localStorage.setItem("user", JSON.stringify(res.data));
    });
};

const Marker = props => {
    const [userCo] = useState(props.userCo);
    const [valueComment, setValueComment] = useState("");
    const [valueTree, setValueTree] = useState(props.leaves);
    const [isLoaded, setIsLoaded] = useState(false);

    function handleSubmit(event) {
        TreeService.addComment(props.id, props.userCo.username, valueComment);

        event.preventDefault();
    }

    function handleChange(event) {
        setValueComment(event.target.value);
    }

    function handleClick(idTree, idUser) {
        if (
            !props.lock &&
            !(props.userCo._id === props.owner._id) &&
            !(props.owner.username === "For sale")
        ) {
            TreeService.getValueTree(idTree, idUser, "rebuy")
                .then(res => {
                    setValueTree(res);
                })
                .then(() => {
                    setIsLoaded(true);
                });
        } else if (!props.lock && props.userCo._id === props.owner._id) {
            TreeService.getValueTree(idTree, idUser, "lock")
                .then(res => {
                    setValueTree(res);
                })
                .then(() => {
                    setIsLoaded(true);
                });
        } else {
            setIsLoaded(true);
        }
    }

    if (isLoaded) {
        return (
            <LeafletMarker
                onClick={() => {
                    handleClick(props.id, userCo._id, props);
                }}
                position={props.position}
                icon={myIcon(props.owner.color)}>
                <Popup minWidth={"400"}>
                    <div
                        className={
                            "has-text-centered is-size-4	has-text-weight-semibold"
                        }>
                        <p>{`${props.name}`}</p>
                    </div>
                    <div
                        className={
                            "has-text-weight-semibold has-text-centered"
                        }>
                        <Gravatar
                            email={props.owner.email}
                            mask={"circle"}
                            size={100}
                        />{" "}
                        <div
                            className={
                                "has-padding-bottom-2 has-padding-top-2"
                            }>
                            {`${props.owner.username}  `}
                        </div>
                        {`${valueTree}`}
                        <LeafIcon />
                    </div>
                    <div className={"has-text-centered"}>
                        {!props.lock && props.owner.username === "For sale" && (
                            <button
                                className={
                                    "button is-small is-rounded has-margin-10  is-success"
                                }
                                onClick={() => {
                                    handleBuyTree(props.id, userCo._id, () => {
                                        props.onBuyTree();
                                        refeshUserStorage(userCo);
                                    });
                                }}>
                                {"I buy !"}
                            </button>
                        )}
                        {!props.lock &&
                            !(props.userCo._id === props.owner._id) &&
                            !(props.owner.username === "For sale") && (
                                <button
                                    className={
                                        "button is-small is-rounded has-margin-10  is-success"
                                    }
                                    onClick={() => {
                                        handleReBuyTree(
                                            props.id,
                                            userCo._id,
                                            props.position[0], // lat
                                            props.position[1], // lon
                                            props.onBuyTree,
                                        );
                                    }}>
                                    {"Rebuy"}
                                </button>
                            )}
                        {!props.lock && props.userCo._id === props.owner._id && (
                            <button
                                className={
                                    "button is-small is-rounded has-margin-10 is-danger"
                                }
                                onClick={() => {
                                    handleLockTree(
                                        props.id,
                                        userCo._id,
                                        props.position[0], // lat
                                        props.position[1], // lon
                                        props.onBuyTree,
                                    );
                                }}>
                                {"Lock"}
                            </button>
                        )}
                        {props.lock && <p>{"is locked"}</p>}
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
                                        <th>{"User"}</th>
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
                                    type={"submit"}
                                    onClick={() => {
                                        location.reload();
                                    }}>
                                    {"Send"}
                                </button>
                            </div>
                        </form>
                        <div>
                            <p>
                                <a
                                    className={"has-text-weight-bold is-size-9"}
                                    href={`https://en.wikipedia.org/wiki/${props.sciName}`}
                                    target={"blank"}>
                                    {"Wiki link"}
                                </a>
                            </p>
                        </div>
                    </div>
                </Popup>
            </LeafletMarker>
        );
    }

    return (
        <LeafletMarker
            onClick={() => {
                handleClick(props.id, userCo._id, props);
            }}
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
                    <RotateSpinner size={20} color={"#00d1b2"} />
                    <LeafIcon />
                </div>
                <div className={"has-text-centered"}>
                    {!props.lock && props.owner.username === "For sale" && (
                        <button
                            className={
                                "button is-small is-rounded has-margin-10  is-success"
                            }
                            onClick={() => {
                                handleBuyTree(props.id, userCo._id, () => {
                                    props.onBuyTree();
                                    refeshUserStorage(userCo);
                                });
                            }}>
                            {"I buy !"}
                        </button>
                    )}
                    {!props.lock &&
                        !(props.userCo._id === props.owner._id) &&
                        !(props.owner.username === "For sale") && (
                            <button
                                className={
                                    "button is-small is-rounded has-margin-10  is-success"
                                }
                                onClick={() => {
                                    handleReBuyTree(
                                        props.id,
                                        userCo._id,
                                        props.position[0], // lat
                                        props.position[1], // lon
                                        props.onBuyTree,
                                    );
                                }}>
                                {"Rebuy"}
                            </button>
                        )}
                    {!props.lock && props.userCo._id === props.owner._id && (
                        <button
                            className={
                                "button is-small is-rounded has-margin-10 is-danger"
                            }
                            onClick={() => {
                                handleLockTree(
                                    props.id,
                                    userCo._id,
                                    props.position[0], // lat
                                    props.position[1], // lon
                                    props.onBuyTree,
                                );
                            }}>
                            {"Lock"}
                        </button>
                    )}
                    {props.lock && <p>{"is locked"}</p>}
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
                                    <th>{"User"}</th>
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
                    <a
                        className={"has-text-weight-bold is-size-9"}
                        href={`https://en.wikipedia.org/wiki/${props.wiki}`}>
                        {"Wiki link"}
                    </a>
                </p>
            </Popup>
        </LeafletMarker>
    );
};

export default Marker;
