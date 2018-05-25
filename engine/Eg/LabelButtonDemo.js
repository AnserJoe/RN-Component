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
import { LabelButton, Heading } from './../Components'

export default class LabelButtonDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LabelButton
          text='下一步'
          onPress={() => console.log('click')}
          editable
        />
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
    padding: 20
  }
})
