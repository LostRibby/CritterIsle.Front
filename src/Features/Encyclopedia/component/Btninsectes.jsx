import { useState, useEffect } from "react";
import axios from "axios";

export default function BtnInsectes() {
    const [active, setActive] = useState("");
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
        <div className="flex flex-col gap-2 justify-center items-center">
            <h2 className=" font-bold">Filtrer les insectes</h2>
            
         
            <div className="btn-group-encyclopedia mb-4 ">
                <button className={`btn ${active === "hiver"? "btn-active" : "" }`} onClick={() => {
                    setActive("hiver");
                    handleFilterClick("season","hiver");
                }}>
                    hiver
                </button>

                <button className={`btn ${active === "printemps"? "btn-active" : "" }`} onClick={() => {
                    setActive("printemps");
                    handleFilterClick("season","printemps");
                }}>
                    printemps
                </button>

                <button className={`btn ${active === "été"? "btn-active" : "" }`} onClick={() => {
                    setActive("été");
                    handleFilterClick("season","été");
                }}>
                    été
                </button>

                <button className={`btn ${active === "automne"? "btn-active" : "" }`} onClick={() => {
                    setActive("automne");
                    handleFilterClick("season","automne");
                }}>
                    automne
                </button>
            </div>

            <div className="btn-group-encyclopedia">
                <button className={`btn-2 ${active === "arbres"? "btn-active-2" : "" }`} onClick={() => {
                    setActive("arbres");
                    handleFilterClick("location","arbres");
                }}>
                    arbres
                </button>
                <button className={`btn-2 ${active === "souches"? "btn-active-2" : "" }`} onClick={() => {
                    setActive("souches");
                    handleFilterClick("location","souches");
                }}>
                    souches
                </button>
                <button className={`btn-2 ${active === "air"? "btn-active-2" : "" }`} onClick={() => {
                    setActive("air");
                    handleFilterClick("location","air");
                }}>
                    air
                </button>
                <button className={`btn-2 ${active === "eau"? "btn-active-2" : "" }`} onClick={() => {
                    setActive("eau");
                    handleFilterClick("location","eau");
                }}>
                    eau
                </button>
                <button className={`btn-2 ${active === "palmiers"? "btn-active-2" : "" }`} onClick={() => {
                    setActive("palmiers");
                    handleFilterClick("location","palmiers");
                }}>
                    palmiers
                </button>
                <button className={`btn-2 ${active === "fleurs"? "btn-active-2" : "" }`} onClick={() => {
                    setActive("fleurs");
                    handleFilterClick("location","fleurs");
                }}>
                    fleurs
                </button>
                <button className={`btn-2 ${active === "sol"? "btn-active-2" : "" }`} onClick={() => {
                    setActive("sol");
                    handleFilterClick("location","sol");
                }}>
                    sol
                </button>
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

