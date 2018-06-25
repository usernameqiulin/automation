import Bone from '@bone/bone-mobile';
import invariant from 'invariant';
import { APIGateway, logger } from '@bone/living-sdk';
import { cronToTimer, timerToCron } from '../util/time';
import {
  SCENE_TYPE_USER,
  SCENE_TYPE_HOUSECENTER,

  SCENE_ICON_DEFAULT,
  SCENE_ICON_URL,

  FLOW_TYPE_TRIGGER,
  FLOW_TYPE_CONDITION,
  FLOW_TYPE_ACTION,

  FLOW_ACTION_TYPE_CREATE,
  FLOW_ACTION_TYPE_UPDATE,
  FLOW_ACTION_TYPE_DELETE,

  URI_LOGICAL_OR,
  URI_LOGICAL_AND,
  URI_TRIGGER_TIMER,
  URI_TRIGGER_DEVICE_PROPERTY,
  URI_CONDITION_TIMER,
  URI_CONDITION_DEVICE_PROPERTY,
  URI_ACTION_DEVICE_SETPROPERTY,
  // URI_ACTION_SCENE_TRIGGER,

  APIGW_PATH_SCENE_READ,
  APIGW_PATH_SCENE_CREATE,
  APIGW_PATH_SCENE_UPDATE,
  APIGW_PATH_SCENE_DELETE,
  COMPARE_OPERATOR,
} from '../config/constants';

const log = logger('scene/model/home');


export default class HomeModel extends Bone.Model {
  static initialState = {
    // overview
    sceneType: SCENE_TYPE_USER,
    sceneId: null,
    groupId: null,

    // detail
    name: null,
    enable: true,
    icon: SCENE_ICON_DEFAULT,
    triggers: {
      uri: URI_LOGICAL_OR,
      params: {},
      items: [],
    },
    conditions: {
      uri: URI_LOGICAL_AND,
      params: {},
      items: [],
    },

    actions: [],

    // UI
    isNew: true,
    isModified: false,
    isSaving: false,
    isLoading: true,
  }

  initNewScene(sceneType, sceneId = null, groupId = null) {
    log.info('init new scene', sceneType, sceneId, groupId);

    invariant(
      sceneType && (sceneType === SCENE_TYPE_USER || sceneType === SCENE_TYPE_HOUSECENTER),
      `Illegal sceneType, should be either ${SCENE_TYPE_USER} or ${SCENE_TYPE_HOUSECENTER}, but got ${sceneType}`);

    return {
      ...this.state,
      sceneType,
      groupId,
      sceneId,
      isNew: true,
    };
  }

  async initExistScene(sceneType, sceneId, groupId = null) {
    log.info('init exist scene', sceneType, sceneId, groupId);

    invariant(
      sceneType && (sceneType === SCENE_TYPE_USER || sceneType === SCENE_TYPE_HOUSECENTER),
      `Illegal sceneType, should be either ${SCENE_TYPE_USER} or ${SCENE_TYPE_HOUSECENTER}, but got ${sceneType}`);

    invariant(
      typeof sceneId === 'string',
      `Illegal sceneId, should be number, but got ${sceneId}`);

    // fetch scene data
    const ret = await APIGateway.request(APIGW_PATH_SCENE_READ, {
      version: '1.0.1',
      authType: 'iotAuth',
      protocol: 'https',
      data: {
        sceneId,
        groupId,
      },
    });

    invariant(Number(ret.code) === 200,
      'Failed fetching scene data');

    const state = resToState(ret.data);
    return {
      ...this.state,
      sceneType,
      sceneId,
      groupId,
      isNew: false,
      ...state,
    };
  }

  switch(enable) {
    log.info('switch', enable);

    return {
      ...this.state,
      enable,
      isModified: true,
    };
  }

  async create() {
    log.info('create scene');

    const payload = stateToReq(this.state);
    const res = await APIGateway.request(APIGW_PATH_SCENE_CREATE, {
      version: '1.0.1',
      authType: 'iotAuth',
      protocol: 'https',
      data: {
        ...payload,
        enable: true,
      },
    });

    if (Number(res.code) !== 200) {
      throw new Error(res.message);
    }

    log.info('create scene success');
  }

  async update() {
    log.info('update scene');

    const data = stateToReq(this.state);
    const res = await APIGateway.request(APIGW_PATH_SCENE_UPDATE, {
      version: '1.0.1',
      authType: 'iotAuth',
      protocol: 'https',
      data,
    });

    if (Number(res.code) !== 200) {
      throw new Error(res.message);
    }
  }

  async delete() {
    log.info('delete scene');
    const { sceneType, sceneId, groupId } = this.state;
    const data = { sceneType, sceneId, groupId };
    const res = await APIGateway.request(APIGW_PATH_SCENE_DELETE, {
      version: '1.0.1',
      authType: 'iotAuth',
      protocol: 'https',
      data,
    });

    if (Number(res.code) !== 200) {
      throw new Error(res.message);
    }
  }

