import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const DonutChart = ({ data = [], semicircle = false }) => {
  return (
    <div className="rounded-lg overflow-hidden  w-1/2 h-full min-h-full ">
      <ResponsiveContainer width="100%" className="h-full min-h-full">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={50}
            paddingAngle={5}
            dataKey="value"
            cornerRadius={10}
            startAngle={180}
            endAngle={semicircle ? 0 : -270}
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry?.color || '#000'} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;
