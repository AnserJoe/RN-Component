import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ViewPropTypes, Animated, Keyboard, ActivityIndicator, View } from 'react-native'
import { Paragraph } from './../index'
import Modal from 'react-native-modal'
import theme from './../../Constants/theme'
import px2dp from './../../Util/px2dp'

export default class LoadingView extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <Modal
        isVisible
        backdropOpacity={0.3}
        animationInTiming={200}
        animationOutTiming={200}
        style={{
          margin: 0,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0 , 0.7)',
          padding: px2dp(10),
          paddingLeft: px2dp(20),
          paddingRight: px2dp(20),
          borderRadius: px2dp(8)

        }}>
          <ActivityIndicator
            animating
            color={theme.themeColor}
            size={40}
          />
          <Paragraph style={{
            fontSize: theme.scaleSize(16),
            color: '#fff',
            marginLeft: px2dp(15)
          }}>
            Mohon tunggu...
          </Paragraph>
        </View>
      </Modal>
    )
  }
}
