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
import { TouchItem, Heading } from './../Components'

export default class TouchItemDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchItem
          title='开户省市'
          titleTag={<Text>title</Text>}
          hint={'请选择开户省市'}
          hintTag={<Text>hint</Text>}
          status={'状态'}
          statusTag={<Text>status</Text>}
          onPress={e => {
            console.log('click')
          }}
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
    backgroundColor: '#f0f0f0',
  }
})
