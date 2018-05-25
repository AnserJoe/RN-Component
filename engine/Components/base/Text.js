import React from 'react'
import { StyleSheet, Text } from 'react-native'
import theme from './../../Constants/theme'
import px2dp from './../../Util/px2dp'

export const Heading = ({style, ...props}) => {
  return <Text style={[styles.h, style]} {...props} />
}

export const Paragraph = ({style, ...props}) => {
  return <Text style={[styles.p, style]} {...props} />
}

export const Label = ({style, ...props}) => {
  return <Text style={[styles.l, style]} {...props} />
}

Heading.propTypes = {
  style: Text.propTypes.style
}

Paragraph.propTypes = {
  style: Text.propTypes.style
}

Label.propTypes = {
  style: Text.propTypes.style
}

const styles = StyleSheet.create({
  h: {
    fontSize: theme.scaleSize(24),
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    fontWeight: theme.mediumFont
  },
  p: {
    fontSize: theme.scaleSize(18),
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    fontWeight: theme.regularFont
  },
  l: {
    fontSize: theme.scaleSize(12),
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    fontWeight: theme.lightFont
  }
})

