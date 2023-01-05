// The Quiz component uses the react-router-dom method useParams() to determine the quizId to render. Therefore, it needs the full set of quizzes to find the appropriate quiz object to render. >> need to use useSelector to get all the quizzes in state

import { Link, useParams } from "react-router-dom";
import Card from "../cards/Card";
import ROUTES from "../../app/routes";
import { useSelector } from 'react-redux';
import { selectQuizzes } from './quizzesSlice.js';

export default function Quiz() { //Topic???? Shouldn't it be named Quiz? Renamed.
  const quizzes = useSelector(selectQuizzes); // replace this with a call to your selector to get all the quizzes in state
  let { quizId } = useParams();
  const quiz = quizzes[quizId];

  return (
    <section>
      <h1>{quiz.name}</h1>
      <ul className="cards-list">
        {quiz.cardIds.map((id) => (
          <Card key={id} id={id} />
        ))}
      </ul>
      <Link to={ROUTES.newQuizRoute()} className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
