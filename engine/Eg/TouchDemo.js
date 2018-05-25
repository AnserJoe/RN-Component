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
import { Touch, Heading } from './../Components'

export default class TouchDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Touch editable onPress={() => {
          console.log('click...')
        }}>
          <View style={{width: 200, height: 200, backgroundColor: 'pink'}}>
            <Heading>Heading</Heading>
          </View>
        </Touch>
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
