import React from 'react';
import { StyleSheet, View} from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from './src/reducers';
import RootStackNavigator from './src/navgation/RootNavigation';

export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <RootStackNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});