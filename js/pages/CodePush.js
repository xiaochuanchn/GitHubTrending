import React, {Component} from 'react';
import GlobalStyles from '../res/GlobalStyles';
import {View} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import {connect} from 'react-redux';
class CodePush extends Component {
  render() {
    const {theme} = this.props;
    console.log(theme);
    let statusBar = {
      backgroundColor: theme.themeColor,
      barStyle: 'light-content',
    };
    let navigationBar = (
      <NavigationBar
        title={'Update'}
        statusBar={statusBar}
        style={{backgroundColor: theme.themeColor}}
      />
    );
    return <View style={GlobalStyles.root_container}>{navigationBar}</View>;
  }
}
const mapStateToProps = state => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(CodePush);
