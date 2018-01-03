import React from 'react';
import {Text, View} from 'react-native';

export default class CardDetail extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {title} = navigation.state.params;
    return { title };
  }
  render () {
    return (
      <View>
        <Text>
          this CardDetail page!
        </Text>
      </View>
    );
  }
}