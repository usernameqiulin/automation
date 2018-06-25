import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class FlatButton extends Component {
  static propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    onPress: PropTypes.func,
  }

  render() {
    const { color, title, onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.body}>
          <Text style={[styles.text, { color }]}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 17,
    paddingBottom: 17,
    backgroundColor: '#fff',
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    height: 20,
    lineHeight: 20,
  },
});
