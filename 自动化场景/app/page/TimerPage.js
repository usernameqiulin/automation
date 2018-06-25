import React from 'react';
import Bone from '@bone/bone-mobile';
import { logger } from '@bone/living-sdk';
import TimerModel from '../model/TimerModel';
import TimerView from '../view/TimerView';
import { 
  FLOW_TYPE_TRIGGER,
  FLOW_ACTION_TYPE_CREATE,
} from '../config/constants';

const log = logger('scene/page/timer');

class TimerPage extends Bone.Page {
  constructor(...args) {
    super(...args);
    this.actions.init(this.props.location.state.payload);
  }

  onSave = (timer) => {
    const { flow } = this.props.location.state;

    this.navigation.popTo('/', {
      flow: flow || {
        flowType: FLOW_TYPE_TRIGGER,
        actionType: FLOW_ACTION_TYPE_CREATE,
      },
      payload: timer,
    });
  };

  pageDidBack(location) {
    log.info('page back', location);
    this.actions.setRepeat(location.state.repeat);
  }

  onRepeatPress = () => {
    log.info('repeat press');
    this.navigation.push('/repeat', {
      repeat: this.props.repeat,
    });
  };

  onTimeChange = (...value) => {
    log.info('time change', value);
    this.actions.setTime(value);
  };

  render() {
    log.info('this.props.loaction.state', this.props.location.state);
    return (
      <TimerView
        {...this.props}
        onSave={this.onSave}
        onTimeChange={this.onTimeChange}
        onRepeatPress={this.onRepeatPress}
      />
    );
  }
}

export default Bone.connect(TimerPage, TimerModel);
