import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connectIntl } from '@bone/intl';
import { List, Picker, Radio, Toast } from '@bone/bone-mobile-ui';
import { FUNC_DATA_TYPE, COMPARE_OPERATOR } from '../config/constants';
import Layout from '../layout';

class FunctionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey:
        typeof props.location.state.compareValue === 'undefined'
          ? -1
          : props.location.state.compareValue,
    };
    this.data = {
      compareType: props.location.state.compareType || null,
      compareValue:
        typeof props.location.state.compareValue === 'undefined'
          ? null
          : props.location.state.compareValue,
      localizedCompareValueName: '',
    };
  }

  getNumLocalizedCompareValueName() {
    const option = this.numOptions.find(item => item.value === this.data.compareValue);
    if (this.dataType.type !== FUNC_DATA_TYPE.BOOL && this.dataType.type !== FUNC_DATA_TYPE.ENUM) {
      const { intl } = this.props;
      const compareTypeMap = {
        [COMPARE_OPERATOR.GT.type]: intl.formatMessage('scene.compare.operator.gt'),
        [COMPARE_OPERATOR.EQT.type]: intl.formatMessage('scene.compare.operator.eqt'),
        [COMPARE_OPERATOR.LT.type]: intl.formatMessage('scene.compare.operator.lt'),
      };
      const compareTypeName = compareTypeMap[this.data.compareType];
      return `${compareTypeName} ${option.label} ${this.unit || ''}`;
    }
    return option.label;
  }

  renderEnumTypeSelect(dataType) {
    const { specs } = dataType;
    const onSelect = (compareValue, title) => {
      let val = compareValue;
      // 布尔和枚举型需要回传 int 型的 0 1
      val = Number(val);
      this.setState({
        selectedKey: val,
      });
      this.data = {
        compareType: COMPARE_OPERATOR.EQT.type,
        compareValue: val,
        localizedCompareValueName: title,
      };
    };
    return (
      <List>
        {Object.keys(specs).map(key => (
          <List.Item
            key={key}
            title={specs[key]}
            onPress={() => onSelect(key, specs[key])}
            extra={<Radio checked={key === String(this.state.selectedKey)} />}
          />
        ))}
      </List>
    );
  }

  renderNumberTypeSelect(dataType) {
    const { intl } = this.props;
    this.compareOptions = [
      {
        label: intl.formatMessage('scene.compare.operator.select'),
        value: null,
      },
      {
        label: intl.formatMessage('scene.compare.operator.gt'),
        value: COMPARE_OPERATOR.GT.type,
      },
      {
        label: intl.formatMessage('scene.compare.operator.eqt'),
        value: COMPARE_OPERATOR.EQT.type,
      },
      {
        label: intl.formatMessage('scene.compare.operator.lt'),
        value: COMPARE_OPERATOR.LT.type,
      },
    ];
    this.dataType = dataType;
    const { specs } = dataType;
    const { min, max, unit } = specs;
    this.unit = unit;
    this.numOptions = [
      {
        label: intl.formatMessage('scene.compare.operator.select'),
        value: null,
      },
      ...getNumberOptions(min, max),
    ];
    const onChange = (compareType, compareValue) => {
      this.data = {
        compareType,
        compareValue,
      };
      this.setState();
    };
    return (
      <Picker
        value={[this.data.compareType, this.data.compareValue]}
        data={[this.compareOptions, this.numOptions]}
        unit={['', unit]}
        onChange={onChange}
      />
    );
  }

  renderBody(title, content, dataType) {
    const { intl, onSave } = this.props;
    return (
      <Layout
        {...this.props}
        title={title}
        right={intl.formatMessage('scene.common.save')}
        onRightPress={() => {
          if (
            typeof this.data.compareValue === 'undefined' ||
            this.data.compareValue === null ||
            !this.data.compareType
          ) {
            return Toast.info({
              duration: 1500,
              title: intl.formatMessage('scene.function.tip.pleaseSelect'),
            });
          }
          if (
            dataType &&
            (dataType.type !== FUNC_DATA_TYPE.BOOL && dataType.type !== FUNC_DATA_TYPE.ENUM)
          ) {
            this.data.localizedCompareValueName = this.getNumLocalizedCompareValueName();
          }
          onSave(this.data);
        }}
        noScrollView={
          dataType &&
          (dataType.type !== FUNC_DATA_TYPE.BOOL && dataType.type !== FUNC_DATA_TYPE.ENUM)
        }
      >
        {content}
      </Layout>
    );
  }

  render() {
    const { location, dataType } = this.props;
    const localizedFunctionName = location.state.name || this.props.name;
    if (!dataType) {
      return this.renderBody(localizedFunctionName, <View />);
    }
    const isBoolType = dataType.type === FUNC_DATA_TYPE.BOOL;
    if (isBoolType || dataType.type === FUNC_DATA_TYPE.ENUM) {
      return this.renderBody(localizedFunctionName, this.renderEnumTypeSelect(dataType), dataType);
    }
    if (dataType.type === FUNC_DATA_TYPE.INT || dataType.type === FUNC_DATA_TYPE.FLOAT) {
      return this.renderBody(
        localizedFunctionName,
        this.renderNumberTypeSelect(dataType),
        dataType
      );
    }
    return this.renderBody(localizedFunctionName, <Text>暂时不支持此功能（功能未配置）</Text>);
  }
}

function getNumberOptions(min, max) {
  const ret = [];
  for (let i = Number(min); i <= Number(max); i++) {
    ret.push({
      label: String(i),
      value: i,
    });
  }
  return ret;
}

export default connectIntl(FunctionView);
