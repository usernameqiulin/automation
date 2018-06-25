import React from 'react';
import Bone from '@bone/bone-mobile';
import DeviceModel from '../model/DeviceModel';
import DeviceView from '../view/DeviceView';
import { FLOW_TYPE_PARAMS } from '../config/constants';

class DevicePage extends Bone.Page {
  constructor(...args) {
    super(...args);
    const { flowType, groupId } = this.props.location.state;
    const flowTypeParam = FLOW_TYPE_PARAMS[flowType];
    this.actions.loading();
    this.actions.loadDevices(flowTypeParam, groupId);
  }

  onItemPress = (device) => {
    this.navigation.push('/functionList', {
      flowType: this.props.location.state.flowType,
      productImage: device.image,
      localizedProductName: device.nickName,
      ...device,
    });
  };

  render() {
    return <DeviceView {...this.props} onItemPress={this.onItemPress} />;
  }
}

export default Bone.connect(DevicePage, DeviceModel);
