export const getCount = (key = '', data) => {
  const count = {};
  if (!Object.hasOwn(data[0] || {}, key)) return count;

  const details = data.filter((obj) =>
    Object.values(obj).every((item) => item !== undefined)
  );

  details.forEach((detail) => {
    const value = detail[key];
    if (count[value]) {
      count[value]++;
    } else {
      count[value] = 1;
    }
  });

  return count;
};
