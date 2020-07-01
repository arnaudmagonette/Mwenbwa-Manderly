import React from "react";
const {useState, useEffect} = React;
import {Map, TileLayer} from "react-leaflet";
import Marker from "./marker";
import MarkerClusterGroup from "react-leaflet-markercluster";
import TreeService from "../services/tree.service";
import UserService from "../services/user.service";
import {MagicSpinner} from "react-spinners-kit";

import "./map.less";

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

const onViewportChanged = viewport => {
    localStorage.setItem(
        "viewport",
        // JSON.stringify = transforme objet en string
        JSON.stringify({
            center: viewport.center,
            zoom: viewport.zoom,
        }),
    );
};

const getInitialViewport = () => {
    //JSON.parse = retransforme en objet
    const viewport = JSON.parse(localStorage.getItem("viewport"));

    if (viewport && viewport.center && viewport.zoom) {
        return viewport;
    }
    return {
        center: [50.632119, 5.579524],
        zoom: 14,
    };
};

const MapWrapper = props => {
    const [trees, setTrees] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userCo] = useState(props.userCo);

    const viewport = getInitialViewport();
    useEffect(() => {
        getAllTrees(setTrees, setIsLoaded);
        getAllUsers(setUsers);
    }, []);

    if (isLoaded) {
        return (
            <div>
                <Map
                    center={viewport.center}
                    zoom={viewport.zoom}
                    onViewportChanged={onViewportChanged}>
                    <TileLayer
                        url={
                            "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
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
                                        allOwners={tree.owner}
                                        name={tree.name}
                                        leaves={tree.leaves}
                                        comments={tree.comments}
                                        userCo={userCo}
                                        lock={tree.lock}
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
        <div className={"loading"}>
            <MagicSpinner size={100} color={"#00d1b2"} />
        </div>
    );
};

export default MapWrapper;
