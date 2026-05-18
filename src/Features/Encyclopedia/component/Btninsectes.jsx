import { useState, useEffect } from "react";
import axios from "axios";

export default function BtnInsectes() {
    const [filters, setFilter] = useState({
        season: "",
        location: ""
    });

    const [data, setData] = useState([]);

    const handleFilterClick = (type, value) => {
        setFilter((prev) => ({
            ...prev,
            [type]: prev[type] === value ? "" : value,
        }));
    };

    useEffect(() => {
        axios.get(`http://localhost:3000/api/Bugs`, { params: filters })
            .then((res) => setData(res.data.data));
    }, [filters]);
    console.log("DATA:", data)

    return (
        <div className="flex flex-col gap-2">
            <h1>Filtrer les insectes</h1>
            
            <div className="btn-group gap-2">
            <div className="btn-group-encyclopedia">
                <button className="btn" onClick={() => {
                    handleFilterClick("season","hiver");
                }}>
                    hiver
                </button>

                <button className="btn" onClick={() => {
                    handleFilterClick("season","printemps");
                }}>
                    printemps
                </button>

                <button className="btn" onClick={() => {
                    handleFilterClick("season","été");
                }}>
                    été
                </button>

                <button className="btn" onClick={() => {
                    handleFilterClick("season","automne");
                }}>
                    automne
                </button>
            </div>

            <div className="btn-group-encyclopedia">
                <button className="btn-2" onClick={() => {
                    handleFilterClick("location","arbres");
                }}>
                    arbres
                </button>
                <button className="btn-2" onClick={() => {
                    handleFilterClick("location","souches");
                }}>
                    souches
                </button>
                <button className="btn-2" onClick={() => {
                    handleFilterClick("location","air");
                }}>
                    air
                </button>
                <button className="btn-2" onClick={() => {
                    handleFilterClick("location","eau");
                }}>
                    eau
                </button>
                <button className="btn-2" onClick={() => {
                    handleFilterClick("location","palmier");
                }}>
                    palmier
                </button>
                <button className="btn-2" onClick={() => {
                    handleFilterClick("location","fleurs");
                }}>
                    fleurs
                </button>
                <button className="btn-2" onClick={() => {
                    handleFilterClick("location","sol");
                }}>
                    sol
                </button>
            </div>
            
</div>

            <div className="grid grid-cols-2 gap-4">
                {data.length === 0 ? (
                    <p>Aucun résultat</p>
                ) : (
                    data.map((item) => (
                    <div key={item._id} className="outline-2 outline-orange-200 p-2 m-2 rounded-lg">
                            <h2>{item.name}</h2> 
                            <img src={`http://localhost:3000/uploads/${item.image}`} alt={item.name}/>
                            <h3>Prix :</h3>
                            <p>{item.price}</p>
                            <h3>Jeu de mots :</h3>
                            <p>{item.jdm}</p>
                            <h3>Description de Thibou :</h3>
                            <p>{item.description}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

