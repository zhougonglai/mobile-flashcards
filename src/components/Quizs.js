import React from 'react';
import {Text, View, StyleSheet, Platform, Alert} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';
import Pagination from 'antd-mobile/lib/pagination';
import Button from 'antd-mobile/lib/button';
import {Entypo} from '@expo/vector-icons';

import Quiz from './pure/Quiz';
import { white, green, red, blue } from '../utils/colors';
import {judge, clearNotification} from '../utils/api';

class Quizs extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {title, canRestar= false, restar} = navigation.state.params;

    if(canRestar){
      return { 
        title: `quizs of ${title}`,
        headerRight: <Entypo name="cycle" size={30} color={blue} onPress={restar}/>
      };
    } else {
      return { 
        title: `quizs of ${title}`,
      };
    }
  }

  /**
   * @property {number} current 当前下标
   * @property {enum<One of {'question', 'anwser'}>} active segment
   * @property {Array<Answer>} answers 答案
   * @property {Array<Result>} results 服务器结果
   * 
   * @memberof Quizs
   */
  state = {
    current: 1,
    active: 'question',
    answers: [],
    results: []
  }

  _restar = () => {
    this.setState({
      current: 1,
      active: 'question',
      answers: [],
      results: []
    },() => {
      this.props.navigation.setParams({
        canRestar: false
      });
    });
  }

  componentDidMount() {
    this.props.navigation.setParams({
      restar: this._restar
    })
  }

  onSegmentChange = (event) => {
    this.setState({
      active: event.value
    });
  }

  nextQuestion = (bool) => {
    // 完成答题
    if(this.state.current === this.props.deck.questions.length) {
      this.setState(preState => ({
        current: preState.current+1,
        active: 'question',
        answers: preState.answers.concat([bool])
      }),() => {
        this.props.navigation.setParams({
          canRestar: true
        });

        clearNotification();

        this.setState({
          results: judge(this.state.answers)
        });
      });

    } else {
      this.setState(preState => ({
        current: preState.current+1,
        active: 'question',
        answers: preState.answers.concat([bool])
      }));
    }
  }

  goHome = () => {
    this.props.navigation.navigate('DeckCards')
  }

  render() {
    const {current, active, results} = this.state;
    const {deck} = this.props;
    const quiz = (current <= deck.questions.length ) && deck.questions[current - 1]

    return (
      <View style={styles.alignCenter}>
        <Pagination mode="number" total={deck.questions.length} current={current > deck.questions.length ? deck.questions.length : current}/>
        <View style={[styles.quiz, {flex: 1}]}>
            {
              (current <= deck.questions.length) ?
              <Quiz quiz={quiz} selectedIndex={active === 'question' ? 0 : 1} onSegmentChange={this.onSegmentChange}/> :
              <View>
                <Text style={{textAlign: 'center'}}> 
                  完成答题 
                </Text>
                {deck.questions.length > 0 &&
                <Text style={[styles.incorrect, {textAlign: 'center'}]}> 
                  答对: {results.filter(result => result).length} 题, 正确率: {(results.filter(result => result).length / deck.questions.length).toFixed(4)*100} %
                </Text>}
              </View>
            }
        </View>
        <View style={styles.alignCenter}>
        {
          current > deck.questions.length ?
          <Button style={styles.incorrect} onClick={this.goHome}>
            Go Home
          </Button>:
          <View>
            <Button style={styles.correct} type="primary" inline onClick={() => this.nextQuestion(true)}>Correct</Button>
            <Button style={styles.incorrect} type="warning" inline onClick={() => this.nextQuestion(false)}>Incorrect</Button>
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