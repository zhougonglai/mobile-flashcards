import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
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
    const {decks} = this.props;

    return (
      <View style={{flex: 1}}>
        <AppStatusBar backgroundColor={'transparent'} barStyle={'default'}/>
        <ScrollView style={{flex: 1}}>
          <FlatList data={Object.values(decks).map((item,index) => ({...item, key: index}))} style={{flex: 1}}
          renderItem={({item, index}) => 
          <WingBlank size='lg'>
            <WhiteSpace size="lg" />
              <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CardDetail',{title: item.title})}>
                <DeckCard deck={item}/>
              </TouchableOpacity>
            <WhiteSpace size="lg" />
          </WingBlank>} />
        </ScrollView>
    </View>
    );
  }
}

const mapStateToProps = (decks) => ({decks});

export default connect(mapStateToProps)(DeckCards);