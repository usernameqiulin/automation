import React from 'react';
import Bone from '@bone/bone-mobile';
import TriggerView from '../view/TriggerView';
import { TRIGGER_TYPE, FLOW_TYPE_TRIGGER } from '../config/constants';

export default class TriggerPage extends Bone.Page {
  onTypePress = (type) => {
    if (type === TRIGGER_TYPE.TIMER) {
      this.navigation.push('/timer', {
        flowType: FLOW_TYPE_TRIGGER,
      });
    } else if (type === TRIGGER_TYPE.DEVICE) {
      this.navigation.push('/deviceList', {
        flowType: FLOW_TYPE_TRIGGER,
      });
    }
  };

  render() {
    return (
      <TriggerView
        {...this.props}
        hasTimer={this.location.state.hasTimer}
        onTypePress={this.onTypePress}
      />
    );
  }
}
