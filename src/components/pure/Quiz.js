import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SegmentedControl from 'antd-mobile/lib/segmented-control';

import {red} from '../../utils/colors';

const Quiz = ({quiz, ...props}) => (
  <View style={styles.alignCenter}>
    <SegmentedControl style={styles.segment} values={['question', 'answer']} selectedIndex={props.selectedIndex || 0}
    onChange={e => props.onSegmentChange(e.nativeEvent)}/>
    <View style={styles.alignCenter}>
      {
        props.selectedIndex === 1 ?
        <Text style={[styles.title, styles.answer]}>
          {quiz.answer}
        </Text>: 
        <Text style={[styles.title, styles.quiz]}>
          {quiz.question}
        </Text>
      }
    </View>
  </View>
)

const styles = StyleSheet.create({
  alignCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segment: {
    width: '80%'
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold'
  },
  answer: {
    color: red
  },
  quiz: {
    marginTop: 15
  }
})

export default Quiz;