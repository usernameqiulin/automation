import React, { Component } from 'react';
import { connectIntl } from '@bone/intl';
import Layout from '../layout';
import WeekPicker from './component/WeekPicker';

class RepeatView extends Component {
  constructor(...args) {
    super(...args);
    this.data = this.props.repeat;
  }

  onChange = (value) => {
    this.data = value;
  };

  render() {
    const { intl } = this.props;
    const repeatValue = this.props.repeat;
    return (
      <Layout
        title={intl.formatMessage('scene.timer.repeat')}
        right={intl.formatMessage('scene.common.save')}
        onRightPress={() => {
          if (this.props.onSave) {
            this.props.onSave(this.data);
          }
        }}
      >
        <WeekPicker value={repeatValue} onChange={this.onChange} />
      </Layout>
    );
  }
}

export default connectIntl(RepeatView);
