import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import PopularItem from '../common/PopularItem';
import {connect} from 'react-redux';
import actions from '../action';
import NavigationBar from '../common/NavigationBar';
import FavoriteData from '../expand/FavoriteData';
import {FLAG_STORAGE} from '../expand/DataStore';
import NavigationUtil from '../navigator/NavigatorUtil';
import FavoriteUtil from '../util/FavoriteUtil';
import GlobalStyles from '../res/GlobalStyles';
import {FLAG_LANGUAGE} from '../expand/LanguageData';
import Ionicons from 'react-native-vector-icons/Ionicons';
const favoriteDao = new FavoriteData(FLAG_STORAGE.flag_popular);
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_SORT = '&sort=stars';
const pageSize = 10;
class PopularPage extends Component {
  constructor(props) {
    super(props);
    const {onLoadLanguage} = this.props;
    onLoadLanguage(FLAG_LANGUAGE.flag_key);
  }
  _topTabs() {
    const tabs = {};
    const {theme, keys} = this.props;
    keys.forEach((item, index) => {
      if (item.checked) {
        tabs[`tab${index}`] = {
          screen: props => (
            <PopularTabPage {...props} tabLable={item.name} theme={theme} />
          ),
          navigationOptions: {
            title: item.name,
          },
        };
      }
    });
    return tabs;
  }
  renderRightButton() {
    const {theme} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationUtil.goPage({theme}, 'SearchPage');
        }}>
        <View style={{padding: 5, marginRight: 8}}>
          <Ionicons
            name={'ios-search'}
            size={20}
            style={{
              marginRight: 8,
              alignSelf: 'center',
              color: 'white',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    const {theme, keys} = this.props;
    let statusBar = {
      backgroundColor: theme.themeColor,
      barStyle: 'default',
    };
    let navigationBar = (
      <NavigationBar
        title="Popular"
        statusBar={statusBar}
        style={{backgroundColor: theme.themeColor}}
        rightButton={this.renderRightButton()}
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
const mapPopularStateToProps = state => ({
  keys: state.language.keys,
  theme: state.theme.theme,
});
const mapPopularDispatchToProps = dispatch => ({
  onLoadLanguage: flag => dispatch(actions.onLoadLanguage(flag)),
});
export default connect(
  mapPopularStateToProps,
  mapPopularDispatchToProps,
)(PopularPage);

class PopularTab extends Component {
  constructor(props) {
    super(props);
    const {tabLable} = props;
    this.storeName = tabLable;
  }
  getUrl() {
    return URL + this.storeName + QUERY_SORT;
  }
  componentDidMount() {
    this.loadData(false);
  }
  _store() {
    const {popular} = this.props;
    let store = popular[this.storeName];
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
    const {onLoadPopularData, onLoadMorePopularData} = this.props;
    if (loadMore) {
      onLoadMorePopularData(
        this.storeName,
        ++store.pageIndex,
        pageSize,
        store.items,
        favoriteDao,
      );
    } else {
      onLoadPopularData(
        this.storeName,
        this.getUrl(),
        pageSize,
        FLAG_STORAGE.flag_popular,
        favoriteDao,
      );
    }
  }
  renderItem(data) {
    const item = data.item;
    const {theme} = this.props;
    return (
      <PopularItem
        theme={theme}
        projectModel={item}
        onSelect={callback => {
          NavigationUtil.goPage(
            {
              projectModel: item,
              flag: FLAG_STORAGE.flag_popular,
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
            FLAG_STORAGE.flag_popular,
          )
        }
      />
    );
  }
  footer() {
    return this._store().hideLoadingMore ? (
      <View style={styles.footerContainer}>
        <Text style={styles.footText}>----------- No More Data -----------</Text>
      </View>
    ) : (
      <View style={styles.footerContainer}>
        <ActivityIndicator />
        <Text style={styles.footText}>Loading....</Text>
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
          keyExtractor={item => '' + item.item.id}
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
  return {
    popular: state.popular,
  };
};
const mapDispatchToProps = dispatch => ({
  onLoadPopularData: (storeName, url, pageSize, flag, favoriteDao) => {
    dispatch(
      actions.onLoadPopularData(storeName, url, pageSize, flag, favoriteDao),
    );
  },
  onLoadMorePopularData: (
    storeName,
    pageIndex,
    pageSize,
    dataArray,
    favoriteDao,
  ) => {
    dispatch(
      actions.onLoadMorePopularData(
        storeName,
        pageIndex,
        pageSize,
        dataArray,
        favoriteDao,
      ),
    );
  },
});
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

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
});
