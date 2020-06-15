import React from "react";
import AuthService from "../services/auth.service";

const connectedUser = AuthService.getCurrentUser();

const LeaderBoard = () => (
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
                        <th>{"Player Score"}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{"Avatar"}</td>
                        <td>{"User"}</td>
                        <td>{"Score"}</td>
                    </tr>
                    <tr>
                        <td>
                            <img src={"./false-user.png"} />
                        </td>
                        <td>{"Pierre"}</td>
                        <td>{"1347 leaf"}</td>
                    </tr>
                    <tr>
                        <td>
                            <img src={"./false-user.png"} />
                        </td>
                        <td>{"Henry"}</td>
                        <td>{"1340 leaf"}</td>
                    </tr>
                    <tr>
                        <td>
                            <img src={"./false-user.png"} />
                        </td>
                        <td>{"David"}</td>
                        <td>{"1299 leaf"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>{"Trees"}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{"Avatar"}</td>
                        <td>{"User"}</td>
                        <td>{"Trees"}</td>
                    </tr>
                    <tr>
                        <td>
                            <img src={"./false-user.png"} />
                        </td>
                        <td>{"Pierre"}</td>
                        <td>{"5435"}</td>
                    </tr>
                    <tr>
                        <td>
                            <img src={"./false-user.png"} />
                        </td>
                        <td>{"Henry"}</td>
                        <td>{"5121"}</td>
                    </tr>
                    <tr>
                        <td>
                            <img src={"./false-user.png"} />
                        </td>
                        <td>{"David"}</td>
                        <td>{"4937"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

export default LeaderBoard;
