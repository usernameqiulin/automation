import React from 'react';
import Bone from '@bone/bone-mobile';
import FunctionListView from '../view/FunctionListView';
import FunctionListModel from '../model/FunctionListModel';
import { FLOW_TYPE_PARAMS } from '../config/constants';

class FunctionPage extends Bone.Page {
  constructor(...args) {
    super(...args);
    const { flowType } = this.props.location.state;
    const flowTypeParam = FLOW_TYPE_PARAMS[flowType];
    this.actions.loadFunctionList(this.props.location.state, flowTypeParam);
  }

  onItemPress = (func) => {
    const { flow, flowType } = this.props.location.state;
    this.navigation.push('/function', {
      ...this.props.location.state,
      localizedFunctionName: func.name,
      ...func,
      flow: flow || {
        flowType,
        actionType: 'create',
      },
    });
  };

  render() {
    return <FunctionListView {...this.props} onItemPress={this.onItemPress} />;
  }
}

export default Bone.connect(FunctionPage, FunctionListModel);
