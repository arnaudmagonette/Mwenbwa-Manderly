import React from "react";
import ReactDOMServer from "react-dom/server";

const Icon = props => (
    <svg width={"580"} height={"400"} xmlns={"http://www.w3.org/2000/svg"}>
        <ellipse
            ry={"117"}
            rx={"117"}
            id={"svg_1"}
            cy={"218.453125"}
            cx={"213.5"}
            fill={props.color}
        />
    </svg>
);

export const iconUrl = color =>
    `data:image/svg+xml,${escape(
        ReactDOMServer.renderToStaticMarkup(<Icon color={color} />),
    )}`;
