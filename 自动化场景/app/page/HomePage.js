import React from 'react';
import Bone from '@bone/bone-mobile';
import { logger } from '@bone/living-sdk';
import { Toast, ActionSheet } from '@bone/bone-mobile-ui';
import { connectIntl } from '@bone/intl';
import HomeView from '../view/HomeView';
import HomeModel from '../model/HomeModel';
import {
  SCENE_ACTION_TYPE_CANCEL,
  SCENE_ACTION_TYPE_CREATE,
  SCENE_ACTION_TYPE_UPDATE,
  SCENE_ACTION_TYPE_DELETE,

  FLOW_TYPE_OTHERS,
  FLOW_ACTION_TYPE_DELETE,

  FLOW_ACTION_TYPE_CREATE,
  FLOW_ACTION_TYPE_UPDATE,
  FLOW_TYPE_TRIGGER,
  FLOW_TYPE_CONDITION,
  FLOW_TYPE_ACTION,
  URI_TRIGGER_TIMER,
  URI_CONDITION_TIMER,
} from '../config/constants';

const DELEGATE_METHODS = [
  'onBack',
  'onSave',
  'onSwitch',
  'onDelete',
  'onAddItem',
  'onEditItem',
  'onDelItem',
  'router',
];

const log = logger('scene/page/home');

class HomePage extends Bone.Page {
  delegateMethods = {};

  constructor(...args) {
    super(...args);

    DELEGATE_METHODS.forEach((methodName) => {
      this.delegateMethods[methodName] = this[methodName].bind(this);
    });
  }

  async componentDidMount() {
    // 初始化插件参数
    const { sceneType, sceneId, groupId } = Bone.query;
    const { intl } = this.props;

    try {
      if (sceneId) {
        await this.actions.initExistScene(sceneType, sceneId, groupId);
      } else {
        this.actions.initNewScene(sceneType, sceneId, groupId);
      }
    } catch (err) {
      log.error('init scene error', err);
      Toast.info({
        duration: 1500,
        onClose: this.onBack.bind(this),
        title: intl.formatMessage('scene.home.error.init'),
      });
    } finally {
      this.actions.set({ isLoading: false });
    }
  }

  onBack() {
    const { intl, isModified } = this.props;

    isModified ?
      ActionSheet.open({
        title: intl.formatMessage('scene.home.save.unsavedTip'),
        options: [
          {
            text: intl.formatMessage('scene.common.confirm'),
            style: { color: '#1FC88B' },
          },
        ],
        cancelText: intl.formatMessage('scene.common.cancel'),
        cancelStyle: { color: '#1FC88B' },
        onPress: (index) => {
          if (index === 0) {
            this.exit(SCENE_ACTION_TYPE_CANCEL);
          }
        },
      }) :
      this.exit(SCENE_ACTION_TYPE_CANCEL);
  }

  onSave(isConfirmed = false) {
    const { intl, isSaving, isNew, isAddingName, name, icon, triggers, actions } = this.props;

    if (isSaving) {
      Toast.info({
        duration: 1500,
        title: intl.formatMessage('scene.home.tip.saveTooFrequently'),
      });
      return;
    }

    // validation
    let tipKey = null;

    if (!isNew && name.trim().length === 0) {
      tipKey = 'scene.home.tip.nameNotSet';
    }

    if (!icon) {
      tipKey = 'scene.home.tip.iconNotSet';
    }

    // trigger is optional
    // if (!tipKey && !triggers.items.length) {
    //   tipKey = 'scene.home.tip.triggersNotSet';
    // }

    // condition is optional
    // if (!tipKey && !conditions.items.length) {
    //   tipKey = 'scene.home.tip.conditionsNotSet';
    // }

    if (!tipKey && !actions.length) {
      tipKey = 'scene.home.tip.actionsNotSet';
    }

    if (tipKey) {
      Toast.info({
        duration: 1500,
        title: intl.formatMessage(tipKey),
      });
      return;
    }

    // add name
    if (isNew && !isConfirmed && !isAddingName) {
      this.actions.set({
        // use timestamp to make sure it will prompt
        isAddingName: Date.now(),
      });
      return;
    }

    // finally save
    this.save();
  }

  onDelete() {
    const { intl } = this.props;

    ActionSheet.open({
      title: intl.formatMessage('scene.home.bottom.deleteTip'),
      options: [
        {
          text: intl.formatMessage('scene.home.bottom.doubleDelete'),
          style: { color: '#FF3838' },
        },
      ],
      cancelText: intl.formatMessage('scene.common.cancel'),
      onPress: (index) => {
        if (index === 0) {
          this.delete();
        }
      },
    });
  }

  onSwitch(preState) {
    this.actions.switch(!preState);
  }


