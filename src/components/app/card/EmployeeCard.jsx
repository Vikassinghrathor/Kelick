import { getChartData } from '@/utility/getChartData';
import { getCount } from '@/utility/getCount';
import { Card } from '@/components/styles/StyledCard';
import DonutChart from '@/components/charts/DonutChart';
import { Text, SegmentedProgressBar } from '../../ui';

export const EmployeeCard = ({
  cardInfo,
  employeeDetail = {},
  semicircle = false,
  showProgressBar = false,
}) => {
  const { title, content } = cardInfo || {};
  const count = getCount(title.key, employeeDetail);
  const chartData = getChartData(count);

  return (
    <Card>
      <div className="flex flex-col h-full gap-4">
        <div
          className={`flex ${
            showProgressBar ? 'flex-col' : 'flex-row'
          }  h-3/4 justify-between`}
        >
          <div className={`flex flex-col p-2`}>
            <Text className="font-quicksand font-medium text-xs leading-5 text-light-gray-300">
              {title.label}
            </Text>
            <Text className="font-quicksand font-bold text-4xl leading-[52px] text-dark-gray">
              {count?.[content.key] || 0}
            </Text>
            <Text className="font-quicksand font-semibold text-base leading-6 text-dark-gray">
              {content.label}
            </Text>
          </div>
          {showProgressBar && <SegmentedProgressBar segmentsData={chartData} />}

          {!showProgressBar && (
            <DonutChart semicircle={semicircle} data={chartData} />
          )}
        </div>

        <div className="flex gap-2 flex-wrap w-full p-1">
          {chartData.map((item) => (
            <div key={item.name} className="flex gap-2">
              <div
                className={`w-1 h-full rounded-full`}
                style={{ backgroundColor: item.color }}
              />
              <p className="font-quicksand font-semibold text-sm leading-6 text-dark-gray">
                {item.value}
                <span className="font-quicksand font-normal text-sm leading-6 text-dark-gray ml-1">
                  {item.name}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
