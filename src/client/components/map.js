import React from "react";
import {Map, TileLayer} from "react-leaflet";
import Marker from "./marker";
import MarkerClusterGroup from "react-leaflet-markercluster";
import TreeService from "../services/tree.service";
import UserService from "../services/user.service";
const {useState, useEffect} = React;

import "./map.less";

const position = [50.632119, 5.579524];

const getAllTrees = setTrees => {
    TreeService.getAllTrees().then(res => {
        setTrees(res.data);
    });
};

const getAllUsers = setUsers => {
    UserService.getAllUsers().then(res => {
        setUsers(res.data);
    });
};

const getOwner = (owner, users) => {
    if (!owner.length) {
        return {};
    }

    return users.find(user => user.username === owner[0]);
};

const MapWrapper = () => {
    const [trees, setTrees] = useState([]);
    const [users, setUsers] = useState([]);

    console.log(trees[2]);

    useEffect(() => {
        getAllTrees(setTrees);
        getAllUsers(setUsers);
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
                            owner={getOwner(tree.owner, users)}
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
