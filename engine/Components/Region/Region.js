/**
 *  create by Joe at 16/09/23
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet,
  Image, Animated, Keyboard } from 'react-native'
import Mask from './../base/Mask'
import address from './../../Constants/address'
import theme from './../../Constants/theme'
import px2dp from './../../Util/px2dp'
import {specialCity} from './../../Constants/static'

let x = 0
/**
 * 地区组件
 * props
 * level：地区等级1：（2级），2：（3级）
 * cityCallback：选中回调
 * this.refs.xxx.show 显示组件
 * this.refs.xxx.hide 隐藏组件
 */
export default class Region extends Component {
  constructor () {
    super(...arguments)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.setData = this.setData.bind(this)
    this.checkedData = this.checkedData.bind(this)
    this.nextClick = this.nextClick.bind(this)
    this.clickItem = this.clickItem.bind(this)
    this.getNextCityData = this.getNextCityData.bind(this)
    this.subInfo = this.subInfo.bind(this)
    this.previseClick = this.previseClick.bind(this)
    this.show = this.show.bind(this)
    this.init = this.init.bind(this)
    this.allInfo = {}
    this.nowPage = 0
    this.sync = true
    this.state = {
      classA: [],
      classB: [],
      classC: [],
      title0: '请选择',
      title1: '',
      title2: '',
      style0: 2,
      style1: 0,
      style2: 0,
      offset: new Animated.Value(0),
      opacity: new Animated.Value(0),
      choice: ''
    }
  }
  static propTypes = {
    cityCallback: PropTypes.func,
    level: PropTypes.number
  }
  componentDitMount () {
    this.setState({
      classA: this.setData(address.province)
    })
  }
  componentWillUnmount () {
    x = 0
  }
  init () {
    this.previseClick(0)
    this.setState({
      classA: this.setData(address.province),
      classB: [],
      classC: [],
      title0: '请选择',
      title1: '',
      title2: '',
      style0: 2,
      style1: 0,
      style2: 0,
      offset: new Animated.Value(0),
      opacity: new Animated.Value(0),
      choice: ''
    })
    x = 0
  };
  setData (list) {
    for (var z of list) {
      z.checked = false
    }
    return list
  }
  checkedData (item, page) {
    let key
    if (page === 0) {
      key = 'classA'
    }
    if (page === 1) {
      key = 'classB'
    }
    if (page === 2) {
      key = 'classC'
    }
    let list = this.state[key]
    for (var z of list) {
      if (z.code === item.code) {
        z.checked = true
      } else {
        z.checked = false
      }
    }
    let obj = {}
    obj[key] = list
    this.setState(obj)
  }
  clickItem (item, page) {
    if (this.sync) {
      this.sync = false
      this.checkedData(item, page)
      let key = 'title' + page
      let obj = {}
      obj[key] = item.name
      this.setState({...obj})
      let styleKey = 'style' + (page + 1)
      let styleObj = {}
      if (page !== 2) {
        styleObj.style0 = 0
        styleObj.style1 = 0
        styleObj.style2 = 0
        styleObj[styleKey] = 2
        this.setState({...styleObj})
      }
      this.getNextCityData(item, page)
      setTimeout(() => {
        this.sync = true
      }, 350)
    }
  }
  getNextCityData (item, page) {
    let {level = 2} = this.props
    if (page === level) {
      this.allInfo[level === 0 ? 'province' : (level === 1 ? 'city' : 'district')] = item
      this.subInfo()
      return
    }
    if (page === 0) {
      if (address.city[item.code].length > 0) {
        this.allInfo.province = item
        let data = []
        if ((specialCity.indexOf(item.code) > -1) && level === 1) {
          for (var z of address.city[item.code]) {
            data = data.concat(address.district[z.code])
          }
        } else {
          data = address.city[item.code]
        }
        this.setState({
          classB: this.setData(data),
          title1: '请选择',
          title2: ''
        }, this.nextClick(item, page))
      }
    }
    if (page === 1) {
      if (address.district[item.code].length > 0) {
        this.allInfo.city = item
        this.setState({
          classC: this.setData(address.district[item.code]),
          title2: '请选择'
        }, this.nextClick(item, page))
      }
    }
  }
  subInfo () {
    this.hide()
    this.props.cityCallback(this.allInfo)
  }
  previseClick (page) {
    let styleKey = 'style' + page
    let styleObj = {
      style0: 0,
      style1: 0,
      style2: 0
    }
    styleObj[styleKey] = 2
    this.setState({...styleObj})
    x -= theme.screenWidth * (this.nowPage - page)
    this.refs._scrollView.scrollTo({x: x, animated: true})
    this.nowPage = page
  }
  nextClick () {
    if (x < theme.screenWidth * 2) {
      x += theme.screenWidth
    }
    this.nowPage += 1
    if (this.nowPage === 3) {
      this.nowPage = 0
    }
    this.refs._scrollView.scrollTo({x: x, animated: true})
  }
  show () {
    Keyboard.dismiss()
    this.refs.background.show()
  }
  hide () {
    this.refs.background.hide()
    this.init()
  };
  render () {
    let {
      title0, title1, title2,
      style0, style1, style2
    } = this.state
    return (
      <Mask ref='background'>
        <View style={styles.modal}>
          <View
            onStartShouldSetResponder={() => true}
            style={{flex: 1}}
          >
            <View style={styles.itemView}>
              <View style={styles.titleView}>
                <View style={styles.title1View}>
                  <Text style={styles.title1}>所在省市区</Text>
                </View>
                <TouchableOpacity onPress={this.hide}>
                  <Image style={styles.X} source={require('./../../Assets/xTag.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.nameView}>
                <TouchableOpacity onPress={e => { this.previseClick(0) }} style={[styles.nameTouch, {borderBottomWidth: style0}]}>
                  <Text style={styles.name}>{title0}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={e => { this.previseClick(1) }} style={[styles.nameTouch, {borderBottomWidth: style1}]}>
                  <Text style={styles.name}>{title1}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={e => { this.previseClick(2) }} style={[styles.nameTouch, {borderBottomWidth: style2}]}>
                  <Text style={styles.name}>{title2}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              ref={'_scrollView'}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.listView}
              scrollEnabled={false}
            >
              <ViewControl data={this.state.classA} page={0} itemTouch={this.clickItem} />
              <ViewControl data={this.state.classB} page={1} itemTouch={this.clickItem} />
              <ViewControl data={this.state.classC} page={2} itemTouch={this.clickItem} />
            </ScrollView>
          </View>
        </View>
      </Mask>
    )
  }
}

/**
 * 功能region 表头
 * params:
 *       data: 当页数据， Array
 *       page: 第几页， Number
 *       itemTouch:   点击第几行, Function
 */
class ViewControl extends Component {
  static propTypes = {
    itemTouch: PropTypes.func,
    data: PropTypes.array,
    page: PropTypes.number
  }
  render () {
    let {data, page, itemTouch} = this.props
    return (
      <View style={styles.listContainer}>
        <ScrollView>
          <ItemsComponent data={data} page={page} itemTouch={itemTouch} />
        </ScrollView>
      </View>
    )
  }
}

/**
 * 功能： 列表
 * params:
 *        data: 每个列表数据， Array
 *        page: 第几个列表， Number
 *        itemTouch: 点击第几行, Function
 */
class ItemsComponent extends Component {
  static propTypes = {
    itemTouch: PropTypes.func,
    data: PropTypes.array,
    page: PropTypes.number
  }
  render () {
    let {itemTouch, page, data} = this.props
    return (
      <View>
        {(() => {
          if (Array.isArray(data) && data.length > 0) {
            return data.map((item, idx) => {
              return (
                <TouchableOpacity activeOpacity={0.5} key={idx}
                  style={styles.itemsTouch}
                  onPress={e => itemTouch(item, page)}
                >
                  <Text style={[styles.itemsText, {color: item.checked ? theme.hintColor : theme.textColor}]}>{item.name}</Text>
                  {
                    item.checked ? <Image source={require('./../../Assets/right.png')} /> : null
                  }
                </TouchableOpacity>
              )
            })
          }
          return null
        })()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalView: {
    height: px2dp(370),
    justifyContent: 'flex-end'
  },
  modal: {
    flex: 1,
    position: 'absolute',
    height: px2dp(370),
    width: theme.screenWidth,
    backgroundColor: '#fff',
    left: 0,
    bottom: 0
  },
  itemView: {
    alignItems: 'center'
  },
  titleView: {
    flexDirection: 'row',
    height: px2dp(52)
  },
  title1View: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title1: {
    fontSize: theme.scaleSize(13),
    color: '#999',
    marginTop: px2dp(10)
  },
  X: {
    width: px2dp(12),
    height: px2dp(12),
    margin: px2dp(20)
  },
  nameView: {
    width: theme.screenWidth,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: theme.borderWidth,
    borderColor: theme.borderColor
  },
  nameTouch: {
    marginLeft: px2dp(20),
    paddingBottom: px2dp(2),
    borderColor: theme.hintColor
  },
  name: {
    fontSize: theme.scaleSize(15),
    color: theme.textColor
  },
  listView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: px2dp(26)
  },
  listContainer: {
    width: theme.screenWidth,
    flex: 1,
    flexDirection: 'column'
  },
  itemsTouch: {
    height: px2dp(35),
    flexDirection: 'row',
    paddingLeft: px2dp(20),
    alignItems: 'center'
  },
  itemsText: {
    fontSize: theme.scaleSize(13),
    marginRight: px2dp(9)
  },
  container: {
    position: 'absolute',
    width: theme.screenWidth,
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 99
  },
  mask: {
    justifyContent: 'center',
    backgroundColor: '#000000',
    opacity: 0.6,
    position: 'absolute',
    width: theme.screenWidth,
    left: 0,
    top: 0,
    bottom: 0
  },
  tip: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: theme.screenWidth,
    backgroundColor: '#FFFFFF'
  }
})
