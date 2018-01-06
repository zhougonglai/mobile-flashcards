import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {connect} from 'react-redux';
import Pagination from 'antd-mobile/lib/pagination';
import Button from 'antd-mobile/lib/button';

import Quiz from './pure/Quiz';
import { white, green, red } from '../utils/colors';
import { NavigationActions } from 'react-navigation';

class Quizs extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {title} = navigation.state.params;
    return { title: `quizs of ${title}` };
  }
  state = {
    current: 1,
    active: 'question'
  }

  onSegmentChange = (event) => {
    this.setState({
      active: event.value
    })
  }

  nextQuestion = () => {
    this.setState(preState => ({
      current: preState.current+1,
      active: 'question'
    }));
  }

  goHome = () => {
    this.props.navigation.navigate('DeckCards')
  }

  render() {
    const {current, active} = this.state;
    const {deck} = this.props;
    const quiz = (current <= deck.questions.length ) && deck.questions[current - 1]

    return (
      <View style={styles.alignCenter}>
        <Pagination mode="number" total={deck.questions.length} current={current > deck.questions.length ? deck.questions.length : current}/>
        <View style={[styles.quiz, {flex: 1}]}>
            {
              (current <= deck.questions.length) ?
              <Quiz quiz={quiz} selectedIndex={active === 'question' ? 0 : 1} onSegmentChange={this.onSegmentChange}/> :
              <Text style={{textAlign: 'center'}}> 完成答题</Text>
            }
        </View>
        <View style={styles.alignCenter}>
        {
          current > deck.questions.length ? 
          <Button onClick={this.goHome}>
            Go Home
          </Button>:
          <View>
            <Button style={styles.correct} type="primary" inline onClick={this.nextQuestion}>Correct</Button>
            <Button style={styles.incorrect} type="warning" inline onClick={this.nextQuestion}>Incorrect</Button>
          </View>
        }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  alignCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  correct: {
    backgroundColor: green,
    borderColor: green
  },
  incorrect: {
    marginTop: 15
  },
  quiz: {
    width: '100%',
    padding: 10,
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset:{
      width: 0,
      height: 3
    }
  },
})

const mapStateToProps = (state, {navigation}) => {
  const {title} = navigation.state.params;
  return {
    deck: state[title]
  }
};

export default connect(mapStateToProps)(Quizs);