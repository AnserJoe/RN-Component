import React from 'react'
import { Text } from 'react-native'
import createStyle from './../../Service/createStyle'
import theme from './../../Constants/theme'

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

const styles = createStyle({
  h: {
    fontSize: 24,
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    fontWeight: theme.mediumFont
  },
  p: {
    fontSize: 18,
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    fontWeight: theme.regularFont
  },
  l: {
    fontSize: 12,
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    fontWeight: theme.lightFont
  }
})

