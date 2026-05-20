import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";

export default function BtnInsectes() {
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
        axios.get(`http://localhost:3000/api/Bugs`, { params: filters })
            .then((res) => setData(res.data.data));
    }, [filters]);
    console.log("DATA:", data)

    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <h2 className=" font-bold">Filtrer les insectes</h2>


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
                <button className={`btn-2 ${active === "arbres" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("arbres");
                    handleFilterClick("location", "arbres");
                }}>
                    arbres
                </button>
                <button className={`btn-2 ${active === "souches" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("souches");
                    handleFilterClick("location", "souches");
                }}>
                    souches
                </button>
                <button className={`btn-2 ${active === "air" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("air");
                    handleFilterClick("location", "air");
                }}>
                    air
                </button>
                <button className={`btn-2 ${active === "eau" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("eau");
                    handleFilterClick("location", "eau");
                }}>
                    eau
                </button>
                <button className={`btn-2 ${active === "palmiers" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("palmiers");
                    handleFilterClick("location", "palmiers");
                }}>
                    palmiers
                </button>
                <button className={`btn-2 ${active === "fleurs" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("fleurs");
                    handleFilterClick("location", "fleurs");
                }}>
                    fleurs
                </button>
                <button className={`btn-2 ${active === "sol" ? "btn-active-2" : ""}`} onClick={() => {
                    setActive("sol");
                    handleFilterClick("location", "sol");
                }}>
                    sol
                </button>
            </div>



            <div className="grid grid-cols-2 gap-4">
                {data.length === 0 ? (
                    <p>Aucun résultat</p>
                ) : (
                    data.map((item) => (
                        <div key={item._id} className=" bg-green-200 inset-shadow-m inset-shadow-froly-700 p-2 m-2 rounded-lg">

                            <h2 className="text-2xl justify-center flex items-center text-froly-500 underline font-agbalumo" >{item.name}</h2>
                            <div className="m-4 justify-center flex items-center">
                                <img src={`http://localhost:3000/uploads/${item.image}`} alt={item.name} />
                            </div>
                            <div classNmae="flex flex-row">
                                <h3 className="text-froly-800 font-bold text-xl">💰 Prix :</h3>
                                <p ><span className="text-amber-500 font-bold">{item.price}</span> clochettes</p>
                            </div>

                            <h3 className="text-froly-800 font-bold text-xl">😹 Jeu de mots :</h3>
                            <p>{item.jdm}</p>

                            <h3 className="text-froly-800 font-bold text-xl underline ">🦉 Description de Thibou :</h3>
                            <p>{item.description}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

