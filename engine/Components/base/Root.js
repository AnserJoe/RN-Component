import React, {Component} from "react";
import {StyleSheet, AppRegistry, View, Text} from 'react-native';

var self = null;

class Root extends Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      view: null,
    }
  }

  render() {
    return (<View style={styles.rootView} pointerEvents="box-none">
      {this.state.view}
    </View>)
  }

  static setView = (view) => {
    self.setState({view: view})
  };

  static dismiss = () => {
    self.setState({view: null})
  };
}


const originRegister = AppRegistry.registerComponent;

AppRegistry.registerComponent = (appKey, component) => {

  return originRegister(appKey, function () {
    const OriginAppComponent = component();
    return class extends Component {
      render() {
        return (
          <View style={styles.container}>
            <OriginAppComponent/>
            <Root/>
          </View>
        );
      };
    };
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  rootView: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
  }
});
export default Root