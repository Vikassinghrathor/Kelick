import React from 'react';

const SegmentedProgressBar = ({ segmentsData }) => {
  const totalValue = segmentsData.reduce(
    (sum, segment) => sum + segment.value,
    0
  );

  return (
    <div className="flex gap-1 w-full h-[10px] rounded-xl bg-transparent ">
      {segmentsData.map((segment, index) => {
        const segmentWidth = (segment.value / totalValue) * 100;
        return (
          <div
            key={index}
            style={{
              width: `${segmentWidth}%`,
              backgroundColor: segment.color,
              borderRadius: '12px',
            }}
            className="h-full rounded-l-lg last:rounded-r-lg"
          ></div>
        );
      })}
    </div>
  );
};

export default React.memo(SegmentedProgressBar);
