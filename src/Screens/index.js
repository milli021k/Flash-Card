import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";
import DeckCard from "../components/DeckCard";

function Layout() {
  const [deck, setDeck] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listDecks();
        setDeck(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleDeleteDeck = async (id) => {
    await deleteDeck(id);
    const newDeck = deck.filter((d) => d.id !== id);
    setDeck(newDeck);
  };

  return (
    <>
      <div className="container">
        <Link to="/decks/new">
          <button className="btn btn-secondary">Create Deck</button>
        </Link>
        {deck &&
          deck.map((deck) => (
            <DeckCard
              key={deck.name}
              removeDeck={handleDeleteDeck}
              cardSize={deck.cards.length}
              {...deck}
            />
          ))}
      </div>
    </>
  );
}

export default Layout;
