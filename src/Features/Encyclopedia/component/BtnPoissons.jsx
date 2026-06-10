import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";

export default function BtnPoissons() {
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
        axios.get(`https://critter-isle-back-nzhj.vercel.app/api/Fishes`, { params: filters })
            .then((res) => setData(res.data.data));
    }, [filters])

    console.log("DATA :", data)

    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <h2 className="font-bold border-2 border-blue-800 bg-blue-200 rounded-lg p-2 text-blue-800 mb-2 mt-2">Filtrer les poissons</h2>

            <div className="btn-group-encyclopedia mb-4 ">

                <button className={`btn ${active === "hiver" ? "btn-active" : ""}`} onClick={() => {
                    setActive("hiver");
                    handleFilterClick("season", "hiver");
                }}>
                    hiver
                </button>

                <button className={`btn ${active === "printemps" ? "btn-active" : ""}`} onClick={() => {
                    setActive("printemps");
                    handleFilterClick("season", "printemps");
                }}>
                    printemps
                </button>

                <button className={`btn ${active === "été" ? "btn-active" : ""}`} onClick={() => {
                    setActive("été");
                    handleFilterClick("season", "été");
                }}>
                    été
                </button>

                <button className={`btn ${active === "automne" ? "btn-active" : ""}`} onClick={() => {
                    setActive("automne");
                    handleFilterClick("season", "automne");
                }}>
                    automne
                </button>
            </div>
            <div className="btn-group-encyclopedia">
                <button className={`btn-2 ${active === "mer" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("mer");
                    handleFilterClick("location", "mer")
                }}>
                    mer
                </button>
                <button className={`btn-2 ${active === "rivière" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("rivière");
                    handleFilterClick("location", "rivière")
                }}>
                    rivère
                </button>
                <button className={`btn-2 ${active === "cascade" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("cascade");
                    handleFilterClick("location", "cascade")
                }}>
                    cascade
                </button>
                <button className={`btn-2 ${active === "étang" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("étang");
                    handleFilterClick("location", "étang")
                }}>
                    étang
                </button>
                <button className={`btn-2 ${active === "ponton" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("ponton");
                    handleFilterClick("location", "ponton")
                }}>
                    ponton
                </button>
            </div>


            <div className="grid grid-cols-2 gap-4">
                {data.length === 0 ? (
                    <p>Aucun résultat</p>
                ) : (
                    data.map((item) => (
                        <div key={item._id} className=" bg-cyan-700 bg-[url('/images/pattern_fish.jpg')] outline-cyan-950 outline-1 shadow-lg shadow-grey-700 p-2 m-2 rounded-lg">
                            <div className="flex flex-col bg-white/60 rounded-lg m-10 p-3 ">
                                <h2 className="text-2xl justify-center flex items-center text-froly-200 underline font-agbalumo" >{item.name}</h2>
                                <div className="m-4 justify-center flex items-center">
                                    <img className="size-20" src={`https://critter-isle-back-nzhj.vercel.app/uploads/${item.image}`} alt={item.name} />
                                </div>
                                <div classNmae="flex flex-row">
                                    <h3 className="text-froly-800 font-bold text-xl">💰 Prix :</h3>
                                    <p><span className="text-amber-500 font-bold">{item.price}</span> clochettes</p>
                                </div>

                                <h3 className="text-froly-800 font-bold text-xl">😹 Jeu de mots :</h3>
                                <p>{item.jdm}</p>

                                <h3 className="text-froly-800 font-bold text-xl underline ">🦉 Description de Thibou :</h3>
                                <p>{item.description}</p>
                            </div></div>
                    ))
                )}
            </div>
        </div >
    )
}