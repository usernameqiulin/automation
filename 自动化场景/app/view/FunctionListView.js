import React, { Component } from 'react';
import { connectIntl } from '@bone/intl';
import { List } from '@bone/bone-mobile-ui';
import Layout from '../layout';

class FunctionListView extends Component {
  renderList() {
    const { funcs, onItemPress } = this.props;
    return (
      <List>
        {funcs.map((func, key) => (
          <List.Item key={key} title={func.name} arrow="right" onPress={() => onItemPress(func)} />
        ))}
      </List>
    );
  }

  render() {
    const { location } = this.props;
    // @TODO pass nickname from home page
    return <Layout title={location.state.nickName}>{this.renderList()}</Layout>;
  }
}

export default connectIntl(FunctionListView);
