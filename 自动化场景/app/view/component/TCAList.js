import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Blank, List, Header, Toast } from '@bone/bone-mobile-ui';
import PropTypes from 'prop-types';
import { connectIntl } from '@bone/intl';
import IconButton from './IconButton';
import { getRepeatLabel } from '../../util/time';
import {
  FLOW_TYPE_TRIGGER,
  FLOW_TYPE_CONDITION,
  FLOW_TYPE_ACTION,
  URI_TRIGGER_DEVICE_PROPERTY,
  URI_CONDITION_DEVICE_PROPERTY,
  URI_ACTION_DEVICE_SETPROPERTY,
  URI_ACTION_SCENE_TRIGGER,

  COMPARE_OPERATOR,
  DEVICE_STATUS_UNAVAILABLE,
} from '../../config/constants';

class TCAList extends Component {
  static propTypes = {
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }).isRequired,

    onAddItem: PropTypes.func,
    onEditItem: PropTypes.func,
    onDelItem: PropTypes.func,

    flowType: PropTypes.oneOf([
      FLOW_TYPE_TRIGGER,
      FLOW_TYPE_CONDITION,
      FLOW_TYPE_ACTION,
    ]).isRequired,

    list: PropTypes.arrayOf(
      PropTypes.oneOfType([
        // device type
        PropTypes.shape({
          url: PropTypes.oneOf([
            URI_TRIGGER_DEVICE_PROPERTY,
            URI_CONDITION_DEVICE_PROPERTY,
            URI_ACTION_DEVICE_SETPROPERTY,
            URI_ACTION_SCENE_TRIGGER,
          ]),
          params: PropTypes.shape({
            productKey: PropTypes.string,
            deviceName: PropTypes.string,
            functionName: PropTypes.string,
            compareType: PropTypes.string,
            compareValue: PropTypes.any,

            // additional
            iotId: PropTypes.string,
            localizedProductName: PropTypes.string,
            localizedFunctionName: PropTypes.string,
            localizedCompareTypeName: PropTypes.string,
            localizedCompareValueName: PropTypes.string,
          }).isRequired,
        }),

        // trigger/timer & condition/timeRange only
        PropTypes.shape({
          time: PropTypes.oneOfType([
            // time range
            PropTypes.shape({
              start: PropTypes.arrayOf(PropTypes.number),
              end: PropTypes.arrayOf(PropTypes.number),
            }),

            // time
            PropTypes.arrayOf(PropTypes.number),
          ]),
          repeat: PropTypes.string,
        }),
      ]),
    ).isRequired,
  }

  renderList() {
    const {
      flowType, list,
    } = this.props;

    const Items = list.map((item, idx) => {
      if (!item.params.time) {
        return this.renderDevice(item, idx);
      }

      if (FLOW_TYPE_TRIGGER === flowType) {
        return this.renderTime(item, idx);
      }

      if (FLOW_TYPE_CONDITION === flowType) {
        return this.renderTimeRange(item, idx);
      }

      // unexpected
      return null;
    });

    // show manual execution item by default
    if (Items && FLOW_TYPE_TRIGGER === flowType) {
      Items.unshift(this.renderManualExec());
    }

    return Items;
  }

  renderDevice(item, idx) {
    const { flowType, intl, onEditItem, onDelItem } = this.props;
    const { status, params } = item;
    const { productImage, localizedProductName, localizedFunctionName, localizedCompareValueName } = params;

    return (
      <List.Item
        key={`${flowType}-${idx}`}
        image={productImage}
        title={localizedProductName}
        subtitle={`${localizedFunctionName} ${localizedCompareValueName}`}
        arrow="right"
        disabled={status === DEVICE_STATUS_UNAVAILABLE}
        onPress={() => onEditItem(idx, item)}
        onDisabledPress={() => Toast.info({
          duration: 1500,
          title: intl.formatMessage('scene.home.tca.disabledDevice'),
        })}
        actions={[{
          text: intl.formatMessage('scene.home.tca.delete'),
          style: {
            color: '#fff',
            backgroundColor: '#FF3838',
          },
          onPress: () => onDelItem(idx, item),
        }]}
        actionCancelText={intl.formatMessage('scene.common.cancel')}
      />
    );
  }

  renderTime(item, idx) {
    const { flowType, intl, onEditItem, onDelItem } = this.props;
    const { params } = item;
    const { time, repeat } = params;
    const timeLabel = `${pad(time[0])}:${pad(time[1])}`;
    const weekdayLabel = getRepeatLabel(repeat, intl);

    return (
      <List.Item
        key={`${flowType}-${idx}`}
        image={require('../../assets/scene/time.png')}
        title={intl.formatMessage('scene.home.tca.timeTitle')}
        subtitle={`${timeLabel} ${weekdayLabel}`}
        arrow="right"
        onPress={() => onEditItem(idx, item)}
        actions={[{
          text: intl.formatMessage('scene.home.tca.delete'),
          style: {
            color: '#fff',
            backgroundColor: '#FF3838',
          },
          onPress: () => onDelItem(idx, item),
        }]}
        actionCancelText={intl.formatMessage('scene.common.cancel')}
      />
    );
  }

  renderTimeRange(item, idx) {
    const { flowType, intl, onEditItem, onDelItem } = this.props;
    const { params } = item;
    const { time, repeat } = params;
    const timeLabel = `${pad(time.start[0])}:${pad(time.start[1])}-${pad(time.end[0])}:${pad(time.end[1])}`;
    const weekdayLabel = getRepeatLabel(repeat, intl);

    return (
      <List.Item
        key={`${flowType}-${idx}`}
        image={require('../../assets/scene/time.png')}
        title={intl.formatMessage('scene.home.tca.timeTitle')}
        subtitle={`${timeLabel} ${weekdayLabel}`}
        arrow="right"
        onPress={() => onEditItem(idx, item)}
        actions={[{
          text: intl.formatMessage('scene.home.tca.delete'),
          style: {
            color: '#fff',
            backgroundColor: '#FF3838',
          },
          onPress: () => onDelItem(idx, item),
        }]}
        actionCancelText={intl.formatMessage('scene.common.cancel')}
      />
    );
  }

  renderManualExec() {
    const { intl, flowType } = this.props;
    return (
      <List.Item
        key={`${flowType}-manExec`}
        image={require('../../assets/manual.png')}
        title={intl.formatMessage('scene.home.tca.manExec')}
        subtitle={intl.formatMessage('scene.home.trigger.manualSubtitle')}
      />
    );
  }

  render() {
    const { intl, flowType, onAddItem } = this.props;

    return (
      <View>
        <Blank />
        <Header
          title={intl.formatMessage(`scene.home.${flowType}.title`)}
          titleStyle={styles.header}
        />
        <View style={styles.bar}>
          <View style={styles.barLeft}>
            <Text style={styles.subTitle}>{intl.formatMessage(`scene.home.${flowType}.subTitle`)}</Text>
          </View>
          <View style={styles.barRight}>
            <IconButton
              title="+"
              color="#1FC88B"
              onPress={onAddItem}
            />
          </View>
        </View>
        <View style={styles.border} />
        <List>{this.renderList()}</List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 20,
    lineHeight: 20,
    paddingLeft: 6,
    color: '#333',
    fontSize: 20,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
  },

  bar: {
    flex: 1,
    flexDirection: 'row',
    height: 54,
    paddingLeft: 24,
    paddingRight: 16,
    backgroundColor: '#fff',
  },

  barLeft: {
    flex: 1,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
  },

  subTitle: {
    color: '#1FC88B',
    fontSize: 12,
  },

  barRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  border: {
    height: 1,
    marginLeft: 16,
    backgroundColor: '#ededed',
  },
});

function pad(time) {
  return (time < 10 ? '0' : '') + time;
}

export default connectIntl(TCAList);
