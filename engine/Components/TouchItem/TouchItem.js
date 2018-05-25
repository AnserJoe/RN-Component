/**
 * Created by Joe on 2017/10/12.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, TouchableWithoutFeedback, Text } from 'react-native'
import { Heading, Label, Paragraph, Touch } from './../'
import px2dp from './../../Util/px2dp'

import theme from './../../Constants/theme'

const TouchItem = (
  {
    title = '', hint = '', status = '',
    titleStyle = {}, hintStyle = {}, statusStyle = {},
    titleTag = null, hintTag = null, statusTag = null,
    editable = true, hasTopLine = true, hasBottomLine = true,
    onPress = e => null, style = {}
  }
) => {
  return (
    <Touch editable={editable} onPress={onPress} style={{justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={[
          styles.touch,
          hasTopLine && styles.topBorder,
          hasBottomLine && styles.bottomBorder,
          style
        ]}
      >
        <View style={styles.leftView}>
          <View style={styles.titleView}>
            {
              titleTag && titleTag
            }
            {
              Boolean(title) &&
              <Heading numberOfLines={1} style={[styles.title, titleStyle]}>
                {title}
              </Heading>
            }
          </View>
          <View style={styles.hintView}>
            {
              hintTag &&
              <View>
                {hintTag}
              </View>
            }
            {
              Boolean(hint) &&
              <Label numberOfLines={1} style={[styles.hint, hintStyle]}>
                {hint}
              </Label>
            }
          </View>
        </View>
        <View style={styles.rightView}>
          {
            statusTag && statusTag
          }
          {
            Boolean(status) &&
            <Paragraph numberOfLines={1} style={[styles.status, editable ? null : { color: theme.displayColor }, statusStyle]}>
              {status}
            </Paragraph>
          }
          {
            editable &&
            <Image style={styles.logo} source={require('./../../Assets/touchArrow.png')} />
          }
        </View>
      </View>
    </Touch>
  )
}

TouchItem.propTypes = {
  title: PropTypes.string,
  titleTag: PropTypes.object,
  hint: PropTypes.string,
  hintTag: PropTypes.object,
  status: PropTypes.string,
  statusTag: PropTypes.object,
  editable: PropTypes.bool,
  hasTopLine: PropTypes.bool,
  hasBottomLine: PropTypes.bool,
  onPress: PropTypes.func,
  style: Text.propTypes.style,
  titleStyle: Text.propTypes.style,
  hintStyle: Text.propTypes.style,
  statusStyle: Text.propTypes.style,
  height: PropTypes.number
}

const styles = StyleSheet.create({
  topBorder: {
    borderTopWidth: theme.borderWidth,
    borderColor: theme.borderColor
  },
  bottomBorder: {
    borderBottomWidth: theme.borderWidth,
    borderColor: theme.borderColor
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: px2dp(80)
  },
  leftView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  hintView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    fontSize: theme.scaleSize(20),
    color: theme.textColor
  },
  hint: {
    flex: 1,
    color: theme.displayColor
  },
  rightView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  status: {
    fontSize: theme.scaleSize(15),
    marginRight: px2dp(13)
  },
  logo: {
    width: px2dp(10),
    height: px2dp(18)
  }
})

export default TouchItem
