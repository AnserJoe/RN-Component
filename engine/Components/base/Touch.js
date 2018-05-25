/**
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, TouchableHighlight} from 'react-native'


export default class Touch extends Component {
  render () {
    let {
      style = null, onPress = () => null,
      underlayColor = 'rgba(225, 225, 225, 0.75)', children = null, editable = true,
    } = this.props
    return React.createElement(
      editable ? TouchableHighlight : View,
      {
        style: [style, {backgroundColor: 'transparent'}, editable ? null : {opacity: 0.5}],
        underlayColor,
        onPress
      },
      children
    )
  }
}

Touch.propTypes = {
  children: PropTypes.object.isRequired,
}
