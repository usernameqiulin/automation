import React from 'react';
import Bone from '@bone/bone-mobile';
import ConditionView from '../view/ConditionView';
import {
  CONDITION_TYPE_TIMERANGER,
  CONDITION_TYPE_DEVICE,
  FLOW_TYPE_CONDITION,
} from '../config/constants';

export default class ConditionPage extends Bone.Page {
  onTypePress = (type) => {
    if (type === CONDITION_TYPE_TIMERANGER) {
      this.navigation.push('/timeRange', {
        flowType: FLOW_TYPE_CONDITION,
      });
    } else if (type === CONDITION_TYPE_DEVICE) {
      this.navigation.push('/deviceList', {
        flowType: FLOW_TYPE_CONDITION,
      });
    }
  };

  render() {
    return (
      <ConditionView
        {...this.props}
        hasTimer={this.location.state.hasTimer}
        onTypePress={this.onTypePress}
      />
    );
  }
}
