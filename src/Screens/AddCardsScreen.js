import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";

const AddCardsScreen = () => {
  const { deckId } = useParams();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deck, setDeck] = useState();

  // Side Effects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readDeck(deckId);
        setDeck(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [deckId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCard(deckId, { front, back });
      setFront("");
      setBack("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <Breadcrumb name={deck?.name} lastNavElement="Add Card" />
      <h3>Add Card {deck?.name}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Front</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            placeholder="Front side of card"
            rows="3"
            value={front}
            onChange={(e) => setFront(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Back</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            placeholder="Back side of card"
            rows="3"
            value={back}
            onChange={(e) => setBack(e.target.value)}
          />
        </div>
        <div>
          <Link to={`/decks/${deck?.id}`}>
            <button className="btn btn-secondary mr-3">Done</button>
          </Link>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCardsScreen;
