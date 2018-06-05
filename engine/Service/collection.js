import { Touchable } from 'react-native'
import theme from './../Constants/theme'

// touch统计
export function hookTouch (callback) {
  let originTouchable = Touchable.Mixin.touchableHandleResponderRelease
  Touchable.Mixin.touchableHandleResponderRelease = function (e) {
    let identify = [];
    (function recordInfo (currentElement) {
      if (currentElement && currentElement.props) {
        let currentProps = currentElement.props
        if (currentProps['do-log']) {
          identify.push(currentProps['do-log'])
        } else {
          let next = currentElement && currentElement.props && currentElement.props.children || null
          if (next) {
            if (Object.prototype.toString.call(next) === '[object Array]') {
              for (let i = 0; i < next.length; i++) {
                recordInfo(next[i])
              }
            } else if (typeof next === 'string') {
              identify.push(next)
            } else {
              recordInfo(next)
            }
          }
        }
      } else {
        console.log('获取失败')
      }
    })(this)
    callback({
      type: 'click',
      extraInfo: {
        x: (e.nativeEvent.pageX * (375 / theme.screenWidth)).toFixed(1) * 1, // x坐标
        y: ((e.nativeEvent.pageY) * (375 / theme.screenWidth)).toFixed(1) * 1, // y坐标
        identify: identify.join('|')
      }
    })
    originTouchable.call(this, e)
  }
}

// 请求url统计
export function hookUrl (callback, white, black) {
  function formatUri (uri) {
    if (typeof uri === 'string') {
      let reg = /^http(s)?:\/\/(.*?)\//
      let formatUri = reg.exec(uri)
      if (formatUri) return formatUri[2]
      else return ''
    } else {
      return ''
    }
  }

  // url白名单
  function limitHost (url) {
    var re = new RegExp(white || '', 'g')
    return re.test(url)
  }

  // url黑名单
  function limitPath (url) {
    var re = new RegExp(black || '', 'g')
    return re.test(url)
  }

  /**
   * hook req && res
   */
  global.fetch = (fetch => (...args) => interceptor(fetch, ...args))(global.fetch)

  function interceptor (fetch, ...args) {
    let startTime = new Date().getTime()
    let createPromise = Promise.resolve(args)
    let recordReq = createPromise.then(args => register.request(...args))
    let toFetch = recordReq.then(args => fetch(...args))
    let promise = toFetch.then(register.response.bind(this, startTime), register.responseError)
    return promise
  }

  const register = {
    request: function (url, config) {
      if (limitHost(formatUri(url)) && !limitPath(url)) {
        // hook request config
        callback({
          type: 'httpRequest',
          method: config.method,
          uri: url,
          body: config.body || ''
        })
      }
      return [url, config]
    },

    response: function (startTime, response) {
      // hook reponse
      callback({
        type: 'httpResponse',
        uri: response.url,
        success: response.ok,
        httpCode: response.status,
        executeTime: new Date().getTime() - startTime
      })
      return response
    },

    responseError: function (error) {
      // hook fetch repsonse error
      return Promise.reject(error)
    }
  }
}
