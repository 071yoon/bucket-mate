export const getKoreanTime = (now: Date) => {
  // const koreanTime =
  //   now.getTime() +
  //   (now.getTimezoneOffset() + 540) * 60 * 1000 +
  //   9 * 60 * 60 * 1000;
  return now.getTime();
};
