/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react'
// import { ScrollView, Text, TouchableOpacity } from 'react-native'
// import { hookTouch } from './Service/collection'
// import CommonListDemo from './Eg/CommonListDemo'
// import LoadingDemo from './Eg/LoadingDemo'
// import ToastDemo from './Eg/ToastDemo'
// import RegionDemo from './Eg/RegionDemo'
// import TouchDemo from './Eg/TouchDemo'
// import AlertModelDemo from './Eg/AlertModelDemo'
// import LabelButtonDemo from './Eg/LabelButtonDemo'
// import TouchItemDemo from './Eg/TouchItemDemo'
// import EnhancedDemo from './Eg/EnhancedDemo'
// import NoDataDemo from './Eg/NoDataDemo'
// import LabelInputDemo from './Eg/LabelInputDemo'
// import PickerDemo from './Eg/PickerDemo'
// import WarpLoadingDemo from './Eg/WarpLoadingDemo'
// export default class Index extends Component {
//   render() {
//     return (
//       <ToastDemo />
//     )
//   }
// }
import {
  CommonList,
  Region,
  Toast,
  Loading,
  AlertModel,
  NoData,
  RNPicker,
  WarpLoading,
  LabelInput,
  LabelButton,
  TouchItem,
  Touch,
  Heading,
  Paragraph,
  Label,
  Mask,
  CommonWebView,
  EnhancedBackHandler,
  WithConnection
} from './Components'
import px2dp from './Util/px2dp'
import { hookTouch, hookUrl } from './Service/collection'

export {
  CommonList,
  Region,
  Toast,
  Loading,
  AlertModel,
  NoData,
  RNPicker,
  WarpLoading,
  LabelInput,
  LabelButton,
  TouchItem,
  Touch,
  Heading,
  Paragraph,
  Label,
  Mask,
  px2dp,
  hookTouch,
  hookUrl,
  CommonWebView,
  EnhancedBackHandler,
  WithConnection
}
