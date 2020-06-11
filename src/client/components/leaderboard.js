import React from "react";

const LeaderBoard = () => (
    <div>
        <div>
            <img src={"./false-user.png"} />
            <p>{"123 leaf"}</p>
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
        <div>
            <nav>
                <a href={"#"}>{"Leaderboard"}</a>
                <a href={"#"}>{"Game Log"}</a>
                <a href={"#"}>{"Profil"}</a>
            </nav>
        </div>
    </div>
);

export default LeaderBoard;
