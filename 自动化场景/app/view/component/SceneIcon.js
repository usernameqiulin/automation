import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import icons from '../../config/icons';

const iconHash = {};
icons.forEach((item) => {
  iconHash[item.name] = item.image;
});

export default class SceneIcon extends Component {
  static propTypes = {
    icon: PropTypes.string,
  }

  render() {
    const src = iconHash[this.props.icon];
    return src ? <Image style={styles.icon} source={src} /> : null;
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
});
