import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateCard, readCard } from "../utils/api";

const AddCardsScreen = () => {
  let history = useHistory();
  const { deckId, cardId } = useParams();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readCard(cardId);
        setFront(response.front);
        setBack(response.back);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [cardId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCard({
        id: cardId,
        front,
        back,
        deckId: deckId * 1,
      });

      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <Breadcrumb name={deck?.name} lastNavElement={`Edit Card ${cardId}`} />
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
            <button className="btn btn-secondary mr-3">Cancel</button>
          </Link>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCardsScreen;
