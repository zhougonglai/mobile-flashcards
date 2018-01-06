import React from 'react';
import { StackNavigator } from 'react-navigation';

import Tabs from './MainTabNavigator';
import CardDetail from '../components/CardDetail';
import Quizs from '../components/Quizs';
import AddCard from '../components/AddCard';
import {blue, white} from '../utils/colors';

const RootStackNavigator = StackNavigator({
  Tabs: {
    screen: Tabs
  },
  CardDetail: {
    screen: CardDetail
  },
  Quizs: {
    screen: Quizs
  },
  AddCard: {
    screen: AddCard
  }
});

export default class RootNavigation extends React.Component {
  render () {
    return <RootStackNavigator />
  }
}