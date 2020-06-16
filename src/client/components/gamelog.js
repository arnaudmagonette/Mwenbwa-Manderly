import React from "react";
import AuthService from "../services/auth.service";
import LeafIcon from "./leaf-icon";
import AvatarIcon from "./avatar-icon";
import TreeIcon from "./tree-icon";
import Gravatar from "react-gravatar";

const connectedUser = AuthService.getCurrentUser();

const Gamelog = () => (
    <div>
        <div>
            <p>{`Welcome, ${connectedUser.username}`}</p>
        </div>
        <div>
            <Gravatar email={connectedUser.email} />
            <p>
                {`${connectedUser.leaves} `} <LeafIcon />
            </p>
            <p>
                {"53 "} <TreeIcon />
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
                            <AvatarIcon />
                        </td>
                        <td>{"Jean-Eud"}</td>
                        <td>{"bought Arboretrum"}</td>
                    </tr>
                    <tr>
                        <td>
                            <AvatarIcon />
                        </td>
                        <td>{"Britney"}</td>
                        <td>{"bought Ficus"}</td>
                    </tr>
                    <tr>
                        <td>
                            <AvatarIcon />
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
