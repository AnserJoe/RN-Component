/**
 * by Joe
 */
import React from 'react'
import { NetInfo, Platform, View, Image } from 'react-native'
import createStyle from './../../Service/createStyle'
import { Paragraph, Touch } from './../'
import theme from './../../Constants/theme'

/**
 * 网络检测高阶组件
 * @param  {React.Component}  ComposedComponent 需要包装的原始组件
 * @return {React.Component} 包装之后的组件
 */
export default function WithConnection () {
  return (ComposedComponent, navigationOptions = {}) => class extends React.Component {
    constructor () {
      super(...arguments)
      this.state = { isConnected: true }
      this._handleIsConnected = this._handleIsConnected.bind(this)
    }
    static navigationOptions = navigationOptions
    componentDidMount () {
      NetInfo.isConnected.fetch().done((isConnected) => {
        if (Platform.OS === 'android') {
          this._handleIsConnected(isConnected)
        }
        NetInfo.isConnected.removeEventListener('connectionChange')
        NetInfo.isConnected.addEventListener('connectionChange', this._handleIsConnected)
      })
    }
    componentWillUnmount () {
      NetInfo.isConnected.removeEventListener('connectionChange')
    }
    _handleIsConnected (isConnected) {
      this.setState({ isConnected })
    }
    render () {
      if (this.state.isConnected) {
        return (
          <ComposedComponent {...this.props} isConnected={this.state.isConnected} />
        )
      } else {
        return NetError(this._handleIsConnected)
      }
    }
  }
}

const NetError = callback => {
  return (
    <View style={styles.contentView}>
      <View>
        <Image style={styles.logo} source={require('./../../Assets/netWorkOut.png')} />
      </View>
      <View>
        <Paragraph style={styles.hint} >网络出问题了，刷新一下试试吧~</Paragraph>
      </View>
      <View>
        <Touch onPress={() => {
          NetInfo.isConnected.fetch().done((isConnected) => {
            callback(isConnected)
          })
        }}>
          <View style={styles.btn}>
            <Paragraph style={styles.text} >刷</Paragraph>
            <Paragraph style={[styles.text, {marginLeft: 10}]} >新</Paragraph>
          </View>
        </Touch>
      </View>
    </View>
  )
}

const styles = createStyle({
  contentView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  logo: {
    width: 60,
    height: 50,
    marginTop: 106
  },
  hint: {
    fontSize: 13,
    color: theme.displayColor,
    marginTop: 31,
    marginBottom: 70
  },
  btn: {
    width: 110,
    height: 40,
    borderRadius: 4,
    borderColor: theme.textColor,
    borderWidth: theme.borderWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    color: theme.textColor
  },
  container: {
    position: 'absolute',
    width: theme.screenWidth,
    left: 0,
    top: 0,
    bottom: 0
  },
  mask: {
    justifyContent: 'center',
    backgroundColor: '#000000',
    opacity: 0.6,
    position: 'absolute',
    width: theme.screenWidth,
    left: 0,
    top: 0,
    bottom: 0
  },
  tip: {
    position: 'absolute',
    left: (theme.screenWidth - 290) / 2,
    top: 160,
    width: theme.screenWidth
  }
})
