import Bone from '@bone/bone-mobile';

const defaultTime = {
  start: [8, 0],
  end: [18, 0],
};
const defaultRepeat = '0000000';

export default class TimeRangeModel extends Bone.Model {
  static initialState = {
    isWholeDay: false,
    startOpen: false,
    endOpen: false,
    start: defaultTime.start,
    end: defaultTime.end,
    repeat: defaultRepeat,
  };

  init(data) {
    if (!data) {
      return this.state;
    }
    const isWholeDay = this.isWholeDay(data.time);
    return {
      ...this.state,
      start: data.time.start,
      end: data.time.end,
      repeat: data.repeat,
      isWholeDay,
    };
  }

  isWholeDay(time) {
    let isWholeDay = false;
    const { start, end } = time;
    if (start && start[0] === 0 && start[1] === 0 && end && end[0] === 23 && end[1] === 59) {
      isWholeDay = true;
    }
    return isWholeDay;
  }

  wholeDayChange(isWholeDay) {
    let { start, end } = defaultTime;
    if (isWholeDay) {
      start = [0, 0];
      end = [23, 59];
    }
    return {
      ...this.state,
      isWholeDay,
      start,
      end,
    };
  }

  setOpen(type, value) {
    return {
      ...this.state,
      [type]: value,
    };
  }

  setTime(type, value) {
    const newState = {
      ...this.state,
      isWholeDay: false,
      [type]: value,
    };
    if (this.isWholeDay(newState)) {
      newState.isWholeDay = true;
    }
    return newState;
  }

  setRepeat(repeat) {
    return {
      ...this.state,
      repeat: repeat || defaultRepeat,
    };
  }
}
