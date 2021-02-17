import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import Breadcrumb from "../components/Breadcrumb";

const StudyCardScreen = () => {
  const { deckId } = useParams();
  let history = useHistory();
  const [deck, setdeck] = useState();
  const [flipToBack, setFlipToBack] = useState(false);
  const [count, setCount] = useState(0);

  let cardNumber = count + 1;

  // function to handle State
  const handleFlip = () => {
    setFlipToBack((oldVal) => !oldVal);
  };
  const handleNext = () => {
    handleFlip();
    setCount((prevCount) => prevCount + 1);
  };

  const handleDialog = () => {
    if (count === deck?.cards.length - 1 && flipToBack) {
      let result = window.confirm(
        "Restart Card?\n\n click Cancel to return home page"
      );
      if (result) {
        setCount(0);
        setFlipToBack(false);
      } else {
        history.push("/");
      }
    }
  };

  // Side Effects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readDeck(deckId);
        setdeck(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [deckId]);

  useEffect(() => {
    handleDialog();
  }, [count, flipToBack]);

  return (
    <>
      <div className="container">
        <Breadcrumb name={deck?.name} lastNavElement="study" />
        {deck?.cards.length > 2 ? (
          <div className="card">
            <h3>{deck.name}: Study </h3>
            <h4>
              Card {cardNumber} of {deck.cards.length}
            </h4>
            <div>
              {flipToBack ? (
                <h5>{deck?.cards[count].back}</h5>
              ) : (
                <h5>{deck?.cards[count].front}</h5>
              )}
              <button className="btn btn-secondary mr-3" onClick={handleFlip}>
                Flip
              </button>
              {flipToBack && count <= deck?.cards.length && (
                <button className="btn btn-primary" onClick={handleNext}>
                  Next
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h3>{deck?.name}: Study </h3>
            <h4>Not Enough Cards.</h4>
            <h5>
              You need at least 3 cards to study, there are {deck?.cards.length}{" "}
              cards in this deck
            </h5>
            <Link to={`/decks/${deckId}/cards/new`}>
              <button className="btn btn-primary">Add Cards</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default StudyCardScreen;
