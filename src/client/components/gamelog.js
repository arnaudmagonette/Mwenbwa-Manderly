import React from "react";
import AuthService from "../services/auth.service";

const connectedUser = AuthService.getCurrentUser();

const Gamelog = () => (
    <div>
        <div>
            <p>{`Welcome, ${connectedUser.username}`}</p>
        </div>
        <div>
            <img src={"./false-user.png"} />
            <p>{`${connectedUser.leaves} leaves`}</p>
            <p>{"53 trees"}</p>
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
