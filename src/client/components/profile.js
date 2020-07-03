import React from "react";
const {useState, useEffect} = React;
import Gravatar from "react-circle-gravatar";
import LeafIcon from "./leaf-icon";
import TreeIcon from "./tree-icon";
import AuthService from "../services/auth.service";
import TreeService from "../services/tree.service";

const howManyTrees = (connectedUser, setNumberTrees) => {
    TreeService.howManyTrees(connectedUser.username).then(res => {
        setNumberTrees(res);
    });
};

const Profile = props => {
    const [connectedUser, setConnectedUser] = useState(props.userCo);
    const [numberTrees, setNumberTrees] = useState(0);

    useEffect(() => {
        howManyTrees(connectedUser, setNumberTrees);
        const interval = setInterval(() => {
            setConnectedUser(AuthService.getCurrentUser());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={"has-text-centered has-text-black subtitle is-5 "}>
            <Gravatar email={connectedUser.email} mask={"circle"} size={100} />
            <div
                className={
                    "has-padding-bottom-10 has-padding-top-10 has-text-weight-bold"
                }>
                <p>{connectedUser.username}</p>
            </div>
            <div className={"columns has-text-weight-bold"}>
                <p className={"column"}>
                    {`${connectedUser.leaves} `} <LeafIcon />
                </p>
                <p className={"column"}>
                    {`${numberTrees} `}
                    {<TreeIcon />}
                </p>
            </div>
        </div>
    );
};

export default Profile;
