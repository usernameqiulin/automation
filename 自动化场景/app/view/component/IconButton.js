import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class IconButton extends Component {
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
    backgroundColor: '#fff',
  },
  text: {
    textAlign: 'center',
    fontSize: 36,
  },
});
