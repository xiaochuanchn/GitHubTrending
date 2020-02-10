/*
 * @Author: your name
 * @Date: 2019-12-21 17:04:11
 * @LastEditTime : 2019-12-30 10:24:49
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /GitHub_RN/js/common/FavriteItem.js
 */
import React, {Component} from 'react';
import {ListItem, Button} from 'react-native-elements';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BaseItem from '../common/BaseItem';
export default class PopularItem extends BaseItem {
  render() {
    const {projectModel} = this.props;
    const {item} = projectModel;
    if (!item || !item.owner) return null;
    return (
      <TouchableOpacity onPress={() => this.onItemClick()}>
        <ListItem
          title={
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.full_name}</Text>
              {this._favoriteIcon()}
            </View>
          }
          subtitle={
            <View>
              <Text style={styles.descriptions} numberOfLines={3}>
                {item.description}
              </Text>
              <View style={styles.starContainer}>
                <View style={styles.textContainer}>
                  <Ionicons name="md-star" size={14} />
                  <Text style={styles.text}>{item.stargazers_count}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Ionicons name="md-git-branch" size={14} />
                  <Text style={styles.text}>{item.forks_count}</Text>
                </View>
              </View>
            </View>
          }
          leftAvatar={{
            source: {uri: item.owner.avatar_url},
          }}
          bottomDivider
          // topDivider
          //   chevron
        />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
  },
  starContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginRight: 15,
    marginLeft: 10,
    color: '#666',
  },
  textContainer: {
    flexDirection: 'row',
  },
  descriptions: {
    color: '#666',
    fontSize: 12,
  },
  buttonStyle: {
    height: 20,
    width: 40,
    padding: 0,
  },
  buttonTitleStyle: {
    fontSize: 10,
    marginLeft: 3,
  },
});
