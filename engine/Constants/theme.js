import { Dimensions, PixelRatio } from 'react-native'

export const deviceWidth = Dimensions.get('window').width // 设备的宽度
export const deviceHeight = Dimensions.get('window').height   // 设备的高度

const defaultPixel = 2                           // iphone6的像素密度
// px转换成dp
const w2 = 375 / defaultPixel
const h2 = 667 / defaultPixel
const scale = Math.min(deviceHeight / h2, deviceWidth / w2)   // 获取缩放比例

export function scaleSize (size: number) {
  size = Math.round(size * scale)
  return Math.floor(size / defaultPixel)
}

export default {
  screenWidth: deviceWidth,
  screenHeight: deviceHeight,
  onePixel: 1 / PixelRatio.get(),
  themeColor: '#C9AE5A',
  hintColor: '#B44B4B',
  textColor: '#333',
  displayColor: '#999',
  borderColor: '#DCDCDC',
  lightFont: '300',
  regularFont: '400',
  mediumFont: '500',
  fontFamily: 'Helvetica',
  borderWidth: 1,
  scaleSize: scaleSize
}
