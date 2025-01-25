import { colorConst } from '@/constants/appConstants';

export const getChartData = (data) => {
  let res = Object.entries(data)?.reduce(
    (res, curr, index) => [
      ...res,
      { name: curr[0], value: curr[1], color: colorConst[index] },
    ],
    []
  );
  return res;
};
