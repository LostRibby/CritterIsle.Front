import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { tokenAtom } from "../../atoms/auth.atom";

export default function FishingGame() {
    const [fishTypes, setFishTypes] = useState([]);
    const [fishes, setFishes] = useState([]);
    const [timeLeft, setTimeLeft] = useState(45);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState(
        "Repêchage des poissons depuis MongoDB..."
    );

    useEffect(() => {
        loadFishes();
    }, []);

    const createFish = (fishArray) => {
        const fish =
            fishArray[Math.floor(Math.random() * fishArray.length)];

        return {
            ...fish,
            id: Math.random(),
            left: Math.floor(Math.random() * 80),
            top: Math.floor(Math.random() * 80) + 10,
        };
    };

    const loadFishes = async () => {
        try {
            const response = await axios.get(
                "https://critterisle-back-2.onrender.com/api/Fishes"
            );

            setFishTypes(response.data.data);

            setFishes([
                createFish(response.data),
                createFish(response.data),
                createFish(response.data),
                createFish(response.data)
            ]);

            setMessage("Pêchez les poissons en cliquant dessus !");
        } catch (error) {
            console.error(
                "Erreur lors du chargement des poissons :",
                error
            );

            setMessage(
                "Erreur lors du chargement des poissons."
            );
        }
    };

    useEffect(() => {
        if (gameOver) return;

        const fishMove = setInterval(() => {
            if (fishTypes.length > 0) {
                setFishes([
                    createFish(fishTypes),
                    createFish(fishTypes),
                    createFish(fishTypes),
                    createFish(fishTypes)
                ]);
            }
        }, 1000);

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    clearInterval(fishMove);

                    setGameOver(true)
                    setMessage(
                        `Fin de la partie ! Votre score final est de ${score}.`
                    );

                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(fishMove);
            clearInterval(timer);
        };
    }, [gameOver, fishTypes, score]);

    const [token] = useAtom(tokenAtom);

    const saveScore = async (newScore) => {
        try {
            await axios.post(
                "https://critterisle-back-2.onrender.com/api/Score",

                {
                    score: newScore
                }
                ,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (error) {
            console.error(
                "Erreur lors de l'enregistrement du score :",
                error.response?.data || error.message
            );
        }
    };

    const catchFish = async (fish) => {
        if (gameOver) return;

        const updatedScore = score + fish.points;

        setScore(updatedScore);

        setMessage(
            `${fish.name} attrapé ! +${fish.points} points !`
        );

        setFishes((prev) =>
            prev.filter((f) => f.id !== fish.id)
        );
    };

    const bestScore = (newScore) => {
        const savedBest = localStorage.getItem("bestScore-fishingGame");
        const best = savedBest ? JSON.parse(savedBest) : 0;
        if (newScore > best) {
            localStorage.setItem("bestScore-fishingGame", JSON.stringify(newScore));
        }
    };
    useEffect(() => {
        if (gameOver && score > 0) {
            saveScore(score);
            bestScore(score);
        }
    }, [gameOver, score]);

    const restartGame = () => {
        setScore(0);
        setTimeLeft(45);
        setGameOver(false);

        if (fishTypes.length > 0) {
            setFishes([
                createFish(fishTypes),
                createFish(fishTypes),
                createFish(fishTypes),
                createFish(fishTypes),
            ]);
        }

        setMessage("Nouvelle partie !");
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-cyan-100 to-blue-400 flex items-center justify-center p-6 text-white font-sans rounded-lg">
            <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                <h1 className="text-5xl font-bold text-center mb-6 text-froly-400">
                    🎣 Jeu de Pêche
                </h1>

                <div className="flex justify-between text-xl mb-4 text-froly-400 font-semibold">
                    <span>🏆 Score : {score}</span>
                    <span>⏳ Temps : {timeLeft}s</span>
                </div>
                <div className="flex text-xl text-blue-950 font-semibold mb-2">
                    <span>🏅 Meilleur Score : {localStorage.getItem("bestScore-fishingGame")||0}</span>
                </div>

                <div className="relative h-112.5 bg-blue-400 rounded-3xl overflow-hidden border-4 border-blue-200 shadow-inner">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-size[25px_25px]" />

                    {fishes.map((fish) => (
                        <button
                            key={fish.id}
                            onClick={() => catchFish(fish)}
                            className="absolute text-5xl hover:scale-125 transition-transform duration-200"
                            style={{
                                left: `${fish.left}%`,
                                top: `${fish.top}%`,
                            }}
                        >
                            <img src={`/images/${fish.image}`} alt={fish.name} />
                        </button>
                    ))}
                </div>
                <div className="text-xl mb-4 text-center font-semibold min-h-7.5">
                    <p className="mt-6 flex flex-col items-center gap-4 text-froly-400">
                        {message}
                    </p>
                </div>

                <div className="mt-6 flex flex-col items-center gap-4">
                    <p className="text-center opacity-90 text-froly-400">
                        Attrape les poissons avant qu'ils disparaissent.
                    </p>
                    {gameOver && (
                        <button
                            onClick={restartGame}
                            className="bg-froly-300 hover:bg-froly-400 text-black font-bold px-8 py-3 rounded-2xl shadow-lg transition-all"
                        >
                            Rejouer
                        </button>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center text-sm text-froly-600">
                        {fishTypes.map((fish, index) => (
                            <div key={index} className="bg-blue-500/10 rounded-2xl p-3 border border-white/10">
                                <img src={`/images/${fish.image}`} alt={fish.name} />
                                <div>{fish.points} pts</div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div>
    );
}