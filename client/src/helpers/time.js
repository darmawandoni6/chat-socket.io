import moment from 'moment';
import 'moment/locale/id';

export const timeSperator = (time1) => {
  const now = moment();

  const vTime = moment(time1);

  const day = now.diff(vTime, 'days');

  if (day === 0) {
    return 'Today';
  }
  if (day === 1) {
    return 'Tomorow';
  }

  return vTime.format('MMMM, YYYY');
};
