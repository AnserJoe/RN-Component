/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native'
import { Toast } from './../Components'

export default class ToastDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          Toast.show('发货撒多了发货速度快六合彩螺丝刀接口后', 1000, () => console.log('123'))
        }}><Text>Toast</Text></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})
