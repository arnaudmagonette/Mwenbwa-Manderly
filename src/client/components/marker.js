/* eslint-disable react/button-has-type */
import React from "react";
import {Marker as LeafletMarker, Popup} from "react-leaflet";
import * as Leaflet from "leaflet";
import {iconUrl} from "./icon";
import LeafIcon from "./leaf-icon";
import TreeService from "../services/tree.service";
import AuthService from "../services/auth.service";

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
                        );
                    }}>
                    {"Buy"}
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
                {/* <button type={"submit"}>{"Send"}</button> */}
            </form>
            <div>
                <a href={"#"}>{"Wiki link"}</a>
            </div>
        </Popup>
    </LeafletMarker>
);

export default Marker;
