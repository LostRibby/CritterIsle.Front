import { useState, useEffect } from "react";
import axios from "axios";

export default function BtnPoissons() {
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
        axios.get(`http://localhost:3000/api/Fishes`, { params: filters })
            .then((res) => setData(res.data.data));
    }, [filters])

    console.log("DATA :", data)

    return (
        <div>
            <h1>Filtrer les poissons</h1>
            <div className="btn-group gap-2">
                <div className="btn-group-encyclopedia">

                    <button className="btn" onClick={() => {
                        handleFilterClick("season", "hiver");
                    }}>
                        hiver
                    </button>

                    <button className="btn" onClick={() => {
                        handleFilterClick("season", "printemps");
                    }}>
                        printemps
                    </button>

                    <button className="btn" onClick={() => {
                        handleFilterClick("season", "été")
                    }}>
                        été
                    </button>

                    <button className="btn" onClick={() => {
                        handleFilterClick("season", "automne")
                    }}>

                    </button>
                </div>
                <div className="btn-group-encyclopedia">
                    <button className="btn2" onClick={() => {
                        handleFilterClick("location", "mer")
                    }}>
                        mer
                    </button>
                    <button className="btn2" onClick={() => {
                        handleFilterClick("location", "rivière")
                    }}>
                        rivère
                    </button>
                    <button className="btn2" onClick={() => {
                        handleFilterClick("location", "cascade")
                    }}>
                        cascade
                    </button>
                    <button className="btn2" onClick={() => {
                        handleFilterClick("location", "étang")
                    }}>
                        étang
                    </button>
                    <button className="btn2" onClick={() => {
                        handleFilterClick("location", "ponton")
                    }}>
                        ponton
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
                            <img src={`http://localhost:3000/uploads/${item.image}`} alt={item.name} />
                            <h3>Prix:</h3>
                            <p>{item.price}</p>
                            <h3>Jeu de mots :</h3>
                            <p>{item.jdm}</p>
                            <h3>Descfription de Thibou :</h3>
                            <p>{item.description}</p>
                        </div>
                    ))
                )}

            </div>
        </div>
    )
}