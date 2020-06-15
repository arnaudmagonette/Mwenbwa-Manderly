/* becodeorg/mwenbwa
 *
 * /src/client/components/map.js - Map Component
 *
 * coded by Guillaume Boeur
 * started at 28/05/2020
 */

import React from "react";
import {Marker as LeafletMarker, Popup} from "react-leaflet";
import * as Leaflet from "leaflet";
import {iconUrl} from "./icon";
import LeafIcon from "./leaf-icon";
import AvatarIcon from "./avatar-icon";

const myIcon = Leaflet.icon({
    iconUrl: iconUrl("#037318"),
    iconSize: [30, 30],
    iconAnchor: [25, 15],
    popupAnchor: [0, -20],
});

const Marker = props => (
    <LeafletMarker position={props.position} icon={myIcon}>
        <Popup>
            <div>
                <p>{`Name : ${props.name}`}</p>
            </div>
            <div>
                <AvatarIcon />
                <p>{`Owner : ${props.owner}`}</p>
            </div>
            <div>
                <p>
                    {`Value : ${props.leaves}`}
                    <LeafIcon />
                </p>
                {/* <button type={"submit"}>{"Buy"}</button> */}
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
