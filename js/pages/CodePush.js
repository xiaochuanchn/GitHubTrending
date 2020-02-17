import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import ViewUtil from '../util/ViewUtil';
import NavigatorUtil from '../navigator/NavigatorUtil';
import {connect} from 'react-redux';
import BackPress from '../common/BackPress';
import DeviceInfo from 'react-native-device-info';
import {Button, Image, Overlay} from 'react-native-elements';
import GlobalStyles from '../res/GlobalStyles';
import CodePush from 'react-native-code-push';
import * as Progress from 'react-native-progress';

class CodePushPage extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    console.log(this.props);
    const {title, url} = this.params;
    this.state = {
      title: title,
      url: url,
      canGoBack: false,
      isVisible: false,
      loading: false,
      updateInfo: '',
      showUpdateView: true,
      showProgressView: false,
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
  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({syncMessage: 'Checking for update.'});
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({
          syncMessage: 'Downloading package.',
        });
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({syncMessage: 'Awaiting user action.'});
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({syncMessage: 'Installing update.'});
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({syncMessage: 'App up to date.', progress: false});
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({
          syncMessage: 'Update cancelled by user.',
          progress: false,
          isVisible: false,
        });
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({
          syncMessage: 'Update installed and will be applied on restart.',
          progress: false,
          isVisible: false,
        });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({
          syncMessage: 'An unknown error occurred.',
          progress: false,
        });
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    this.setState({progress});
  }
  syncImmediate = () => {
    CodePush.sync(
      {installMode: CodePush.InstallMode.IMMEDIATE},
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this),
    );
  };
  checkForUpdate = () => {
    this.setState({loading: true});
    CodePush.checkForUpdate().then(update => {
      this.setState({loading: false});
      console.log(update);
      if (!update) {
        Alert.alert('App up to date.');
      } else {
        this.setState({isVisible: true, updateInfo: update});
      }
    });
  };
  render() {
    const {theme} = this.props;
    let progressView;
    if (this.state.progress) {
      let progressNum =
        this.state.progress.receivedBytes / this.state.progress.totalBytes;
      progressNum = progressNum.toFixed(2);
      progressView = (
        <View
          style={{flexDirection: 'row', paddingLeft: 8, alignItems: 'center'}}>
          <View>
            <Progress.Bar
              progress={progressNum}
              width={GlobalStyles.window_width / 2}
              height={10}
              borderRadius={10}
            />
          </View>
          <Text style={{marginLeft: 10}}>
            {`${(progressNum * 100).toFixed(0)}%`}
          </Text>
        </View>
      );
    }
    let progressModalView = (
      <View style={{margin: 10, marginBottom: 30}}>
        <Text style={{fontSize: 16, marginTop: 10, textAlign: 'center'}}>
          Waiting For Installing...
        </Text>
        <Text
          style={{
            fontSize: 14,
            margin: 20,
            marginBottom: 30,
            textAlign: 'center',
          }}>
          {this.state.syncMessage}
        </Text>
        {progressView}
      </View>
    );
    let updateView = (
      <View>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              padding: 10,
              paddingTop: 20,
            }}>
            An update is available
          </Text>
          <Text style={{fontSize: 14, margin: 5, textAlign: 'center'}}>
            Version{this.state.updateInfo.appVersion}
          </Text>
          <Text
            style={{
              fontSize: 14,
              margin: 5,
              padding: 10,
              paddingBottom: 0,
              paddingTop: 0,
            }}>
            Description:
          </Text>
          <Text
            style={{
              fontSize: 14,
              margin: 5,
              padding: 10,
              paddingTop: 0,
              paddingBottom: 20,
            }}>
            {this.state.updateInfo.description}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: '#ccc',
          }}>
          <TouchableOpacity
            style={{
              padding: 15,
              alignItems: 'center',
              width: GlobalStyles.window_width / 3,
              borderRightColor: '#ccc',
              borderRightWidth: 1,
            }}
            onPress={() => {
              this.setState({isVisible: false});
            }}>
            <Text>Ignore</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 15,
              alignItems: 'center',
              width: GlobalStyles.window_width / 3,
            }}
            onPress={() => {
              this.syncImmediate();
              this.setState({showUpdateView: false, showProgressView: true});
            }}>
            <Text>Install</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

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
      <SafeAreaViewPlus topColor={theme.themeColor}>
        {navigationBar}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
            marginBottom: 300,
          }}>
          <Image
            source={require('../res/img/icon512x512.png')}
            style={{width: 60, height: 60}}
          />
          <Text
            style={{
              marginTop: 30,
              fontSize: 14,
            }}>{`Version ${DeviceInfo.getVersion()}`}</Text>
        </View>
        <Button
          title="Check For Update"
          onPress={this.checkForUpdate}
          loading={this.state.loading}
          containerStyle={{
            marginLeft: 40,
            marginRight: 40,
          }}
        />
        <Overlay
          overlayStyle={{padding: 0}}
          borderRadius={15}
          isVisible={this.state.isVisible}
          width={(GlobalStyles.window_width * 2) / 3}
          height={'auto'}
          onBackdropPress={() => {
            this.setState({isVisible: false});
          }}>
          {this.state.showUpdateView ? updateView : null}
          {this.state.showProgressView ? progressModalView : null}
        </Overlay>
      </SafeAreaViewPlus>
    );
  }
}
let codePushOptions = {checkFrequency: CodePush.CheckFrequency.MANUAL};
CodePushPage = CodePush(codePushOptions)(CodePushPage);
const mapStateToProps = state => ({
  theme: state.theme.theme,
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(CodePushPage);
const styles = StyleSheet.create({
  contains: {
    flex: 1,
    height: GlobalStyles.window_height,
  },
});
