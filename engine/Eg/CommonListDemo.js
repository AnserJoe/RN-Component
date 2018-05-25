/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  RefreshControl,
  View
} from 'react-native'
import { CommonList, Paragraph } from './../Components'

export default class CommonListDemo extends Component {
  constructor (props) {
    super(...props)
    this._renderItem = this._renderItem.bind(this)
    this._renderSectionHeader = this._renderSectionHeader.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
    this._onEndReached = this._onEndReached.bind(this)
    this._onRefreshSection = this._onRefreshSection.bind(this)
    this._onEndReachedSection = this._onEndReachedSection.bind(this)
    this.state = {
      simpleData: ['aaaaaaaaaaaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff'],
      refreshing: false,
      simpleDataSection: [{key:'1', data: ['aaaaaaaaaaaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff']}],
      refreshingSection: false
    }
  }
  _renderItem ({item}) {
    return (
      <View>
        <Paragraph style={{textAlign: 'center', width: 200, height: 80, borderWidth: 1, borderColor:'#7146bd', color:'#000'}}>{item}</Paragraph>
      </View>
    )
  }
  _renderSectionHeader ({section}) {
    return (
      <View>
        <Paragraph style={{textAlign: 'center', backgroundColor:'#21c6cd', color:'#fff'}}>
          {section.key}
          </Paragraph>
      </View>
    )
  }
  _onRefresh () {
    this.setState({refreshing: true})
    setTimeout(() => {
      this.setState(
        {
          simpleData: ['aaaaaaaaaaaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff'],
          refreshing: false
        }
      )
    }, 500)
  }
  _onEndReached () {
    console.log('_onEndReached')
    let {refreshing, simpleData} = this.state
    // 防止多次重复加载
    if (refreshing) {
      return
    }
    setTimeout(() => {
      this.setState(
        {
          simpleData: simpleData.concat(['aaaaaaaaaaaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff'])
        }
      )
    }, 500)
  }
  _onRefreshSection () {
    this.setState({refreshingSection: true})
    setTimeout(() => {
      this.setState(
        {
          simpleDataSection: [{key:'1', data: ['aaaaaaaaaaaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff']}],
          refreshingSection: false
        }
      )
    }, 500)
  }
  _onEndReachedSection () {
    let {refreshingSection, simpleDataSection} = this.state
    // 防止多次重复加载
    if (refreshingSection) {
      return
    }
    let key = simpleDataSection.length > 0 ? Number(simpleDataSection[simpleDataSection.length - 1].key) + 1 : 1
    setTimeout(() => {
      this.setState(
        {
          simpleDataSection: simpleDataSection.concat(
            [{key:String(key), data: ['aaaaaaaaaaaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff']}]
          )
        }
      )
    }, 500)
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: 200}}>
          <Paragraph style={{backgroundColor: 'pink'}}>基本列表</Paragraph>
          <CommonList
            source={['111', '222', '333', '444', '555', '666']}
            renderItem={this._renderItem}
          />
        </View>
        <View style={{flex: 1, width: 200}}>
          <Paragraph style={{backgroundColor: 'pink'}}>section列表</Paragraph>
          <CommonList
            hasSection
            source={
              [
                {
                  key: 'section111',
                  data: ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff']
                },
                {
                  key: 'section222',
                  data: ['111', '222', '333', '444', '555', '666']
                }
              ]
            }
            renderItem={this._renderItem}
            renderSectionHeader={this._renderSectionHeader}
          />
        </View>
        <View style={{flex: 1, width: 200}}>
          <Paragraph style={{backgroundColor: 'pink'}}>基础刷新加载列表</Paragraph>
          <CommonList
            source={this.state.simpleData}
            onEndReachedThreshold={0.1}
            onEndReached={this._onEndReached}
            renderItem={this._renderItem}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshingSection}
                onRefresh={this._onRefresh}
                tintColor='gray'
                title='正在刷新...'
              />
            }
          />
        </View>
        <View style={{flex: 1, width: 200}}>
          <Paragraph style={{backgroundColor: 'pink'}}>section刷新加载列表</Paragraph>
          <CommonList
            hasSection
            source={this.state.simpleDataSection}
            onEndReachedThreshold={0.1}
            onEndReached={this._onEndReachedSection}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshingSection}
                onRefresh={this._onRefreshSection}
                tintColor='gray'
                title='正在刷新...'
              />
            }
            renderItem={this._renderItem}
            renderSectionHeader={this._renderSectionHeader}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})
