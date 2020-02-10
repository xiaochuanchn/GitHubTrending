import React, {Component} from 'react';
import TabNavigator from '../navigator/TabNavigator';
import NavigatorUtil from '../navigator/NavigatorUtil';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import {connect} from 'react-redux';
class HomePage extends Component {
  render() {
    console.log(this.props);
    const {theme} = this.props;
    NavigatorUtil.navigation = this.props.navigation;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <TabNavigator />
      </SafeAreaViewPlus>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
});
export default connect(mapStateToProps)(HomePage);
