/*
 * @Author: your name
 * @Date: 2019-12-14 22:12:13
 * @LastEditTime: 2019-12-15 09:21:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub_RN/js/pages/FetchDemo.js
 */
/*
 * @Author: your name
 * @Date: 2019-12-13 22:54:09
 * @LastEditTime: 2019-12-14 08:44:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub_RN/js/pages/DetailPage.js
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import DataStore from '../expand/DataStore';

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restext: '',
      searchKey: '',
      time: '',
    };
  }
  loadDate() {
    const url = `https://api.github.com/search/repositories?q=${this.state.searchKey}`;
    const dataStore = new DataStore();
    dataStore.fetchData(url).then(restext => {
      console.log(restext);
      this.setState({
        restext: JSON.stringify(restext),
        time: new Date(restext.timestamp),
      });
    });
  }
  render() {
    return (
      <View>
        <Text>FetchDemo</Text>
        <Text>{this.state.searchKey}</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            console.log(text);
            this.setState({searchKey: text});
          }}
        />
        <Button
          title="search"
          onPress={() => {
            this.loadDate();
          }}
        />
        <Text>{`获取时间${this.state.time}`}</Text>
        <Text>{this.state.restext}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contains: {
    fontSize: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 300,
  },
});
