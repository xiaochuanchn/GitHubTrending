import React, {Component} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import TrendingItem from '../common/TrendingItem';
import {connect} from 'react-redux';
import actions from '../action';
import {ButtonGroup} from 'react-native-elements';
import NavigationBar from '../common/NavigationBar';
import FavoriteData from '../expand/FavoriteData';
import {FLAG_STORAGE} from '../expand/DataStore';
import NavigationUtil from '../navigator/NavigatorUtil';
import FavoriteUtil from '../util/FavoriteUtil';
import {FLAG_LANGUAGE} from '../expand/LanguageData';
const favoriteDao = new FavoriteData(FLAG_STORAGE.flag_trending);
const URL = 'https://github.com/trending/';
const PAGESIZE = 10;
const spanTimes = ['?since=daily', '?since=weekly', '?since=monthly'];
class TrendingPage extends Component {
  constructor(props) {
    super(props);
    console.log(NavigationUtil.navigation);
    const {onLoadLanguage} = this.props;
    onLoadLanguage(FLAG_LANGUAGE.flag_language);
    this.preKeys = [];
  }
  state = {
    spanTime: '?since=daily',
    selectedIndex: 0,
  };
  _topTabs() {
    const tabs = {};
    const {theme, keys} = this.props;
    this.preKeys = keys;
    keys.forEach((item, index) => {
      if (item.checked) {
        tabs[`tab${index}`] = {
          screen: props => (
            <TrendingTabPage
              {...props}
              tabLable={item.name}
              spanTime={this.state.spanTime}
              theme={theme}
            />
          ),
          navigationOptions: {
            title: item.name,
          },
        };
      }
    });
    return tabs;
  }
  updateIndex = selectedIndex => {
    this.setState({selectedIndex, spanTime: spanTimes[selectedIndex]});
  };
  titleView = () => {
    const buttons = ['Today', 'Week', 'Month'];
    const {selectedIndex} = this.state;
    const {theme} = this.props;
    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        textStyle={{color: theme.themeColor, fontSize: 10}}
        containerStyle={styles.containerStyle}
        selectedButtonStyle={{backgroundColor: theme.themeColor}}
      />
    );
  };
  render() {
    const {theme, keys} = this.props;
    let statusBar = {
      backgroundColor: theme.themeColor,
      barStyle: 'default',
    };
    let navigationBar = (
      <NavigationBar
        titleView={this.titleView()}
        statusBar={statusBar}
        style={{backgroundColor: theme.themeColor}}
      />
    );
    const TopTabNavigator = keys.length
      ? createAppContainer(
          createMaterialTopTabNavigator(this._topTabs(), {
            tabBarOptions: {
              upperCaseLabel: false,
              tabStyle: styles.tabStyle,
              scrollEnabled: true,
              indicatorStyle: styles.indicatorStyle,
              labelStyle: styles.labStyle,
              style: {height: 30, backgroundColor: theme.themeColor},
              allowFontScaling: true,
            },
            lazy: true,
          }),
        )
      : null;
    return (
      <View style={styles.contains}>
        {navigationBar}
        {TopTabNavigator && <TopTabNavigator />}
      </View>
    );
  }
}
const mapTrendingStateToProps = state => ({
  theme: state.theme.theme,
  keys: state.language.languages,
});
const mapTrendingDispatchToProps = dispatch => ({
  onLoadLanguage: flag => dispatch(actions.onLoadLanguage(flag)),
});
export default connect(
  mapTrendingStateToProps,
  mapTrendingDispatchToProps,
)(TrendingPage);
class TrendingTab extends Component {
  constructor(props) {
    super(props);
    const {tabLable, spanTime} = props;
    this.storeName = tabLable;
    this.spanTime = spanTime;
  }
  getUrl() {
    return URL + this.storeName + this.spanTime;
  }
  componentDidMount() {
    this.loadData(false);
  }
  _store() {
    const {trending} = this.props;
    let store = trending[this.storeName];
    if (!store) {
      store = {
        items: [],
        isloading: false,
        projectModes: [],
        hideLoadingMore: true,
      };
    }
    return store;
  }
  loadData(loadMore) {
    let store = this._store();
    const {onLoadTrendingData, onLoadMoreTrendingData} = this.props;
    if (loadMore) {
      onLoadMoreTrendingData(
        this.storeName,
        ++store.pageIndex,
        PAGESIZE,
        store.items,
        favoriteDao,
      );
    } else {
      onLoadTrendingData(
        this.storeName,
        this.getUrl(),
        PAGESIZE,
        FLAG_STORAGE.flag_trending,
        favoriteDao,
      );
    }
  }
  renderItem(data) {
    const item = data.item;
    const {theme} = this.props;
    return (
      <TrendingItem
        theme={theme}
        projectModel={item}
        onSelect={callback => {
          NavigationUtil.goPage(
            {
              projectModel: item,
              flag: FLAG_STORAGE.flag_trending,
              callback,
            },
            'DetailPage',
          );
          //  this.props.navigation.navigate('tab1');//跳转到createMaterialTopTabNavigator中的指定tab，主要这个navigation一定要是在跳转到createMaterialTopTabNavigator中的指页面获取的
        }}
        onFavorite={(item, isFavorite) =>
          FavoriteUtil.onFavorite(
            favoriteDao,
            item,
            isFavorite,
            FLAG_STORAGE.flag_trending,
          )
        }
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
    const {theme} = this.props;
    return (
      <View style={styles.contains}>
        <FlatList
          data={store.projectModels}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + item.item.fullName}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              title="Loading..."
              titleColor={theme.themeColor}
              colors={[theme.themeColor]}
              refreshing={store.isloading}
              onRefresh={() => this.loadData()}
              tintColor={theme.themeColor}
            />
          }
          ListFooterComponent={() => this.footer()}
          onEndReached={() => {
            setTimeout(() => {
              if (this.canLoadMore) {
                //fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                this.loadData(true);
                console.log('---onEndReached----');
                this.canLoadMore = false;
              }
            }, 100);
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
            console.log('---onMomentumScrollBegin-----');
          }}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    trending: state.trending,
  };
};
const mapDispatchToProps = dispatch => ({
  onLoadTrendingData: (storeName, url, pageSize, flag, favoriteDao) => {
    dispatch(
      actions.onLoadTrendingData(storeName, url, pageSize, flag, favoriteDao),
    );
  },
  onLoadMoreTrendingData: (
    storeName,
    pageIndex,
    pageSize,
    dataArray,
    favoriteDao,
  ) => {
    console.log('pageIndex' + pageIndex);
    dispatch(
      actions.onLoadMoreTrendingData(
        storeName,
        pageIndex,
        pageSize,
        dataArray,
        favoriteDao,
      ),
    );
  },
});
const TrendingTabPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrendingTab);

const styles = StyleSheet.create({
  contains: {
    flex: 1,
    height: 500,
  },
  tabStyle: {
    padding: 0,
  },
  indicatorStyle: {
    backgroundColor: '#fff',
  },
  labStyle: {
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
  containerStyle: {
    height: 30,
  },
});
