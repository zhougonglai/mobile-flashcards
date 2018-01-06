import React from 'react';
import {Text, View, StyleSheet, Platform, Alert} from 'react-native';
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
    if (question.length < 9 || answer.length < 3) {
      Alert.alert('提示','问题或答案描述不清!');
    } else {
      this.props.dispatch(actions.addCard(this.props.deck, {question, answer}));
      this.props.navigation.goBack();
      addCard(this.props.deck, {question, answer})
    }
  }

  render () {
    const {question, answer} = this.state;
    const {title} = this.props.navigation.state.params;

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, padding: 20}}>
          <View style={styles.card}>
            <List renderHeader={() => `Add Card for the ${title}`}>
              <TextareaItem placeholder="input the Question" clear rows={2}
              value={question} onChange={val => this.handleInput('question', val)}/>
              <TextareaItem placeholder="input the Answer" clear rows={2}
              value={answer} onChange={val => this.handleInput('answer', val)}/>
            </List>
            <Button onClick={this.submit} type="primary">Submit</Button>
          </View>
        </View>
        <View style={{flex: 1}}>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    justifyContent: 'space-around',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset:{
      width: 0,
      height: 3
    }
  }
})

const mapStateToProps = (state, {navigation}) => {
  const {title} = navigation.state.params;
  return {
    deck: state[title]
  }
};

export default connect(mapStateToProps)(AddCard);