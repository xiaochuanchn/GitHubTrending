/*
 * @Author: your name
 * @Date: 2019-12-13 22:54:09
 * @LastEditTime : 2019-12-30 13:32:40
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub_RN/js/pages/DetailPage.js
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import {WebView} from 'react-native-webview';
import ViewUtil from '../util/ViewUtil';
import NavigatorUtil from '../navigator/NavigatorUtil';
import * as Progress from 'react-native-progress';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FavoriteDao from '../expand/FavoriteData';
import {connect} from 'react-redux';
import BackPress from '../common/BackPress';

const TRENDING_URL = 'https://github.com';
class DetailPage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.params = this.props.navigation.state.params;
    const {projectModel, flag} = this.params;
    this.favoriteDao = new FavoriteDao(flag);
    this.url =
      projectModel.item.html_url || TRENDING_URL + projectModel.item.url;
    const title = projectModel.item.full_name || projectModel.item.fullName;
    this.state = {
      title: title,
      url: this.url,
      canGoBack: false,
      progress: 0,
      isFavorite: projectModel.isFavorite,
    };
    this.backPress = new BackPress({backPress: () => this.onBackPress()});
  }
  onBackPress() {
    this.onBack();
    return true;
}
  componentDidMount() {
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }
  onBack() {
    if (this.state.canGoBack) {
      this.webView.goBack();
    } else {
      NavigatorUtil.goBack(this.props.navigation);
    }
  }
  onFavoriteButtonClick() {
    const {projectModel, callback} = this.params;
    const isFavorite = (projectModel.isFavorite = !projectModel.isFavorite);
    callback(isFavorite); //更新Item的收藏状态
    this.setState({
      isFavorite: isFavorite,
    });
    let key = projectModel.item.fullName
      ? projectModel.item.fullName
      : projectModel.item.id.toString();
    if (projectModel.isFavorite) {
      this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item));
    } else {
      this.favoriteDao.removeFavoriteItem(key);
    }
  }
  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url,
    });
  }
  renderRightButton() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => this.onFavoriteButtonClick()}>
          <FontAwesome
            name={this.state.isFavorite ? 'heart' : 'heart-o'}
            size={20}
            style={{color: 'white', marginRight: 10}}
          />
        </TouchableOpacity>
        {/* {ViewUtil.getShareButton(() => {
          let shareApp = share.share_app;
          ShareUtil.shareboard(
            shareApp.content,
            shareApp.imgUrl,
            this.url,
            shareApp.title,
            [0, 1, 2, 3, 4, 5, 6],
            (code, message) => {
              console.log('result:' + code + message);
            },
          );
        })} */}
      </View>
    );
  }
  render() {
    const {theme} = this.props;
    let statusBar = {
      backgroundColor: theme.themeColor,
      barStyle: 'default',
    };
    let navigationBar = (
      <NavigationBar
        title={this.state.title}
        statusBar={statusBar}
        style={{backgroundColor: theme.themeColor}}
        leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
        rightButton={this.renderRightButton()}
      />
    );
    return (
      <SafeAreaViewPlus style={styles.contains} topColor={theme.themeColor}>
        {navigationBar}
        <Progress.Bar
          progress={this.state.progress}
          width={null}
          height={2}
          borderWidth={0}
          color={theme.themeColor}
          style={{borderRadius: 0}}
        />
        <WebView
          source={{uri: this.state.url}}
          startInLoadingState={true}
          ref={webView => (this.webView = webView)}
          onLoadProgress={({nativeEvent}) => {
            this.setState({
              progress: nativeEvent.progress,
            });
            console.log(nativeEvent.progress);
          }}
          onLoadStart={() => {
            console.log('开始');
          }}
          onLoadEnd={() => {
            console.log('结束');
          }}
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
        />
      </SafeAreaViewPlus>
    );
  }
}
const mapStateToProps = state => ({
  theme: state.theme.theme,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
const styles = StyleSheet.create({
  contains: {
    flex: 1,
  },
});
