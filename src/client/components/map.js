import React from "react";
const {useState, useEffect} = React;
import {Map, TileLayer} from "react-leaflet";
import Marker from "./marker";
import MarkerClusterGroup from "react-leaflet-markercluster";
import TreeService from "../services/tree.service";
import UserService from "../services/user.service";

import "./map.less";

const position = [50.632119, 5.579524];

const getAllTrees = (setTrees, setIsLoaded) => {
    TreeService.getAllTrees()
        .then(res => {
            setTrees(res.data);
        })
        .then(() => {
            setIsLoaded(true);
        });
};

const getAllUsers = setUsers => {
    UserService.getAllUsers().then(res => {
        setUsers(res.data);
    });
};

const getOwner = (owner, users) => {
    if (!owner.length) {
        return users.find(user => user.username === "For sale");
    }

    return users.find(user => user.username === owner[0]);
};

const MapWrapper = props => {
    const [trees, setTrees] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userCo] = useState(props.userCo);

    useEffect(() => {
        getAllTrees(setTrees, setIsLoaded);
        getAllUsers(setUsers);
    }, []);

    if (isLoaded) {
        return (
            <div>
                <Map center={position} zoom={14}>
                    <TileLayer
                        url={
                            "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        }
                    />
                    <MarkerClusterGroup>
                        {trees.map(tree => {
                            const ownerTree = getOwner(tree.owner, users);
                            if (ownerTree && tree) {
                                // eslint-disable-next-line
                                return (
                                    <Marker
                                        key={tree._id}
                                        id={tree._id}
                                        position={[
                                            tree.geoloc.lat,
                                            tree.geoloc.lon,
                                        ]}
                                        owner={ownerTree}
                                        name={tree.name}
                                        leaves={tree.leaves}
                                        comments={tree.comments}
                                        userCo={userCo}
                                    />
                                );
                            }
                            // eslint-disable-next-line
                            return;
                        })}
                    </MarkerClusterGroup>
                </Map>
            </div>
        );
    }

    return (
        <div>
            <Map center={position} zoom={14}>
                <TileLayer
                    url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
            </Map>
        </div>
    );
};

export default MapWrapper;
