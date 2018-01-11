import {AsyncStorage} from 'react-native';
import {Permissions} from 'expo';
import {DECKS_STORAGE_KEY, InitialState, NOTIFICATION_KEY} from './constant';
import Notifications from 'expo/src/Notifications';

export const fentchResults = () => 
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then(result => {
    if(result) {
      return JSON.parse(result);
    }else {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(InitialState));
      return InitialState;
    }
  });

/**
 * @param {Deck} deck 
 * @param {Card} card 
 */
export const addCard = (deck, card) =>
  AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify({
    [deck.title]: {
      questions: deck.questions.concat([card])
    }
  }))

export const addDeck = title => 
  AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify({
    [title]:{
      title,
      questions: []
    }
  }))

/**
 * !!! 添加Card 的时候没有 答案判断这个选项, 所以... !!!
 * 模拟服务器判断 答案
 * @param {Array<answer>} answers 
 * @return {Array<Boolean>}
 */
export const judge = answers =>
  answers.map(answer => (Math.random() > 1/2) === answer)

export const createNotification = () => ({
  title: '开始今天的 答题训练哦!',
  body: '日积月累, 方得始终! 👏',
  ios: {
    sound: true
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false
  }
});

/**
 * 设定 定时 提醒任务
 */
export const setNotification = () =>
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then(notifyID => {
    if(notifyID === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(({status}) => {
        if(status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync()

          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(20);
          tomorrow.setMinutes(0);

          Notifications.scheduleLocalNotificationAsync(createNotification(),{
            time: tomorrow,
            repeat: 'day'
          }).then(notifyID => {
            AsyncStorage.setItem(NOTIFICATION_KEY, notifyID);
          });
        }
      })
    }
  });

export const clearNotification = () => 
  AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then(Notifications.cancelAllScheduledNotificationsAsync)