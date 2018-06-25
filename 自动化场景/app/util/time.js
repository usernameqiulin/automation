// trigger timer
// repeat = '0001000';
// time = [hour, min];

// condition timer
// repeat = '0001000';
// time = {
//   start: [hour, min],
//   end: [hour, min],
// };
import jstz from 'jstz';
import moment from 'moment-timezone';
import { CRON_TYPE_LINUX } from '../config/constants';

const timezone = jstz.determine();

export function timerToCron(timer) {
  const { repeat, time } = timer;

  const weekdays = repeat.split('').reduce((acc, cur, idx) => {
    if (cur === '1') {
      acc.push(String(idx + 1));
    }
    return acc;
  }, []);

  const hour = time.start ? `${time.start[0]}-${time.end[0]}` : `${time[0]}`;
  const min = time.start ? `${time.start[1]}-${time.end[1]}` : `${time[1]}`;

  return {
    cron: `${min} ${hour} * * ${weekdays.length ? weekdays.join(',') : '*'}`,
    cronType: CRON_TYPE_LINUX,
    timezoneID: timezone.name(),
  };
}

export function cronToTimer(cron) {
  if (!cron || !cron.cron) return {};
  const arr = cron.cron.split(' ');
  const hour = arr[1].split('-');
  const min = arr[0].split('-');
  const offset = timezoneOffset(cron.timezoneID, timezone.name());

  const weekdays = arr[4].split(',');
  const repeat = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0, len = weekdays.length; i < len; i++) {
    repeat[weekdays[i] - 1] = '1';
  }

  // locale timezone
  // const currentTimezone = timezone.name();
  // if (currentTimezone !== cron.timezoneID) {}

  return {
    time: hour[1] || min[1] ?
      // range
      {
        start: [Number(hour[0]) + offset, Number(min[0])],
        end: [Number(hour[1]) + offset, Number(min[1])],
      } :
      // specific time
      [Number(hour[0]) + offset, Number(min[0])],
    repeat: repeat.join(''),
  };
}

export function getRepeatLabel(repeatValue, intl) {
  let repeatValueLabel = '';
  if (repeatValue === '0000000') {
    repeatValueLabel = intl.formatMessage('scene.timer.once');
  } else if (repeatValue === '1111100') {
    repeatValueLabel = intl.formatMessage('scene.timer.workingdays');
  } else if (repeatValue === '0000011') {
    repeatValueLabel = intl.formatMessage('scene.timer.weekend');
  } else {
    const repeatArr = repeatValue.split('');
    const labels = [];
    repeatArr.forEach((day, idx) => {
      if (day === '1') {
        labels.push(intl.formatMessage(`scene.timer.weekday.short${idx + 1}`));
      }
    });
    return labels.join(' ');
  }
  return repeatValueLabel;
}

// test cases
// timezoneOffset( 'America/Thule', 'Asia/Srednekolymsk') === 14
// timezoneOffset('Asia/Srednekolymsk', 'America/Thule') === -14
// timezoneOffset('America/Thule', 'Asia/Shanghai') === 11
export function timezoneOffset(timeZone1, timeZone2) {
  const base = new Date();
  const dateFormat = 'YYYY-MM-DD';
  const hourFormat = 'HH';
  const date1 = moment.tz(base, timeZone1);
  const date2 = date1.clone().tz(timeZone2);
  const dateStr1 = date1.format(dateFormat);
  const dateStr2 = date2.format(dateFormat);
  const hour1 = date1.format(hourFormat);
  const hour2 = date2.format(hourFormat);

  if (dateStr1 === dateStr2) {
    return Number(hour2) - Number(hour1);
  }

  if (dateStr1 < dateStr2) {
    return Number(hour2) + 24 - Number(hour1);
  }

  return Number(hour2) - Number(hour1) - 24;
}
