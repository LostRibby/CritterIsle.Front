import { useEffect, useState } from "react";
import axios from "axios";

export default function MemoryGame() {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        fetchBugs();
    }, []);

    const fetchBugs = async () => {
        try {
            const requests = [];

            for (let id = 1; id <= 6; id++) {
                requests.push(axios.get(`http://localhost:3000/api/Bugs/${id}`));
            }

            const results = await Promise.all(requests);
            console.log("RESULTAT:", results)

            const bugCards = results.map(res => ({
                
                image: res.data.image,
                name: res.data.name,
            }));
            console.log("bugcard:", bugCards)

            const duplicated = [...bugCards, ...bugCards]
                .map((card, index) => ({
                    ...card,
                    uniqueId: index,
                }))
                .sort(() => Math.random() - 0.5);
            console.log("Duplicated:", duplicated)

            setCards(duplicated);
        } catch (err) {
            console.error("Failed to fetch bugs:", err);
        }
    };

    const handleFlip = (card) => {
        if (disabled) return;
        if (flipped.find((c) => c.uniqueId === card.uniqueId)) return;
        if (matched.includes(card.id)) return;

        const newFlipped = [...flipped, card];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setDisabled(true);

            const [first, second] = newFlipped;

            if (first.id === second.id) {
                setMatched((prev) => [...prev, first.id]);
                setFlipped([]);
                setDisabled(false);
            } else {
                setTimeout(() => {
                    setFlipped([]);
                    setDisabled(false);
                }, 1000);
            }
        }
    };

    const isFlipped = (card) =>
        flipped.some((c) => c.uniqueId === card.uniqueId) ||
        matched.includes(card.id);

    return (
        <div className="grid grid-cols-4  p-4 h-screen justify-center aligns-center">
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
    )
}