import React, {Component} from 'react';
import {ListItem, Button} from 'react-native-elements';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HTMLView from 'react-native-htmlview';
import BaseItem from './BaseItem';

export default class TrendingItem extends BaseItem {
  render() {
    const {projectModel} = this.props;
    const {item} = projectModel;
    if (!item) return null;
    return (
      <TouchableOpacity onPress={() => this.onItemClick()}>
        <ListItem
          title={
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.fullName}</Text>
              {this._favoriteIcon()}
            </View>
          }
          subtitle={
            <View>
              <HTMLView
                value={'<p>' + item.description + '</p>'}
                stylesheet={{p: styles.p}}
              />
              <Text style={styles.descriptions} numberOfLines={3}>
                {item.meta}
              </Text>
              <View style={styles.starContainer}>
                <View style={styles.textContainer}>
                  <Ionicons name="md-star" size={14} />
                  <Text style={styles.text}>{item.starCount}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Ionicons name="md-git-branch" size={14} />
                  <Text style={styles.text}>{item.forkCount}</Text>
                </View>
              </View>
            </View>
          }
          leftAvatar={{
            source: {uri: item.contributors[0]},
          }}
          bottomDivider
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
    // width: 300,
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
  p: {
    color: '#666',
    fontSize: 12,
    marginBottom: 8,
  },
  buttonStyle: {
    height: 20,
    width: 40,
    padding: 0,
  },
  buttonTitleStyle: {
    fontSize: 12,
    marginLeft: 3,
  },
});
