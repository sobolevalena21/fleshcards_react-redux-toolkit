/*
state for topics:
{
    topics: {
        topics: {
        '123': {
            id: '123',
            name: 'name 1',
            icon: 'icon url',
            quizIds: ['456', '789']
            }
        }
    }
}

*/

import { createSlice } from "@reduxjs/toolkit";


export const topicsSlice = createSlice({
  name: 'topics',
  initialState: {
    topics: {}, //This inner topics object will eventually hold all topics keyed by id (aka the key for each topic object will = topic;s id, see state sample above)
  },
   reducers: {
    addTopic: (state, action) => {
        //action's payload looks like this: {id: '123456', name: 'name of topic', icon: 'icon url'}. Store these values in the state as a new topic object. When a topic is first created, it won’t have any associated quizzes, but you should still create an empty quizIds array, containing the ids of each quiz associated with the topic. >> const quizIds = [] >> must be created here and not with the Form submition.
        const { id, name, icon } = action.payload;  //need this to define these variables and assign them to the payload's values. These seem to set the need for the cpecified parameters for the action function when used later!? aka function addTopic(id, name, icon). || an empty quizIds array must be created here, not in the NewTopicForm!!!
        state.topics[id] = {
            id: id,
            name: name,
            icon: icon,
            quizIds: [] 
        }
    },
    //you should add an action to your topics slice that adds a quiz’s id to the quizIds array of the topic with which the newly quiz is associated. This action will receive a payload of the form {quizId: '123', topicId: '456'}. Make sure to export this action creator for use elsewhere in the app.
    addQuizIdToTopic: (state, action) => {
        const { quizId, topicId } = action.payload; //these seem to be the setting for action function parameters!? aka function addQuizIdToTopic(quizId, topicId)
        state.topics[topicId].quizIds.push(quizId)
    } 
   }

});

export const selectTopics = (state) => state.topics.topics;
export const { addTopic, addQuizIdToTopic } = topicsSlice.actions;


export default topicsSlice.reducer;