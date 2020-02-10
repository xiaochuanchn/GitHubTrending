/*
 * @Author: your name
 * @Date: 2019-12-14 09:14:23
 * @LastEditTime: 2019-12-14 20:20:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub_RN/js/reducer/theme/index.js
 */
import Types from '../../action/types';
import ThemeFactory, {ThemeFlags} from '../../res/Theme';

const defaultState = {
  // theme: '#2196f3',
  // theme: '#ccc',
  theme: ThemeFactory.createTheme(ThemeFlags.Default),
  onShowCustomThemeView: false,
};
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme,
      };
    case Types.SHOW_THEME_VIEW:
      return {
        ...state,
        customThemeViewVisible: action.customThemeViewVisible,
      };
    default:
      return state;
  }
}
