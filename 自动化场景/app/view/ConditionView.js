import React, { Component } from 'react';
import { connectIntl } from '@bone/intl';
import { List } from '@bone/bone-mobile-ui';
import Layout from '../layout';
import { CONDITION_TYPE_TIMERANGER, CONDITION_TYPE_DEVICE } from '../config/constants';

class ConditionView extends Component {
  render() {
    const { intl, hasTimer, onTypePress } = this.props;
    // @todo
    // require assets
    return (
      <Layout title={intl.formatMessage('scene.addcondition.title')}>
        <List>
          {
            hasTimer ?
              null :
              <List.Item
                image={require('../assets/scene/time.png')}
                title={intl.formatMessage('scene.addcondition.timerRange.name')}
                subtitle={intl.formatMessage('scene.addcondition.timerRange.desc')}
                arrow="right"
                onPress={() => onTypePress(CONDITION_TYPE_TIMERANGER)}
              />
          }
          <List.Item
            image={require('../assets/scene/device.png')}
            title={intl.formatMessage('scene.addcondition.device.name')}
            subtitle={intl.formatMessage('scene.addcondition.device.desc')}
            arrow="right"
            onPress={() => onTypePress(CONDITION_TYPE_DEVICE)}
          />
        </List>
      </Layout>
    );
  }
}

export default connectIntl(ConditionView);
