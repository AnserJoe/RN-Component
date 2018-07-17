import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableWithoutFeedback, View, TextInput } from 'react-native'
import createStyle from './../../Service/createStyle'
import theme from './../../Constants/theme'
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
          style
        ]}>
          <View style={styles.inputLogo1}>
            <Paragraph style={styles.inputTitle}>{title}</Paragraph>
            <TextInput
              ref={ref => { this.ipt = ref }}
              underlineColorAndroid='transparent'
              {...this.getProps()}
              style={styles.input}
            />
          </View>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = createStyle({
  inputView: {
    flexDirection: 'row',
    borderColor: theme.borderColor,
    justifyContent: 'center',
    height: 80
  },
  inputTitle: {
    fontSize: 12,
    color: '#666'
  },
  input: {
    fontSize: 20,
    padding: 0,
    marginTop: 5,
    width: 335,
    color: theme.textColor
  },
  inputLogo1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
})
