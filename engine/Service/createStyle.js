/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { StyleSheet, Dimensions, PixelRatio } from 'react-native'

const scaleStyle = [
  'top',
  'bottom',
  'left',
  'right',
  'width',
  'maxWidth',
  'minWidth',
  'height',
  'maxHeight',
  'minHeight',
  'lineHeight',
  'borderWidth',
  'borderTopWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginHorizontal',
  'marginVertical',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingHorizontal',
  'paddingVertical',
  'letterSpacing',
  'paddingVertical',
  'paddingVertical'
]

export function scale (designWidth: number = 375) {
  return Dimensions.get('window').width / designWidth
}

export function scaleSize (size, designWidth: number = 375) {
  let sca = scale(designWidth)
  size = Math.round(size * sca)
  return Math.floor(size / PixelRatio.get())
}

export default function createStyle (style: Object, designWidth: number = 375) {
  let sca = scale(designWidth)
  Object.keys(style).forEach(k => {
    if (k.lastIndexOf('__') !== k.length - 2) {
      let item = style[k]
      Object.keys(item).forEach(key => {
        if (key === 'transform') {
          item[key].forEach((v, i) => {
            let kk = Object.keys(v)[0]
            if (['translateX', 'translateY'].indexOf(kk) > -1) item[key][i][kk] *= sca
            if (kk === 'translate') {
              v[kk].forEach((vv, ii) => {
                item[key][i][kk][ii] *= sca
              })
            }
          })
        } else {
          if (key === 'fontSize') item[key] = scaleSize(item[key], designWidth)
          else if (scaleStyle.indexOf(key) > -1) item[key] *= sca
        }
      })
    }
  })
  return StyleSheet.create(style)
}
