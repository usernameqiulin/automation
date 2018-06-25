import React, { Component } from 'react';
import { Picker } from '@bone/bone-mobile-ui';
import PropTypes from 'prop-types';
import { connectIntl } from '@bone/intl';

class TimerPicker extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }).isRequired,
  };

  getNumbers(count) {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push({
        value: i,
        label: String(i),
      });
    }
    return result;
  }

  render() {
    const { intl } = this.props;
    return (
      <Picker
        data={[this.getNumbers(24), this.getNumbers(60)]}
        value={this.props.value || [0, 0]}
        unit={[intl.formatMessage('scene.timer.hour'), intl.formatMessage('scene.timer.minute')]}
        onChange={this.props.onChange}
      />
    );
  }
}

export default connectIntl(TimerPicker);
