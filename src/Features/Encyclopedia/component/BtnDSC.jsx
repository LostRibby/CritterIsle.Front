import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";

export default function BtnDSC() {
    const [active, setActive] = useState("");
    const [filters, setFilter] = useSearchParams();

    const [data, setData] = useState([]);

    const handleFilterClick = (type, value) => {
        setFilter((prev) => {
            const params = new URLSearchParams(prev);

            if (params.get(type) === value) {
                params.delete(type);
            } else {
                params.set(type, value);
            }

            return params;
        });
    };
    useEffect(() => {
        axios.get(`http://critter-isle-back-nzhj.vercel.app/api/Creatures`, { params: filters })
            .then((res) => setData(res.data.data));
    }, [filters]);
    console.log("DATA:", data);

    return (
        <div className="flex flex-col gap-2 justify-center items-center bg">
            <h2 className=" font-bold border-2 border-cyan-800 bg-cyan-200 rounded-lg p-2 text-cyan-800 mb-2 mt-2">Filtrer les créatures marines</h2>

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
                        <div key={item._id} className=" bg-[url('/images/pattern-Creatures.png')] shadow-lg shadow-grey-900 outline-blue-950 outline-1 p-2 m-2 rounded-lg">
                            <div className="flex flex-col bg-black/60 rounded-lg m-10 p-3">
                                <h2 className="text-2xl justify-center flex items-center text-froly-200 underline font-agbalumo mb-4" >{item.name}</h2>
                                <div className="m-4 justify-center flex items-center mb-4">
                                    <img src={`http://localhost:3000/uploads/${item.image}`} alt={item.name} />
                                </div>
                                <div className="flex flex-row mb-4">
                                    <h3 className="text-froly-500 font-bold text-xl">💰 Prix :</h3>
                                    <p className="text-white"><span className="text-amber-500 font-bold">{item.price}</span> clochettes</p>
                                </div>

                                <h3 className="text-froly-500 font-bold text-xl mb-4">😹 Jeu de mots :</h3>
                                <p className="text-white mb-4">{item.jdm}</p>

                                <h3 className="text-froly-500 font-bold text-xl underline mb-4">🦉 Description de Thibou :</h3>
                                <p className="text-white mb-4">{item.description}</p>
                            </div></div>
                    ))
                )}
            </div>
        </div>
    )
}
