/**
 * Created by Joe on 2017/10/12.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { View, TouchableHighlight, ActivityIndicator, StyleSheet, CheckBox } from 'react-native'
import { Paragraph } from './../'
import px2dp from './../../Util/px2dp'

import theme from './../../Constants/theme'

export default class WarpLoading extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      AA: true,
      B: false,
      C: false,
    }
  }
  render() {
    return (
      <View style={styles.around}>
        <TouchableHighlight underlayColor={'rgba(225, 225, 225, 0.75)'}>
          <View style={styles.tip}>
            <Paragraph style={{fontSize: theme.scaleSize(14), color: theme.textColor}}>服务异常</Paragraph>
            <Paragraph style={{fontSize: theme.scaleSize(16), color: theme.textColor}}>点击刷新</Paragraph>
          </View>
        </TouchableHighlight>
        <CheckBox style={{width: 200, height: 50}} value={this.state.AA} onChange={() => {
          console.log('1231231231')
          this.setState({AA: !this.state.AA})
        }}/>
        <ActivityIndicator size='large'/>
      </View>
    )
  }
}

WarpLoading.propTypes = {
  title: PropTypes.string
}

const styles = StyleSheet.create({
  around: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: theme.screenWidth,
    height: theme.screenHeight,
    zIndex: 9999,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: theme.screenHeight / 3,
    backgroundColor: '#fff'
  },
  tip: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingBottom: px2dp(20)
  }
})
