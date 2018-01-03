import React from 'react';
import { StyleSheet, Text, Platform, View} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {FontAwesome, Ionicons} from '@expo/vector-icons';

import reducer from './src/reducers';
import {blue, white} from './src/utils/colors';
import CardDetail from './src/components/CardDetail';
import DeckCards from './src/components/DeckCards';
import AddCard from './src/components/AddCard';

const Tabs = TabNavigator({
  DeckCards: {
    screen: DeckCards,
    navigationOptions: {
      tabBarLabel: 'Deck Cards',
      tabBarIcon: ({tintColor}) => <Ionicons name="ios-bookmarks" size={30} color={tintColor}/>
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      tabBarLabel: 'Add Card',
      tabBarIcon: ({tintColor}) => <FontAwesome name="plus-square" size={30} color={tintColor}/>
    }
  }
},{
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
})

const AppNavigator = new StackNavigator({
  Tabs: {
    screen: Tabs
  },
  CardDetail: {
    screen: CardDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue
      }
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}