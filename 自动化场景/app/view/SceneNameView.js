import React, { Component } from 'react';
import { connectIntl } from '@bone/intl';
import { TextInput, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Layout from '../layout';

class SceneView extends Component {
  state = {
    value: '',
  };

  componentDidMount() {
    this.setState({
      value: this.props.location.state.name,
    });
  }

  onCancelPressed = () => {
    this.setState({
      value: '',
    });
  };

  onSave = () => {
    // @TODO Validation
    if (this.props.onSave) {
      this.props.onSave(this.state.value);
    }
  };

  render() {
    const { intl } = this.props;
    return (
      <Layout
        right={intl.formatMessage('scene.common.save')}
        onRightPress={this.onSave}
        title={intl.formatMessage('scene.name.title')}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              this.setState({
                value,
              });
            }}
            value={this.state.value}
            placeholder={intl.formatMessage('scene.name.placeholder')}
            underlineColorAndroid="transparent"
          />
          {this.state.value ? (
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={this.onCancelPressed}>
                <Image style={styles.icon} source={require('../assets/resetInput.png')} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: 64,
    backgroundColor: '#ffffff',
    paddingLeft: 15,
    color: '#333',
  },
  iconContainer: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 15,
    top: 22,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default connectIntl(SceneView);
