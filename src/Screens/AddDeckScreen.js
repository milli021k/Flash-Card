import React, { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api";

const AddDeck = () => {
  let history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createDeck({ name, description });
    // console.log(response);
    history.push(`/decks/${response.id}`);
  };

  return (
    <div className="container">
      <Breadcrumb name="Create Deck" />
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
          <Link to="/">
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

export default AddDeck;
