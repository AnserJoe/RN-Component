/**
 * Created by Joe on 2017/10/12.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { View, TouchableHighlight, ActivityIndicator, CheckBox } from 'react-native'
import createStyle from './../../Service/createStyle'
import { Paragraph } from './../'

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
            <Paragraph style={{fontSize: 14, color: theme.textColor}}>服务异常</Paragraph>
            <Paragraph style={{fontSize: 16, color: theme.textColor}}>点击刷新</Paragraph>
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

const styles = createStyle({
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
    paddingBottom: 20
  }
})
