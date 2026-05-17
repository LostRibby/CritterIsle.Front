import axios from "axios";
import React, { useEffect, useState } from "react";

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
                "http://localhost:3000/Fishes"
            );

            setFishTypes(response.data);

            setFishes([
                createFish(response.data),
                createFish(response.data),
                createFish(response.data),
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
                ]);
            }
        }, 1000);

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    clearInterval(fishMove);

                    setGameOver(true);

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

    const saveScore = async (newScore) => {
        try {
            await axios.post("http://localhost:3000/Scores", {
                Player: "joueur",
                score: newScore,
            });
        } catch (error) {
            console.error(
                "Erreur lors de l'enregistrement du score :",
                error
            );
        }
    };

    const catchFish = (fish) => {
        if (gameOver) return;

        const updatedScore = score + fish.points;

        setScore(updatedScore);

        saveScore(updatedScore);

        setMessage(
            `${fish.image} ${fish.name} attrapé ! +${fish.points} points !`
        );

        setFishes((prev) =>
            prev.filter((f) => f.id !== fish.id)
        );
    };

    const restartGame = () => {
        setScore(0);
        setTimeLeft(45);
        setGameOver(false);

        if (fishTypes.length > 0) {
            setFishes([
                createFish(fishTypes),
                createFish(fishTypes),
                createFish(fishTypes),
            ]);
        }

        setMessage("Nouvelle partie !");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-200 to-blue-800 flex items-center justify-center p-6 text-white font-sans">
            <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20" >
                <h1 className="text-5xl font-bold text-center mb-6">Jeu de pêche</h1>
            </div>
            <div className="flex justify-between text-xl mb-4">
                <span>Score : {score}</span>
                <span>Temps restant : {timeLeft}s</span>
            </div>

            <div className="relative h-[450px] bg-blue-400 rounded-3xl overflow-hidden border-4 border-blue-200 shadow-inner">
                <div
                    style={{
                        width: "100%",
                        height: "400px",
                    }}
                    className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[size:25px_25px]">
                   
                   
                    <div>
                        {fishes.map((fish) => (
                            <button
                                key={fish.id}
                                onClick={() => catchFish(fish)}
                                style={{
                                    position: "absolute",
                                    left: `${fish.left}%`,
                                    top: `${fish.top}%`,
                                    fontSize: "2rem",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                                className="absolute text-5xl hover:scale-125 transition-transform duration-200"
                            >
                                {fish.image || "🦈"}
                            </button>
                        ))}
                    </div>

                    <div className="text-xl mb-4 text-center font-semibold min-h-[30px]">
                        <p className="mt-6 flex flex-col items-center gap-4">{message}</p>
                    </div>

                    <div className="mt-6 flex flex-col items-center gap-4">
                        <p className="text-center opacity-90">
                            Attrape les poissons en cliquant dessus !
                            Chaque poisson rapporte des points.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center text-sm">
                            {fishTypes.map((fish, index) => (
                                <div key={index}
                                    className="bg-white/10 rounded-2xl p-3 border border-withe/10">
                                    <span>
                                        <div className="text-3xl"> {fish.image} {fish.name} :{" "} </div>
                                        <div> {fish.points} points </div>
                                    </span>
                                </div>
                            ))}
                        </div>

                        {gameOver && (
                            <button onClick={restartGame} className="bg-froly-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-2xl shadow-lg transition-all">
                                Rejouer
                            </button>
                        )}
                    </div>
                </div>
            </div>
</div>
 );
}