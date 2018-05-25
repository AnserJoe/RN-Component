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
import { Touch, Heading, AlertModel } from './../Components'

export default class AlertModelDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Touch editable onPress={() => {
          this.refs.AlertModel.show()
        }}>
          <View style={{width: 200, height: 200, backgroundColor: 'pink'}}>
            <Heading>AlertModelDemo</Heading>
          </View>
        </Touch>
        <AlertModel
          ref='AlertModel'
          title='标题'
          content='文案文案文案文案文案文案文案文案文案文案文案文案文案文案。'
          btnInfo={{ok: '确认'}}
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
  }
})
