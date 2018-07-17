import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import theme from './../../Constants/theme'
import createStyle from './../../Service/createStyle'
import { Paragraph, Touch } from './../'
import Mask from './../base/Mask'

/**
 * 弹框
 height: 弹框高度
 title: 标题
 content: 内容
 btnInfo: PropTypes.object, {ok: '确定', cancel: '取消'}
 okCallback: PropTypes.func, 点击确定回调
 cancelCallback: PropTypes.func 点击取消回调
 */
export default class AlertModel extends Component {
  constructor () {
    super(...arguments)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.okCallback = this.okCallback.bind(this)
    this.cancelCallback = this.cancelCallback.bind(this)
  }
  static propTypes = {
    height: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    btnInfo: PropTypes.object,
    okCallback: PropTypes.func,
    cancelCallback: PropTypes.func
  }
  show () {
    this.refs.background.show()
  }
  hide () {
    this.refs.background.hide()
  }
  okCallback () {
    let { okCallback = () => null } = this.props
    okCallback()
    this.hide()
  }
  cancelCallback () {
    let { cancelCallback = () => null } = this.props
    cancelCallback()
    this.hide()
  }
  render () {
    let { title = '', content = '', btnInfo = {ok: '确定', cancel: '取消'}, height = 150 } = this.props
    let titleIsNull = !Boolean(title)
    let contentIsNull = !Boolean(content)
    let okIsNull = !Boolean(btnInfo.ok)
    let cancelIsNull = !Boolean(btnInfo.cancel)
    let isSimple = titleIsNull || contentIsNull
    return (
      <Mask
        ref='background'
        touchHide={false}
      >
        <View style={styles.alertView}>
          <View style={[styles.allView, {height: height}, isSimple ? {justifyContent: 'center'} : null]}>
            {
              titleIsNull ? null : <View style={styles.titleView}>
                <Paragraph
                  numberOfLines={2}
                  style={[styles.title, !isSimple ? {marginTop: 0} : null]}
                >
                  {title}
                </Paragraph>
              </View>
            }
            {
              contentIsNull ? null : <View style={styles.innerView}>
                <Paragraph
                  numberOfLines={4}
                  style={[styles.inner, !isSimple ? {marginTop: 13} : null]}
                >
                  {content}
                </Paragraph>
              </View>
            }
          </View>
          <View style={styles.btnView}>
            {
              cancelIsNull ? null : <Touch
                onPress={this.cancelCallback}
                style={styles.btnView1}
              >
                <View>
                  <Paragraph style={styles.btnText2}>{btnInfo.cancel}</Paragraph>
                </View>
              </Touch>
            }
            {
              okIsNull ? null : <Touch
                onPress={this.okCallback}
                style={[
                  styles.btnView1,
                  (!cancelIsNull && !okIsNull) ? {borderLeftWidth: theme.borderWidth, borderColor: theme.borderColor} : null
                ]}
              >
                <View>
                  <Paragraph style={styles.btnText1}>{btnInfo.ok}</Paragraph>
                </View>
              </Touch>
            }
          </View>
        </View>
      </Mask>
    )
  }
}

const styles = createStyle({
  alertView: {
    position: 'absolute',
    width: 290,
    flex: 1,
    borderRadius: 6,
    backgroundColor: '#fff',
    left: (theme.screenWidth - 290) / 2,
    bottom: 277
  },
  allView: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomWidth: theme.borderWidth,
    borderColor: '#E6E6E6',
    flexDirection: 'column',
    alignItems: 'center'
  },
  titleView: {
    width: 230,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    color: theme.textColor,
    fontWeight: theme.lightFont,
    textAlign: 'center'
  },
  innerView: {
    width: 247,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inner: {
    fontSize: 15,
    color: theme.displayColor,
    fontWeight: theme.lightFont,
    textAlign: 'center'
  },
  btnView: {
    flexDirection: 'row'
  },
  btnView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    height: 50
  },
  btnText1: {
    fontSize: 18,
    color: theme.themeColor
  },
  btnText2: {
    fontSize: 18,
    color: theme.textColor
  }
})
