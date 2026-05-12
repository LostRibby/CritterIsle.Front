import { useState, useEffect } from "react";
import axios from "axios";

export default function BtnDSC() {
    const [filters, setFilter] = useState({
        season: "",
        speed: ""
    });

    const [data, setData] = useState([]);

    const handleFilterClick = (type, value) => {
        setFilter((prev) => ({
            ...prev,
            [type]: prev[type] === value ? "" : value,
        }));
    };

    useEffect(() => {
        axios.get(`http://localhost:3000/api/Creatures`, { params: filters })
            .then((res) => setData(res.data.data));
    }, [filters]);
    console.log("DATA:", data);

    return (
        <div>
            <h1>Filtrer les créatures marines</h1>
            <div className="btn-group gap-2">
                <div className="btn-group-encyclopedia">
                    <button className="btn" onClick={() => {
                        handleFilterClick("season", "hiver")
                    }}>

                    </button>
                    <button className="btn" onClick={() => {
                        handleFilterClick("season", "printemps")
                    }}>

                    </button>
                    <button className="btn" onClick={() => {
                        handleFilterClick("season", "été")
                    }}>

                    </button>
                    <button className="btn" onClick={() => {
                        handleFilterClick("season", "automne")
                    }}>

                    </button>
                </div>
                <div className="btn-group-encyclopedia">
                    <button className="btn2" onClick={() => {
                        handleFilterClick("speed", "immobile")
                    }}>
                        immobile
                    </button>
                    <button className="btn2" onClick={() => {
                        handleFilterClick("speed", "très_lent")
                    }}>
                        très lent
                    </button>
                    <button className="btn2" onClick={() => {
                        handleFilterClick("speed", "lent")
                    }}>
                        lent
                    </button>
                    <button className="btn2" onClick={() => {
                        handleFilterClick("speed", "moyen")
                    }}>
                        moyen
                    </button>
                    <button className="btn2" onClick={() => {
                        handleFilterClick("speed", "rapide")
                    }}>
                        rapide
                    </button>
                    <button className="btn2" onClick={() => {
                        handleFilterClick("speed", "très_rapide")
                    }}>
                        très rapide
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
