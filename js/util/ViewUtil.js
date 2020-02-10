import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ListItem} from 'react-native-elements';

export default class ViewUtil {
  /**
   * 获取设置页的Item
   * @param callBack 单击item的回调
   * @param text 显示的文本
   * @param color 图标着色
   * @param Icons react-native-vector-icons组件
   * @param icon 左侧图标
   * @param expandableIco 右侧图标
   * @return {XML}
   */
  static getSettingItem(callBack, text, color, Icons, icon, expandableIco) {
    return (
      <ListItem
        containerStyle={{height: 60}}
        title={text}
        titleStyle={{fontSize: 14}}
        onPress={callBack}
        leftIcon={
          Icons && icon ? (
            <Icons
              name={icon}
              size={16}
              style={{
                color: color,
              }}
            />
          ) : (
            <Ionicons
              name="md-square"
              size={10}
              style={{
                color: 'white',
              }}
            />
          )
        }
        rightIcon={
          <Ionicons
            name={expandableIco ? expandableIco : 'ios-arrow-forward'}
            size={16}
            style={{
              color: color,
            }}
          />
        }
        bottomDivider
      />
    );
  }

  /**
   * 获取设置页的Item
   * @param callBack 单击item的回调
   * @param menu @MORE_MENU
   * @param color 图标着色
   * @param expandableIco 右侧图标
   * @return {XML}
   */
  static getMenuItem(callBack, menu, color, expandableIco) {
    return ViewUtil.getSettingItem(
      callBack,
      menu.name,
      color,
      menu.Icons,
      menu.icon,
      expandableIco,
    );
  }

  /**
   * 获取左侧返回按钮
   * @param callBack
   * @returns {XML}
   */
  static getLeftBackButton(callBack) {
    return (
      <TouchableOpacity
        style={{padding: 8, paddingLeft: 12}}
        onPress={callBack}>
        <Ionicons name={'ios-arrow-back'} size={26} style={{color: 'white'}} />
      </TouchableOpacity>
    );
  }
  /**
   * 获取右侧文字按钮
   * @param title
   * @param callBack
   * @returns {XML}
   */
  static getRightButton(title, callBack) {
    return (
      <TouchableOpacity style={{alignItems: 'center'}} onPress={callBack}>
        <Text style={{fontSize: 16, color: '#fff', marginRight: 10}}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
  /**
   * 获取分享按钮
   * @param callBack
   * @returns {XML}
   */
  static getShareButton(callBack) {
    return (
      <TouchableOpacity underlayColor={'transparent'} onPress={callBack}>
        <Ionicons
          name={'md-share'}
          size={20}
          style={{opacity: 0.9, marginRight: 10, color: '#FFF'}}
        />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  setting_item_container: {
    backgroundColor: '#FFF',
    padding: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
