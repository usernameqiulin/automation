import React, { Component } from 'react';
import { View } from 'react-native';
import { connectIntl } from '@bone/intl';
import { Blank, List } from '@bone/bone-mobile-ui';
import Layout from '../layout';
import TimePicker from './component/TimePicker';
import { getRepeatLabel } from '../util/time';

class TimerView extends Component {
  render() {
    const { intl, repeat, time } = this.props;
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
        title={intl.formatMessage('scene.timer.title')} //设定时间
        noScrollView
      >
        <View>
          <TimePicker value={this.props.time} onChange={this.props.onTimeChange} />
          <Blank size="lg" />
          <List>
            <List.Item
              title={intl.formatMessage('scene.timer.repeat')}  //重复按钮
              extra={repeatValueLabel}
              arrow="right"
              onPress={this.props.onRepeatPress}  //点击事件
            />
          </List>
        </View>
      </Layout>
    );
  }
}

export default connectIntl(TimerView);
