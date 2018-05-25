import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, Image} from 'react-native'
import px2dp from './../../Util/px2dp'
import theme from './../../Constants/theme'
import { Paragraph } from './../'

const NoData = props =>
  <View style={styles.around}>
    <Image source={require('./../../Assets/noData.png')} />
    <Paragraph style={styles.text}>{props.title}</Paragraph>
  </View>

NoData.propTypes = {
  title: PropTypes.string
}

const styles = StyleSheet.create({
  around: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: px2dp(60)
  },
  text: {
    fontSize: theme.scaleSize(13),
    color: theme.displayColor,
    marginTop: px2dp(25)
  }
})

export default NoData
