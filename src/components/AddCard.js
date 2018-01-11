import React from 'react';
import {Text, View, StyleSheet, Platform, Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import TextareaItem from 'antd-mobile/lib/textarea-item';
import List from 'antd-mobile/lib/list';
import Button from 'antd-mobile/lib/button';

import * as actions from '../actions';
import { white } from '../utils/colors';
import { addCard } from '../utils/api';

class AddCard extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {title} = navigation.state.params;
    return { title: `Add Card of ${title}` };
  }

  state = {
    question: '',
    answer: ''
  }

  handleInput = (target, value) => {
    this.setState({
      [target]: value
    })
  }

  submit = () => {
    const {question, answer} = this.state;
    if (question.trim().length < 9 || answer.trim().length < 3) {
      Alert.alert('提示','问题或答案描述不清!');
    } else {
      const deck = {question: question.trim(), answer: answer.trim()};
      this.props.dispatch(actions.addCard(this.props.deck, deck));
      this.props.navigation.goBack();
      addCard(this.props.deck, deck)
    }
  }

  render () {
    const {question, answer} = this.state;
    const {title} = this.props.navigation.state.params;

    return (
      <TouchableWithoutFeedback  onPress={Keyboard.dismiss} accessible={false}>
        <View style={[styles.fill,{padding: 20}]}>
          <KeyboardAvoidingView behavior={'padding'} style={styles.card}>
            <List renderHeader={() => `Add Card for the ${title}`}>
              <TextareaItem placeholder="input the Question" clear rows={2}
              value={question} onChange={val => this.handleInput('question', val)}/>
              <TextareaItem placeholder="input the Answer" clear rows={2}
              value={answer} onChange={val => this.handleInput('answer', val)}/>
            </List>
            <Button onClick={this.submit} type="primary">Submit</Button>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  card: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    justifyContent: 'space-around',
  }
})

const mapStateToProps = (state, {navigation}) => {
  const {title} = navigation.state.params;
  return {
    deck: state[title]
  }
};

export default connect(mapStateToProps)(AddCard);