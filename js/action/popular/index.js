/* eslint-disable no-shadow */
/*
 * @Author: your name
 * @Date: 2019-12-15 09:56:49
 * @LastEditTime: 2019-12-17 22:54:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub_RN/js/action/popular/index.js
 */
import Types from '../types';
import DataStore from '../../expand/DataStore';
import {handleData, _projectModels} from '../actionUtil';
//加载数据
export function onLoadPopularData(
  storeName,
  url,
  pageSize,
  flag,
  FavoriteData,
) {
  return dispatch => {
    dispatch({
      type: Types.POPULAR_REFRESH,
      storeName: storeName,
      info: '正在刷新',
    });
    let dataStore = new DataStore();
    dataStore
      .fetchData(url, flag)
      .then(data => {
        handleData(
          Types.POPULAR_REFRESH_SUCCESS,
          dispatch,
          storeName,
          data,
          pageSize,
          FavoriteData,
        );
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: Types.POPULAR_REFRESH_FAIL,
          storeName,
          isloading: false,
        });
      });
  };
}
//加载更多数据
export function onLoadMorePopularData(
  storeName,
  pageIndex,
  pageSize,
  dataArray = [],
  FavoriteData,
  callBack,
) {
  return dispatch => {
    setTimeout(() => {
      if ((pageIndex - 1) * pageSize >= dataArray.length) {
        dispatch({
          type: Types.POPULAR_LOAD_MORE_FAIL,
          error: 'no more data',
          pageIndex: --pageIndex,
          projectModes: dataArray,
          storeName,
        });
      } else {
        //本次和载入的最大数据
        let max =
          pageSize * pageIndex > dataArray.length
            ? dataArray.length
            : pageIndex * pageSize;
        _projectModels(dataArray.slice(0, max), FavoriteData, data => {
          dispatch({
            type: Types.POPULAR_LOAD_MORE_SUCCESS,
            storeName,
            pageIndex,
            projectModels: data,
          });
        });
      }
    }, 500);
  };
}

/**
 * 刷新收藏状态
 * @param storeName
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param favoriteDao
 * @returns {function(*)}
 */
export function onFlushPopularFavorite(
  storeName,
  pageIndex,
  pageSize,
  dataArray = [],
  FavoriteData,
) {
  return dispatch => {
    //本次和载入的最大数量
    let max =
      pageSize * pageIndex > dataArray.length
        ? dataArray.length
        : pageSize * pageIndex;
    _projectModels(dataArray.slice(0, max), FavoriteData, data => {
      dispatch({
        type: Types.FLUSH_POPULAR_FAVORITE,
        storeName,
        pageIndex,
        projectModels: data,
      });
    });
  };
}
