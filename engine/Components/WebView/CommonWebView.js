/**
 * Created by Joe on 2017/9/26.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, WebView, TouchableHighlight, Image } from 'react-native'
import createStyle from './../../Service/createStyle'

export default class CommonWebView extends React.Component {
  constructor () {
    super(...arguments)
    this._renderError = this._renderError.bind(this)
    this._goBack = this._goBack.bind(this)
    this._onNavigationStateChange = this._onNavigationStateChange.bind(this)
    this._getUrl = this._getUrl.bind(this)
    this.shareData = {}
    this.lastUrl = ''
  }
  static propTypes = {
    navigation: PropTypes.object
  }
  static navigationOptions = ({navigation}) => {
    return ({
      headerTitle: navigation.state.params ? navigation.state.params.headerTitle : '',
      headerTitleStyle: {flex: 1, textAlign: 'center'},
      headerRight: <View />,
      headerLeft: (navigation.state.params && navigation.state.params.headerLeft) ? navigation.state.params.headerLeft : <View style={{flexDirection: 'row'}}>
        <TouchableHighlight underlayColor={'rgba(225, 225, 225, 0.75)'} style={styles.backView}>
          <Image style={styles.backImg} source={require('./../../Assets/back.png')} />
        </TouchableHighlight>
        <TouchableHighlight underlayColor={'rgba(225, 225, 225, 0.75)'} style={styles.xView}>
          <Image style={styles.xImg} source={require('./../../Assets/xTag.png')} />
        </TouchableHighlight>
      </View>
    })
  }
  componentWillUnmount () {
    let {navigation: {state: {params: {destroy}}}} = this.props
    destroy && destroy()
  }
  _goBack () {
    if (this.canGoBack) {
      this.refs.webView.goBack()
      return true
    }
    this.props.navigation.goBack()
    return false
  }
  _onNavigationStateChange (navState) {
    let title = ''
    if (navState.title) {
      title = navState.title
    }
    this.props.navigation.setParams({
      headerTitle: title,
      headerLeft: <View style={{flexDirection: 'row'}}>
        <TouchableHighlight underlayColor={'rgba(225, 225, 225, 0.75)'} style={styles.backView} onPress={this._goBack}>
          <Image style={styles.backImg} source={require('./../../Assets/back.png')} />
        </TouchableHighlight>
        <TouchableHighlight underlayColor={'rgba(225, 225, 225, 0.75)'} style={styles.xView} onPress={e => this.props.navigation.goBack()}>
          <Image style={styles.xImg} source={require('./../../Assets/xTag.png')} />
        </TouchableHighlight>
      </View>
    })
    this.canGoBack = navState.canGoBack
  }
  _renderError (e) {
    console.log('异常信息===>', e)
  }
  _getUrl () {
    let {navigation: {state: {params: {url, body}}}} = this.props
    let nUrl = `${url}`
    if (url.indexOf('?') === -1) {
      nUrl += `?1=1`
    }
    for (let option in body) {
      nUrl += `&${option}=${body[option]}`
    }
    console.log('WebViewUrl:' + nUrl)
    return nUrl
  }
  render () {
    let {navigation: {state: {params: {isOnMessage = true}}}} = this.props
    let prop = {}
    if (isOnMessage) { prop.onMessage = this._onMessage }
    return (
      <SafeAreaView style={styles.round}>
        <WebView
          ref='webView'
          source={{uri: this._getUrl(), method: 'get'}}
          renderError={this._renderError}
          {...prop}
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          scalesPageToFit
          onNavigationStateChange={this._onNavigationStateChange}
        />
      </SafeAreaView>
    )
  }
}

const styles = createStyle({
  round: {
    flex: 1,
    backgroundColor: '#fff'
  },
  backView: {
    flex: 1,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 5
  },
  backImg: {
    width: 20,
    height: 20
  },
  xView: {
    flex: 1,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 5,
    paddingRight: 5
  },
  xImg: {
    width: 20,
    height: 20
  }
})
