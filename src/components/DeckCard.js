import React from "react";
import { Link } from "react-router-dom";

const DeckCard = ({ id, name, description, cardSize, removeDeck }) => {
  const handleDelete = () => {
    let result = window.confirm(
      "are you sure you want to delete this?\n\nYou will not be able to recover it"
    );
    if (result) {
      removeDeck(id);
    }
  };
  return (
    <div className="card mt-2 mb-2">
      <div className="d-flex justify-content-between">
        <h4>{name}</h4>
        <p className="mr-2">{cardSize} cards</p>
      </div>
      <p>{description}</p>
      <div className="d-flex justify-content-between">
        <div>
          <Link to={`/decks/${id}`}>
            <button className="btn btn-secondary mr-2">View</button>
          </Link>
          <Link to={`/decks/${id}/study`}>
            <button className="btn btn-primary mr-2">Study</button>
          </Link>
        </div>
        <button className="btn btn-danger mr-2" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeckCard;
