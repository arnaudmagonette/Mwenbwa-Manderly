import React from "react";
import {Map, TileLayer} from "react-leaflet";
import Marker from "./marker";
import MarkerClusterGroup from "react-leaflet-markercluster";

import "./map.less";

const position = [50.632119, 5.579524];

const getAllTrees = setTrees => {
    fetch("/allTrees").then(response => {
        response.json().then(body => setTrees(body));
    });
};

const getAllUsers = setUsers => {
    fetch("/allUsers").then(response => {
        response.json().then(body => setUsers(body));
    });
};

const getOwner = (owner, users) => {
    if (!owner.length) {
        return {};
    }

    return users.find(user => user.username === owner[0]);
};

const MapWrapper = () => {
    const [trees, setTrees] = React.useState([]);
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
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
