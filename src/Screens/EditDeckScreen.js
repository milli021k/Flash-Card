import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useHistory, Link, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

const EditCardScreen = () => {
  let history = useHistory();
  const { deckId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await readDeck(deckId);
      console.log(response);
      setName(response.name);
      setDescription(response.description);
    };
    fetchData();
  }, [deckId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateDeck({ id: deckId, name, description });
    console.log(response);
    history.push(`/decks/${response.id}`);
  };

  return (
    <div className="container">
      <Breadcrumb name={name} lastNavElement="edit deck" />
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputText">Name</label>
          <input
            id="#exampleInputText"
            placeholder="Deck name"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            placeholder="brief description of the deck"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <Link to={`/decks/${deckId}`}>
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

export default EditCardScreen;
