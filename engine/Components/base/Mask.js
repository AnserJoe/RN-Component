import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ViewPropTypes, Animated, Keyboard } from 'react-native'
import Modal from 'react-native-modal'

export default class Mask extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([ PropTypes.object, ViewPropTypes.style ]),
    children: PropTypes.object,
    touchHide: PropTypes.bool,
    animationInTiming: PropTypes.number,
    animationOutTiming: PropTypes.number,
    hideCallback: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      offset: new Animated.Value(0),
      choice: '',
      hide: true
    }
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
  }
  show () {
    if (this.state.hide) {
      this.setState({hide: false})
    }
  }

  hide () {
    if (!this.state.hide) {
      Keyboard.dismiss()
      let {hideCallback = () => null} = this.props
      hideCallback()
      this.setState({hide: true})
    }
  }
  render () {
    let {touchHide = true, style, animationInTiming = 300, animationOutTiming = 300} = this.props
    return (
      <Modal
        isVisible={!this.state.hide}
        onBackdropPress={touchHide ? this.hide : () => null}
        onBackButtonPress={touchHide ? this.hide : () => null}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        animationInTiming={animationInTiming}
        animationOutTiming={animationOutTiming}
        style={[{margin: 0}, style]}
      >
        {this.props.children}
      </Modal>
    )
  }
}
