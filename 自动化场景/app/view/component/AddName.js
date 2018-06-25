import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Alert, Toast } from '@bone/bone-mobile-ui';
import { connectIntl } from '@bone/intl';

class AddNameComponent extends React.Component {
  componentDidMount() {
    this.val = this.props.name || '';

    const { intl, onConfirm } = this.props;

    // store tmp value to context this
    // don't setState, otherwise will cause recursive render & Alert.open

    Alert.open({
      title: intl.formatMessage('scene.home.overview.name'),
      message: (
        <View style={styles.inputContainer}>
          <TextInput
            defaultValue={this.val}
            onChangeText={val=>this.val=val}
            placeholder={intl.formatMessage('scene.home.overview.namePlaceholder')}
            placeholderTextColor="#999"
            style={styles.input}
            underlineColorAndroid="transparent"
          />
        </View>
      ),
      actions: [
        {
          text: intl.formatMessage('scene.common.cancel'),
          onPress: () => {
            this.actions.set({
              name: this.val,
              isAddingName: false,
            });
          },
        },
        {
          text: intl.formatMessage('scene.common.save'),
          onPress: () => {
            if (!this.val) {
              Toast.info({
                duration: 1500,
                title: intl.formatMessage('scene.home.tip.emptyName'),
              });
              return Promise.reject();
            }

            this.actions.set({
              name: this.val,
              isAddingName: false,
            });

            // delay execution
            // wait for model setting to take effect
            setTimeout(onConfirm, 0);
          },
        },
      ],
    });
  }

  render() {
    return null;
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    borderColor: '#999',
    borderWidth: 0.5,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 4,
    marginBottom: 4,
  },

  input: {
    height: 38,
    backgroundColor: '#fff',
    paddingLeft: 5,
    color: '#333',
  },
});

export default connectIntl(AddNameComponent);
