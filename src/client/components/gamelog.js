import React from "react";
import Gravatar from "react-circle-gravatar";
import LeafIcon from "./leaf-icon";
import TreeIcon from "./tree-icon";

const Gamelog = () => (
    <div
        className={
            "notification has-margin-30 column is-three-quarters-mobile "
        }>
        <div className={"has-text-centered has-text-black subtitle is-5 "}>
            <Gravatar
                email={"alan.louette@gmail.com"}
                mask={"circle"}
                size={150}
            />
            <div className={"has-padding-bottom-10 has-padding-top-20"}>
                <p>
                    {"134 "}
                    {<LeafIcon />}
                </p>
            </div>
            <p>
                {"122 "}
                {<TreeIcon />}
            </p>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>{"Game Log"}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{"Avatar"}</td>
                        <td>{"User"}</td>
                        <td>{"Action"}</td>
                    </tr>
                    <tr>
                        <td>
                            <img src={"./false-user.png"} />
                        </td>
                        <td>{"Jean-Eud"}</td>
                        <td>{"bought Arboretrum"}</td>
                    </tr>
                    <tr>
                        <td>
                            <img src={"./false-user.png"} />
                        </td>
                        <td>{"Britney"}</td>
                        <td>{"bought Ficus"}</td>
                    </tr>
                    <tr>
                        <td>
                            <img src={"./false-user.png"} />
                        </td>
                        <td>{"Anémone"}</td>
                        <td>{"bought Tulipe"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

export default Gamelog;
