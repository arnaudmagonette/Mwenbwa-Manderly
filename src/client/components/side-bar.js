import React from "react";
const {useState} = React;
import {OffCanvas, OffCanvasMenu} from "react-offcanvas";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
} from "react-router-dom";
import AuthService from "../services/auth.service";
import Profile from "./profile";
import LeaderBoard from "./leaderboard";
import Gamelog from "./gamelog";
import Rules from "./rules";
import EditP from "./edit-profile";
import Navigation from "./navigation";
import DeleteProfile from "./delete-profile";

export const paths = {
    LeaderBoard: "/leader-board",
    Gamelog: "/game-log",
    DeleteProfile: "/delete-profile",
    Rules: "/rules",
    EditProfile: "/edit-profile",
};

const handleClick = (setIsMenuOpened, isMenuOpened) => {
    setIsMenuOpened(!isMenuOpened);
};

const handleLogout = setUserCo => () => {
    setUserCo(null);
    AuthService.logout();
};

const SideBar = props => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [width30Client] = useState((window.innerWidth / 100) * 30);

    return (
        <OffCanvas
            width={width30Client}
            transitionDuration={300}
            effect={"overlay"}
            isMenuOpened={isMenuOpened}
            position={"right"}>
            <OffCanvasMenu>
                <a
                    className={"toggleButton"}
                    href={""}
                    onClick={e => {
                        e.preventDefault();
                        handleClick(setIsMenuOpened, isMenuOpened);
                    }}>
                    {isMenuOpened ? (
                        <img
                            src={
                                "https://img.icons8.com/ios-filled/50/000000/cancel.png"
                            }
                        />
                    ) : (
                        <img
                            src={
                                "https://img.icons8.com/ios-filled/50/000000/menu.png"
                            }
                        />
                    )}
                </a>
                <div
                    className={
                        "container-component has-padding-left-30 has-padding-right-30 has-padding-top-30 hero is-fullheight"
                    }>
                    <Router>
                        <Redirect from={"/"} exact to={paths.Rules} />
                        <div
                            className={"notification has-padding-20"}
                            style={{overflow: "scroll"}}>
                            <Profile userCo={props.userCo} />
                            <Switch>
                                <Route
                                    className={" hero is-fullheight"}
                                    path={paths.LeaderBoard}>
                                    <LeaderBoard users={props.users} />
                                </Route>
                                <Route path={paths.Gamelog}>
                                    <Gamelog />
                                </Route>
                                <Route path={paths.DeleteProfile}>
                                    <DeleteProfile />
                                </Route>
                                <Route path={paths.Rules}>
                                    <Rules />
                                </Route>
                                <Route path={paths.EditP}>
                                    <EditP />
                                </Route>
                            </Switch>
                        </div>

                        <Navigation
                            handleLogout={handleLogout(props.setUserCo)}
                        />
                    </Router>
                </div>
            </OffCanvasMenu>
        </OffCanvas>
    );
};

export default SideBar;
