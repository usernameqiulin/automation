import Bone from '@bone/bone-mobile';
import { APIGateway, logger } from '@bone/living-sdk';
import { APIGW_PATH_SCENE_DEVICELIST } from '../config/constants';

const log = logger('scene/model/device');

export default class DeviceModel extends Bone.Model {
  static initialState = {
    devices: [],
    isLoading: false,
  };

  loading() {
    return {
      ...this.state,
      isLoading: true,
    };
  }

  async loadDevices(flowType = 0, groupId = null) {
    let res;
    let devices = [];
    try {
      res = await APIGateway.request(APIGW_PATH_SCENE_DEVICELIST, {
        version: '1.0.1',
        data: {
          flowType,
          groupId,
          pageNum: 1,
          pageSize: 100,
          authType: true,
        },
        authType: 'iotAuth',
      });
      if (res.code !== '200') {
        log.error(res);
        return {
          ...this.state,
          isLoading: false,
        };
      }
      devices = res.data.data;
      log.info('get device list', devices);
    } catch (e) {
      log.error('get device list error', e);
      return {
        ...this.state,
        isLoading: false,
      };
    }
    return {
      ...this.state,
      isLoading: false,
      devices,
    };
  }
}
