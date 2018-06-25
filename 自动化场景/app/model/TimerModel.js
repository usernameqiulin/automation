import Bone from '@bone/bone-mobile';

const defaultTime = [0, 0];
const defaultRepeat = '0000000';

export default class TimerModel extends Bone.Model {
  static initialState = {
    time: defaultTime,
    repeat: defaultRepeat,
  };

  init(data) {
    if (data) {
      return data;
    }
    return this.state;
  }

  setTime(time) {
    return {
      ...this.state,
      time: time || defaultTime,
    };
  }

  setRepeat(repeat) {
    return {
      ...this.state,
      repeat: repeat || defaultRepeat,
    };
  }
}
