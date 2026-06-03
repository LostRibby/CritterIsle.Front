import { useEffect, useState } from "react";
import axios from "axios";

export default function MemoryGame() {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const isFlipped = (card) =>
        flipped.some((c) => c.uniqueId === card.uniqueId) ||
        matched.includes(card.id);

    useEffect(() => {
        fetchBugs();
    }, []);

    const fetchBugs = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/Bugs"
            );

            const bugCards = response.data.data.map(bug => ({
                id: bug.id,
                image: bug.image,
                name: bug.name,
            }));

            console.log("Bug cards:", bugCards);

            const selectedBugs = bugCards
                .sort(() => Math.random() - 0.5)
                .slice(0, 6);


            const duplicated = [...selectedBugs, ...selectedBugs]
                .map((card, index) => ({
                    ...card,
                    uniqueId: `${card.id}-${index}`,
                }))
                .sort(() => Math.random() - 0.5);

            setCards(duplicated);

        } catch (error) {
            console.error(error);
        }
    }

    const handleFlip = (card) => {
        if (disabled || gameOver) return;

        if (flipped.find((c) => c.uniqueId === card.uniqueId)) return;

        if (matched.includes(card.id)) return;

        const newFlipped = [...flipped, card];
        setFlipped(newFlipped);

        if (newFlipped.length !== 2) return;
        setDisabled(true);

        const [first, second] = newFlipped;

        if (first.uniqueId === second.uniqueId) {
            setMatched((prev) => [...prev, first.id]);
            setFlipped([]);
            setDisabled(false);
        } else {
            setTimeout(() => {
                setFlipped([]);
                setDisabled(false);
            }, 1000);
        }
        setMoves((prev) => {
            const newMoveCount = prev + 1;

            if (newMoveCount >= 20) {
                setGameOver(true);
            }
            return newMoveCount;
        });

    };

    return (
        <div>
            <div>
                <p>Moves: {moves} / 20</p>
            </div>

            <div className="grid grid-cols-4 p-4 h-screen justify-center items-center">
                {cards.map((card) => (
                    <div
                        key={card.uniqueId}
                        onClick={() => handleFlip(card)}
                        className="w-40 h-40 bg-froly-600 flex items-center justify-center cursor-pointer"
                    >
                        {isFlipped(card) ? (
                            <img
                                src={`/images/${card.image}`}
                                alt={card.name}
                                className="w-full h-full"
                            />
                        ) : (
                            "?"
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}