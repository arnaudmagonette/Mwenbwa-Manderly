/* eslint-disable react/button-has-type */
import React from "react";
import {Marker as LeafletMarker, Popup} from "react-leaflet";
import * as Leaflet from "leaflet";
import {iconUrl} from "./icon";
import LeafIcon from "./leaf-icon";
import TreeService from "../services/tree.service";
import AuthService from "../services/auth.service";
import LogService from "../services/log.service";

import AvatarIcon from "./avatar-icon";

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
        AuthService.getCurrentUser().id,
        AuthService.getCurrentUser().username,
        AuthService.getCurrentUser().email,
        "Buy a tree",
    );
};

const handelReBuyTree = (idTree, idUser, latTree, lonTree) => {
    TreeService.reBuyTree(idTree, idUser, latTree, lonTree);
};

const handelLockTree = (idTree, idUser, latTree, lonTree) => {
    TreeService.lockTree(idTree, idUser, latTree, lonTree);
};

const Marker = props => (
    <LeafletMarker position={props.position} icon={myIcon(props.owner.color)}>
        <Popup>
            <div>
                <p>{`Name : ${props.name}`}</p>
            </div>
            <div>
                <AvatarIcon />
                <p>{`Owner : ${props.owner.username}`}</p>
            </div>
            <div>
                <p>
                    {`Value : ${props.leaves}`}
                    <LeafIcon />
                </p>
                <button
                    onClick={() => {
                        handelBuyTree(
                            props.id,
                            AuthService.getCurrentUser().id,
                            // location.reload(),
                        );
                    }}>
                    {"Buy"}
                </button>
                <button
                    onClick={() => {
                        handelReBuyTree(
                            props.id,
                            AuthService.getCurrentUser().id,
                            props.position[0], // lat
                            props.position[1], // lon
                            // location.reload(),
                        );
                    }}>
                    {"Rebuy"}
                </button>
                <button
                    onClick={() => {
                        handelLockTree(
                            props.id,
                            AuthService.getCurrentUser().id,
                            props.position[0], // lat
                            props.position[1], // lon
                            // location.reload(),
                        );
                    }}>
                    {"Lock"}
                </button>
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
                            <td>{"Avatar"}</td>
                            <td>{"User"}</td>
                            <td>{"Date"}</td>
                        </tr>
                        <tr>
                            <AvatarIcon />
                            <td>{"Pierre"}</td>
                            <td>{"03/06/2020"}</td>
                        </tr>
                        <tr>
                            <AvatarIcon />
                            <td>{"Marc"}</td>
                            <td>{"02/06/2020"}</td>
                        </tr>
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
                            <td>{"Avatar"}</td>
                            <td>{"User"}</td>
                            <td>{"Comment"}</td>
                        </tr>
                        <tr>
                            <AvatarIcon />
                            <td>{"Pierre"}</td>
                            <td>{`${props.comments}`}</td>
                        </tr>
                        <tr>
                            <AvatarIcon />
                            <td>{"Marc"}</td>
                            <td>{`${props.comments}`}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <form>
                <textarea placeholder={"Write your comment..."} />
                <button type={"submit"}>{"Send"}</button>
            </form>
            <div>
                <a href={"#"}>{"Wiki link"}</a>
            </div>
        </Popup>
    </LeafletMarker>
);

export default Marker;
