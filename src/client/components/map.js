import React from "react";
import {Map, TileLayer} from "react-leaflet";
import Marker from "./marker";
import MarkerClusterGroup from "react-leaflet-markercluster";
import TreeService from "../services/tree.service";
const {useState, useEffect} = React;

import "./map.less";

const getAllTrees = setTrees => {
    TreeService.getAllTrees().then(res => {
        setTrees(res.data);
    });
};

const MapWrapper = () => {
    const [trees, setTrees] = useState([]);
    const [position] = useState([50.632119, 5.579524]);

    useEffect(() => {
        getAllTrees(setTrees);
    }, []);

    return (
        <div>
            <Map center={position} zoom={14}>
                <TileLayer
                    url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
                <MarkerClusterGroup>
                    {trees.map(tree => (
                        <Marker
                            key={tree._id}
                            position={[tree.geoloc.lat, tree.geoloc.lon]}
                            owner={tree.owner}
                            name={tree.name}
                            leaves={tree.leaves}
                            comments={tree.comments}
                        />
                    ))}
                </MarkerClusterGroup>
            </Map>
        </div>
    );
};

export default MapWrapper;
