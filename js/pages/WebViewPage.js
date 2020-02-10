import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import {WebView} from 'react-native-webview';
import ViewUtil from '../util/ViewUtil';
import NavigatorUtil from '../navigator/NavigatorUtil';
import * as Progress from 'react-native-progress';
import {connect} from 'react-redux';
import BackPress from '../common/BackPress';

class WebViewPage extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    console.log(this.props);
    const {title, url} = this.params;
    this.state = {
      title: title,
      url: url,
      canGoBack: false,
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
  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url,
    });
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
          color={theme}
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

export default connect(mapStateToProps, mapDispatchToProps)(WebViewPage);
const styles = StyleSheet.create({
  contains: {
    flex: 1,
  },
});
