import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useParams, Link } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api";

const DecksScreen = () => {
  const { deckId } = useParams();
  const [loading, setLoading] = useState(true);
  const [deck, setDeck] = useState({});
  // Side Effects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readDeck(deckId);
        setDeck(response);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [deckId]);

  const handleCardDelete = async (cardId) => {
    let result = window.confirm(
      "Delete This Card\n\nYou will not be able to recover it",
    );

    if (result) {
      await deleteCard(cardId);
      const newCardDeck = deck.cards.filter((card) => card.id !== cardId);
      const newDeck = { ...deck, cards: newCardDeck };
      setDeck(newDeck);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <Breadcrumb name={deck?.name} />
          <div>
            <h3>{deck?.name}</h3>
            <p>{deck?.description}</p>
            <div className="d-flex justify-content-between">
              <div>
                <Link to={`/decks/${deck.id}/edit`}>
                  <button className="btn btn-secondary mr-2">Edit</button>
                </Link>
                <Link to={`/decks/${deck.id}/study`}>
                  <button className="btn btn-primary mr-2">Study</button>
                </Link>
                <Link to={`/decks/${deck.id}/cards/new`}>
                  <button className="btn btn-primary">Add Cards</button>
                </Link>
              </div>
              <div>
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
          <h4 className="mt-4">Cards</h4>
          {deck?.cards.map((card) => (
            <div key={card.id} className="card p-2 mb-2">
              <div className="d-flex justify-content-between">
                <p>{card.front}</p>
                <p>{card.back}</p>
              </div>
              <div className="d-flex justify-content-end">
                <Link to={`/decks/${card?.deckId}/cards/${card?.id}/edit`}>
                  <button className="btn btn-secondary mr-2">Edit</button>
                </Link>
                <button
                  onClick={() => handleCardDelete(card?.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DecksScreen;
