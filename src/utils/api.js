import {AsyncStorage} from 'react-native';

import {DECKS_STORAGE_KEY, InitialState} from './constant';

export const fentchResults = () => 
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then(result => {
    if(result) {
      return JSON.parse(result);
    }else {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(InitialState));
      return InitialState;
    }
  });

export const addCard = (deck, card) =>
  AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify({
    [deck.title]: {
      questions: deck.questions.concat([card])
    }
  }))

export const addDeck = title => 
  AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify({
    [title]:{
      title,
      questions: []
    }
  }))