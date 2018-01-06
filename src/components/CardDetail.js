import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Card from 'antd-mobile/lib/card';
import Button from 'antd-mobile/lib/button';
import Flex from 'antd-mobile/lib/flex';
import WhiteSpace from 'antd-mobile/lib/white-space';
import WingBlank from 'antd-mobile/lib/wing-blank';

import DeckCard from './pure/DeckCard';

const styles = StyleSheet.create({
  card: {
    height: 200
  },
  alignCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#909399'
  },
  startQuiz: {
    marginTop: 15
  }
})

class CardDetail extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {title} = navigation.state.params;
    return { title };
  }
  
  backTo = (routeName) => {
    this.props.navigation.navigate(routeName, {title: this.props.deck.title});
  }

  render () {
    return (
      <View style={{flex:1}}>
        <DeckCard deck={this.props.deck} full style={{flex:1}}/>
        <View style={styles.alignCenter}>
          <Button type="ghost" inline onClick={() => this.backTo('AddCard')}>Add Card</Button>
          <Button style={styles.startQuiz} type="primary" inline onClick={() => this.backTo('Quizs')}>Start Quiz</Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, {navigation}) => {
  const {title} = navigation.state.params;
  return {
    deck: state[title]
  }
};

export default connect(mapStateToProps)(CardDetail);