import React, {
  Component,
} from 'react';
import RootView from './RootView'
import ToastView from './ToastView'

/**
 * Toast.show(msg, time, missCallback)
 */
class Toast {
  static editable = true
  static show(msg = '', time = 2000, missCallback = () => {}) {
    if (!this.editable) return
    this.editable = false
    RootView.setView(<ToastView
      message={msg}
      time={time}
      onDismiss={() => {
        this.editable = true
        missCallback ()
        RootView.setView()
      }}/>)
  }
}

export default Toast