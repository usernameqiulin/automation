import React from 'react';
import Bone from '@bone/bone-mobile';
import FunctionView from '../view/FunctionView';
import FunctionModel from '../model/FunctionModel';
import { FLOW_TYPE_PARAMS } from '../config/constants';

class FunctionPage extends Bone.Page {
  constructor(...args) {
    super(...args);
    const { location } = this.props;
    const { iotId, flow, functionName, identifier } = location.state;
    const flowTypeParam = FLOW_TYPE_PARAMS[flow.flowType];
    this.actions.loading();
    this.actions.loadFunction(functionName || identifier, iotId, flowTypeParam);
  }

  onSave = (data) => {
    const { location } = this.props;
    const {
      iotId,
      flow,
      functionName,
      identifier,
      productImage,
      localizedProductName,
      localizedFunctionName,
    } = location.state;
    this.navigation.popTo('/', {
      flow,
      payload: {
        ...data,
        iotId,
        functionName: functionName || identifier,
        productImage,
        localizedProductName,
        localizedFunctionName: localizedFunctionName || this.props.name,
      },
    });
  };

  render() {
    return <FunctionView {...this.props} onSave={this.onSave} />;
  }
}

export default Bone.connect(FunctionPage, FunctionModel);
