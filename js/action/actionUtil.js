/*
 * @Author: your name
 * @Date: 2020-01-01 22:45:26
 * @LastEditTime : 2020-01-01 22:52:42
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub_RN/js/action/actionUtil.js
 */
/**
 * 处理下拉刷新的数据
 * @param actionType
 * @param dispatch
 * @param storeName
 * @param data
 * @param pageSize
 * @param favoriteDao
 */
import ProjectModel from '../model/ProjectModel';
import Utils from '../util/Utils';
/**
 * 处理数据
 * @param actionType
 * @param dispatch
 * @param storeName
 * @param data
 * @param pageSize
 * @param favoriteDao
 * @param params 其他参数
 */
export function handleData(
  actionType,
  dispatch,
  storeName,
  data,
  pageSize,
  favoriteDao,
  params,
) {
  let fixItems = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }
  //第一次要加载的数据
  let showItems =
    pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
  _projectModels(showItems, favoriteDao, projectModels => {
    console.log(projectModels);
    dispatch({
      type: actionType,
      items: fixItems,
      projectModels: projectModels,
      storeName,
      info: '刷新完成',
      pageIndex: 1,
      ...params,
    });
  });
}

/**
 * 通过本地的收藏状态包装Item
 * @param showItems
 * @param favoriteDao
 * @param callback
 * @returns {Promise<void>}
 * @private
 */
export async function _projectModels(showItems, favoriteDao, callback) {
  let keys = [];
  try {
    //获取收藏的key
    keys = await favoriteDao.getFavoriteKeys();
  } catch (e) {
    console.log(e);
  }
  let projectModels = [];
  for (let i = 0, len = showItems.length; i < len; i++) {
    projectModels.push(
      new ProjectModel(showItems[i], Utils.checkFavorite(showItems[i], keys)),
    );
  }
  doCallBack(callback, projectModels);
}
export const doCallBack = (callBack, object) => {
  if (typeof callBack === 'function') {
    callBack(object);
  }
};
