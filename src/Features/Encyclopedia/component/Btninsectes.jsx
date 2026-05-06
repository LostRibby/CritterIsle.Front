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
        <div >
            <h1>Filtrer les Insectes</h1>
            <div>
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

            <div>
                <button className="btn" onClick={() => {
                    handleFilterClick("location","arbres");
                }}>
                    arbres
                </button>
                <button className="btn" onClick={() => {
                    handleFilterClick("location","souches");
                }}>
                    souches
                </button>
                <button className="btn" onClick={() => {
                    handleFilterClick("location","air");
                }}>
                    air
                </button>
                <button className="btn" onClick={() => {
                    handleFilterClick("location","palmier");
                }}>
                    palmier
                </button>
                <button className="btn" onClick={() => {
                    handleFilterClick("location","fleurs");
                }}>
                    fleurs
                </button>
                <button className="btn" onClick={() => {
                    handleFilterClick("location","sol");
                }}>
                    sol
                </button>
            </div>


            <div>
                {data.length === 0 ? (
                    <p>Aucun résultat</p>
                ) : (
                    data.map((item) => (
                        <div key={item._id}>
                            <h3>{item.name}</h3> 
                            <img src={`http://localhost:3000/uploads/${item.image}`} alt={item.name}/>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

