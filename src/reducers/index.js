import {ADD_CARD, ADD_DECK} from '../actions';

const InitialState = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

const decks = (state = InitialState, action) => {
  switch (action.type) {
    case ADD_CARD:
      const {deck, card} = action.payload;
      return {
        ...state,
        [deck.title]:{
          ...deck,
          questions: deck.questions.concat([card])
        }
      }
    case ADD_DECK:
      return {...state, ...action.deck};
    default:
      return state;
  }
}

export default decks;