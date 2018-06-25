import React, { Component } from 'react';
import { connectIntl } from '@bone/intl';
import { List } from '@bone/bone-mobile-ui';
import Layout from '../layout';
import { TRIGGER_TYPE } from '../config/constants';

class TriggerView extends Component {
  render() {
    const { intl, hasTimer, onTypePress } = this.props;
    // @todo
    // require assets
    return (
      <Layout title={intl.formatMessage('scene.addtrigger.title')}>
        <List>
          {
            hasTimer ?
              null :
              <List.Item
                image={require('../assets/scene/time.png')}
                title={intl.formatMessage('scene.addtrigger.timer.name')}
                subtitle={intl.formatMessage('scene.addtrigger.timer.desc')}
                arrow="right"
                onPress={() => onTypePress(TRIGGER_TYPE.TIMER)}
              />
          }
          <List.Item
            image={require('../assets/scene/device.png')}
            title={intl.formatMessage('scene.addtrigger.device.name')}
            subtitle={intl.formatMessage('scene.addtrigger.device.desc')}
            arrow="right"
            onPress={() => onTypePress(TRIGGER_TYPE.DEVICE)}
          />
        </List>
      </Layout>
    );
  }
}

export default connectIntl(TriggerView);
