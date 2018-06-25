import React from 'react';
import Bone from '@bone/bone-mobile';
import RepeatView from '../view/RepeatView';

export default class RepeatPage extends Bone.Page {
  onSave = (repeat) => {
    this.navigation.pop({
      repeat,
    });
  };

  render() {
    return <RepeatView {...this.props} onSave={this.onSave} repeat={this.location.state.repeat} />;
  }
}
