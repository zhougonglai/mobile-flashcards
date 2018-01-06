import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import WhiteSpace from 'antd-mobile/lib/white-space';
import WingBlank from 'antd-mobile/lib/wing-blank';
import {connect} from 'react-redux';

import AppStatusBar from './pure/AppStatusBar';
import DeckCard from './pure/DeckCard';
import {fentchResults} from '../utils/api';
import {addDeck} from '../actions';

class DeckCards extends React.Component {

  componentDidMount () {
    fentchResults()
    .then(decks => {
      this.props.dispatch(addDeck(decks));
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <AppStatusBar backgroundColor={'transparent'} barStyle={'default'}/>
        <ScrollView style={{flex: 1}}>
          {
            Object.values(this.props.decks).map(deck =>
              <WingBlank size='lg'  key={deck.title}>
                <WhiteSpace size="lg" />
                  <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('CardDetail',{title: deck.title})}>
                    <DeckCard deck={deck}/>
                  </TouchableOpacity>
                <WhiteSpace size="lg" />
              </WingBlank>
            )
          }
        </ScrollView>
    </View>
    );
  }
}

const mapStateToProps = (decks) => ({decks});

export default connect(mapStateToProps)(DeckCards);