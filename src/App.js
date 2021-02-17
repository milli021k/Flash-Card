import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./components/NotFound";

import Layout from "./Screens";
import StudyScreen from "./Screens/StudyScreen";
import AddDeck from "./Screens/AddDeckScreen";
import DecksScreen from "./Screens/DeckScreen";
import EditDeckScreen from "./Screens/EditDeckScreen";
import AddCardsScreen from "./Screens/AddCardsScreen";
import EditCardsScreen from "./Screens/EditCardScreen";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <div className="app-routes">
      <Header />
      <Switch>
        <Route exact path="/">
          <Layout />
        </Route>
        <Route exact path="/decks/new">
          <AddDeck />
        </Route>
        <Route exact path="/decks/:deckId">
          <DecksScreen />
        </Route>
        <Route exact path="/decks/:deckId/study">
          <StudyScreen />
        </Route>
        <Route exact path="/decks/:deckId/edit">
          <EditDeckScreen />
        </Route>
        <Route exact path="/decks/:deckId/cards/new">
          <AddCardsScreen />
        </Route>
        <Route exact path="/decks/:deckId/cards/:cardId/edit">
          <EditCardsScreen />
        </Route>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
