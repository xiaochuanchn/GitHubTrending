/* eslint-disable no-shadow */
/*
 * @Author: your name
 * @Date: 2019-12-15 09:56:49
 * @LastEditTime: 2019-12-19 16:11:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub_RN/js/action/popular/index.js
 */
import Types from '../types';
import DataStore from '../../expand/DataStore';
import {handleData, _projectModels} from '../actionUtil';

//加载数据
export function onLoadTrendingData(
  storeName,
  url,
  pageSize,
  flag,
  FavoriteData,
) {
  return dispatch => {
    dispatch({
      type: Types.TRENDING_REFRESH,
      storeName: storeName,
      isloading: true,
      info: '正在刷新',
    });
    let dataStore = new DataStore();
    dataStore
      .fetchData(url, flag)
      .then(data => {
        handleData(
          Types.TRENDING_REFRESH_SUCCESS,
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
          type: Types.TRENDING_REFRESH_FAIL,
          storeName,
          isloading: false,
        });
      });
  };
}
//加载更多数据
export function onLoadMoreTrendingData(
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
        console.log('没有更多数据了，请不要刷星了');
        dispatch({
          type: Types.TRENDING_LOAD_MORE_FAIL,
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
            type: Types.TRENDING_LOAD_MORE_SUCCESS,
            storeName,
            pageIndex,
            projectModels: data,
          });
        });
      }
    }, 500);
  };
}

export function onFlushTrendingFavorite(
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
        type: Types.FLUSH_TRENDING_FAVORITE,
        storeName,
        pageIndex,
        projectModels: data,
      });
    });
  };
}
