/*
 * @Author: your name
 * @Date: 2019-12-13 22:00:52
 * @LastEditTime: 2019-12-14 22:03:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub_RN/js/navigator/TabNavigator.js
 */
import React, {Component} from 'react';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import TrendingPage from '../pages/TrendingPage';
import FavoritePage from '../pages/FavoritePage';
import MyPage from '../pages/MyPage';
import PopularPage from '../pages/PopularPage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import EventBus from 'react-native-event-bus';
import EventTypes from '../util/EventTypes';

const TABS = {
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: 'Trending',
      tabBarIcon: ({tintColor, focused}) => {
        return <Icon name="call-made" size={26} color={tintColor} />;
      },
    },
  },
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: 'Popular',
      tabBarIcon: ({tintColor, focused}) => {
        return <Icon name="star" size={26} color={tintColor} />;
      },
    },
  },

  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: 'Favorite',
      tabBarIcon: ({tintColor, focused}) => {
        return <Icon name="favorite" size={26} color={tintColor} />;
      },
    },
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: 'My',
      tabBarIcon: ({tintColor, focused}) => {
        return <Icon name="person" size={26} color={tintColor} />;
      },
    },
  },
};
class TabNavigator extends Component {
  constructor(props) {
    super(props);
  }
  _tabNavigator() {
    // const {TrendingPage, FavoritePage, MyPage, PopularPage} = TABS;
    // const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};
    if (this.tabs) {
      return this.tabs;
    }
    return (this.tabs = createAppContainer(
      createBottomTabNavigator(
        {...TABS},
        {
          tabBarComponent: props => {
            return (
              <TabBarComponent theme={this.props.theme.themeColor} {...props} />
            );
          },
        },
      ),
    ));
  }
  render() {
    const Tabs = this._tabNavigator();
    return (
      <Tabs
        onNavigationStateChange={(prevState, newState, action) => {
          EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {
            //发送底部tab切换的事件
            from: prevState.index,
            to: newState.index,
          });
        }}
      />
    );
  }
}
class TabBarComponent extends Component {
  render() {
    console.log(this.props);
    console.disableYellowBox = true;
    return <BottomTabBar {...this.props} activeTintColor={this.props.theme} />;
  }
}
const mapStateToProps = state => {
  return {
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(TabNavigator);
