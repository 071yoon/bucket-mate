export const getDDay = () => {
  const curDate = new Date();
  const curDateWithoutTime = new Date(
    curDate.getFullYear(),
    curDate.getMonth(),
    curDate.getDate()
  );
  const firstDay = new Date(2023, 9, 24);
  const dDayDiff = Math.floor(
    (curDateWithoutTime.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24)
  );
  return dDayDiff + 1;
};
