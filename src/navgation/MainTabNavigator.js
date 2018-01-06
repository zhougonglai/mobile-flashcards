import React from 'react';
import { TabNavigator } from 'react-navigation';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {Platform} from 'react-native';

import {blue, white} from '../utils/colors';
import DeckCards from '../components/DeckCards';
import AddDeck from '../components/AddDeck';

export default TabNavigator(
  {
    DeckCards: {
      screen: DeckCards,
      navigationOptions: {
        tabBarLabel: 'Deck Cards',
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-bookmarks" size={30} color={tintColor}/>
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({tintColor}) => <FontAwesome name="plus-square" size={30} color={tintColor}/>
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions:{
      activeTintColor: Platform.OS === 'ios' ? blue : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : blue,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)