/*
 * @Author: your name
 * @Date: 2019-12-14 09:00:55
 * @LastEditTime: 2019-12-14 09:36:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub_RN/js/store/index.js
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';
const middlewares = [thunk];
export default createStore(reducers, applyMiddleware(...middlewares));
