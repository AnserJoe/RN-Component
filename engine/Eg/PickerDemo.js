/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Touch, Heading, RNPicker } from './../Components'

export default class PickerDemo extends Component {
  constructor () {
    super(...arguments)
    this.state = {dv: 1}
  }
  componentDidMount () {
    this.setState({dv: 3})
  }
  render() {
    return (
      <View style={styles.container}>
        <Touch
          editable
          onPress={
            () => {
              this.refs.purposePicker.show(this, e => console.log(e))
            }
          }
        >
          <View style={{width: 200, height: 200, backgroundColor: 'pink'}}>
            <Heading>PickerDemo</Heading>
          </View>
        </Touch>
        <RNPicker
          ref='purposePicker'
          defaultVal={this.state.dv}
          options={
            [
              {id: 1, name: '发收款'},
              {id: 2, name: '相册V型'},
              {id: 3, name: '需'},
              {id: 4, name: '防守打法是'},
              {id: 5, name: '分手大师'},
              {id: 6, name: '防守打法是发顺丰'},
              {id: 7, name: '水电费水电费'}
            ]
          }
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
