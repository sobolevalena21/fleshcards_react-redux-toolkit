/*
topic object should have the following: {id: '123456', name: 'name of topic', icon: 'icon url', quizIds: []}.

import addTopic and dispatch it from the event handler that runs when the new topic form is submitted:
    You will need to import and call the useDispatch() method in order to dispatch actions to the store.
    You will need to include the topic’s name in the action payload as well as an id property (you should generate a value for this property by calling uuidv4()  ), and an icon property.
    The icon variable from the useSelect() hook holds the URL for the icon image selected by the user.

Example:
import { v4 as uuidv4 } from 'uuid';

export default function TransactionForm({ categories }) {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTransaction({
        category: category,
        description: description,
        amount: parseFloat(amount),
        id: uuidv4(),
      })
    );
    setCategory(CATEGORIES[0]);
    setDescription('');
    setAmount(0);
  };

*/

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { ALL_ICONS } from "../data/icons";
import { addTopic } from "../features/topics/topicsSlice.js";
import { useDispatch } from 'react-redux';

export default function NewTopicForm() {
  const [name, setName] = useState(""); //name is an input field on the page 
  const [icon, setIcon] = useState(""); //icon is an input field on the page 
  const history = useHistory();
  const dispatch = useDispatch();

//On submit, the topic object should have the following: {id: '123456', name: 'name of topic', icon: 'icon url', quizIds: []}. an empty quizIds array must be created via the addTopic action in the slice file, not here!!!
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }
    // dispatch your addTopic action here
    dispatch(addTopic({
      id: uuidv4(),
      name: name,
      icon: icon
    }

    ));
    history.push(ROUTES.topicsRoute());
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1 className="center">Create a new topic</h1>
        <div className="form-section">
          <input
            id="topic-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Topic Name"
          />
          <select
            onChange={(e) => setIcon(e.currentTarget.value)}
            required
            defaultValue="default"
          >
            <option value="default" disabled hidden>
              Choose an icon
            </option>
            {ALL_ICONS.map(({ name, url }) => (
              <option key={url} value={url}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button className="center">Add Topic</button>
      </form>
    </section>
  );
}
