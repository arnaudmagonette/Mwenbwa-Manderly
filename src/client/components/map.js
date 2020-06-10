import React from "react";
import {Map, TileLayer} from "react-leaflet";
import Marker from "./marker";

import "./map.less";

const position = [50.632119, 5.579524];

const getAllTrees = setTrees => {
    fetch("/allTrees").then(response => {
        response.json().then(body => setTrees(body));
    });
};

const MapWrapper = () => {
    const [trees, setTrees] = React.useState([]);

    React.useEffect(() => {
        getAllTrees(setTrees);
    }, []);

    return (
        <div>
            <Map center={position} zoom={14}>
                <TileLayer
                    url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
                {trees.map(tree => (
                    <Marker
                        key={tree._id}
                        position={[tree.geoloc.lat, tree.geoloc.lon]}
                    />
                ))}
            </Map>
        </div>
    );
};

export default MapWrapper;
