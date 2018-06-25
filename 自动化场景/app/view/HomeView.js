import React, { Component } from 'react';
import { Blank, Switch, List } from '@bone/bone-mobile-ui';
import { connectIntl } from '@bone/intl';
import PropTypes from 'prop-types';
import Layout from '../layout';
import TCAList from './component/TCAList';
import FlatButton from './component/FlatButton';
import AddNameComponent from '../view/component/AddName';
import {
  FLOW_TYPE_TRIGGER,
  FLOW_TYPE_CONDITION,
  FLOW_TYPE_ACTION,
  FLOW_TYPE_OTHERS,
} from '../config/constants';
import SceneIcon from './component/SceneIcon';

class HomeView extends Component {
  static propTypes = {
    // intl provider
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }).isRequired,

    // page methods
    onBack: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onSwitch: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onAddItem: PropTypes.func.isRequired,
    onEditItem: PropTypes.func.isRequired,
    onDelItem: PropTypes.func.isRequired,
    router: PropTypes.func.isRequired,

    // data from model
    isNew: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isAddingName: PropTypes.bool,
    name: PropTypes.string,
    enable: PropTypes.bool.isRequired,
    icon: PropTypes.string,
    triggers: PropTypes.object.isRequired,
    conditions: PropTypes.object.isRequired,
    actions: PropTypes.array.isRequired,
  }

  render() {
    // @todo
    // loading view

    const {
      intl, router, onBack, onSave, onSwitch, onDelete, onAddItem, onEditItem, onDelItem,
      isNew, isLoading, isAddingName, name, enable, icon, triggers, conditions, actions,
    } = this.props;

    return (
      <Layout
        title={isNew ? intl.formatMessage('scene.home.navbar.defaultTitle') : name}
        onLeftPress={onBack}
        right={intl.formatMessage('scene.common.save')}
        onRightPress={onSave}
        isLoading={isLoading}
      >
        {
          // 新增场景名称弹框
          isAddingName ? (
            <AddNameComponent
              intl={intl}
              name={name}
              onConfirm={() => onSave(true)}
            />
          ) : null
        }

        {/* 场景概要部分 */}
        <List>
          {
            // 场景开关
            isNew ?
              null :
              <List.Item
                title={intl.formatMessage('scene.home.overview.switch')}
                extra={
                  <Switch
                    checked={!!enable}
                    onChange={onSwitch}
                  />
                }
              />
          }
          {
            // 场景名称
            isNew ?
              null :
              <List.Item
                title={intl.formatMessage('scene.home.overview.name')}
                extra={name}
                arrow="right"
                onPress={() => router('/name', {
                  flow: {
                    flowType: FLOW_TYPE_OTHERS,
                  },
                  name,
                })}
              />
          }
          <List.Item
            title={intl.formatMessage('scene.home.overview.icon')}
            extra={
              <SceneIcon icon={icon} />
            }
            arrow="right"
            onPress={() => router('/icon', {
              flow: {
                flowType: FLOW_TYPE_OTHERS,
              },
              icon,
            })}
          />
        </List>

        {/* Trigger列表 */}
        <TCAList
          flowType="trigger"
          list={triggers.items}
          router={router}
          onAddItem={() => onAddItem(FLOW_TYPE_TRIGGER)}
          onEditItem={(index, item) => onEditItem(FLOW_TYPE_TRIGGER, index, item)}
          onDelItem={(index, item) => onDelItem(FLOW_TYPE_TRIGGER, index, item)}
        />

        {/* Condition列表 */}
        <TCAList
          flowType="condition"
          list={conditions.items}
          onAddItem={() => onAddItem(FLOW_TYPE_CONDITION)}
          onEditItem={(index, item) => onEditItem(FLOW_TYPE_CONDITION, index, item)}
          onDelItem={(index, item) => onDelItem(FLOW_TYPE_CONDITION, index, item)}
        />

        {/* Action列表 */}
        <TCAList
          flowType="action"
          list={actions}
          router={router}
          onAddItem={() => onAddItem(FLOW_TYPE_ACTION)}
          onEditItem={(index, item) => onEditItem(FLOW_TYPE_ACTION, index, item)}
          onDelItem={(index, item) => onDelItem(FLOW_TYPE_ACTION, index, item)}
        />

        <Blank />
        { isNew ?
          null :
          <FlatButton
            title={intl.formatMessage('scene.home.bottom.delete')}
            color="#FF3838"
            onPress={onDelete}
          />
        }
        <Blank />
        <Blank />
        <Blank />
        <Blank />
      </Layout>
    );
  }
}

export default connectIntl(HomeView);
