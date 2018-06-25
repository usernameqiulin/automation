import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connectIntl } from '@bone/intl';
import { List } from '@bone/bone-mobile-ui';
import Layout from '../layout';

class DeviceView extends Component {
  renderList() {
    const { devices, onItemPress, intl } = this.props;
    if (devices.length) {
      return (
        <List>
          {devices.map((device, key) => (
            <List.Item
              key={key}
              image={device.image}
              title={device.nickName}
              arrow="right"
              onPress={() => onItemPress(device)}
            />
          ))}
        </List>
      );
    }
    if (this.props.isLoading) {
      return <View />;
    }
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          style={{
            width: 94,
            height: 94,
            marginTop: 100,
          }}
          source={require('../assets/info.png')}
        />
        <Text
          style={{
            marginTop: 20,
            color: '#afb8bD',
          }}
        >
          {intl.formatMessage('scene.device.notdevice')}
        </Text>
      </View>
    );
  }

  render() {
    const { intl } = this.props;
    return (
      <Layout title={intl.formatMessage('scene.device.title')} {...this.props}>
        {this.renderList()}
      </Layout>
    );
  }
}

export default connectIntl(DeviceView);
