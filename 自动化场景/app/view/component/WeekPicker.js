import React, { Component } from 'react';
import { List, Checkbox } from '@bone/bone-mobile-ui';
import PropTypes from 'prop-types';
import { connectIntl } from '@bone/intl';

const weekdays = [1, 2, 3, 4, 5, 6, 7];

class WeekPicker extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }).isRequired,
  };

  constructor(...args) {
    super(...args);
    if (this.props.value) {
      this.state = {
        value: this.props.value.split('').map(item => Number(item)),
      };
    } else {
      this.state = {
        value: [0, 0, 0, 0, 0, 0, 0],
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value.split('').map(item => Number(item)),
    });
  }

  render() {
    const { intl } = this.props;
    return (
      <List>
        {weekdays.map((day, idx) => (
          <List.Item
            key={day}
            title={intl.formatMessage(`scene.timer.weekday${day}`)}
            extra={<Checkbox checked={this.state.value[idx] === 1} />}
            onPress={() => {
              const selected = this.state.value[idx] === 1;
              const newValue = selected ? 0 : 1;
              this.state.value[idx] = newValue;
              this.setState({
                value: this.state.value,
              });
              if (this.props.onChange) {
                this.props.onChange(this.state.value.join(''));
              }
            }}
          />
        ))}
      </List>
    );
  }
}

export default connectIntl(WeekPicker);
