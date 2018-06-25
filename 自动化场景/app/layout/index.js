import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NavBar, Blank, Toast } from '@bone/bone-mobile-ui';
import Bone from '@bone/bone-mobile';
import PropTypes from 'prop-types';
import { connectIntl } from '@bone/intl';

class Layout extends React.Component {
  static defaultProps = {
    noScrollView: false,
    isLoading: false,
  };

  static propTypes = {
    children: PropTypes.element,
    // navbar props
    noScrollView: PropTypes.bool,
    noMarginTop: PropTypes.bool,
    isLoading: PropTypes.bool,
    intl: PropTypes.object,
  };

  constructor(...args) {
    super(...args);
    this.onBackButtonPress = this.onBackButtonPress.bind(this);
  }

  onBackButtonPress() {
    Bone.navigation.pop();
  }

  render() {
    const { noScrollView, isLoading, intl, noMarginTop } = this.props;

    if (isLoading && !this.loading) {
      this.loading = Toast.loading({
        title: intl.formatMessage('scene.common.loading.title'),
      });
    } else {
      this.loading && this.loading.close() && (this.loading = null);
    }

    return (
      <View style={styles.body}>
        <NavBar style={navbarStyle.body} onLeftPress={this.onBackButtonPress} {...this.props} />
        {noScrollView ? (
          <View>
            {noMarginTop ? null : <Blank size="lg" />}
            {this.props.children}
          </View>
        ) : (
          <ScrollView>
            {noMarginTop ? null : <Blank size="lg" />}
            {this.props.children}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    shadowColor: '#CCC',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
  },
});

// 设置导航栏的样式
const navbarStyle = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },

  right: {
    color: '#1FC88B',
  },
});

export default connectIntl(Layout);
