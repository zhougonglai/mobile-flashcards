import React from 'react';
import {Text, View, StyleSheet, Platform, Alert, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import InputItem from 'antd-mobile/lib/input-item';
import List from 'antd-mobile/lib/list';
import Button from 'antd-mobile/lib/button';

import AppStatusBar from './pure/AppStatusBar';
import * as actions from '../actions';
import { white } from '../utils/colors';
import { addDeck } from '../utils/api';

class AddDeck extends React.Component {
  state = {
    title: ''
  }

  handleInput = (target, val) => {
    this.setState({
      title: val
    })
  }

  submit = () => {
    const {title} = this.state;
    if(title.trim().length > 3) {
      addDeck(title.trim()).then(()=>{
        this.props.dispatch(actions.addDeck({
          [title.trim()]:{
            title: title.trim(),
            questions: []
          }
        }));
        Alert.alert('提示', '添加成功',[
          {text: 'OK', onPress: () => {
            this.setState({
              title:''
            })
          }},
        ]);

        // QUESTION:  这个没有起作用...?
        Keyboard.dismiss();
      });
    } else {
      Alert.alert('提示','这个标题有点短...');
    }
  }

  render () {
    const {title} = this.state;

    return (
      <View style={{flex: 1}}>
        <AppStatusBar backgroundColor={'transparent'} barStyle={'default'}/>
        <View style={{flex: 1, padding: 20}} onPress={() => Keyboard.dismiss()}>
          <View style={styles.card}>
            <List renderHeader={() => `What is the title of your new Deck`}>

              <InputItem placeholder="input the title" clear
              ref={el => this.titleInput = el}
              value={title} onChange={val => this.handleInput('title', val)}/>
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

export default connect()(AddDeck);