// common
export const LOCALE_DEFAULT = 'zh-CN';

// API Gateway
export const APIGW_PATH_SCENE_READ = '/scene/info/get';
export const APIGW_PATH_SCENE_CREATE = '/scene/create';
export const APIGW_PATH_SCENE_UPDATE = '/scene/update';
export const APIGW_PATH_SCENE_DELETE = '/scene/delete';
export const APIGW_PATH_SCENE_DEVICELIST = '/scene/thing/list';
export const APIGW_PATH_SCENE_ABILITY_LIST = '/iotid/scene/ability/tsl/list';

// scene data
export const SCENE_TYPE_USER = 'ilop';
export const SCENE_TYPE_HOUSECENTER = 'hc';
export const SCENE_ACTION_TYPE_CREATE = 'create';
export const SCENE_ACTION_TYPE_UPDATE = 'update';
export const SCENE_ACTION_TYPE_CANCEL = 'cancel';
export const SCENE_ACTION_TYPE_DELETE = 'delete';
export const SCENE_ICON_DEFAULT = 'default';

// scene page data type
export const SCENE_PAGE_DATA_TYPE_NAME = 'name';
export const SCENE_PAGE_DATA_TYPE_ICON = 'icon';
export const SCENE_PAGE_DATA_TYPE_TRIGGER_TIMER = 'trigger/timer';
export const SCENE_PAGE_DATA_TYPE_TRIGGER_DEVICE = 'trigger/device';
export const SCENE_PAGE_DATA_TYPE_CONDITION_TIMER = 'condition/timer';
export const SCENE_PAGE_DATA_TYPE_CONDITION_DEVICE = 'condition/device';
export const SCENE_PAGE_DATA_TYPE_ACTION_DEVICE = 'action/device';

// scene page icon url
export const SCENE_ICON_URL = 'https://g.aliplus.com/scene_icons/';

// flow types
export const FLOW_TYPE_TRIGGER = 'trigger';
export const FLOW_TYPE_CONDITION = 'condition';
export const FLOW_TYPE_ACTION = 'action';
export const FLOW_TYPE_OTHERS = 'others';
export const FLOW_TYPE_PARAMS = {
  [FLOW_TYPE_TRIGGER]: 0,
  [FLOW_TYPE_CONDITION]: 1,
  [FLOW_TYPE_ACTION]: 2,
};
export const FLOW_ACTION_TYPE_CREATE = 'create';
export const FLOW_ACTION_TYPE_UPDATE = 'update';
export const FLOW_ACTION_TYPE_DELETE = 'delete';

// TCA
export const URI_LOGICAL_OR = 'logical/or';
export const URI_LOGICAL_AND = 'logical/and';
export const URI_TRIGGER_TIMER = 'trigger/timer';
export const URI_TRIGGER_DEVICE_PROPERTY = 'trigger/device/property';
export const URI_CONDITION_TIMER = 'condition/timeRange';
export const URI_CONDITION_DEVICE_PROPERTY = 'condition/device/property';
export const URI_ACTION_DEVICE_SETPROPERTY = 'action/device/setProperty';
export const URI_ACTION_SCENE_TRIGGER = 'action/triggerScene';

// Compare operator
export const COMPARE_OPERATOR = {
  EQT: {
    type: '==',
    i18nKey: 'scene.common.compareType.equal',
  },
  LT: {
    type: '<',
    i18nKey: 'scene.common.compareType.lt',
  },
  GT: {
    type: '>',
    i18nKey: 'scene.common.compareType.gt',
  },
};

// Trigger
export const TRIGGER_TYPE = {
  TIMER: 'timer',
  DEVICE: 'device',
};

export const CONDITION_TYPE_TIMERANGER = 'timerRanger';
export const CONDITION_TYPE_DEVICE = 'device';


// Function
export const FUNC_DATA_TYPE = {
  BOOL: 'bool',
  ENUM: 'enum',
  INT: 'int',
  FLOAT: 'float',
};

export const CRON_TYPE_LINUX = 'linux';

export const DEVICE_STATUS_AVAILABLE = 1;
export const DEVICE_STATUS_UNAVAILABLE = 0;
