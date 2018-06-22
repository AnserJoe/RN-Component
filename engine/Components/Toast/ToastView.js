import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  View,
  Easing,
  Dimensions,
  Text,
  Animated
} from 'react-native';
import PropTypes from 'prop-types';
import Toast from "./index";
import theme from "../../Constants/theme";

const {width, height} = Dimensions.get("window");

class ToastView extends Component {
  static propTypes = {
    time: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.moveAnim = new Animated.Value(height / 10);
    this.opacityAnim = new Animated.Value(0);
    this.dismissHandler = null;
    this.state = {
      message: props.message,
      time: props.time
    }
  }

  render() {
    return (
      <View style={styles.container} pointerEvents='none'>
        <Animated.View style={[styles.textContainer, {bottom: this.moveAnim, opacity: this.opacityAnim}]}><Text
          style={styles.defaultText}>{this.state.message}</Text></Animated.View>
      </View>
    )
  }

  shouldComponentUpdate(nextProps) {
    this.setState({
      message: nextProps.message || '',
      time: this.props.time
    })
    clearTimeout(this.dismissHandler)
    this.timingDismiss()
    return true
  }

  componentDidMount() {
    Animated.timing(
      this.moveAnim,
      {
        toValue: height / 5,
        duration: 100,
        easing: Easing.ease
      },
    ).start(this.timingDismiss);
    Animated.timing(
      this.opacityAnim,
      {
        toValue: 1,
        duration: 100,
        easing: Easing.linear
      },
    ).start();
  }

  componentWillUnmount() {
    clearTimeout(this.dismissHandler)
  }


  timingDismiss = () => {
    this.dismissHandler = setTimeout(() => {
      this.dismiss()
    }, this.state.time)
  };

  dismiss = () => {
    Animated.timing(
      this.opacityAnim,
      {
        toValue: 0,
        duration: 100,
        easing: Easing.linear
      },
    ).start(this.onDismiss);
  };

  onDismiss = () => {
    if (this.props.onDismiss) {
      this.props.onDismiss()
    }
  }
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'rgba(0,0,0,.5)',
    borderRadius: 20,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    maxWidth: width - 64,
    alignSelf: "flex-end",
  },
  defaultText: {
    color: "#FFF",
    fontSize: theme.scaleSize(15),
  },
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
  }
});
export default ToastView