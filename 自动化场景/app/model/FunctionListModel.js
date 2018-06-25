import Bone from '@bone/bone-mobile';
import { APIGateway, logger } from '@bone/living-sdk';
import { APIGW_PATH_SCENE_ABILITY_LIST } from '../config/constants';

const log = logger('scene/model/functionlist');

export default class FunctionListModel extends Bone.Model {
  static initialState = {
    funcs: [],
  };

  async loadFunctionList(device, flowType = 0) {
    let funcs = [];
    try {
      const ablityListRes = await APIGateway.request(APIGW_PATH_SCENE_ABILITY_LIST, {
        version: '1.0.1',
        data: {
          iotId: device.iotId,
          flowType,
        },
        authType: 'iotAuth',
      });
      if (ablityListRes.code !== '200') {
        log.error(ablityListRes);
        return;
      }
      funcs = ablityListRes.data.simplifyAbilityDTOs;
      log.info('get ability list', funcs);
    } catch (e) {
      log.error('get ablity list or tsl error', e);
      return;
    }
    return {
      ...this.state,
      funcs,
    };
  }
}
