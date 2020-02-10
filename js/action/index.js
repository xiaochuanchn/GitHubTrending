/*
 * @Author: your name
 * @Date: 2019-12-14 15:21:56
 * @LastEditTime: 2019-12-19 14:59:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub_RN/js/action/index.js
 */
import {onThemeChange, onShowCustomThemeView, onThemeInit} from './theme';
import {onLoadPopularData, onLoadMorePopularData} from './popular';
import {onLoadTrendingData, onLoadMoreTrendingData} from './trending';
import {onLoadFavoriteData} from './favorite';
import {onLoadLanguage} from './language';
import {onSearch, onLoadMoreSearch, onSearchCancel} from './search';
export default {
  onThemeChange,
  onShowCustomThemeView,
  onThemeInit,
  onLoadPopularData,
  onLoadMorePopularData,
  onLoadTrendingData,
  onLoadMoreTrendingData,
  onLoadFavoriteData,
  onLoadLanguage,
  onSearch,
  onLoadMoreSearch,
  onSearchCancel,
};
