import React, { Component } from 'react';
import { connectIntl } from '@bone/intl';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import icons from '../config/icons';
import Layout from '../layout';

const { width: screenWidth } = Dimensions.get('window');

class SceneIconView extends Component {
  getIconData() {
    const numPerRow = 4;
    const rows = [];
    let items = [];
    this.icons.forEach((icon, index) => {
      items.push(icon);
      if (items.length === numPerRow) {
        rows.push(items);
        items = [];
      }
      if (index === this.icons.length - 1 && items.length < numPerRow) {
        for (let i = items.length; i < numPerRow; i++) {
          // fill empty
          items.push(null);
        }
        rows.push(items);
      }
    });
    return rows;
  }

  icons = icons;

  render() {
    const { intl, onSave } = this.props;
    const rows = this.getIconData();

    return (
      <Layout title={intl.formatMessage('scene.icon.title')} noMarginTop>
        {rows.map((items, rowKey) => (
          <View key={`rowKey_${rowKey}`} style={styles.container}>
            {items.map(
              (item, key) =>
                (item ? (
                  <View
                    key={`itemKey_${key}`}
                    style={
                      key === items.length - 1 ? [styles.colum, styles.lastColum] : [styles.colum]
                    }
                  >
                    <TouchableOpacity
                      onPress={() => {
                        onSave(item.name);
                      }}
                    >
                      <View style={styles.iconWrap}>
                        <Image style={styles.icon} source={item.image} />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.colum} />
                ))
            )}
          </View>
        ))}
      </Layout>
    );
  }
}
const gridWidth = (screenWidth - 3) / 4;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  colum: {
    flexDirection: 'row',
    flex: 1,
    height: gridWidth,
    marginRight: 1,
    marginBottom: 1,
  },
  lastColum: {
    marginRight: 0,
  },
  iconWrap: {
    flex: 1,
    width: gridWidth,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default connectIntl(SceneIconView);
