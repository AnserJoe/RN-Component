import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Dimensions, PanResponder } from 'react-native'
import createStyle from './../../Service/createStyle'
import theme from './../../Constants/theme'
import { Paragraph } from './../../Components'

class PickerAndroidItem extends Component {

  static propTypes = {
    value: PropTypes.any,
    label: PropTypes.any
  };

  render () {
    return null
  }

};

export default class PickerAndroid extends Component {

  static Item = PickerAndroidItem;

  constructor (props, context) {
    super(props, context)
    this._moveTo = this._moveTo.bind(this)
    this.state = this._stateFromProps(this.props)
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderRelease: this._handlePanResponderRelease.bind(this),
      onPanResponderMove: this._handlePanResponderMove.bind(this)
    })
  }

  componentDidUpdate(nextProp) {
    return this._stateFromProps(nextProp)
  }

  shouldComponentUpdate (nextProps, nextState, context) {
    return JSON.stringify([{
      selectedIndex: nextState.selectedIndex,
      items: nextState.items,
      pickerStyle: nextState.pickerStyle,
      itemStyle: nextState.itemStyle,
      onValueChange: nextState.onValueChange
    }, context]) !== JSON.stringify([{
      selectedIndex: this.state.selectedIndex,
      items: this.state.items,
      pickerStyle: this.state.pickerStyle,
      itemStyle: this.state.itemStyle,
      onValueChange: this.state.onValueChange
    }, this.context])
  }

  _stateFromProps (props) {
    let selectedIndex = 0
    let items = []
    let pickerStyle = props.pickerStyle
    let itemStyle = props.itemStyle
    let onValueChange = props.onValueChange
    React.Children.forEach(props.children, (child, index) => {
      child.props.value === props.selectedValue && (selectedIndex = index)
      items.push({value: child.props.value, label: child.props.label})
    })
    return {
      selectedIndex,
      items,
      pickerStyle,
      itemStyle,
      onValueChange
    }
  }

  _move (dy) {
    let index = this.index
    this.middleHeight = Math.abs(-index * 40 + dy)
    this.up && this.up.setNativeProps({
      style: {
        marginTop: (3 - index) * 30 + dy * 0.75
      }
    })
    this.middle && this.middle.setNativeProps({
      style: {
        marginTop: -index * 40 + dy
      }
    })
    this.down && this.down.setNativeProps({
      style: {
        marginTop: (-index - 1) * 30 + dy * 0.75
      }
    })
  }

  _moveTo (index) {
    let _index = this.index
    let diff = _index - index
    let marginValue
    if (diff && !this.isMoving) {
      marginValue = diff * 40
      this._move(marginValue)
      this.index = index
      this._onValueChange()
    }
  }

  _handlePanResponderMove (evt, gestureState) {
    let dy = gestureState.dy
    if (this.isMoving) {
      return
    }
    if (dy > 0) {
      this._move(dy > this.index * 40 ? this.index * 40 : dy)
    } else {
      this._move(dy < (this.index - this.state.items.length + 1) * 40 ? (this.index - this.state.items.length + 1) * 40 : dy)
    }
  }

  _handlePanResponderRelease (evt, gestureState) {
    let middleHeight = this.middleHeight
    this.index = middleHeight % 40 >= 20 ? Math.ceil(middleHeight / 40) : Math.floor(middleHeight / 40)
    this._move(0)
    this._onValueChange()
  }

  componentDidMount () {
    this.isMoving = false
    this.index = this.state.selectedIndex
  }

  componentWillUnmount () {
    this.timer && clearInterval(this.timer)
  }

  _renderItems (items) {
    let upItems = []
    let middleItems = []
    let downItems = []
    items.forEach((item, index) => {
      upItems[index] = <Paragraph
        key={'up' + index}
        style={[styles.upText, this.state.itemStyle, {fontSize: 16}]}
        onPress={() => {
          this._moveTo(index)
        }}
      >
        {item.label}
      </Paragraph>

      middleItems[index] = <Paragraph
        key={'mid' + index}
        style={[styles.middleText, this.state.itemStyle]}>{item.label}
      </Paragraph>

      downItems[index] = <Paragraph
        key={'down' + index}
        style={[styles.downText, this.state.itemStyle, {fontSize: 16}]}
        onPress={() => {
          this._moveTo(index)
        }}
      >
        {item.label}
      </Paragraph>
    })
    return { upItems, middleItems, downItems }
  }

  _onValueChange () {
    var curItem = this.state.items[this.index]
    if (curItem && this.state.onValueChange) {
      this.state.onValueChange(curItem.value, curItem.label)
    }
  }

  render () {
    let index = this.state.selectedIndex
    let length = this.state.items.length
    let items = this._renderItems(this.state.items)

    let upViewStyle = {
      marginTop: (3 - index) * 30,
      height: length * 30
    }
    let middleViewStyle = {
      marginTop: -index * 40
    }
    let downViewStyle = {
      marginTop: (-index - 1) * 30,
      height: length * 30
    }

    return (
      <View style={[styles.container, this.state.pickerStyle]} {...this._panResponder.panHandlers}>
        <View style={styles.up}>
          <View style={[styles.upView, upViewStyle]} ref={(up) => { this.up = up }} >
            { items.upItems }
          </View>
        </View>

        <View style={styles.middle}>
          <View style={[styles.middleView, middleViewStyle]} ref={(middle) => { this.middle = middle }} >
            { items.middleItems }
          </View>
        </View>

        <View style={styles.down}>
          <View style={[styles.downView, downViewStyle]} ref={(down) => { this.down = down }} >
            { items.downItems }
          </View>
        </View>
      </View>
    )
  }

};

let width = Dimensions.get('window').width

let styles = createStyle({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  up: {
    height: 90,
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  upView: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  upText: {
    paddingTop: 0,
    height: 30,
    fontSize: 14,
    color: '#000',
    opacity: 0.5,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0
  },
  middle: {
    height: 40,
    width: width,
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  middleView: {
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  middleText: {
    paddingTop: 0,
    height: 40,
    color: '#000',
    fontSize: 22,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0
  },
  down: {
    height: 90,
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  downView: {
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  downText: {
    paddingTop: 0,
    height: 30,
    fontSize: 14,
    color: '#000',
    opacity: 0.5,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0
  }

})
