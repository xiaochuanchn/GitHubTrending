/*
 * @Author: your name
 * @Date: 2019-12-12 16:55:11
 * @LastEditTime: 2019-12-18 16:45:43
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /GitHub_RN/js/navigator/AppNavigators.js
 */
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Welcome from '../pages/Welcome';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import WebViewPage from '../pages/WebViewPage';
import CustomTheme from '../pages/CustomTheme';
import CustomKeyPage from '../pages/CustomKeyPage';
import SortKeyPage from '../pages/SortKeyPage';
import SearchPage from '../pages/SearchPage';
import AboutPage from '../pages/About/AboutPage';
import AboutMePage from '../pages/About/AboutMePage';
const InitNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      header: null,
    },
  },
});
const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null,
    },
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      header: null,
    },
  },
  WebViewPage: {
    screen: WebViewPage,
    navigationOptions: {
      header: null,
    },
  },
  CustomTheme: {
    screen: CustomTheme,
    navigationOptions: {
      header: null,
    },
  },
  AboutPage: {
    screen: AboutPage,
    navigationOptions: {
      header: null,
    },
  },
  AboutMePage: {
    screen: AboutMePage,
    navigationOptions: {
      header: null,
    },
  },
  CustomKeyPage: {
    screen: CustomKeyPage,
    navigationOptions: {
      header: null,
    },
  },
  SortKeyPage: {
    screen: SortKeyPage,
    navigationOptions: {
      header: null,
    },
  },
  SearchPage: {
    screen: SearchPage,
    navigationOptions: {
      header: null, // 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    },
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Init: InitNavigator,
      Main: MainNavigator,
    },
    {
      navigationOptions: {
        header: null,
      },
    },
  ),
);
