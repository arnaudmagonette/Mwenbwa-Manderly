import React from "react";
import Gravatar from "react-circle-gravatar";
import LeafIcon from "./leaf-icon";
import TreeIcon from "./tree-icon";
import AuthService from "../services/auth.service";

const connectedUser = AuthService.getCurrentUser();

const Gamelog = () => (
    <div
        className={
            "notification has-margin-30 column is-three-quarters-mobile "
        }>
        <div className={"has-text-centered has-text-black subtitle is-5 "}>
            <Gravatar
                email={`${connectedUser.email} `}
                mask={"circle"}
                size={100}
            />
            <div className={"has-padding-bottom-10 has-padding-top-10"}>
                <p>
                    {`${connectedUser.leaves} `} <LeafIcon />
                </p>
            </div>
            <p>
                {"124 "}
                {<TreeIcon />}
            </p>
        </div>
        <div className={"has-padding-top-5 has-text-centered"}>
            <p
                className={
                    "has-margin-bottom-10 has-text-black subtitle is-5 has-text-weight-bold"
                }>
                {"GAMELOG"}
            </p>
            <table className={"table  is-striped  is-hoverable is-fullwidth"}>
                <thead>
                    <tr>
                        <th>{"Avatar"}</th>
                        <th>{"User"}</th>
                        <th>{"Action"}</th>
                    </tr>
                </thead>
                <tbody
                    className={"table  is-striped  is-hoverable is-fullwidth"}>
                    <tr>
                        <td>
                            <Gravatar
                                email={`${connectedUser.email} `}
                                size={30}
                            />
                        </td>
                        <td>{"Jean-Eud"}</td>
                        <td>{"bought Arboretrum"}</td>
                    </tr>
                    <tr>
                        <td>
                            <Gravatar
                                email={`${connectedUser.email} `}
                                size={30}
                            />
                        </td>
                        <td>{"Britney"}</td>
                        <td>{"bought Ficus"}</td>
                    </tr>
                    <tr>
                        <td>
                            <Gravatar
                                email={"alan.louette@gmail.com"}
                                size={30}
                            />
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
