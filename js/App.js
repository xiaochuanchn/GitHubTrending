/*
 * @Author: your name
 * @Date: 2019-12-14 08:58:21
 * @LastEditTime: 2019-12-14 09:36:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub_RN/js/App.js
 */
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigators from './navigator/AppNavigators';
import store from './store';
import CodePush from 'react-native-code-push'; // 引入code-push
import {Platform, StyleSheet, Text, View} from 'react-native';

let codePushOptions = {
  //设置检查更新的频率
  //ON_APP_RESUME APP恢复到前台的时候
  //ON_APP_START APP开启的时候
  //MANUAL 手动检查
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
};

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class App extends Component {
  //如果有更新的提示
  syncImmediate() {
    CodePush.sync({
      //安装模式
      //ON_NEXT_RESUME 下次恢复到前台时
      //ON_NEXT_RESTART 下一次重启时
      //IMMEDIATE 马上更新
      installMode: CodePush.InstallMode.IMMEDIATE,
      //对话框
      updateDialog: {
        //是否显示更新描述
        appendReleaseDescription: true,
        //更新描述的前缀。 默认为"Description"
        descriptionPrefix: '更新内容：',
        //强制更新按钮文字，默认为continue
        mandatoryContinueButtonLabel: '立即更新',
        //强制更新时的信息. 默认为"An update is available that must be installed."
        mandatoryUpdateMessage: '必须更新后才能使用',
        //非强制更新时，按钮文字,默认为"ignore"
        optionalIgnoreButtonLabel: '稍后',
        //非强制更新时，确认按钮文字. 默认为"Install"
        optionalInstallButtonLabel: '后台更新',
        //非强制更新时，检查到更新的消息文本
        optionalUpdateMessage: '有新版本了，是否更新？',
        //Alert窗口的标题
        title: '更新提示',
      },
    });
  }
  // componentWillMount() {
  //   CodePush.disallowRestart(); //页禁止重启
  //   this.syncImmediate(); //开始检查更新
  // }

  componentDidMount() {
    // CodePush.allowRestart(); //在加载完了，允许重启
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigators />
      </Provider>
    );
  }
}
// App = CodePush(codePushOptions)(App);
export default App;
