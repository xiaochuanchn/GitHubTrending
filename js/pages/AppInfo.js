import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  Dimensions,
  Button,
} from 'react-native';

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

import AppIntro from 'rn-falcon-app-intro';
import NavigatorUtil from '../navigator/NavigatorUtil';

// import AppIntro from './AppIntro';

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  header: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pic: {
    width: 75 * 2,
    height: 63 * 2,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  info: {
    flex: 0.5,
    alignItems: 'center',
    padding: 40,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    paddingBottom: 20,
  },
  description: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});

type Props = {};

export default class AppInfo extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      keyUpdate: 0,
    };
  }

  onSkipBtnHandle = () => {
    NavigatorUtil.resetToHomePage(this.props);
  };
  doneBtnHandle = () => {
    NavigatorUtil.resetToHomePage(this.props);
  };

  goToSlide2() {
    this.setState({
      selectedIndex: 1,
      keyUpdate: this.state.keyUpdate + 1,
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <AppIntro
          onSkipBtnClick={this.onSkipBtnHandle}
          defaultIndex={this.state.selectedIndex}
          onDoneBtnClick={this.doneBtnHandle}
          key={this.state.keyUpdate}>
          <View style={[styles.slide, {backgroundColor: '#fa931d'}]}>
            <View style={[styles.header, {width: windowsWidth}]}>
              <View>
                <Image
                  style={{width: 75 * 2.5, height: 63 * 2.5}}
                  source={require('../res/img/1/c1.png')}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 80,
                  left: 30,
                  width: windowsWidth,
                  height: windowsHeight,
                }}
                level={20}>
                <Image
                  style={{width: 46 * 2.5, height: 28 * 2.5}}
                  source={require('../res/img/1/c2.png')}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 23,
                  left: 25,
                  width: windowsWidth,
                  height: windowsHeight,
                }}
                level={20}>
                <Image
                  style={{width: 109 * 2.5, height: 68 * 2.5}}
                  source={require('../res/img/1/c5.png')}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 65,
                  left: 35,
                  width: windowsWidth,
                  height: windowsHeight,
                }}
                level={5}>
                <Image
                  style={{width: 23 * 2.5, height: 17 * 2.5}}
                  source={require('../res/img/1/c3.png')}
                />
              </View>
            </View>
            <View style={styles.info}>
              <View level={10}>
                <Text style={styles.title}>Trending Project</Text>
              </View>
              <View level={15}>
                <Text style={styles.description}>
                View Daily, Weekly, Monthly Trending Project
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.slide, {backgroundColor: '#a4b602'}]}>
            <View style={[styles.header, {width: windowsWidth}]}>
              <View>
                <Image
                  style={{width: 75 * 2.5, height: 63 * 2.5}}
                  source={require('../res/img/2/1.png')}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 30,
                  left: 40,
                  width: windowsWidth,
                  height: windowsHeight,
                }}
                level={20}>
                <Image
                  style={{width: 101 * 2.5, height: 71 * 2.5}}
                  source={require('../res/img/2/2.png')}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 50,
                  width: windowsWidth,
                  height: windowsHeight,
                }}
                level={-20}>
                <Image
                  style={{width: 85 * 2.5, height: 73 * 2.5}}
                  source={require('../res/img/2/3.png')}
                />
              </View>
            </View>
            <View style={styles.info}>
              <View level={10}>
                <Text style={styles.title}>Popular Project</Text>
              </View>
              <View level={15}>
                <Text style={styles.description}>
                  View Popular Project, Search Project And Save It To HomePage
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.slide, {backgroundColor: '#406E9F'}]}>
            <View style={[styles.header, {width: windowsWidth}]}>
              <View
                style={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  width: windowsWidth,
                  height: windowsHeight,
                }}>
                <Image
                  style={{width: 138 * 2.5, height: 83 * 2.5}}
                  source={require('../res/img/3/3.png')}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 25,
                  left: 40,
                  width: windowsWidth,
                  height: windowsHeight,
                }}
                level={-15}>
                <Image
                  style={{width: 103 * 2.5, height: 42 * 2.5}}
                  source={require('../res/img/3/4.png')}
                />
              </View>
              <View level={10}>
                <Image
                  style={{width: 95 * 2.5, height: 55 * 2.5}}
                  source={require('../res/img/3/1.png')}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 65,
                  left: 120,
                  width: windowsWidth,
                  height: windowsHeight,
                }}
                level={25}>
                <Image
                  style={{width: 47 * 2.5, height: 43 * 2.5}}
                  source={require('../res/img/3/2.png')}
                />
              </View>
            </View>
            <View style={styles.info}>
              <View level={10}>
                <Text style={styles.title}>Favorite Project</Text>
              </View>
              <View level={15}>
                <Text style={styles.description}>
                  Collect Your Favorite Projects And Manage Them Uniformly
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.slide, {backgroundColor: '#DB4302'}]}>
            <View style={[styles.header, {width: windowsWidth}]}>
              <View
                style={{
                  position: 'absolute',
                  top: 25,
                  left: 55,
                  width: windowsWidth,
                  height: windowsHeight,
                }}
                level={15}>
                <Image
                  style={{width: 96 * 2.5, height: 69 * 2.5}}
                  source={require('../res/img/4/4.png')}
                />
              </View>
              <View>
                <Image
                  style={{width: 50 * 2.5, height: 63 * 2.5}}
                  source={require('../res/img/4/1.png')}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 20,
                  left: 70,
                  width: windowsWidth,
                  height: windowsHeight,
                }}
                level={20}>
                <Image
                  style={{width: 46 * 2.5, height: 98 * 2.5}}
                  source={require('../res/img/4/3.png')}
                />
              </View>
            </View>
            <View style={styles.info}>
              <View level={10}>
                <Text style={styles.title}>Custom Theme</Text>
              </View>
              <View level={15}>
                <Text style={styles.description}>
                  Customize Your Favorite Color Theme
                </Text>
              </View>
            </View>
          </View>
        </AppIntro>
      </View>
    );
  }
}
