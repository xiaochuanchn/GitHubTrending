import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import NavigatorUtil from '../navigator/NavigatorUtil';
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';
import AppInfo from './AppInfo';
import AsyncStorage from '@react-native-community/async-storage';
export default class Welcome extends Component {
  state = {
    isFirst: false,
  };
  async saveVersion(version) {
    try {
      await AsyncStorage.setItem('version', version);
    } catch (e) {
      console.log(e);
    }
  }
  getVersion = version =>
    new Promise((resolve, reject) => {
      AsyncStorage.getItem('version', (error, result) => {
        console.log(result);
        if (error || !result || result !== version) {
          try {
            SplashScreen.hide();
            this.setState({
              isFirst: true,
            });
            this.saveVersion(version);
          } catch (e) {
            reject(e);
            this.setState({
              isFirst: false,
            });
            this.timer = setTimeout(() => {
              SplashScreen.hide();
              NavigatorUtil.resetToHomePage(this.props);
            }, 1000);
            console.error(e);
          }
        } else {
          this.setState({
            isFirst: false,
          });
          this.timer = setTimeout(() => {
            SplashScreen.hide();

            NavigatorUtil.resetToHomePage(this.props);
          }, 1000);
        }
      });
    });
  componentDidMount() {
    const version = DeviceInfo.getVersion();
    this.getVersion(version);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          hidden={false}
          barStyle="light-content"
        />
        {this.state.isFirst ? <AppInfo {...this.props} /> : null}
        {/* <AppInfo {...this.props} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
