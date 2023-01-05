/*
state for cards:
{
    cards: {
        cards: {
        '789': {
            id: '789',
            front: 'front text',
            back: 'back text'
            },
        '101': {
            id: '101',
            front: 'front text',
            back: 'back text'
            },
        '102': {
            id: '102',
            front: 'front text',
            back: 'back text'
            }
        }
    }
}
*/


import { createSlice } from "@reduxjs/toolkit";


export const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    cards: {}, //This inner cards object will eventually hold all cards keyed by id. (aka the key for each card object will = card's id, see state sample above)
  },
   reducers: {
    addCard: (state, action) => {
        // addCard action - will receive a payload of the form { id: '123', front: 'front of card', back: 'back of card'}.
        const { id } = action.payload;  //need this to define these variables and assign them to the payload's values. These seem to set the need for the specified parameters for the action function when used later!? aka function addCard(id).
        state.cards[id] = action.payload
    }
   }

});

export const selectCards = (state) => state.cards.cards;
export const { addCard } = cardsSlice.actions;


export default cardsSlice.reducer;