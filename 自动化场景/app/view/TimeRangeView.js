import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connectIntl } from '@bone/intl';
import { Blank, List, Switch } from '@bone/bone-mobile-ui';
import Layout from '../layout';
import TimerPicker from './component/TimePicker';
import { getRepeatLabel } from '../util/time';

class TimerRangeView extends Component {
  render() {
    const { intl, repeat, start, end } = this.props;
    const time = { start, end };
    const repeatValueLabel = getRepeatLabel(repeat, intl);
    return (
      <Layout
        right={intl.formatMessage('scene.common.save')}
        onRightPress={() => {
          this.props.onSave({
            time,
            repeat,
          });
        }}
        title={intl.formatMessage('scene.timerange.title')}
        noScrollView
      >
        <View>
          <List>
            <List.Item
              title={intl.formatMessage('scene.timerange.wholeday')}
              extra={
                <Switch
                  onChange={() => {
                    const isWholeDay = !this.props.isWholeDay;
                    this.actions.wholeDayChange(isWholeDay);
                  }}
                  checked={this.props.isWholeDay}
                />
              }
            />
          </List>
          <Blank size="lg" />
          <List>
            <List.Item
              title={intl.formatMessage('scene.timerange.start')}
              onPress={() => {
                this.actions.setOpen('startOpen', !this.props.startOpen);
              }}
              extra={
                <Text
                  style={{
                    color: '#1FC88B',
                  }}
                >
                  {formatTime(this.props.start)}
                </Text>
              }
            />
          </List>
          {this.props.startOpen ? (
            <TimerPicker
              value={this.props.start}
              onChange={(...value) => {
                this.actions.setTime('start', value);
              }}
            />
          ) : null}
          <View
            style={{
              backgroundColor: '#ffffff',
              height: 1,
            }}
          >
            {this.props.startOpen ? (
              <View
                style={{
                  backgroundColor: '#EDEDED',
                  height: 1,
                }}
              />
            ) : (
              <View
                style={{
                  backgroundColor: '#EDEDED',
                  height: 1,
                  marginLeft: 25,
                }}
              />
            )}
          </View>
          <List>
            <List.Item
              title={intl.formatMessage('scene.timerange.end')}
              onPress={() => {
                this.actions.setOpen('endOpen', !this.props.endOpen);
              }}
              extra={
                <Text
                  style={{
                    color: '#1FC88B',
                  }}
                >
                  {formatTime(this.props.end)}
                </Text>
              }
            />
          </List>
          {this.props.endOpen ? (
            <TimerPicker
              value={this.props.end}
              onChange={(...value) => this.actions.setTime('end', value)}
            />
          ) : null}
          <Blank size="lg" />
          <List>
            <List.Item
              title={intl.formatMessage('scene.timer.repeat')}
              extra={repeatValueLabel}
              arrow="right"
              onPress={this.props.onRepeatPress}
            />
          </List>
        </View>
      </Layout>
    );
  }
}

function formatTime(value) {
  return value
    .map((item) => {
      if (String(item).length === 1) {
        return `0${item}`;
      }
      return item;
    })
    .join(':');
}

export default connectIntl(TimerRangeView);
