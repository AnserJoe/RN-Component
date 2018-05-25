/**
 * by Joe
 */

import React, {createElement} from 'react'
import {BackHandler, Platform} from 'react-native'

/**
 * 安卓返回键
 * @param  oldComponent 需要包装的原始组件
 * 使用重写 hardwareBackPress 方法
 * @return {React.Component} 包装之后的组件
 */
export default function EnhancedBackHandler () {
  return (oldComponent) => {
    return class newComponent extends React.Component {
      componentDidMount () {
        if (Platform.OS === 'android') {
          BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.refs.wrapcomponent) { return this.refs.wrapcomponent.handleHardwareBackPress() }
            return false
          })
        }
      }
      componentWillUnmount () {
        if (Platform.OS === 'android') {
          BackHandler.removeEventListener('hardwareBackPress', () => {
          })
        }
      }
      render () {
        return createElement(oldComponent, {...this.props, ref: 'wrapcomponent'})
      }
    }
  }
}