  set(state) {
    return {
      ...state,
      isModified: typeof state.isLoading === 'undefined' ? true : this.state.isModified,
    };
  }

  modifyItem(flowType, actionType, index = null, itemParams) {
    log.info('modifyItem', flowType, actionType, index, itemParams);

    const item = {
      params: itemParams,
    };

    if (FLOW_TYPE_TRIGGER === flowType) {
      item.uri = itemParams.time ? URI_TRIGGER_TIMER : URI_TRIGGER_DEVICE_PROPERTY;
      const triggers = { ...this.state.triggers };
      triggers.items = modifyArr(actionType, triggers.items, index, item);

      return {
        triggers,
        isModified: true,
      };
    }

    if (FLOW_TYPE_CONDITION === flowType) {
      item.uri = itemParams.time ? URI_CONDITION_TIMER : URI_CONDITION_DEVICE_PROPERTY;
      const conditions = { ...this.state.conditions };
      conditions.items = modifyArr(actionType, conditions.items, index, item);

      return {
        conditions,
        isModified: true,
      };
    }

    if (FLOW_TYPE_ACTION === flowType) {
      // @todo
      // URI_ACTION_SCENE_TRIGGER
      item.uri = URI_ACTION_DEVICE_SETPROPERTY;
      let actions = [...this.state.actions];
      actions = modifyArr(actionType, actions, index, item);
      return {
        actions,
        isModified: true,
      };
    }

    log.warn(`unkown flow type ${flowType}`);
  }
}
function stateToReq(state) {
  const { sceneId, sceneType, groupId, name, enable, icon, triggers, conditions, actions } = state;

  return {
    sceneId,
    sceneType,
    groupId,
    name,
    enable,
    icon: iconToUrl(icon),
    triggers: triggers.items && triggers.items.length ? {
      uri: triggers.uri,
      params: triggers.params,
      items: mapper(triggers.items),
    } : null,

    // remove conditons when it's empty
    conditions: conditions.items && conditions.items.length ? {
      uri: conditions.uri,
      params: triggers.params,
      items: mapper(conditions.items),
    } : null,
    actions: mapper(actions),
  };

  function mapper(items) {
    return items.map((item) => {
      // time
      if (item.params.time) {
        return {
          uri: item.uri,
          status: item.status,
          params: timerToCron(item.params),
        };
      }
      // device
      const {
        iotId, functionName, compareType, compareValue,
      } = item.params;

      return {
        uri: item.uri,
        status: item.status,
        params: {
          iotId,
          propertyName: functionName,
          compareType,
          compareValue,
          // 兼容action的格式
          propertyValue: compareValue,
        },
      };
    });
  }
}
function modifyArr(actionType, arr, index, item) {
  if (FLOW_ACTION_TYPE_CREATE === actionType) {
    arr.push(item);
    return arr;
  }

  if (FLOW_ACTION_TYPE_UPDATE === actionType) {
    arr.splice(index, 1, item);
    return arr;
  }

  if (FLOW_ACTION_TYPE_DELETE === actionType) {
    arr.splice(index, 1);
    return arr;
  }
}

function resToState(res) {
  const icon = urlToIcon(res.icon);

  // triggers maybe empty
  !res.triggers && (res.triggers = {
    uri: URI_LOGICAL_OR,
    params: {},
    items: [],
  });

  const triggers = {
    ...res.triggers,
    items: res.triggers.items.map((item) => {
      const nextItem = { ...item };

      if (nextItem.params.cron) {
        nextItem.params = cronToTimer(item.params);
      } else {
        nextItem.params.localizedFunctionName = nextItem.params.localizedPropertyName;
        nextItem.params.functionName = nextItem.params.propertyName;
      }

      return nextItem;
    }),
  };

  // conditions maybe empty
  !res.conditions && (res.conditions = {
    uri: URI_LOGICAL_AND,
    params: {},
    items: [],
  });

  const conditions = {
    ...res.conditions,
    items: res.conditions.items.map((item) => {
      const nextItem = { ...item };

      if (nextItem.params.cron) {
        nextItem.params = cronToTimer(item.params);
      } else {
        nextItem.params.localizedFunctionName = nextItem.params.localizedPropertyName;
        nextItem.params.functionName = nextItem.params.propertyName;
      }

      return nextItem;
    }),
  };

  const actions = res.actions.map((item) => {
    const { localizedPropertyName, propertyName, propertyValue } = item.params;
    return {
      ...item,
      params: {
        ...item.params,
        localizedFunctionName: localizedPropertyName,
        functionName: propertyName,
        compareType: COMPARE_OPERATOR.EQT,
        compareValue: propertyValue,
      },
    };
  });

  return {
    ...res,
    icon,
    triggers,
    conditions,
    actions,
  };
}

function urlToIcon(url) {
  return url.replace(SCENE_ICON_URL, '').replace('.png', '');
}

function iconToUrl(icon) {
  return `${SCENE_ICON_URL}${icon}.png`;
}
