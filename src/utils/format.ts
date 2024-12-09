import moment from 'moment';

export const getDueIn = (inputDate: string) => {
  // Chuyển đổi chuỗi nhập vào thành đối tượng Moment
  const dueDate = moment(inputDate, 'DD/MM/YYYY');
  const now = moment();

  // So sánh và tính toán
  if (dueDate.isAfter(now)) {
    const diffInDays = dueDate.diff(now, 'days');
    return `Còn ${diffInDays} ngày`;
  } else if (dueDate.isBefore(now)) {
    const diffInDays = now.diff(dueDate, 'days');
    return `Đã quá hạn ${diffInDays} ngày`;
  } else {
    return 'Hôm nay là hạn chót';
  }
};

export const getDate = (inputDate: Date) => {
  const date = moment(inputDate, 'DD/MM/YYYY');
  return date.format('DD/MM/YYYY');
};
