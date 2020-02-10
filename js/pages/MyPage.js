import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {onThemeChange} from '../action/theme';
import {ScrollView, StyleSheet, Text, View, Linking} from 'react-native';
import NavigationUtil from '../navigator/NavigatorUtil';
import NavigationBar from '../common/NavigationBar';
// import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MORE_MENU} from '../common/MoreMenu';
import GlobalStyles from '../res/GlobalStyles';
import ViewUtil from '../util/ViewUtil';
import {ListItem} from 'react-native-elements';
import CustomTheme from './CustomTheme';

import {FLAG_LANGUAGE} from '../expand/LanguageData';
import actions from '../action';
class MyPage extends Component<Props> {
  onClick(menu) {
    const {theme} = this.props;
    let RouteName,
      params = {theme};
    switch (menu) {
      case MORE_MENU.Tutorial:
        RouteName = 'WebViewPage';
        params.title = '教程';
        params.url = 'https://xiaochuanchn.github.io';
        break;
      case MORE_MENU.About:
        RouteName = 'AboutPage';
        break;
      case MORE_MENU.Custom_Theme:
        const {onShowCustomThemeView} = this.props;
        onShowCustomThemeView(true);
        break;
      // case MORE_MENU.CodePush:
      //   RouteName = 'CodePushPage';
      //   break;
      case MORE_MENU.Sort_Key:
        RouteName = 'SortKeyPage';
        params.flag = FLAG_LANGUAGE.flag_key;
        break;
      case MORE_MENU.Sort_Language:
        RouteName = 'SortKeyPage';
        params.flag = FLAG_LANGUAGE.flag_language;
        break;
      case MORE_MENU.Custom_Key:
      case MORE_MENU.Custom_Language:
      case MORE_MENU.Remove_Key:
        RouteName = 'CustomKeyPage';
        RouteName = 'CustomKeyPage';
        params.isRemoveKey = menu === MORE_MENU.Remove_Key;
        params.flag =
          menu !== MORE_MENU.Custom_Language
            ? FLAG_LANGUAGE.flag_key
            : FLAG_LANGUAGE.flag_language;
        break;
      case MORE_MENU.About_Author:
        RouteName = 'AboutMePage';
        break;
      case MORE_MENU.Feedback:
        const url = 'mailto://xiaochuanchn@gmail.com';
        Linking.canOpenURL(url)
          .then(support => {
            if (!support) {
              console.log("Can't handle url: " + url);
            } else {
              Linking.openURL(url);
            }
          })
          .catch(e => {
            console.error('An error occurred', e);
          });
        break;
    }
    if (RouteName) {
      NavigationUtil.goPage(params, RouteName);
    }
  }

  getItem(menu) {
    const {theme} = this.props;
    return ViewUtil.getMenuItem(
      () => this.onClick(menu),
      menu,
      theme.themeColor,
    );
  }

  render() {
    const {theme, customThemeViewVisible, onShowCustomThemeView} = this.props;
    console.log(theme);
    let statusBar = {
      backgroundColor: theme.themeColor,
      barStyle: 'light-content',
    };
    let navigationBar = (
      <NavigationBar
        title={'我的'}
        statusBar={statusBar}
        style={{backgroundColor: theme.themeColor}}
      />
    );
    return (
      <View style={GlobalStyles.root_container}>
        {navigationBar}
        <ScrollView showsVerticalScrollIndicator={false}>
          <ListItem
            onPress={() => this.onClick(MORE_MENU.About)}
            containerStyle={{height: 80}}
            leftIcon={
              <Ionicons
                name={MORE_MENU.About.icon}
                size={40}
                style={{color: theme.themeColor}}
              />
            }
            title="GitHub Trending"
            rightIcon={
              <Ionicons
                name={'ios-arrow-forward'}
                size={16}
                style={{color: theme.themeColor}}
              />
            }
            bottomDivider
          />
          {/* {this.getItem(MORE_MENU.Tutorial)} */}
          {/*趋势管理*/}
          <Text style={styles.groupTitle}>趋势管理</Text>
          {/*自定义语言*/}
          {this.getItem(MORE_MENU.Custom_Language)}
          {/*语言排序*/}
          {this.getItem(MORE_MENU.Sort_Language)}

          {/*最热管理*/}
          <Text style={styles.groupTitle}>最热管理</Text>
          {/*自定义标签*/}
          {this.getItem(MORE_MENU.Custom_Key)}
          {/*标签排序*/}
          {this.getItem(MORE_MENU.Sort_Key)}
          {/*标签移除*/}
          {this.getItem(MORE_MENU.Remove_Key)}

          {/*设置*/}
          <Text style={styles.groupTitle}>设置</Text>
          {/*自定义主题*/}
          {this.getItem(MORE_MENU.Custom_Theme)}
          {/*关于作者*/}
          {/* {this.getItem(MORE_MENU.About_Author)} */}
          {/*反馈*/}
          {this.getItem(MORE_MENU.Feedback)}
        </ScrollView>
        <CustomTheme
          visible={customThemeViewVisible}
          {...this.props}
          onClose={() => onShowCustomThemeView(false)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
  customThemeViewVisible: state.theme.customThemeViewVisible,
});

const mapDispatchToProps = dispatch => ({
  onShowCustomThemeView: show => dispatch(actions.onShowCustomThemeView(show)),
});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  about_left: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
    color: 'gray',
  },
});
