import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableHighlight, ViewPropTypes } from 'react-native'
import { Paragraph, Touch } from './../'
import px2dp from './../../Util/px2dp'
import theme from './../../Constants/theme'

/**
 * label按钮
 *
 * proprs：
 *  text:按钮文字
 *  editable:是否可编辑
 *  onPress:点击回调
 *  containerStyle:按钮外部容器样式
 *  touchSttyle:按钮样式
 *  textStyle:按钮中文字样式
 */

const LabelButton = props => {
  let {
    text = '', editable = true, onPress = p => null,
    touchStyle = {}, viewStyle = {}, textStyle = {}
  } = props
  return (
    <Touch
      editable={editable}
      style={[styles.touch, touchStyle]}
      onPress={e => onPress(e)}
    >
      <View style={[styles.view, viewStyle]}>
        <Paragraph style={[styles.text, textStyle]}>{text}</Paragraph>
      </View>
    </Touch>
  )
}

const styles = StyleSheet.create({
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: theme.themeColor,
    height: px2dp(40)
  },
  text: {//
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: theme.scaleSize(17)
  }
})

LabelButton.propTypes = {
  text: PropTypes.string,
  editable: PropTypes.bool,
  onPress: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  touchStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style
}

export default LabelButton
