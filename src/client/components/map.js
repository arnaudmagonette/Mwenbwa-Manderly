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
                    <p>{"Liège"}</p>
                </Popup>
            </Marker>
        </Map>
    </div>
);

export default MapWrapper;
