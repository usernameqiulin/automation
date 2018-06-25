export default {
  schema: 'https://iot-tsl.oss-cn-shanghai.aliyuncs.com/schema.json',
  profile: {
    productKey: 'a1YTQEj48DR'
  },
  services: [
    {
      outputData: [],
      identifier: 'set',
      inputData: [
        {
          identifier: 'LightSwitch',
          dataType: {
            specs: {
              '0': '关闭',
              '1': '开启'
            },
            type: 'bool'
          },
          name: '主灯开关'
        },
        {
          identifier: 'RGBColor',
          dataType: {
            specs: [
              {
                identifier: 'Red',
                dataType: {
                  specs: {
                    min: '0',
                    unitName: '无',
                    max: '255'
                  },
                  type: 'int'
                },
                name: '红色'
              },
              {
                identifier: 'Green',
                dataType: {
                  specs: {
                    min: '0',
                    unitName: '无',
                    max: '255'
                  },
                  type: 'int'
                },
                name: '绿色'
              },
              {
                identifier: 'Blue',
                dataType: {
                  specs: {
                    min: '0',
                    unitName: '无',
                    max: '255'
                  },
                  type: 'int'
                },
                name: '蓝色'
              }
            ],
            type: 'struct'
          },
          name: 'RGB调色'
        },
        {
          identifier: 'Brightness',
          dataType: {
            specs: {
              unit: '%',
              min: '0',
              unitName: '百分比',
              max: '100'
            },
            type: 'int'
          },
          name: '明暗度'
        }
      ],
      method: 'thing.service.property.set',
      name: 'set',
      required: true,
      callType: 'sync',
      desc: '属性设置'
    },
    {
      outputData: [
        {
          identifier: 'LightSwitch',
          dataType: {
            specs: {
              '0': '关闭',
              '1': '开启'
            },
            type: 'bool'
          },
          name: '主灯开关'
        },
        {
          identifier: 'RGBColor',
          dataType: {
            specs: [
              {
                identifier: 'Red',
                dataType: {
                  specs: {
                    min: '0',
                    unitName: '无',
                    max: '255'
                  },
                  type: 'int'
                },
                name: '红色'
              },
              {
                identifier: 'Green',
                dataType: {
                  specs: {
                    min: '0',
                    unitName: '无',
                    max: '255'
                  },
                  type: 'int'
                },
                name: '绿色'
              },
              {
                identifier: 'Blue',
                dataType: {
                  specs: {
                    min: '0',
                    unitName: '无',
                    max: '255'
                  },
                  type: 'int'
                },
                name: '蓝色'
              }
            ],
            type: 'struct'
          },
          name: 'RGB调色'
        },
        {
          identifier: 'Brightness',
          dataType: {
            specs: {
              unit: '%',
              min: '0',
              unitName: '百分比',
              max: '100'
            },
            type: 'int'
          },
          name: '明暗度'
        }
      ],
      identifier: 'get',
      inputData: ['LightSwitch', 'RGBColor', 'Brightness'],
      method: 'thing.service.property.get',
      name: 'get',
      required: true,
      callType: 'sync',
      desc: '属性获取'
    }
  ],
  properties: [
    {
      identifier: 'LightSwitch',
      dataType: {
        specs: {
          '0': '关闭',
          '1': '开启'
        },
        type: 'bool'
      },
      name: '主灯开关',
      accessMode: 'rw',
      required: true
    },
    {
      identifier: 'RGBColor',
      dataType: {
        specs: [
          {
            identifier: 'Red',
            dataType: {
              specs: {
                min: '0',
                unitName: '无',
                max: '255'
              },
              type: 'int'
            },
            name: '红色'
          },
          {
            identifier: 'Green',
            dataType: {
              specs: {
                min: '0',
                unitName: '无',
                max: '255'
              },
              type: 'int'
            },
            name: '绿色'
          },
          {
            identifier: 'Blue',
            dataType: {
              specs: {
                min: '0',
                unitName: '无',
                max: '255'
              },
              type: 'int'
            },
            name: '蓝色'
          }
        ],
        type: 'struct'
      },
      name: 'RGB调色',
      accessMode: 'rw',
      required: false
    },
    {
      identifier: 'Brightness',
      dataType: {
        specs: {
          unit: '%',
          min: '0',
          unitName: '百分比',
          max: '100'
        },
        type: 'int'
      },
      name: '明暗度',
      accessMode: 'rw',
      required: false
    }
  ],
  events: [
    {
      outputData: [
        {
          identifier: 'LightSwitch',
          dataType: {
            specs: {
              '0': '关闭',
              '1': '开启'
            },
            type: 'bool'
          },
          name: '主灯开关'
        },
        {
          identifier: 'RGBColor',
          dataType: {
            specs: [
              {
                identifier: 'Red',
                dataType: {
                  specs: {
                    min: '0',
                    unitName: '无',
                    max: '255'
                  },
                  type: 'int'
                },
                name: '红色'
              },
              {
                identifier: 'Green',
                dataType: {
                  specs: {
                    min: '0',
                    unitName: '无',
                    max: '255'
                  },
                  type: 'int'
                },
                name: '绿色'
              },
              {
                identifier: 'Blue',
                dataType: {
                  specs: {
                    min: '0',
                    unitName: '无',
                    max: '255'
                  },
                  type: 'int'
                },
                name: '蓝色'
              }
            ],
            type: 'struct'
          },
          name: 'RGB调色'
        },
        {
          identifier: 'Brightness',
          dataType: {
            specs: {
              unit: '%',
              min: '0',
              unitName: '百分比',
              max: '100'
            },
            type: 'int'
          },
          name: '明暗度'
        }
      ],
      identifier: 'post',
      method: 'thing.event.property.post',
      name: 'post',
      type: 'info',
      required: true,
      desc: '属性上报'
    },
    {
      outputData: [
        {
          identifier: 'ErrorCode',
          dataType: {
            specs: {
              '0': '恢复正常'
            },
            type: 'enum'
          },
          name: '故障代码'
        }
      ],
      identifier: 'Error',
      method: 'thing.event.Error.post',
      name: '故障上报',
      type: 'info',
      required: true
    }
  ]
};
