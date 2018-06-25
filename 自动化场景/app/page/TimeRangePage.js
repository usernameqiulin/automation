import React from 'react';
import Bone from '@bone/bone-mobile';
import { logger } from '@bone/living-sdk';
import TimeRangeView from '../view/TimeRangeView';
import TimeRangeModel from '../model/TimeRangeModel';
import { 
  FLOW_TYPE_CONDITION,
  FLOW_ACTION_TYPE_CREATE,
} from '../config/constants';


const log = logger('scene/page/timerange');

class TimeRangePage extends Bone.Page {
  constructor(...args) {
    super(...args);
    this.actions.init(this.props.location.state.payload);
  }

  onSave = (timeRanger) => {
    const { flow } = this.props.location.state;
    this.navigation.popTo('/', { //回调到首页路由
      flow: flow || {
        flowType: FLOW_TYPE_CONDITION,
        actionType: FLOW_ACTION_TYPE_CREATE,
      },
      payload: timeRanger,
    });
  };

  onRepeatPress = () => {
    log.info('repeat press');
    this.navigation.push('/repeat', {
      repeat: this.props.repeat,
    });
  };

  pageDidBack(location) {
    log.info('page back', location);
    this.actions.setRepeat(location.state.repeat);
  }

  render() {
    return (
      <TimeRangeView {...this.props} onRepeatPress={this.onRepeatPress} onSave={this.onSave} />
    );
  }
}

export default Bone.connect(TimeRangePage, TimeRangeModel);
