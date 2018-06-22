import React, {
  Component,
} from 'react';
import Root from './../base/Root'
import ToastView from './ToastView'

/**
 * Toast.show(msg, time, missCallback)
 */
class Toast {
  static editable = true
  static show(msg = '', time = 2000, missCallback = () => {}) {
    if (!this.editable) return
    this.editable = false
    Root.setView(<ToastView
      message={msg}
      time={time}
      onDismiss={() => {
        this.editable = true
        missCallback ()
        Root.dismiss()
      }}/>)
  }
}

export default Toast