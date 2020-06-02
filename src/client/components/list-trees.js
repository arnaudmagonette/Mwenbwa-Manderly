import * as React from "react";

const {useState, useEffect} = React;

function AllTrees() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [trees, setTrees] = useState([]);

    // Remarque : le tableau vide de dépendances [] indique
    // que useEffect ne s’exécutera qu’une fois, un peu comme
    // componentDidMount()
    useEffect(() => {
        fetch("http://localhost/allTrees")
            .then(res => res.json())
            .then(
                result => {
                    console.log(result);
                    setIsLoaded(true);
                    setTrees(result.map(x => x));
                },
                // Remarque : il faut gérer les erreurs ici plutôt que dans
                // un bloc catch() afin que nous n’avalions pas les exceptions
                // dues à de véritables bugs dans les composants.
                err => {
                    setIsLoaded(true);
                    setError(err);
                },
            );
    }, []);

    if (error) {
        console.log(trees);
        return <div>{`Erreur :${error.message}`}</div>;
    } else if (!isLoaded) {
        return <div>{"Chargement..."}</div>;
    }
    return (
        <div>
            {trees.map(tree => (
                <div key={tree._id}>
                    <p>{`Tree id: ${tree._id}`}</p>
                    <ul>
                        <li>{`Name: ${tree.name}`}</li>
                        <li>{`Nom complet: ${tree.sci_name}`}</li>
                        <li>{`Leaves: ${tree.leaves}`}</li>
                        <li>{"Geoloc"}</li>
                        <ul>
                            <li>{`Lat: ${tree.geoloc.lat}`}</li>
                            <li>{`Lon: ${tree.geoloc.lon}`}</li>
                        </ul>
                        <li>{`Comment: ${tree.comments}`}</li>
                        <li>{`Owner: ${tree.owner}`}</li>
                        <li>{`Lock: ${tree.lock}`}</li>
                    </ul>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default AllTrees;
