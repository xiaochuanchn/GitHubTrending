import React, {Component} from 'react';
import {View, Linking, Text} from 'react-native';
import {MORE_MENU} from '../../common/MoreMenu';
import ViewUtil from '../../util/ViewUtil';
import AboutCommon, {FLAG_ABOUT} from './AboutCommon';
import config from '../../res/data/config';
import GlobalStyles from '../../res/GlobalStyles';
import NavigatorUtil from '../../navigator/NavigatorUtil';
type Props = {};

export default class AboutPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.aboutCommon = new AboutCommon(
      {
        ...this.params,
        navigation: this.props.navigation,
        flagAbout: FLAG_ABOUT.flag_about,
      },
      data => this.setState({...data}),
    );
    this.state = {
      data: config,
    };
  }
  componentDidMount() {
    this.aboutCommon.componentDidMount();
  }

  componentWillUnmount() {
    this.aboutCommon.componentWillUnmount();
  }

  onClick(menu) {
    const {theme} = this.params;
    let RouteName,
      params = {theme};
    switch (menu) {
    //   case MORE_MENU.Tutorial:
    //     RouteName = 'WebViewPage';
    //     params.title = '教程';
    //     params.url = 'https://coding.m.imooc.com/classindex.html?cid=304';
    //     break;
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
      NavigatorUtil.goPage(params, RouteName);
    }
  }

  getItem(menu) {
    const {theme} = this.params;
    return ViewUtil.getMenuItem(
      () => this.onClick(menu),
      menu,
      theme.themeColor,
    );
  }

  render() {
    const content = (
      <View>
        {/* {this.getItem(MORE_MENU.Tutorial)} */}
        {this.getItem(MORE_MENU.About_Author)}
        {this.getItem(MORE_MENU.Feedback)}
      </View>
    );
    return this.aboutCommon.render(content, this.state.data.app);
  }
}
