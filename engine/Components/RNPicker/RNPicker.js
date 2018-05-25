import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Animated, Easing, Dimensions, Picker, Platform, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native'
import { Paragraph } from './../../Components'
import px2dp from './../../Util/px2dp'
import theme from './../../Constants/theme'
import PickerAndroid from './PickerAndroid'

const {width} = Dimensions.get('window')
const aHeight = px2dp(250)
let CommonPicker = Platform.OS === 'ios' ? Picker : PickerAndroid

export default class RNPicker extends Component {

  static propTypes = {
    defaultVal: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    options: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      offset: new Animated.Value(0),
      opacity: new Animated.Value(0),
      choice: props.defaultVal,
      hide: true
    }
    this.callback = function () {}// 回调方法
    this.parent = {}
    this.cancel = this.cancel.bind(this)
    this.ok = this.ok.bind(this)
  }

  componentWillUnMount () {
    this.timer && clearTimeout(this.timer)
  }
  static getDerivedStateFromProps(nextProps, prevProps) {
    if (prevProps.defaultVal !== nextProps.defaultVal) {
      return {choice: nextProps.defaultVal}
    }
    return null
  }

  render () {
    let {options} = this.props
    if (this.state.hide) {
      return (<View />)
    } else {
      return (
        <Modal
          visible
          transparent
          onRequestClose={() => null}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={this.cancel}>
            <Animated.View style={styles.mask} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.tip,
              {
                transform: [
                  {
                    translateY: this.state.offset.interpolate({
                      inputRange: [0, 1],
                      outputRange: [aHeight, 0]
                    })
                  }
                ]
              }
            ]}
          >
            <View style={styles.tipTitleView} >
              <Paragraph style={styles.cancelText} onPress={this.cancel}>取消</Paragraph>
              <Paragraph style={styles.okText} onPress={this.ok} >确定</Paragraph>
            </View>
            {
              (!options || options.length === 0)
                ? <View style={styles.around}>
                  <View style={styles.touchView}>
                    <Paragraph style={styles.text}>列表为空</Paragraph>
                  </View>
                  <ActivityIndicator size='large' />
                </View>
                : <View style={styles.tipPickerView} >
                  <CommonPicker
                    style={styles.picker}
                    pickerStyle={styles.picker}
                    mode={Picker.MODE_DIALOG}
                    itemStyle={styles.itempicker}
                    selectedValue={this.state.choice}
                    onValueChange={choice => this.setState({choice: choice})}>
                    {this.props.options.map(({id, name}) => <CommonPicker.Item label={name} value={id} key={id} />)}
                  </CommonPicker>
                </View>
            }
          </Animated.View>
        </Modal>
      )
    }
  }

  componentDidMount () {
  }

  // 显示动画
  in () {
    Keyboard.dismiss()
    this.setState({ hide: false }, () => {
      Animated.parallel([
        Animated.timing(
          this.state.opacity,
          {
            easing: Easing.linear,
            duration: 300,
            toValue: 1
          }
        ),
        Animated.timing(
          this.state.offset,
          {
            easing: Easing.linear,
            duration: 300,
            toValue: 1
          }
        )
      ]).start()
    })
  }

  // 隐藏动画
  out () {
    Animated.parallel([
      Animated.timing(
        this.state.opacity,
        {
          easing: Easing.linear,
          duration: 300,
          toValue: 0
        }
      ),
      Animated.timing(
        this.state.offset,
        {
          easing: Easing.linear,
          duration: 300,
          toValue: 0
        }
      )
    ]).start(() => this.setState({hide: true}))
  }

  // 取消
  cancel (event) {
    if (!this.state.hide) {
      this.out()
    }
  }

  // 选择
  ok () {
    if (!this.state.hide) {
      this.out()
      this.callback.apply(this.parent, [this.state.choice])
    }
  }

  show (obj, callback) {
    this.parent = obj
    this.callback = callback
    if (this.state.hide) {
      this.in()
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    left: 0,
    top: 0,
    bottom: 0
  },
  mask: {
    justifyContent: 'center',
    backgroundColor: '#000000',
    opacity: 0.6,
    position: 'absolute',
    width: width,
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 500
  },
  tip: {
    position: 'absolute',
    zIndex: 501,
    left: 0,
    bottom: 0,
    width: width,
    height: aHeight,
    backgroundColor: '#FAF9F8'
  },
  tipTitleView: {
    height: px2dp(50),
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cancelText: {
    color: '#999999',
    fontSize: theme.scaleSize(15),
    paddingLeft: px2dp(20)
  },
  okText: {
    color: theme.themeColor,
    fontSize: theme.scaleSize(15),
    paddingRight: px2dp(20)
  },
  tipPickerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  picker: {
    width: width * 0.8
  },
  itempicker: {
    color: '#303030',
    fontSize: theme.scaleSize(22),
    width: width * 0.8,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  around: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  touchView: {
    position: 'absolute',
    top: (theme.screenHeight / 3)
  },
  text: {
    fontSize: theme.scaleSize(14),
    color: theme.displayColor
  }
})
