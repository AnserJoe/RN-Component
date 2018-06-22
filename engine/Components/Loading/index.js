import React, {
  Component,
} from 'react';
import Root from './../base/Root'
import LoadingView from './LoadingView'

/**
 * Toast.show(msg, time, missCallback)
 */
class Loading {
  static editable = true
  static show() {
    if (!this.editable) return
    this.editable = false
    Root.setView(<LoadingView />)
  }
  static dismiss() {
    this.editable = true
    Root.dismiss()
  }
}

export default Loading