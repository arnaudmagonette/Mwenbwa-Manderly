import React from "react";
import AuthService from "../services/auth.service";
import {Scrollbars} from "react-custom-scrollbars";
import LeafIcon from "./leaf-icon";
import TreeIcon from "./tree-icon";

const connectedUser = AuthService.getCurrentUser();

const Rules = () => (
    <div className={"has-padding-top-5 has-text-centered"}>
        <p
            className={
                "has-margin-bottom-10 has-text-black subtitle is-5 has-text-weight-bold"
            }>
            {"RULES"}
        </p>
        <Scrollbars autoHeight autoHeightMin={500}>
            <p>{`Welcome to Mwenbwa ${connectedUser.username} !`}</p>
            <br />
            <p>
                {
                    "Here you are in Liège, the burning city and its expanse of trees. You have just received 3 trees "
                }
                <TreeIcon />
                {" and a certain amount of leaves "}
                <LeafIcon />
                {" to start your expansion."}
            </p>
            <br />
            <p>
                {"You can buy free trees "}
                <TreeIcon />
                {" with this virtual coins "}
                <LeafIcon />
                {
                    " but also buy those of other players. In exchange for a larger sum of money, you can even block a tree so that no one can buy it back and it remains your property!"
                }
            </p>
            <br />
            <p>
                {
                    "Every 15 minutes, you will receive the total of leaves from all your trees. So buy as much as possible to receive even more money! However, every 30 minutes you will lose half of your leaves ... ( Winter is coming ! )"
                }
            </p>
            <br />
            <p>
                {
                    "There, you know all there is to know to start your expansion, you can start by buying a new tree. Do not hesitate to consult the Leaderboard below to consult the ranking and why not try to be part of the top 3!"
                }
            </p>
            <br />
        </Scrollbars>
    </div>
);

export default Rules;
