import React from "react";
const {useState, useEffect} = React;
import Gravatar from "react-circle-gravatar";
import LogService from "../services/log.service";

const getlogs = setLogs => {
    LogService.getLogs().then(res => {
        setLogs(res.data);
    });
};

const Gamelog = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        getlogs(setLogs);
    }, []);

    return (
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
                    {logs.map(log => (
                        <tr key={log._id}>
                            <td>
                                <Gravatar email={log.playerEmail} size={30} />
                            </td>
                            <td>{log.playerUsername}</td>
                            <td>{log.action}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Gamelog;
