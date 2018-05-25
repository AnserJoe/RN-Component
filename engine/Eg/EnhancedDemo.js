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
import { Touch, Heading, WithConnection, EnhancedBackHandler } from './../Components'

class EnhancedDemo extends Component {
  constructor () {
    super(...arguments)
    this.state = {tip: 0}
  }
  handleHardwareBackPress = () => {
    this.setState(ns => { return {tip: ++ns.tip} })
    return true
  }
  render() {
    return (
      <View style={styles.container}>
        <Touch editable onPress={() => {
          console.log('click...')
        }}>
          <View style={{width: 200, height: 200, backgroundColor: 'pink', justifyContent: 'center', alignItems: 'center'}}>
            <Heading>NET:{this.props.isConnected.toString()}</Heading>
            <Heading>Back:{this.state.tip}</Heading>
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

export default WithConnection()(EnhancedBackHandler()(EnhancedDemo))
