import React from 'react'
import PropTypes from 'prop-types'
import {View, Image} from 'react-native'
import createStyle from './../../Service/createStyle'
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

const styles = createStyle({
  around: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60
  },
  text: {
    fontSize: 13,
    color: theme.displayColor,
    marginTop: 25
  }
})

export default NoData
