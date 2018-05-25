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
import { NoData } from './../Components'

export default class NoDataDemo extends Component {
  render() {
    return (
      <NoData title='暂无数据' />
    )
  }
}
