/*
 * @Author: your name
 * @Date: 2019-12-14 09:03:11
 * @LastEditTime: 2019-12-19 15:01:13
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /GitHub_RN/js/reducer/index.js
 */
/*
 * @Author: your name
 * @Date: 2019-12-14 09:03:11
 * @LastEditTime: 2019-12-15 10:31:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub_RN/js/reducer/index.js
 */
import {combineReducers} from 'redux';
import theme from './theme';
import popular from './popular';
import trending from './trending';
import favorite from './favorite';
import language from './language';
import search from './search';
const reducers = combineReducers({
  theme,
  popular,
  trending,
  favorite,
  language,
  search,
});
export default reducers;
