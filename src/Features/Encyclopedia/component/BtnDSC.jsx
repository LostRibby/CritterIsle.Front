import { useState, useEffect } from "react";
import axios from "axios";

export default function BtnDSC() {
    const [active, setActive] = useState("");
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
        <div className="flex flex-col gap-2 justify-center items-center">
            <h2 className=" font-bold">Filtrer les créatures marines</h2>

            <div className="btn-group-encyclopedia mb-4">
                <button className={`btn ${active === "hiver" ? "btn-active" : ""}`} onClick={() => {
                    setActive("hiver");
                    handleFilterClick("season", "hiver")
                }}>
                    hiver
                </button>
                <button className={`btn ${active === "printemps" ? "btn-active" : ""}`} onClick={() => {
                    setActive("printemps");
                    handleFilterClick("season", "printemps")
                }}>
                    printemps
                </button>
                <button className={`btn ${active === "été" ? "btn-active" : ""}`} onClick={() => {
                    setActive("été");
                    handleFilterClick("season", "été")
                }}>
                    été
                </button>
                <button className={`btn ${active === "automne" ? "btn-active" : ""}`} onClick={() => {
                    setActive("automne");
                    handleFilterClick("season", "automne")
                }}>
                    automne
                </button>
            </div>
            <div className="btn-group-encyclopedia">
                <button className={`btn-2 ${active === "immobile" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("immobile");
                    handleFilterClick("speed", "immobile")
                }}>
                    immobile
                </button>
                <button className={`btn-2 ${active === "très_lent" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("très_lent");
                    handleFilterClick("speed", "très_lent")
                }}>
                    très lent
                </button>
                <button className={`btn-2 ${active === "lent" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("lent");
                    handleFilterClick("speed", "lent")
                }}>
                    lent
                </button>
                <button className={`btn-2 ${active === "moyen" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("moyen");
                    handleFilterClick("speed", "moyen")
                }}>
                    moyen
                </button>
                <button className={`btn-2 ${active === "rapide" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("rapide");
                    handleFilterClick("speed", "rapide")
                }}>
                    rapide
                </button>
                <button className={`btn-2 ${active === "très_rapide" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("très_rapide");
                    handleFilterClick("speed", "très_rapide")
                }}>
                    très rapide
                </button>
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
