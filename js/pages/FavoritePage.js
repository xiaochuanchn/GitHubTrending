import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import PopularItem from '../common/PopularItem';
import {connect} from 'react-redux';
import actions from '../action';
import NavigationBar from '../common/NavigationBar';
import {FLAG_STORAGE} from '../expand/DataStore';
import NavigationUtil from '../navigator/NavigatorUtil';
import FavoriteUtil from '../util/FavoriteUtil';
import TrendingItem from '../common/TrendingItem';
import EventBus from 'react-native-event-bus';
import EventTypes from '../util/EventTypes';
import FavoriteDao from '../expand/FavoriteData';
import GlobalStyles from '../res/GlobalStyles';

const THEME_COLOR = '#2196f3';
// const pageSize = 10;
class FavoritePage extends Component {
  render() {
    const {theme} = this.props;
    let statusBar = {
      backgroundColor: theme.themeColor,
      barStyle: 'light-content',
    };
    let navigationBar = (
      <NavigationBar
        title={'Favorite'}
        statusBar={statusBar}
        style={{backgroundColor: theme.themeColor}}
      />
    );
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(
        {
          Popular: {
            screen: props => (
              <FavoriteTabPage
                {...props}
                flag={FLAG_STORAGE.flag_popular}
                theme={theme}
              />
            ), //初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
            navigationOptions: {
              title: 'Popular',
            },
          },
          Trending: {
            screen: props => (
              <FavoriteTabPage
                {...props}
                flag={FLAG_STORAGE.flag_trending}
                theme={theme}
              />
            ), //初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
            navigationOptions: {
              title: 'Trending',
            },
          },
        },
        {
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            upperCaseLabel: false, //是否使标签大写，默认为true
            style: {
              backgroundColor: theme.themeColor, //TabBar 的背景颜色
              // 移除以适配react-navigation4x
              height: 30,
            },
            indicatorStyle: styles.indicatorStyle, //标签指示器的样式
            labelStyle: styles.labelStyle, //文字的样式
          },
        },
      ),
    );
    return (
      <View style={styles.contains}>
        {navigationBar}
        <TabNavigator />
      </View>
    );
  }
}

const mapFavoriteStateToProps = state => ({
  theme: state.theme.theme,
});
// 注意：connect只是个function，并不应定非要放在export后面
export default connect(mapFavoriteStateToProps)(FavoritePage);

class FavoriteTab extends Component<Props> {
  constructor(props) {
    super(props);
    const {flag} = this.props;
    this.storeName = flag;
    this.favoriteDao = new FavoriteDao(flag);
  }

  componentDidMount() {
    this.loadData(true);
    EventBus.getInstance().addListener(
      EventTypes.bottom_tab_select,
      (this.listener = data => {
        if (data.to === 2) {
          this.loadData(false);
        }
      }),
    );
  }

  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.listener);
  }

  loadData(isShowLoading) {
    const {onLoadFavoriteData} = this.props;
    onLoadFavoriteData(this.storeName, isShowLoading);
  }

  /**
   * 获取与当前页面有关的数据
   * @returns {*}
   * @private
   */
  _store() {
    const {favorite} = this.props;
    let store = favorite[this.storeName];
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModels: [], //要显示的数据
        hideLoadingMore: true,
      };
    }
    return store;
  }

  onFavorite(item, isFavorite) {
    FavoriteUtil.onFavorite(
      this.favoriteDao,
      item,
      isFavorite,
      this.props.flag,
    );
    if (this.storeName === FLAG_STORAGE.flag_popular) {
      EventBus.getInstance().fireEvent(EventTypes.favorite_changed_popular);
    } else {
      EventBus.getInstance().fireEvent(EventTypes.favoriteChanged_trending);
    }
  }

  renderItem(data) {
    const {theme} = this.props;
    const item = data.item;
    const Item =
      this.storeName === FLAG_STORAGE.flag_popular ? PopularItem : TrendingItem;
    return (
      <Item
        theme={theme}
        projectModel={item}
        onSelect={callback => {
          NavigationUtil.goPage(
            {
              theme,
              projectModel: item,
              flag: this.storeName,
              callback,
            },
            'DetailPage',
          );
        }}
        onFavorite={(item, isFavorite) => this.onFavorite(item, isFavorite)}
      />
    );
  }
  footer() {
    return this._store().hideLoadingMore ? (
      <View style={styles.footerContainer}>
        <Text style={styles.footText}>--------- 我是有底线的 ---------</Text>
      </View>
    ) : (
      <View style={styles.footerContainer}>
        <ActivityIndicator />
        <Text style={styles.footText}>正在加载更多....</Text>
      </View>
    );
  }
  render() {
    let store = this._store();
    return (
      <View>
        <FlatList
          style={styles.container}
          data={store.projectModels}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + (item.item.id || item.item.fullName)}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData(true)}
              tintColor={THEME_COLOR}
            />
          }
          // ListFooterComponent={() => this.footer()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorite: state.favorite,
  };
};

const mapDispatchToProps = dispatch => ({
  //将 dispatch(onRefreshPopular(storeName, url))绑定到props
  onLoadFavoriteData: (storeName, isShowLoading) =>
    dispatch(actions.onLoadFavoriteData(storeName, isShowLoading)),
});

//注意：connect只是个function，并不应定非要放在export后面
const FavoriteTabPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavoriteTab);

const styles = StyleSheet.create({
  contains: {
    flex: 1,
    height: GlobalStyles.window_height,
  },
  tabStyle: {
    padding: 0,
  },
  indicatorStyle: {
    backgroundColor: '#fff',
  },
  labelStyle: {
    margin: 0,
    fontSize: 14,
    paddingBottom: 30,
  },
  footerContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  footText: {
    fontSize: 10,
    alignSelf: 'center',
    marginTop: 10,
    textAlign: 'center',
    color: '#666',
  },
});
