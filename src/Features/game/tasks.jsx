import { useEffect, useState } from "react";
import axios from "axios";
const defaultTasks = [
    {
        id: 1,
        text: "Trouver les fossiles 🦴",
        done: false
    },
    {
        id: 2,
        text: "Arroser les plantes🌷",
        done: false
    },
    {
        id: 3,
        text: "visiter la boutique 🏪",
        done: false
    },
    {
        id: 4,
        text: "Parler aux voisins 😸",
        done: false
    },
    {
        id: 5,
        text: "attraper des insectes 🦋",
        done: false
    },
    {
        id: 6,
        text: "Plonger dans la mer 🪼",
        done: false
    },
    {
        id: 7,
        text: "Pêcher des poissons 🐠",
        done: false
    },
    {
        id: 8,
        text: "Donner les trouvailles à Thibou 🦉",
        done: false
    },
    {
        id: 9,
        text: "Faire du mobilier 🗄️",
        done: false
    },
    {
        id: 10,
        text: "Aller chez les soeurs doigts de fée 👗",
        done: false
    },
];

export default function TasksHome() {

    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks-ACNH");
        return saved ? JSON.parse(saved) : defaultTasks;
    });

    const [bells, setBells] = useState(() => {
        const saved = localStorage.getItem("bells-ACNH");
        return saved ? JSON.parse(saved) : 0;
    });

    const [streak, setStreak] = useState(() => {
        const saved = localStorage.getItem("streak-ACNH");
        return saved ? JSON.parse(saved) : 1;
    });

    useEffect(() => {

        const loadData = async () => {
            try {


                const token = localStorage.getItem("token");
                if (!token) return
                const res = await axios.get("https://critter-isle-back-nzhj.vercel.app/api/auth/me", {
                    headers: {
                        authorization: token
                    }
                });

                const data = await res.data;

                setBells(data.bells);
                setStreak(data.streak);
            } catch (err) {
                console.error(err);
            }
        };

        loadData();

    }, []);

    useEffect(() => {

        const saveData = async () => {

            const token = localStorage.getItem("token");


            await axios.put("http://localhost:3000/api/auth/save", {
                bells,
                streak
            }, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: token
                }
            });

        };

        saveData();
    }, [bells, streak]);

    useEffect(() => {
        localStorage.setItem("tasks-ACNH", JSON.stringify(tasks));
        localStorage.setItem("bells-ACNH", JSON.stringify(bells));
        localStorage.setItem("streak-ACNH", JSON.stringify(streak));
    }, [tasks, bells, streak]);

    useEffect(() => {
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem("lastVisit-ACNH");
        if (lastVisit !== today) {
            setTasks(defaultTasks);
            setStreak((prevStreak) => prevStreak + 1);
            localStorage.setItem("lastVisit-ACNH", today);
        }
    }, []);

const toggleTasks = (id) => {
    setTasks((prev) => {
        return prev.map((task) => {
            if (task.id === id) {

                const newDone = !task.done;

                setBells((b) =>
                    newDone ? b + 500 : Math.max(0, b - 500)
                );

                return {
                    ...task,
                    done: newDone
                };
            }

            return task;
        });
    });
};
    const completedTasks = tasks.filter((t) => t.done).length;

    const weatherList = ["☀️Soleil", "🌧️Pluie", "☁️Nuageux", "☃️Neigeux", "🌈Arc-en-Ciel"];
    const weather = weatherList[new Date().getDate() % weatherList.length];

    return (
        <section>
            <div className="bg-orange-100 min-h-screen bg-lineart-to-b from-coral-200 to-coral-400 flex items-center justify-center p-6 rounded-lg">
                <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
                    <h1 className=" font-bold text-center mb-2">Daily Tracker 🏝️</h1>
                    <p className="text-center text-gray-500 mb-6">
                        {new Date().toLocaleDateString("fr-FR")}</p>

                    <div className="bg-yellow-100 rounded-2xl p-4 mb-4">
                        <div className="flex justify-between">
                            <span className="font-semibold ml-3">
                                Clochettes 💰
                            </span>
                            <span>
                                {bells}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold ml-3">Série 🔥</span>
                            <span>{streak} jours</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-semibold ml-3">Météo ⛅</span>
                            <span>{weather}</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <button
                                key={task.id}
                                onClick={() => toggleTasks(task.id)}
                                className={`w-full p-4 rounded-2xl text-left transition-all duration-300 border-2 ${task.done
                                    ? "bg-blue-100 border-blue-400 line-through text-gray-500"
                                    : "bg-gray-50 border-gray-200 hover:bg-green-50"
                                    }`}>
                                {task.done ? "✅" : "⬜"} {task.text}
                            </button>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-lg font-semibold">
                            ⭐ {completedTasks}/{tasks.length} tâches terminées
                        </p>

                        {completedTasks === tasks.length && (
                            <div className="mt-4 animate-bounce text-2xl">🎆 Journée terminée !</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}