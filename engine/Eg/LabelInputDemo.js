/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import { LabelInput, Touch } from './../Components'

export default class LabelInputDemo extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LabelInput
          title='请填写'
          value={this.state.value}
          placeholder='请填写'
          keyboardType={'numeric'}
          onChangeText={text => this.setState({value: text})}
        >
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Touch>
              <View style={{width: 30, height: 30, backgroundColor: 'pink'}} />
            </Touch>
          </View>
        </LabelInput>
      </View>
    )
  }
}
