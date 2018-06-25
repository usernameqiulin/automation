import React from 'react';
import Bone from '@bone/bone-mobile';
import SceneIconView from '../view/SceneIconView';

class SceneIconPage extends Bone.Page {
  onSave = (icon) => {
    const { flow } = this.props.location.state;

    this.navigation.popTo('/', {
      flow,
      payload: {
        icon,
      },
    });
  };

  render() {
    return <SceneIconView {...this.props} onSave={this.onSave} />;
  }
}

export default SceneIconPage;
