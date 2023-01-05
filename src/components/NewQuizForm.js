/*
import the thunk action creator from your quiz slice and dispatch it from the handleSubmit() event handler that fires when the new quiz form is submitted. Remember, that action creator expects to receive a payload of the form { id: '123', name: 'quiz name', topicId: '456', cardIds: ['1', '2', '3', ...]}. You’ll have to generate an id by calling uuidv4. For now, pass the empty cardIds array variable for the cardIds property (you’ll change that in a later task).


*/


import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { useDispatch, useSelector } from 'react-redux';
import { selectTopics } from '../features/topics/topicsSlice.js';
import { thunkForQuizCreation } from "../features/quizzes/quizzesSlice.js"; //>> tried to replace with the 2 seperate actions, imported below
// import { addQuiz } from "../features/quizzes/quizzesSlice.js";
// import { addQuizIdToTopic } from '../features/topics/topicsSlice.js';

import { addCard } from '../features/cards/cardsSlice.js';



export default function NewQuizForm() {
  const [name, setName] = useState(""); //is an input field on the Quiz page
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");//is an input field on the Quiz page
  const history = useHistory();
  const topics = useSelector(selectTopics);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }
    const cardIds = [];
    // create the new cards here and add each card's id to cardIds. >> iterate through the cards in that form’s local state, and for each one: (*) dispatch your addCard action creator. You will have to generate an id for each card using uuidv4. (*) Store the id you create for each card in the cardIds array we’ve provided for you.Remember, your action creator expects to receive a payload of the form { id: '123', front: 'front of card', back: 'back of card'}. You want to collect all the cardIds in an array so that you can pass them to the action creator that generates new quizzes.  Unlike map(), forEach() always returns undefined and is not chainable.
      cards.forEach((card) => {
      let cardId = uuidv4();
      cardIds.push(cardId);
      dispatch(addCard({ ...card, id: cardId }));
    });


    // create the new quiz here: Conceptually, the actions of creating a new quiz (addQuiz from quizzesSlice) and associating it with its topic (addQuizIdToTopic in topicsSlice) are a part of a single process. Back in the quizzes slice file, write an action creator that returns a thunk that dispatches these two actions one after the other. This new thunk action creator is the one that you will dispatch when a user creates a new quiz. 
    dispatch(thunkForQuizCreation({
      id: uuidv4(),
      name: name,
      topicId: topicId,
      cardIds: cardIds
    }));

    /*
    >> In theory, could we omit this complicated thunk and just dispatch the two actions right in the handleSubmit in the NewQuizForm ??? After testing it, YES, it seems that we CAN, but then quizId in the addQuizIdToTopic will need a seperate (repetitive) arrangement (2nd dispatch cannot access id parameter in the 1st dispatch). 
        dispatch(addQuiz({
          id: uuidv4(),
          name: name,
          topicId: topicId,
          cardIds: cardIds
        }));
        dispatch(addQuizIdToTopic({
          topicId: topicId,
          quizId: quiz.id //error: quiz is not defined
          }))
      */
    history.push(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section>
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Quiz Title"
        />
        <select
          id="quiz-topic"
          onChange={(e) => setTopicId(e.currentTarget.value)}
          placeholder="Topic"
        >
          <option value="">Topic</option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              placeholder="Back"
            />

            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button onClick={addCardInputs}>Add a Card</button>
          <button>Create Quiz</button>
        </div>
      </form>
    </section>
  );
}
