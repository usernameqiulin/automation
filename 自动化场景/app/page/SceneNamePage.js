import React from 'react';
import Bone from '@bone/bone-mobile';
import SceneNameView from '../view/SceneNameView';

class SceneNamePage extends Bone.Page {
  onSave = (name) => {
    const { flow } = this.location.state;

    this.navigation.popTo('/', {
      flow,
      payload: {
        name,
      },
    });
  };

  render() {
    return <SceneNameView {...this.props} onSave={this.onSave} />;
  }
}

export default SceneNamePage;
