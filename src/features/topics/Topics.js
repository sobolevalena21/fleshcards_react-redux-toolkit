/*
import the topics selector defined in your topicsSlice and use it to access all the topics in state, and replace the empty object currently assigned to topics with the topics in state.

Next, you’ll need to hook the new topic form up to the action creators your slice generates. >> In src/components/NewTopicForm.js, import addTopic and dispatch it from the event handler that runs when the new topic form is submitted.
*/


import NewTopicForm from "../../components/NewTopicForm";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { useSelector } from 'react-redux';
import { selectTopics } from './topicsSlice.js';

export default function Topics() {
  const topics = useSelector(selectTopics); // call to your selector to select all the topics in state

  return (
    <section className="center">
      <h1>Topics</h1>
      <ul className="topics-list">
        {Object.values(topics).map((topic) => (
          <li className="topic" key={topic.id}>
          <Link to={ROUTES.topicRoute(topic.id)} className="topic-link">
           <div className="topic-container">
             <img src={topic.icon} alt="" />
             <div className="text-content">
               <h2>{topic.name}</h2>
               <p>{topic.quizIds.length} Quizzes</p>
             </div>
           </div>
         </Link>
          </li>
        ))}
      </ul>
      <Link
        to={ROUTES.newTopicRoute()}
        className="button create-new-topic-button"
      >
        Create New Topic
      </Link>
    </section>
  );
}
