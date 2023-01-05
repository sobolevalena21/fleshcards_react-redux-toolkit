/*
Now that you can add new cards, you’ll need to display cards on the individual quiz page. The Quiz component renders a list of Card components, so in src/features/cards/Card.js, import your cards selector and use it to access all the cards in state.
*/

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCards} from './cardsSlice.js';

export default function Card({ id }) {
  const cards = useSelector(selectCards); // replace this with a call to your selector to get all the cards in state
  const card = cards[id];
  const [flipped, setFlipped] = useState(false);

  return (
    <li>
      <button className="card" onClick={(e) => setFlipped(!flipped)}>
        {flipped ? card.back : card.front}
      </button>
    </li>
  );
}
