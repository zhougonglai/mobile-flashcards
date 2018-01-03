import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Card from 'antd-mobile/lib/card';

const styles = StyleSheet.create({
  card: {
    height: 100
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
  }
});

const DeckCard = ({deck, ...props}) => (
      <Card style={[styles.card]} {...props}>
        <Card.Body style={styles.alignCenter}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.subtitle}>{deck.questions.length} cards</Text>
        </Card.Body>
      </Card>
)

export default DeckCard;