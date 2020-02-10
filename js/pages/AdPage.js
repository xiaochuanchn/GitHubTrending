import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import NavigatorUtil from '../navigator/NavigatorUtil';
import {Button} from 'react-native-elements';
import GlobalStyles from '../res/GlobalStyles';
const IMGURL = 'http://open.iciba.com/dsapi/ ';
export default class AdPage extends Component {
  state = {
    seconds: 10,
    data: '',
  };
  onSkipBtnHandle = () => {
    this.timerClock && clearInterval(this.timerClock);

    NavigatorUtil.resetToHomePage(this.props);
  };
  componentDidMount() {
    this.getAdImage(IMGURL);
    this.timerClock = setInterval(() => {
      this.clock();
    }, 1000);
    this.timer = setTimeout(() => {
      NavigatorUtil.resetToHomePage(this.props);
    }, this.state.seconds * 1000);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
    this.timerClock && clearInterval(this.timerClock);
  }
  clock = () => {
    let num = this.state.seconds;
    num--;
    this.setState({
      seconds: num,
    });
  };
  async getAdImage(url) {
    try {
      let response = await fetch(url);
      let responseJson = await response.json();
      this.setState({data: responseJson});
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    let buttonTitle = 'skip  ' + (this.state.seconds - 1);
    return (
      <View style={styles.container}>
        <Button
          type="outline"
          title={buttonTitle}
          onPress={this.onSkipBtnHandle}
          containerStyle={{
            width: 50,
            position: 'absolute',
            top: 60,
            right: 20,
            zIndex: 10000,
          }}
          titleStyle={{fontSize: 12}}
          buttonStyle={{padding: 3}}
        />
        <Image
          source={{
            uri: this.state.data.fenxiang_img,
          }}
          style={{
            width: GlobalStyles.window_width,
            height: GlobalStyles.window_height,
          }}
          resizeMode="stretch"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: GlobalStyles.window_width,
    height: GlobalStyles.window_height,
    justifyContent: 'center',
  },
});
