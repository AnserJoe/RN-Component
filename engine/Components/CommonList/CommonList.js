/**
 * Created by Joe on 2017/10/11.
 * 简单版本的listView, 没有上拉刷新和下拉加载
 * 除dataSource与原ListView组件属性相同
 * 改dataSource为data
 * 数据格式为 无section：[itme1, item2, item3, ......]
 * 或 有section：
 * {
 *   section1: [item1, item2, ...],
 *   section2: [item1, item2, ...],
 *   .
 *   .
 *   .
 * }
 */

import React from 'react'
import PropTypes from 'prop-types'
import { SectionList, FlatList, ViewPropTypes, Text, View, StyleSheet, PanResponder } from 'react-native'

export default class CommonList extends React.Component {
  constructor () {
    super(...arguments)
    this.state = {
      h: 0
    }
  }
  render() {
    let { hasSection = false, source } = this.props
    if (hasSection) {
      return (
        <SectionList
          {...this.props}
          sections={source}
          keyExtractor={(item,index)=>("index"+index+item)}
        />
      )
    } else {
      return (
        <FlatList
          {...this.props}
          data={source}
          keyExtractor={(item,index)=>("index"+index+item)}
        />
      )
    }
  }
}

CommonList.propTypes = {
  hasSection: PropTypes.bool
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