  onAddItem(flowType) {
    // on press add item
    if (FLOW_TYPE_TRIGGER === flowType) {
      let hasTimer = false;
      this.props.triggers.items.forEach((item) => {
        if (item.uri === URI_TRIGGER_TIMER) {
          hasTimer = true;
        }
      });
      this.router('/addTrigger', {
        hasTimer,
      });
      return;
    }

    if (FLOW_TYPE_CONDITION === flowType) {
      let hasTimer = false;
      this.props.conditions.items.forEach((item) => {
        if (item.uri === URI_CONDITION_TIMER) {
          hasTimer = true;
        }
      });
      this.router('/addCondition', {
        hasTimer,
      });
      return;
    }

    if (FLOW_TYPE_ACTION === flowType) {
      this.router('/deviceList', {
        flowType: FLOW_TYPE_ACTION,
        groupId: this.props.groupId,
      });
      return;
    }

    log.warn('unkown flow type', flowType);
  }

  onEditItem(flowType, index, item) {
    // on press edit item

    const flow = {
      flowType,
      actionType: FLOW_ACTION_TYPE_UPDATE,
      index,
    };

    const { params, uri } = item;

    // timer
    if (URI_TRIGGER_TIMER === uri) {
      this.router('/timer', {
        flow,
        payload: params,
      });
      return;
    }

    if (URI_CONDITION_TIMER === uri) {
      this.router('/timeRange', {
        flow,
        payload: params,
      });
      return;
    }

    // device
    this.router('/function', {
      flow,
      ...params,
    });
  }

  onDelItem(flowType, index, item) {
    this.actions.modifyItem(flowType, FLOW_ACTION_TYPE_DELETE, index, item);
  }

  pageWillLeave(location) {
    log.info('leaving homepage', location);
  }

  pageDidBack(location) {
    log.info('back to homepage', location);

    const { state } = location;
    const { flow, payload } = state;

    if (!flow) {
      log.info('page did back by canceled action');
      return;
    }

    const { flowType, actionType, index } = flow;

    if (FLOW_TYPE_OTHERS === flowType) {
      this.actions.set({
        ...payload,
      });
      return;
    }

    if (FLOW_ACTION_TYPE_CREATE === actionType) {
      const { intl, triggers, conditions, actions } = this.props;
      if (
        isDuplicateFunction(
          triggers,
          conditions,
          actions,
          payload.iotId,
          payload.functionName,
          payload.compareType,
          payload.compareValue,
        )) {
        log.info('add item failed, duplicate functionName', payload);
        Toast.info({
          duration: 1500,
          title: intl.formatMessage('scene.home.tca.duplicateFunctionName'),
        });
        return;
      }

      this.actions.modifyItem(flowType, actionType, null, {
        ...payload,
      });
      return;
    }

    if (FLOW_ACTION_TYPE_UPDATE === actionType) {
      this.actions.modifyItem(flowType, actionType, index, {
        ...payload,
      });
      return;
    }

    log.warn('unkown flow', flowType, actionType);

    function isDuplicateFunction(triggers, conditions, actions, iotId, functionName, compareType, compareValue) {
      const items = [...triggers.items, ...conditions.items, ...actions];
      for (const item of items) {
        if (
          item.params &&
          item.params.iotId === iotId &&
          item.params.functionName === functionName &&
          item.params.compareType === compareType &&
          item.params.compareValue === compareValue
        ) {
          return true;
        }
      }
      return false;
    }
  }

  async save() {
    const { isNew, intl } = this.props;

    try {
      // create scene
      if (isNew) {
        this.actions.set({
          isSaving: true,
          isLoading: true,
        });
        await this.actions.create();

        log.info('create scene success');
        Toast.info({
          duration: 1500,
          title: intl.formatMessage('scene.home.success.save'),
          onClose: () => this.exit(SCENE_ACTION_TYPE_CREATE),
        });
        return;
      }

      // update scene
      // save & tip & exit
      this.actions.set({
        isSaving: true,
        isLoading: true,
      });
      await this.actions.update();

      log.info('save scene success');

      Toast.info({
        duration: 1500,
        title: intl.formatMessage('scene.home.success.save'),
        onClose: () => this.exit(SCENE_ACTION_TYPE_UPDATE),
      });
    } catch (err) {
      log.error('save scene failed', err);

      Toast.info({
        duration: 1500,
        title: intl.formatMessage('scene.home.error.save'),
      });
    }

    this.actions.set({
      isSaving: false,
      isLoading: false,
    });
  }

  async delete() {
    const { intl } = this.props;

    try {
      // delete scene
      await this.actions.delete();

      log.info('delete scene success');
      Toast.info({
        duration: 1500,
        title: intl.formatMessage('scene.home.tip.deleteSuccess'),
        onClose: () => this.exit(SCENE_ACTION_TYPE_DELETE),
      });
    } catch (err) {
      log.error('delete scene failed', err);

      Toast.info({
        duration: 1500,
        title: intl.formatMessage('scene.home.error.delete'),
      });
    }
  }

  exit(actionType) {
    const { sceneType, sceneId, groupId } = this.props;
    log.info(`exit plugin with actionType ${actionType}`, sceneType, sceneId, groupId);

    this.app.exit({
      actionType,
      sceneType,
      sceneId,
      groupId,
    });
  }

  router(path, state) {
    this.navigation.push(path, state);
  }

  render() {
    return (
      <HomeView
        {...this.props}
        {...this.delegateMethods}
      />
    );
  }
}

export default connectIntl(Bone.connect(HomePage, HomeModel));
