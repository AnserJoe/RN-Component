import { Dimensions, PixelRatio } from 'react-native'

export const { width, height } = Dimensions.get('window') // 设备的宽高

let theme = {
  screenWidth: width,
  screenHeight: height,
  onePixel: 1 / PixelRatio.get(),
  borderWidth: 1,
  themeColor: '#DA3762',
  hintColor: '#B44B4B',
  textColor: '#333',
  textLightColor: '#666',
  displayColor: '#999',
  borderColor: '#DCDCDC',
  lightFont: '300',
  regularFont: '400',
  mediumFont: '500',
  fontFamily: 'Helvetica'
}

export function setTheme (style) {
  Object.assign(theme, style)
}

export default theme
