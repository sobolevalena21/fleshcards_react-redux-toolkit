/*
Now that you can create topics, your next task is to build out the necessary functionality to add quizzes to your app. This will involve creating two new slices—one for the quizzes themselves and one for the cards that comprise them—and adding an action to your topics slice to associate quizzes with the topic to which they belong. To start, create in the src/features/quizzes directory, create a new file containing a slice for quizzes

state for quizzes:
{
    quizzes: {
        quizzes: {
        '456': {
            id: '456',
            topicId: '123',
            name: 'quiz 1'
            icon: 'icon url',
            cardIds: ['789', '101', '102']
            }
        }
    }
}

*/

import { createSlice } from "@reduxjs/toolkit";
import { addQuizIdToTopic } from '../topics/topicsSlice.js';


export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: {
    quizzes: {}, //This inner quizzes object will eventually hold all quizzes keyed by id (aka the key for each quizz object will = quiz's id, see state sample above)
  },
   reducers: {
    addQuiz: (state, action) => {
        // addQuiz action - will receive a payload of the form { id: '123', name: 'quiz name', topicId: '456', cardIds: ['1', '2', '3', ...]}.
        const { id } = action.payload;  //need this to define these variables and assign them to the payload's values. These seem to set the need for the specified parameters for the action function when used later!? aka function addQuiz(id).
        state.quizzes[id] = action.payload; 
    }
   }

});

//Conceptually, the actions of creating a new quiz (addQuiz from quizzesSlice) and associating it with its topic (addQuizIdToTopic in topicsSlice) are a part of a single process. Back in the quizzes slice file, write an action creator that returns a thunk that dispatches these two actions one after the other. This new thunk action creator is the one that you will dispatch when a user creates a new quiz. >> In theory, could we omit this complicated thunk and just dispatch the two actions right in the handleSubmit in the NewQuizForm ??? After testing it, YES, but complications (refer to NewQuizForm.js file for detailed explanation)

export const thunkForQuizCreation = (quiz) => {
    const { id, topicId} = quiz;
    return (dispatch) => {
        dispatch(quizzesSlice.actions.addQuiz(quiz));
        dispatch(addQuizIdToTopic({ topicId: topicId, quizId: id }))
    }
};


export const selectQuizzes = (state) => state.quizzes.quizzes;
export const { addQuiz } = quizzesSlice.actions;


export default quizzesSlice.reducer;