/*
 * @Author: your name
 * @Date: 2019-12-14 15:19:15
 * @LastEditTime: 2019-12-14 15:21:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub_RN/js/action/theme/index.js
 */
import Types from '../types';
import ThemeDao from '../../expand/ThemeData';

export function onThemeChange(theme) {
  return {type: Types.THEME_CHANGE, theme: theme};
}
/**
 * 初始化主题
 * @returns {Function}
 */
export function onThemeInit() {
  return dispatch => {
    new ThemeDao().getTheme().then(data => {
      dispatch(onThemeChange(data));
    });
  };
}
/**
 * 显示自定义主题浮层
 * @param show
 * @returns {{type: *, customThemeViewVisible: *}}
 */
export function onShowCustomThemeView(show) {
  return {type: Types.SHOW_THEME_VIEW, customThemeViewVisible: show};
}
