import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableWithoutFeedback, View, TextInput } from 'react-native'
import theme from './../../Constants/theme'
import px2dp from './../../Util/px2dp'
import { Paragraph } from './../'

export default class LabelInput extends React.Component {
  constructor () {
    super(...arguments)
    this.getProps = this.getProps.bind(this)
  }
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.object,
    style: Text.propTypes.style
  }
  getProps () {
    let prop = {}
    for (var z in this.props) {
      if (z !== 'style' && z !== 'children' && z !== 'title') {
        prop[z] = this.props[z]
      }
    }
    return prop
  }
  render () {
    let {style, title = '请填写', hasTopLine = true, hasBottomLine = true} = this.props
    return (
      <TouchableWithoutFeedback onPress={e => this.ipt.focus()}>
        <View style={[styles.inputView,
          hasTopLine ? {borderTopWidth: theme.borderWidth} : null,
          hasBottomLine ? {borderBottomWidth: theme.borderWidth} : null,
        ]}>
          <View style={styles.inputLogo1}>
            <Paragraph style={styles.inputTitle}>{title}</Paragraph>
            <TextInput
              ref={ref => { this.ipt = ref }}
              underlineColorAndroid='transparent'
              {...this.getProps()}
              style={[styles.input, style]}
            />
          </View>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    borderColor: theme.borderColor,
    justifyContent: 'center',
    height: px2dp(80)
  },
  inputTitle: {
    fontSize: theme.scaleSize(12),
    color: '#666'
  },
  input: {
    fontSize: theme.scaleSize(20),
    padding: 0,
    marginTop: px2dp(5),
    width: px2dp(335),
    color: theme.textColor
  },
  inputLogo1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: px2dp(80)
  }
})

