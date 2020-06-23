import React from "react";
import AuthService from "../services/auth.service";

const connectedUser = AuthService.getCurrentUser();

const Rules = () => (
    <div className={"has-padding-top-5 has-text-centered"}>
        <p
            className={
                "has-margin-bottom-10 has-text-black subtitle is-5 has-text-weight-bold"
            }>
            {"RULES"}
        </p>
        <p>{`Welcome to Mwenbwa ${connectedUser.username} !`}</p>
        <p>{`Te voici voici à Liège, la cité ardente, et son étendue d'arbes. Tu viens de recevoir 3 arbres (tree icon) ainsi qu'une certaine somme de feuille (leaf icon) pour commencer ton expension. `}</p>
        <p>{`Tu peux acheter des arbres libres (default tree icon) avec cette monnaie virtuelle (leaf.icon) mais aussi racheter ceux des autres joueurs. En échange d'une plus grosse somme d'argent, tu peux même bloquer un arbre pour que personne ne puisse le racheter et qu'il reste ta propriété !`}</p>
        <p>{`Toutes les 15 minutes, tu reçevras le total de feuilles de tout tes arbres. Achetes en donc le plus possible pour recevoir encore plus de monnaie ! Par contre, toutes les 30 minutes tu perdras la moitié de tes feuilles... ( Winter is coming ! )`}</p>
        <p>{`Voilà, tu sais tout ce qu'il y a à savoir pour commencer ton expension, tu peux commencer par acheter un nouvel arbre. N'hésite pas à consulter le Leaderboard ci-dessous pour consulter le classement et pourquoi pas tenter de faire partie du top 3 !`}</p>
    </div>
);

export default Rules;
