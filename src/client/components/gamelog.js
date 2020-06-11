import React from "react";

const Gamelog = () => (
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
        <div>
            <nav>
                <a href={"#"}>{"Leaderboard"}</a>
                <a href={"#"}>{"Game Log"}</a>
                <a href={"#"}>{"Profil"}</a>
            </nav>
        </div>
    </div>
);

export default Gamelog;
