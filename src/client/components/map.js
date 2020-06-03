/* becodeorg/mwenbwa
 *
 * /src/client/components/map.js - Map Component
 *
 * coded by Guillaume Boeur
 * started at 28/05/2020
 */

import React from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import * as Leaflet from "leaflet";

import "./map.less";

const myIcon = Leaflet.icon({
    iconUrl: "http://www.svgrepo.com/show/127575/location-sign.svg",
    iconSize: [30, 30],
    iconAnchor: [25, 15],
    popupAnchor: [0, -20],
});

const position = [50.632119, 5.579524];
const MapWrapper = () => (
    <div>
        <Map center={position} zoom={14}>
            <TileLayer
                url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            />
            <Marker position={position} icon={myIcon}>
                <Popup>
                    <div>
                        <p>{"Name : Arboretrium"}</p>
                    </div>
                    <div>
                        <p>{"Owner : Pierre"}</p>
                    </div>
                    <div>
                        <p>{"Value : 131 L"}</p>
                        {/* <button type="button">Buy</button> */}
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
                                    <td>{"Date"}</td>
                                </tr>
                                <tr>
                                    <td>{"Pierre"}</td>
                                    <td>{"03/06/2020"}</td>
                                </tr>
                                <tr>
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
                                    <td>{"User"}</td>
                                    <td>{"Comment"}</td>
                                </tr>
                                <tr>
                                    <td>{"Pierre"}</td>
                                    <td>{"Lorem ipsum"}</td>
                                </tr>
                                <tr>
                                    <td>{"Marc"}</td>
                                    <td>{"Lorem ipsum"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <form>
                        <textarea placeholder={"Write your comment..."} />
                        {/* <button type={"submit"} /> */}
                    </form>
                    <div>
                        <a href={"#"}>{"Wiki link"}</a>
                    </div>
                </Popup>
            </Marker>
        </Map>
    </div>
);

export default MapWrapper;
